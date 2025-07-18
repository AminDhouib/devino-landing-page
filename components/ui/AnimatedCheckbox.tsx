// components/ui/AnimatedCheckbox.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MdCheck } from 'react-icons/md';

interface AnimatedCheckboxProps {
  id?: string;
  name?: string;
  value?: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function AnimatedCheckbox({
  id,
  name,
  value,
  checked,
  onChange,
  required = false,
  className = "",
  disabled = false
}: AnimatedCheckboxProps) {
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <input
        id={id}
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="sr-only"
      />
      <motion.div
        className={`w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer transition-all duration-200 ${
          checked
            ? 'border-darkblue bg-darkblue'
            : 'border-gray-300 dark:border-gray-600 hover:border-darkblue'
        } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
        whileHover={!disabled ? { scale: 1.1 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: checked ? 1 : 0,
            opacity: checked ? 1 : 0
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <MdCheck className="w-3 h-3 text-white" />
        </motion.div>
      </motion.div>
    </div>
  );
}
