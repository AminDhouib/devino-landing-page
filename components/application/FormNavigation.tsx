// components/application/FormNavigation.tsx
"use client";

import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

interface FormNavigationProps {
  currentSection: number;
  totalSections: number;
  isSubmitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export default function FormNavigation({
  currentSection,
  totalSections,
  isSubmitting,
  onPrevious,
  onNext,
  onSubmit
}: FormNavigationProps) {
  const isFirstSection = currentSection === 0;
  const isLastSection = currentSection === totalSections - 1;

  return (
    <div className="flex justify-between items-center pt-6 lg:pt-4 border-t border-gray-200 dark:border-gray-700">
      <div className="flex-1">
        {!isFirstSection && (
          <button
            onClick={onPrevious}
            disabled={isSubmitting}
            className="flex items-center justify-center px-6 py-3 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white font-medium rounded-full transition-colors disabled:cursor-not-allowed"
          >
            <FaArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
        )}
      </div>

      <div className="flex-1 flex justify-end">
        {isLastSection ? (
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="px-6 py-3 bg-[#01204c] hover:bg-[#193a6a] disabled:bg-gray-400 text-white font-medium rounded-full transition-colors disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        ) : (
          <button
            onClick={onNext}
            disabled={isSubmitting}
            className="flex items-center justify-center px-6 py-3 bg-[#01204c] hover:bg-[#193a6a] disabled:bg-gray-400 text-white font-medium rounded-full transition-colors disabled:cursor-not-allowed"
          >
            Next
            <FaArrowRight className="w-4 h-4 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}
