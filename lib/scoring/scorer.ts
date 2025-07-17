// lib/scoring/scorer.ts
import { aiClient } from '../aiClient';
import {
    JobDefinition,
    Question,
    WeightRule,
    CharCountRule,
    KeywordRule,
    AIRule,
    ApplicationResponse
} from './types';

export class Scorer {
    /**
     * Score an entire application against a job definition
     */
    static async score(job: JobDefinition, responses: ApplicationResponse[]): Promise<number> {
        let totalWeight = 0;
        let earnedPoints = 0;

        console.log(`Scoring application for ${job.meta.title}`);

        for (const question of job.form) {
            const rule = question.weight;
            const weight = typeof rule === 'number' ? rule : rule.value;
            totalWeight += weight;

            const response = responses.find(r => r.questionId === question.id);
            const answer = response?.value;

            // Skip unanswered questions
            if (answer == null || answer === '' || (Array.isArray(answer) && answer.length === 0)) {
                console.log(`Question ${question.id}: No answer (0 points)`);
                continue;
            }

            try {
                const percentage = await this.scoreQuestion(job, question, answer, rule);
                const points = (percentage * weight) / 100;
                earnedPoints += points;

                console.log(`Question ${question.id}: ${percentage}% × ${weight} = ${points.toFixed(1)} points`);
            } catch (error) {
                console.error(`Error scoring question ${question.id}:`, error);
                // Award minimal points on error rather than failing completely
                earnedPoints += (10 * weight) / 100;
            }
        }

        const finalScore = totalWeight === 0 ? 0 : Math.round((earnedPoints / totalWeight) * 100);
        console.log(`Final score: ${earnedPoints.toFixed(1)}/${totalWeight} = ${finalScore}%`);

        return finalScore;
    }

    /**
     * Score a single question based on its weight rule
     */
    private static async scoreQuestion(
        job: JobDefinition,
        question: Question,
        answer: any,
        rule: WeightRule,
    ): Promise<number> {
        // Simple numeric weight = basic validation (answered = 100%)
        if (typeof rule === 'number') {
            return this.scoreBasic(question, answer);
        }

        switch (rule.kind) {
            case 'char':
                return this.scoreByCharCount(answer as string, rule);

            case 'keyword':
                return this.scoreByKeywords(answer as string, rule);

            case 'ai':
                return this.scoreByAI(job, question, answer as string, rule);

            default:
                console.warn(`Unknown weight rule kind: ${(rule as any).kind}`);
                return 0;
        }
    }

    /* ---------- Scoring Methods ---------- */

    /**
     * Basic scoring for simple numeric weights
     */
    private static scoreBasic(question: Question, answer: any): number {
        switch (question.type) {
            case 'text':
            case 'email':
            case 'tel':
            case 'url':
                return this.validateText(answer as string, question);

            case 'select':
            case 'radio':
                return question.options?.includes(answer) ? 100 : 0;

            case 'multiselect':
                const values = answer as string[];
                const validValues = values.filter(v => question.options?.includes(v));
                return validValues.length > 0 ? Math.min(100, (validValues.length / 3) * 100) : 0;

            case 'file':
                return answer ? 100 : 0;

            case 'number':
                const num = Number(answer);
                return !isNaN(num) ? 100 : 0;

            default:
                return 100; // If answered, give full points
        }
    }

    /**
     * Score based on character count with min/max thresholds
     */
    private static scoreByCharCount(text: string, rule: CharCountRule): number {
        if (!text || typeof text !== 'string') return 0;

        const length = text.trim().length;

        // Perfect range
        if (length >= rule.min && (!rule.max || length <= rule.max)) {
            return 100;
        }

        // Below minimum - quadratic penalty for realism
        if (length < rule.min) {
            const ratio = length / rule.min;
            return Math.max(5, Math.round(ratio * ratio * 100));
        }

        // Above maximum - linear penalty (less harsh)
        if (rule.max && length > rule.max) {
            const excessRatio = (length - rule.max) / rule.max;
            const penalty = Math.min(40, excessRatio * 30); // Max 40% penalty
            return Math.max(60, 100 - penalty);
        }

        return 0;
    }

    /**
     * Score based on keyword matches
     */
    private static scoreByKeywords(text: string, rule: KeywordRule): number {
        if (!text || typeof text !== 'string') return 0;

        const lowerText = text.toLowerCase();
        const matches = rule.keywords.filter(keyword =>
            lowerText.includes(keyword.toLowerCase())
        ).length;

        if (matches === 0) return 0;

        // Award full points if meeting minimum matches, bonus for more
        if (matches >= rule.minMatches) {
            return Math.min(100, 80 + (matches - rule.minMatches) * 5);
        }

        // Partial credit if close to minimum
        return Math.round((matches / rule.minMatches) * 70);
    }

    /**
     * Score using AI with job-specific evaluation criteria
     */
    private static async scoreByAI(
        job: JobDefinition,
        question: Question,
        text: string,
        rule: AIRule,
    ): Promise<number> {
        if (!text || text.trim().length < 20) {
            console.log('Text too short for AI evaluation');
            return 0;
        }

        try {
            const prompt = this.buildAIPrompt(job, question, text, rule);

            const completion = await aiClient.chat.completions.create({
                model: rule.model || 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a strict technical recruiter. Output ONLY a single integer from 0 to 100. Be tough - scores above 80 are for exceptional candidates only.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.2, // Low temperature for consistency
                max_tokens: 10,   // Force concise response
            });

            const rawResponse = completion.choices?.[0]?.message?.content?.trim() || '0';
            const score = this.extractScore(rawResponse);
            const cappedScore = Math.min(rule.cap || 100, Math.max(0, score));

            console.log(`AI evaluation: "${rawResponse}" → ${cappedScore}`);

            return cappedScore;

        } catch (error) {
            console.error('AI scoring failed:', error);
            return 25; // Return low score on failure rather than 0
        }
    }

    /* ---------- Helper Methods ---------- */

    /**
     * Build AI evaluation prompt using job's evaluation criteria
     */
    private static buildAIPrompt(
        job: JobDefinition,
        question: Question,
        text: string,
        rule: AIRule,
    ): string {
        const relevantCriteria = rule.criteria
            .map(criteriaName => {
                const description = job.evaluationCriteria[criteriaName];
                return description ? `• ${criteriaName}: ${description}` : null;
            })
            .filter(Boolean)
            .join('\n');

        return [
            `Position: ${job.meta.title}`,
            '',
            'Requirements:',
            ...job.requirements.map(req => `• ${req}`),
            '',
            'Evaluation Criteria:',
            relevantCriteria,
            '',
            'Question: ' + question.label,
            '',
            'Candidate Response:',
            text,
            '',
            'Score this response from 0-100 based on the criteria above.',
            'Look for specific examples, technical depth, and evidence of real experience.',
            'Return only the numeric score.'
        ].join('\n');
    }

    /**
     * Extract numeric score from AI response
     */
    private static extractScore(response: string): number {
        const match = response.match(/\b(\d{1,3})\b/);
        if (!match) {
            console.warn(`No valid score found in: "${response}"`);
            return 0;
        }

        const score = parseInt(match[1], 10);
        return (score >= 0 && score <= 100) ? score : 0;
    }

    /**
     * Validate text fields with basic quality checks
     */
    private static validateText(text: string, question: Question): number {
        if (!text || typeof text !== 'string') return 0;

        const trimmed = text.trim();
        if (trimmed.length === 0) return 0;

        // Check validation rules
        const validation = question.validation;
        if (validation?.min && trimmed.length < validation.min) {
            return Math.max(20, (trimmed.length / validation.min) * 80);
        }

        // Type-specific validation
        switch (question.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(trimmed) ? 100 : 0;

            case 'url':
                try {
                    new URL(trimmed);
                    return 100;
                } catch {
                    return 0;
                }

            default:
                return 100;
        }
    }
}