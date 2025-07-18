// components/application/fields/RadioField.tsx
"use client";

import React from 'react';
import { FormQuestionConfig } from '~/lib/forms/form-types';
import AnimatedRadio from '~/components/ui/AnimatedRadio';

interface RadioFieldProps {
  field: FormQuestionConfig;
  value: any;
  onChange: (value: any) => void;
}

export default function RadioField({ field, value, onChange }: RadioFieldProps) {
  return (
    <div className="space-y-3">
      {field.options?.map((option: string, index: number) => (
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
}
