// components/application/fields/ScaleField.tsx
"use client";

import React from 'react';
import { FormQuestionConfig } from '~/lib/forms/form-types';
import AnimatedRadio from '~/components/ui/AnimatedRadio';

interface ScaleFieldProps {
  field: FormQuestionConfig;
  value: any;
  onChange: (value: any) => void;
}

export default function ScaleField({ field, value, onChange }: ScaleFieldProps) {
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
}
