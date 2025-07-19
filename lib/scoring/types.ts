/* eslint-disable */
// THIS FILE IS AUTO‑GENERATED. Edit with caution.

/** -----------------------------------------------------------------
 * Rich‑text helper — supports plain strings or HTML blocks
 * ----------------------------------------------------------------- */
export type RichText =
    | string
    | { type: 'html' | 'text'; content: string };

/** -----------------------------------------------------------------
 * Question & Form Types
 * ----------------------------------------------------------------- */
export type QuestionType =
    | 'text'
    | 'email'
    | 'tel'
    | 'url'
    | 'select'
    | 'radio'
    | 'multiselect'
    | 'textarea'
    | 'file'
    | 'number'
    | 'date'
    | 'display';            // non‑interactive information block

export interface Question {
    id: string;
    label: string;
    /** Plain string or rich HTML snippet */
    description?: RichText;
    type: QuestionType;
    placeholder?: string;
    options?: string[];
    validation?: {
        min?: number;
        max?: number;
        pattern?: string;
        /** Allowed extensions (e.g. .pdf) – only for file uploads */
        fileTypes?: string[];
        /** Maximum file size in MB – only for file uploads */
        maxFileSize?: number;
    };
    required: boolean;
    /** Scoring rule (see below) */
    weight: WeightRule;
}

/** -----------------------------------------------------------------
 * Weight / Scoring Rules
 * ----------------------------------------------------------------- */
export type WeightRule =
    | number             // fixed weight
    | CharCountRule      // score by answer length
    | KeywordRule        // score by keyword matches
    | AIRule;            // score via AI model

export interface CharCountRule {
    kind: 'char';
    value: number;       // weight in overall score
    min: number;         // length for 100 %
    max?: number;        // optional upper limit
}

export interface KeywordRule {
    kind: 'keyword';
    value: number;       // weight in overall score
    keywords: string[];  // required keywords
    minMatches: number;  // matches for full score
}

export interface AIRule {
    kind: 'ai';
    value: number;       // weight in overall score
    /** Which evaluationCriteria keys to feed the model */
    criteria: string[];
    /** Optional maximum raw score (default 100) */
    cap?: number;
    /** Optional model override (e.g. 'gpt-4o') */
    model?: string;
}

/** -----------------------------------------------------------------
 * Job Definition
 * ----------------------------------------------------------------- */
export interface JobMeta {
    title: string;
    department: string;
    type: 'Full-time' | 'Part-time' | 'Contract';
    level: 'Junior' | 'Mid' | 'Senior' | 'Lead';
    location: string;
    /** Long‑form description — supports HTML */
    description: RichText;
    featured?: boolean;
}

export interface JobDefinition {
    id: string;
    meta: JobMeta;
    requirements: string[];                     // bullet list
    benefits: string[];                         // bullet list
    skills: string[];                           // key‑word list
    evaluationCriteria: Record<string, string>; // AI rubric
    form: Question[];                           // legacy array
}

/** -----------------------------------------------------------------
 * Application / Submission
 * ----------------------------------------------------------------- */
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
