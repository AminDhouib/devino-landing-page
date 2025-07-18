// lib/forms/form-types.ts
// TypeScript definitions for the job application form system

// Enum matching Prisma schema
export enum QuestionType {
  TEXT = 'TEXT',
  EMAIL = 'EMAIL',
  URL = 'URL',
  TEXTAREA = 'TEXTAREA',
  NUMBER = 'NUMBER',
  SELECT = 'SELECT',
  MULTISELECT = 'MULTISELECT',
  RADIO = 'RADIO',
  CHECKBOX = 'CHECKBOX',
  BOOLEAN = 'BOOLEAN',
  FILE = 'FILE',
  DATE = 'DATE',
  SCALE = 'SCALE',
  GRID = 'GRID',
}

export enum FormStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum ApplicationStatus {
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  SHORTLISTED = 'SHORTLISTED',
  INTERVIEWED = 'INTERVIEWED',
  REJECTED = 'REJECTED',
  HIRED = 'HIRED',
  WITHDRAWN = 'WITHDRAWN',
}

// Form configuration interfaces
export interface FormQuestionConfig {
  id?: string;
  fieldKey: string;
  fieldType: QuestionType;
  label: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  order?: number;
  
  // Validation stored as JSON
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    fileTypes?: string[];
    maxFileSize?: number; // MB
  };
  
  // Options for select/radio/checkbox
  options?: string[];
  
  // Scoring configuration
  weight?: number;
  scoreType?: 'COMPLETION' | 'WEIGHTED' | 'AI_SCORED';
  scoring?: {
    type?: 'ai' | 'keyword' | 'scale' | 'weighted';
    prompt?: string;
    keywords?: string[];
    criteria?: string[];
  };
}

export interface FormSectionConfig {
  id?: string;
  title: string;
  description?: string;
  order?: number;
  richContent?: {
    type: 'html' | 'markdown' | 'component';
    content: string;
    componentId?: string; // for custom component references
  };
  questions: FormQuestionConfig[];
}

export interface FormConfig {
  id?: string;
  positionId: string;
  title: string;
  description?: string;
  status?: FormStatus;
  sections: FormSectionConfig[];
}

// Application submission types
export interface FormSubmissionData {
  formId: string;
  email: string;
  name?: string;
  answers: Record<string, any>; // JSON values
  files?: Record<string, File>;
}

export interface ApplicationData {
  id: string;
  formId: string;
  email: string;
  name?: string;
  status: ApplicationStatus;
  score?: number;
  aiAnalysis?: any;
  answers: FormAnswerData[];
  files: ApplicationFileData[];
  reviewNotes?: string;
  reviewedBy?: string;
  reviewedAt?: Date;
  submittedAt: Date;
  updatedAt: Date;
}

export interface FormAnswerData {
  id: string;
  questionId: string;
  question: FormQuestionConfig;
  value: any; // JSON value
  score?: number;
  createdAt: Date;
}

export interface ApplicationFileData {
  id: string;
  questionKey: string;
  originalName: string;
  fileName: string;
  filePath: string;
  mimeType: string;
  fileSize: number;
  uploadedAt: Date;
}
