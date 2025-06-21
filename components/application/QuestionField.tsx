// components/application/QuestionField.tsx
"use client";

import { useRef } from "react";
import { MdError, MdUpload, MdClose, MdDescription } from "react-icons/md";
import { FormQuestion } from "~/types/application";
import RadioOption from "./RadioOption";
import CheckboxOption from "./CheckboxOption";
import FileUpload from "./FileUpload";

interface QuestionFieldProps {
    question: FormQuestion;
    value: string | string[] | File;
    onChange: (value: string | string[] | File) => void;
    error?: string;
    onFileUpload?: (file: File | null) => void;
    uploadedFile?: File;
}

export default function QuestionField({
                                          question,
                                          value,
                                          onChange,
                                          error,
                                          onFileUpload,
                                          uploadedFile
                                      }: QuestionFieldProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        onFileUpload?.(file);
    };

    const removeFile = () => {
        onFileUpload?.(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const baseInputClasses = `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lightblueactive focus:border-lightblueactive dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-colors ${
        error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600'
    }`;

    const renderField = () => {
        switch (question.type) {
            case "text":
            case "email":
            case "tel":
            case "url":
                return (
                    <input
                        type={question.type}
                        value={value as string}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={question.placeholder}
                        className={baseInputClasses}
                    />
                );

            case "textarea":
                return (
                    <textarea
                        value={value as string}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={question.placeholder}
                        rows={4}
                        className={`${baseInputClasses} resize-vertical min-h-[100px]`}
                    />
                );

            case "select":
                return (
                    <select
                        value={value as string}
                        onChange={(e) => onChange(e.target.value)}
                        className={baseInputClasses}
                    >
                        <option value="">Select an option...</option>
                        {question.options?.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                );

            case "radio":
                return (
                    <div className="space-y-3">
                        {question.options?.map((option) => (
                            <RadioOption
                                key={option}
                                option={option}
                                selected={value === option}
                                questionId={question.id}
                                onChange={() => onChange(option)}
                            />
                        ))}
                    </div>
                );

            case "multiselect":
                const selectedValues = Array.isArray(value) ? value : [];
                return (
                    <div className="space-y-2">
                        {question.options?.map((option) => (
                            <CheckboxOption
                                key={option}
                                option={option}
                                selected={selectedValues.includes(option)}
                                onChange={(checked) => {
                                    if (checked) {
                                        onChange([...selectedValues, option]);
                                    } else {
                                        onChange(selectedValues.filter(v => v !== option));
                                    }
                                }}
                            />
                        ))}
                    </div>
                );

            case "file":
                return (
                    <FileUpload
                        question={question}
                        uploadedFile={uploadedFile}
                        onFileSelect={handleFileSelect}
                        onFileRemove={removeFile}
                        fileInputRef={fileInputRef}
                        error={!!error}
                    />
                );

            case "number":
                return (
                    <input
                        type="number"
                        value={value as string}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={question.placeholder}
                        min={question.validation?.min}
                        max={question.validation?.max}
                        className={baseInputClasses}
                    />
                );

            case "date":
                return (
                    <input
                        type="date"
                        value={value as string}
                        onChange={(e) => onChange(e.target.value)}
                        className={baseInputClasses}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {question.label}
                {question.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {question.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {question.description}
                </p>
            )}

            {renderField()}

            {error && (
                <div className="flex items-center space-x-2 text-red-500 text-sm">
                    <MdError className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {question.validation?.min && question.type === "textarea" && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {typeof value === 'string' ? value.length : 0} / {question.validation.min}+ characters
                </p>
            )}
        </div>
    );
}