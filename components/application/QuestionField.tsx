// components/application/QuestionField.tsx
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdCloudUpload, MdClose, MdDescription } from 'react-icons/md';
import { FormQuestionConfig, QuestionType } from '~/lib/forms/form-types';
import AnimatedRadio from '~/components/ui/AnimatedRadio';
import AnimatedCheckbox from '~/components/ui/AnimatedCheckbox';
import UpupComponent from '~/components/UpupComponent';
import { FileWithParams } from 'upup-react-file-uploader';

interface QuestionFieldProps {
  field: FormQuestionConfig;
  value: string | string[] | number | boolean | File;
  error?: string;
  onChange: (value: string | string[] | number | boolean | File) => void;
  onFileUpload?: (file: File | null) => void;
  uploadedFile?: File;
  onUpupFilesChange?: (files: FileWithParams[]) => void;
  uploadedFileKey?: string;
}

export default function QuestionField({
  field,
  value,
  error,
  onChange,
  onFileUpload,
  uploadedFile,
  onUpupFilesChange,
  uploadedFileKey
}: QuestionFieldProps) {

  const [dragOver, setDragOver] = useState(false);
  const [upupFiles, setUpupFiles] = useState<FileWithParams[]>([]);

  const handleFileChange = (file: File | null) => {
    if (onFileUpload) {
      onFileUpload(file);
    }
    if (file) {
      onChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  const renderField = () => {
    switch (field.fieldType) {
      case QuestionType.TEXT:
      case QuestionType.EMAIL:
      case QuestionType.URL:
        return (
          <input
            type={field.fieldType.toLowerCase()}
            value={value as string || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className={`w-full px-3 py-2.5 border rounded-lg bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lightblueactive focus:border-transparent transition-all ${
              error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            required={field.required}
            minLength={field.validation?.minLength}
            maxLength={field.validation?.maxLength}
            pattern={field.validation?.pattern}
          />
        );

      case QuestionType.TEXTAREA:
        return (
          <textarea
            value={value as string || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className={`w-full px-3 py-2.5 border rounded-lg bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lightblueactive focus:border-transparent transition-all resize-vertical ${
              error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            required={field.required}
            minLength={field.validation?.minLength}
            maxLength={field.validation?.maxLength}
          />
        );

      case QuestionType.NUMBER:
        return (
          <input
            type="number"
            value={value as number || ''}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            placeholder={field.placeholder}
            min={field.validation?.min}
            max={field.validation?.max}
            className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lightblueactive ${
              error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            required={field.required}
          />
        );

      case QuestionType.SELECT:
        return (
          <select
            value={value as string || ''}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lightblueactive ${
              error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            required={field.required}
          >
            <option value="">Select an option...</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case QuestionType.MULTISELECT:
        const selectedValues = Array.isArray(value) ? value : [];
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 cursor-pointer group">
                <AnimatedCheckbox
                  checked={selectedValues.includes(option)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onChange([...selectedValues, option]);
                    } else {
                      onChange(selectedValues.filter(v => v !== option));
                    }
                  }}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-lightblueactive dark:group-hover:text-lightblueactive transition-colors leading-relaxed">{option}</span>
              </label>
            ))}
          </div>
        );

      case QuestionType.RADIO:
        return (
          <div className="space-y-3">
            {field.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 cursor-pointer group">
                <AnimatedRadio
                  name={field.fieldKey}
                  value={option}
                  checked={value === option}
                  onChange={(e) => onChange(e.target.value)}
                  required={field.required}
                />
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-lightblueactive dark:group-hover:text-lightblueactive transition-colors">
                  {option}
                </span>
              </label>
            ))}
          </div>
        );

      case QuestionType.CHECKBOX:
        return (
          <div className="space-y-3">
            {field.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 cursor-pointer group">
                <AnimatedCheckbox
                  value={option}
                  checked={Array.isArray(value) ? value.includes(option) : false}
                  onChange={(e) => {
                    const currentValues = Array.isArray(value) ? value : [];
                    if (e.target.checked) {
                      onChange([...currentValues, option]);
                    } else {
                      onChange(currentValues.filter(v => v !== option));
                    }
                  }}
                />
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-lightblueactive dark:group-hover:text-lightblueactive transition-colors">
                  {option}
                </span>
              </label>
            ))}
          </div>
        );

      case QuestionType.BOOLEAN:
        return (
          <label className="flex items-center space-x-3 cursor-pointer group">
            <AnimatedCheckbox
              checked={value as boolean || false}
              onChange={(e) => onChange(e.target.checked)}
              required={field.required}
            />
            <span className="text-gray-700 dark:text-gray-300 group-hover:text-lightblueactive dark:group-hover:text-lightblueactive transition-colors">{field.label}</span>
          </label>
        );

      case QuestionType.SCALE:
        const scaleValue = value as number;
        const minVal = field.validation?.min || 1;
        const maxVal = field.validation?.max || 10;
        
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-start space-x-4">
              {Array.from({ length: maxVal - minVal + 1 }, (_, i) => i + minVal).map((num) => (
                <label key={num} className="flex flex-col items-center space-y-2 cursor-pointer">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{num}</span>
                  <AnimatedRadio
                    name={field.fieldKey}
                    value={num.toString()}
                    checked={scaleValue === num}
                    onChange={(e) => onChange(parseInt(e.target.value))}
                    required={field.required}
                  />
                </label>
              ))}
            </div>
          </div>
        );

      case QuestionType.FILE:
        return (
          <div className="space-y-4">
            <UpupComponent
              isDocument={true}
              isProcessing={false}
              finalFiles={[]}
              rejectedFiles={[]}
              setFiles={(files: FileWithParams[]) => {
                setUpupFiles(files);
                if (onUpupFilesChange) {
                  onUpupFilesChange(files);
                }
                // For now, store the file id as the value
                if (files.length > 0) {
                  onChange(files[0].id);
                }
              }}
              onFileRemove={(file: FileWithParams) => {
                const updatedFiles = upupFiles.filter(f => f.id !== file.id);
                setUpupFiles(updatedFiles);
                if (onUpupFilesChange) {
                  onUpupFilesChange(updatedFiles);
                }
                if (updatedFiles.length === 0) {
                  onChange('');
                }
              }}
              doneUploading={(files: FileWithParams[]) => {
                setUpupFiles(files);
                if (onUpupFilesChange) {
                  onUpupFilesChange(files);
                }
                // Store the file identifier
                if (files.length > 0) {
                  onChange(files[0].id);
                }
              }}
            />
            
            {uploadedFileKey && (
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <MdDescription className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-green-700 dark:text-green-300">
                    File uploaded: {uploadedFileKey}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setUpupFiles([]);
                    onChange('');
                    if (onUpupFilesChange) {
                      onUpupFilesChange([]);
                    }
                  }}
                  className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
                >
                  <MdClose className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        );

      case QuestionType.DATE:
        return (
          <input
            type="date"
            value={value as string || ''}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lightblueactive ${
              error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            required={field.required}
          />
        );

      case QuestionType.GRID:
        // Multi-choice grid - Google Forms style
        const gridValues = (value as any) || {};
        const gridOptions = field.options || [];
        const gridColumns = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
        
        return (
          <div className="space-y-4">
            {/* Header row */}
            <div className="grid grid-cols-[2fr_repeat(5,1fr)] gap-4 items-center pb-2 border-b border-gray-200 dark:border-gray-600">
              <div></div>
              {gridColumns.map((column: string) => (
                <div key={column} className="text-xs text-center text-gray-600 dark:text-gray-400 font-medium">
                  {column}
                </div>
              ))}
            </div>
            
            {/* Grid rows */}
            {gridOptions.map((option, index) => (
              <div key={index} className="grid grid-cols-[2fr_repeat(5,1fr)] gap-4 items-center py-2">
                <div className="text-sm text-gray-700 dark:text-gray-300 pr-4">
                  {option}
                </div>
                {gridColumns.map((column: string) => (
                  <div key={column} className="flex justify-center">
                    <AnimatedRadio
                      name={`${field.fieldKey}_${index}`}
                      value={column}
                      checked={gridValues[option] === column}
                      onChange={(e) => {
                        const newValues = { ...gridValues };
                        newValues[option] = e.target.value;
                        onChange(newValues as any);
                      }}
                      required={field.required}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        );

      case QuestionType.DISPLAY:
        // Display HTML content - no input needed
        if (field.description && typeof field.description === 'object' && field.description.type === 'html') {
          return (
            <div 
              className="prose prose-sm max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: field.description.content }}
            />
          );
        }
        // Handle string description or other rich content types
        const displayContent = typeof field.description === 'string' 
          ? field.description 
          : field.description?.content || field.label;
        
        return (
          <div className="text-gray-700 dark:text-gray-300">
            {displayContent}
          </div>
        );

      default:
        return (
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400">
              Unsupported field type: {field.fieldType}
            </p>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <div>
        {field.fieldType !== QuestionType.DISPLAY && (
          <label className="block text-base lg:text-sm font-medium text-gray-900 dark:text-white mb-2">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        {field.description && field.fieldType !== QuestionType.DISPLAY && (
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
            {typeof field.description === 'string' ? (
              <p>{field.description}</p>
            ) : field.description?.type === 'html' ? (
              <div dangerouslySetInnerHTML={{ __html: field.description.content }} />
            ) : (
              <p>{typeof field.description === 'object' ? field.description.content : field.description}</p>
            )}
          </div>
        )}
        
        {renderField()}
        
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-sm text-red-600 dark:text-red-400"
          >
            {error}
          </motion.p>
        )}
        
        {/* Character count for text areas */}
        {field.fieldType === QuestionType.TEXTAREA && field.validation?.minLength && (
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {(value as string)?.length || 0} / {field.validation?.maxLength || 'unlimited'} characters
            {field.validation?.minLength && (value as string)?.length < field.validation.minLength && (
              <span className="text-red-500 ml-2">
                (Minimum {field.validation.minLength} characters required)
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
