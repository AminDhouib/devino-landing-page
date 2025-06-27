import { aiClient } from './aiClient';
import {
    ApplicationConfig,
    ApplicationResponse,
    FormQuestion,
    SmartWeight,
    WeightAIRule,
    WeightCharRule,
} from '~/types/application';

export class ApplicationScorer {
    /**
     * Asynchronous because AI questions require an API call.
     */
    static async calculateScore(
        responses: ApplicationResponse[],
        config: ApplicationConfig,
    ): Promise<number> {
        let totalWeight = 0;
        let earnedPoints = 0;

        for (const section of config.sections) {
            for (const question of section.questions) {
                const response = responses.find(r => r.questionId === question.id);
                const rule: SmartWeight = question.weight;

                // Every rule carries a numeric `value` we add to the denominator.
                const weightValue = typeof rule === 'number' ? rule : rule.value;
                totalWeight += weightValue;

                if (!response || response.value === undefined || response.value === null) continue;

                const pct = await this.scoreQuestion(question, response, rule);
                earnedPoints += (pct * weightValue) / 100;
            }
        }

        return totalWeight ? Math.round((earnedPoints / totalWeight) * 100) : 0;
    }

    private static async scoreQuestion(
        question: FormQuestion,
        response: ApplicationResponse,
        rule: SmartWeight,
    ): Promise<number> {
        if (typeof rule === 'number') {
            // Classic behaviour – reuse existing logic.
            return this.basicScore(question, response);
        }

        switch (rule.type) {
            case 'char':
                return this.scoreByCharacters(response.value as string, rule);
            case 'ai':
                return this.scoreByAI(response.value as string, rule);
            default:
                return this.basicScore(question, response);
        }
    }

    /* ---------- new scoring modes ---------- */

    private static scoreByCharacters(answer: string, rule: WeightCharRule): number {
        if (!answer) return 0;
        const len = answer.trim().length;
        if (len >= rule.min && (!rule.max || len <= rule.max)) return 100;

        // Linear fall‑off below min or above max.
        if (len < rule.min) return Math.max(10, (len / rule.min) * 100);
        if (rule.max && len > rule.max) return Math.max(10, (rule.max / len) * 100);
        return 0;
    }

    private static async scoreByAI(answer: string, rule: WeightAIRule): Promise<number> {
        try {
            const prompt = rule.prompt.replace('{{answer}}', answer);
            const completion = await aiClient.chat.completions.create({
                model: rule.model ?? 'gpt-4o',
                messages: [
                    {
                        role: 'system',
                        content:
                            [
                                'You are a strict evaluator.',
                                'Output only a single integer from 0 to 100.',
                                'If the answer is off-topic, generic, or meaningless, output 0.',
                            ].join(' '),
                    },
                    { role: 'user', content: prompt },
                ],
            });

            const raw = (completion.choices?.[0]?.message?.content ?? '').trim();
            const numeric = Number(raw.match(/\d+/)?.[0] ?? 0);
            const capped = Math.min(rule.maxScore ?? 100, Math.max(0, numeric));
            console.log('answer', answer)
            console.log(`AI scoring for "${rule.prompt}" returned: ${capped} (raw: ${raw})`);
            return capped;
        } catch (err) {
            console.error('AI scoring failed', err);
            return 0;
        }
    }

    /* ---------- legacy scoring kept intact ---------- */

    private static basicScore(question: FormQuestion, response: ApplicationResponse): number {
        if (!response.value) return 0;

        switch (question.type) {
            case 'text':
            case 'email':
            case 'tel':
            case 'url':
                return this.scoreText(question, response.value as string);
            case 'select':
            case 'radio':
                return this.scoreSelect(question, response.value as string);
            case 'multiselect':
                return this.scoreMultiSelect(question, response.value as string[]);
            case 'textarea':
                return this.scoreTextArea(question, response.value as string);
            case 'file':
                return 100;
            case 'number':
                return this.scoreNumber(question, Number(response.value));
            default:
                return 0;
        }
    }

    private static scoreText(question: FormQuestion, value: string) {
        if (!value.trim()) return 0;
        if (question.validation?.min && value.length < question.validation.min) return 50;
        return 100;
    }

    private static scoreSelect(question: FormQuestion, value: string) {
        if (!value) return 0;
        const index = question.options?.indexOf(value) ?? 0;
        const count = question.options?.length ?? 1;
        if (question.id.includes('experience') || question.id.includes('years')) {
            return Math.max(20, (index / (count - 1)) * 100);
        }
        return 100;
    }

    private static scoreMultiSelect(question: FormQuestion, values: string[]) {
        if (!values?.length) return 0;
        const maxRelevant = Math.min(question.options?.length ?? 1, 8);
        const pct = Math.min(100, (values.length / maxRelevant) * 100);
        return Math.max(20, pct);
    }

    private static scoreTextArea(question: FormQuestion, value: string) {
        if (!value.trim()) return 0;
        const words = value.trim().split(/\s+/).length;
        const min = question.validation?.min ? question.validation.min / 5 : 20;
        const max = question.validation?.max ? question.validation.max / 5 : 200;
        if (words < min) return 30;
        if (words > max) return 80;
        let score = 70;
        if (words >= min && words <= max) score += 20;
        if (value.includes('\n') || value.includes('•') || /\d+\./.test(value)) score += 10;
        return Math.min(100, score);
    }

    private static scoreNumber(question: FormQuestion, value: number) {
        if (isNaN(value)) return 0;
        if (question.validation?.min && value < question.validation.min) return 20;
        if (question.validation?.max && value > question.validation.max) return 20;
        return 100;
    }
}
