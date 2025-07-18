// components/application/ApplicationForm.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuestionField from './QuestionField';
import FormProgress from './FormProgress';
import FormNavigation from './FormNavigation';
import SuccessMessage from './SuccessMessage';
import { FormValidator } from './FormValidator';
import { FormConfig, FormQuestionConfig } from '~/lib/forms/form-types';
import { jobs } from '~/data/jobs';

interface ApplicationFormProps {
  formConfig?: FormConfig;
  positionId?: string;
  onSubmit?: (data: Record<string, any>, files: Record<string, File>) => void;
  isSubmitting?: boolean;
  submitSuccess?: boolean;
}

export default function ApplicationForm({
  formConfig = jobs.find(j => j.id === 'ai-data-engineer')?.formConfig || jobs[0].formConfig,
  positionId = 'ai-data-engineer',
  onSubmit,
  isSubmitting = false,
  submitSuccess = false
}: ApplicationFormProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [formFiles, setFormFiles] = useState<Record<string, File>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [progress, setProgress] = useState(0);
  const [hasSavedData, setHasSavedData] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const sections = formConfig.sections;
  const currentSectionData = sections[currentSection];
  
  // Storage key for this specific position
  const storageKey = `application_form_${positionId}`;
  const filesStorageKey = `application_files_${positionId}`;

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
        setHasSavedData(true);
      } catch (error) {
        console.warn('Failed to parse saved form data:', error);
      }
    }
  }, [storageKey]);

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(formData));
      setLastSaved(new Date());
      setHasSavedData(true);
    }
  }, [formData, storageKey]);

  // Calculate progress
  useEffect(() => {
    const totalFields = sections.reduce((total, section) => total + section.questions.length, 0);
    const filledFields = Object.keys(formData).length;
    setProgress((filledFields / totalFields) * 100);
  }, [formData, sections]);

  const handleFieldChange = (fieldKey: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldKey]: value }));
    // Clear error when user starts typing
    if (errors[fieldKey]) {
      setErrors(prev => ({ ...prev, [fieldKey]: '' }));
    }
  };

  const handleFileUpload = (fieldKey: string, file: File | null) => {
    if (file) {
      setFormFiles(prev => ({ ...prev, [fieldKey]: file }));
    } else {
      setFormFiles(prev => {
        const newFiles = { ...prev };
        delete newFiles[fieldKey];
        return newFiles;
      });
    }
  };

  const clearDraft = () => {
    if (confirm('Are you sure you want to clear all saved data? This action cannot be undone.')) {
      localStorage.removeItem(storageKey);
      localStorage.removeItem(filesStorageKey);
      setFormData({});
      setFormFiles({});
      setHasSavedData(false);
      setLastSaved(null);
      setCurrentSection(0);
    }
  };

  const handleNext = () => {
    // Validate only current section
    const currentErrors = FormValidator.validateSection(currentSectionData.questions, formData);

    if (Object.keys(currentErrors).length > 0) {
      // Only set errors for current section fields, clear others
      setErrors(currentErrors);
      return;
    }

    // Clear all errors when moving to next section
    setErrors({});
    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    // Clear errors when going back
    setErrors({});
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    // Validate all sections
    const allErrors = FormValidator.validateAllSections(sections, formData);

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      // Go to first section with errors
      for (let i = 0; i < sections.length; i++) {
        const hasError = sections[i].questions.some(field => allErrors[field.fieldKey]);
        if (hasError) {
          setCurrentSection(i);
          break;
        }
      }
      return;
    }

    // Submit to API
    if (onSubmit) {
      onSubmit(formData, formFiles);
    }
  };

  if (submitSuccess) {
    return <SuccessMessage />;
  }

  return (
    <div className="relative">
      <FormProgress
        progress={progress}
        currentSection={currentSection}
        totalSections={sections.length}
        currentSectionTitle={currentSectionData.title}
        hasSavedData={hasSavedData}
        lastSaved={lastSaved}
        onClearDraft={clearDraft}
      />

      {/* Form Content */}
      <div className="min-h-[500px] lg:min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="p-5 lg:p-4"
          >
            <div className="space-y-5 lg:space-y-4 md:space-y-3">
              <div>
                <h3 className="text-xl lg:text-lg md:text-base font-semibold text-darkblue dark:text-white mb-2">
                  {currentSectionData.title}
                </h3>
                {currentSectionData.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {currentSectionData.description}
                  </p>
                )}
                {currentSectionData.richContent && (
                  <div className="mb-4">
                    {currentSectionData.richContent.type === 'html' && (
                      <div 
                        className="prose prose-sm max-w-none dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: currentSectionData.richContent.content }}
                      />
                    )}
                    {currentSectionData.richContent.type === 'markdown' && (
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        {/* TODO: Add markdown parser when needed */}
                        <p>{currentSectionData.richContent.content}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-5 lg:space-y-4 md:space-y-3">
                {currentSectionData.questions.map((field) => (
                  <QuestionField
                    key={field.fieldKey}
                    field={field}
                    value={formData[field.fieldKey] || ''}
                    error={errors[field.fieldKey]}
                    onChange={(value) => handleFieldChange(field.fieldKey, value)}
                    onFileUpload={
                      field.fieldType === 'FILE'
                        ? (file) => handleFileUpload(field.fieldKey, file)
                        : undefined
                    }
                    uploadedFile={formFiles[field.fieldKey]}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer with Navigation */}
      <div className="px-5 lg:px-4 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <FormNavigation
          currentSection={currentSection}
          totalSections={sections.length}
          isSubmitting={isSubmitting}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
        />
      </div>

      {/* Error Display */}
      {Object.keys(errors).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-6 lg:mx-4 mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
        >
          <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2 text-sm">
            Please fix the following errors:
          </h3>
          <ul className="text-sm text-red-700 dark:text-red-400 space-y-1 leading-relaxed">
            {Object.entries(errors).map(([fieldKey, error]) => {
              const field = sections
                .flatMap(s => s.questions)
                .find(f => f.fieldKey === fieldKey);
              return (
                <li key={fieldKey}>
                  <strong>{field?.label}:</strong> {error}
                </li>
              );
            })}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
