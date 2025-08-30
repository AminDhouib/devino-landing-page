// components/application/FormValidator.ts
import { FormQuestionConfig } from '~/lib/forms/form-types';

export class FormValidator {
  static validateField(field: FormQuestionConfig, value: any): string | null {
    if (field.required && (!value || (Array.isArray(value) && value.length === 0))) {
      return `${field.label} is required`;
    }
    
    if (field.fieldType === 'EMAIL' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    }
    
    if (field.fieldType === 'URL' && value) {
      try {
        new URL(value);
      } catch {
        return 'Please enter a valid URL';
      }
    }
    
    if (field.validation?.minLength && value && value.length < field.validation.minLength) {
      return `Minimum ${field.validation.minLength} characters required`;
    }
    
    if (field.validation?.maxLength && value && value.length > field.validation.maxLength) {
      return `Maximum ${field.validation.maxLength} characters allowed`;
    }
    
    if (field.validation?.min !== undefined && value < field.validation.min) {
      return `Minimum value is ${field.validation.min}`;
    }
    
    if (field.validation?.max !== undefined && value > field.validation.max) {
      return `Maximum value is ${field.validation.max}`;
    }
    
    return null;
  }

  static validateSection(fields: FormQuestionConfig[], formData: Record<string, any>): Record<string, string> {
    const errors: Record<string, string> = {};
    
    fields.forEach(field => {
      const error = FormValidator.validateField(field, formData[field.fieldKey]);
      if (error) {
        errors[field.fieldKey] = error;
      }
    });
    
    return errors;
  }

  static validateAllSections(sections: Array<{ questions: FormQuestionConfig[] }>, formData: Record<string, any>): Record<string, string> {
    const errors: Record<string, string> = {};
    
    sections.forEach(section => {
      const sectionErrors = FormValidator.validateSection(section.questions, formData);
      Object.assign(errors, sectionErrors);
    });
    
    return errors;
  }
}
