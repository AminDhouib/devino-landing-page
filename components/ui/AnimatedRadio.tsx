// components/ui/AnimatedRadio.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedRadioProps {
  id?: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function AnimatedRadio({
  id,
  name,
  value,
  checked,
  onChange,
  required = false,
  className = "",
  disabled = false
}: AnimatedRadioProps) {
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="sr-only"
      />
      <motion.div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-200 ${
          checked
            ? 'border-darkblue bg-darkblue'
            : 'border-gray-300 dark:border-gray-600 hover:border-darkblue'
        } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
        whileHover={!disabled ? { scale: 1.1 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
      >
        <motion.div
          className="w-2.5 h-2.5 bg-white rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: checked ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.div>
    </div>
  );
}
