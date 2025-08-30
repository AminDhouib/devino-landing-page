// components/application/fields/CheckboxField.tsx
"use client";

import React from 'react';
import { FormQuestionConfig } from '~/lib/forms/form-types';
import AnimatedCheckbox from '~/components/ui/AnimatedCheckbox';

interface CheckboxFieldProps {
  field: FormQuestionConfig;
  value: any;
  onChange: (value: any) => void;
}

export default function CheckboxField({ field, value, onChange }: CheckboxFieldProps) {
  return (
    <div className="space-y-3">
      {field.options?.map((option: string, index: number) => (
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
}
