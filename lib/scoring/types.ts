// lib/scoring/types.ts

/** ---------- Question & Form Types ---------- */
export type QuestionType =
    | 'text' | 'email' | 'tel' | 'url'
    | 'select' | 'radio' | 'multiselect'
    | 'textarea' | 'file' | 'number' | 'date';

export interface Question {
    id: string;
    label: string;
    description?: string;
    type: QuestionType;
    placeholder?: string;
    options?: string[];
    validation?: {
        min?: number;
        max?: number;
        pattern?: string;
        fileTypes?: string[];
        maxFileSize?: number; // MB
    };
    required: boolean;
    weight: WeightRule;
}

/** ---------- Weight Rules ---------- */
export type WeightRule =
    | number                // Simple fixed weight
    | CharCountRule         // Score based on character count
    | KeywordRule          // Score based on keyword matches
    | AIRule;              // Score using AI with evaluation criteria

export interface CharCountRule {
    kind: 'char';
    value: number;         // Weight in overall score
    min: number;           // Characters needed for 100%
    max?: number;          // Optional upper limit
}

export interface KeywordRule {
    kind: 'keyword';
    value: number;         // Weight in overall score
    keywords: string[];    // Required keywords to match
    minMatches: number;    // Minimum matches for full score
}

export interface AIRule {
    kind: 'ai';
    value: number;         // Weight in overall score
    criteria: string[];    // Which evaluation criteria to use (references job.evaluationCriteria)
    cap?: number;          // Optional score cap (default 100)
    model?: string;        // Optional model override
}

/** ---------- Job Definition ---------- */
export interface JobMeta {
    title: string;
    department: string;
    type: 'Full-time' | 'Part-time' | 'Contract';
    level: 'Junior' | 'Mid' | 'Senior' | 'Lead';
    location: string;
    description: string;
    featured?: boolean;
}

export interface JobDefinition {
    id: string;
    meta: JobMeta;
    requirements: string[];           // Job requirements
    benefits: string[];              // Company benefits
    skills: string[];                // Required/preferred skills
    evaluationCriteria: Record<string, string>;  // AI evaluation criteria
    form: Question[];                // Application form questions
}

/** ---------- Application Types ---------- */
export interface ApplicationResponse {
    questionId: string;
    value: string | string[] | File;
}

export interface ApplicationSubmission {
    id: string;
    positionId: string;
    applicantEmail: string;
    responses: ApplicationResponse[];
    score: number;
    submittedAt: Date;
    status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
}