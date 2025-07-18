// components/application/FormProgress.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MdSave, MdDelete } from 'react-icons/md';

interface FormProgressProps {
  progress: number;
  currentSection: number;
  totalSections: number;
  currentSectionTitle: string;
  hasSavedData: boolean;
  lastSaved: Date | null;
  onClearDraft: () => void;
}

export default function FormProgress({
  progress,
  currentSection,
  totalSections,
  currentSectionTitle,
  hasSavedData,
  lastSaved,
  onClearDraft
}: FormProgressProps) {
  return (
    <div className="px-6 lg:px-4 py-4 lg:py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
      <div className="flex justify-between items-center text-sm mb-2">
        <span className="text-gray-600 dark:text-gray-400 font-medium">Progress</span>
        <div className="flex items-center gap-4">
          <span className="text-lightblueactive font-semibold text-sm">{Math.round(progress)}% Complete</span>
          
          {/* Auto-save indicator */}
          {hasSavedData && (
            <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
              <MdSave className="w-3 h-3" />
              <span className="text-xs">
                {lastSaved ? `Saved ${lastSaved.toLocaleTimeString()}` : 'Draft saved'}
              </span>
            </div>
          )}
          
          {/* Clear draft button */}
          {hasSavedData && (
            <button
              onClick={onClearDraft}
              className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
              title="Clear saved draft"
            >
              <MdDelete className="w-3 h-3" />
              <span>Clear Draft</span>
            </button>
          )}
        </div>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <motion.div
          className="bg-lightblueactive rounded-full h-2"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 font-medium">
        Section {currentSection + 1} of {totalSections}: {currentSectionTitle}
      </div>
    </div>
  );
}
