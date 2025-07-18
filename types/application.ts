// Question kinds we support
export type QuestionType =
    | 'text'
    | 'email'
    | 'tel'
    | 'select'
    | 'multiselect'
    | 'textarea'
    | 'file'
    | 'number'
    | 'date'
    | 'url'
    | 'checkbox'
    | 'radio';

/* ---------- smart weight definitions ---------- */

// simple numeric weight
export type WeightSimple = number;

// character‑count based rule
export interface WeightCharRule {
    type: 'char';
    value: number; // weight in global score
    min: number;   // chars needed for 100 pct
    max?: number;  // optional upper soft limit
}

// AI evaluated rule
export interface WeightAIRule {
    type: 'ai';
    value: number;     // weight in global score
    prompt: string;    // must contain {{answer}}
    model?: string;    // default model if omitted
    maxScore?: number; // cap returned score, default 100
}

export type SmartWeight = WeightSimple | WeightCharRule | WeightAIRule;

/* ---------- form types ---------- */

export interface FormQuestion {
    id: string;
    type: QuestionType;
    label: string;
    placeholder?: string;
    required: boolean;
    description?: string;
    options?: string[];
    validation?: {
        min?: number;
        max?: number;
        pattern?: string;
        fileTypes?: string[];
        maxFileSize?: number; // MB
    };
    conditionalDisplay?: {
        questionId: string;
        value: string | string[];
    };
    weight: SmartWeight;
}

export interface FormSection {
    id: string;
    title: string;
    description?: string;
    questions: FormQuestion[];
}

export interface ApplicationConfig {
    positionId: string;
    positionTitle: string;
    sections: FormSection[];
    requiredDocuments: string[];
}

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
