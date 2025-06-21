// types/application.ts
export type QuestionType =
    | "text"
    | "email"
    | "tel"
    | "select"
    | "multiselect"
    | "textarea"
    | "file"
    | "number"
    | "date"
    | "url"
    | "checkbox"
    | "radio";

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
        maxFileSize?: number; // in MB
    };
    conditionalDisplay?: {
        questionId: string;
        value: string | string[];
    };
    weight?: number; // For scoring system
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
    scoringThreshold: number; // 0-100
    autoEmailThreshold: number; // 0-100
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
    status: "pending" | "reviewed" | "shortlisted" | "rejected";
}