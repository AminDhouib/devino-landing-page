// components/application/SuccessMessage.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MdCheckCircle } from 'react-icons/md';

export default function SuccessMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 lg:p-6"
    >
      <div className="w-16 h-16 lg:w-14 lg:h-14 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6 lg:mb-4">
        <MdCheckCircle className="w-8 h-8 lg:w-7 lg:h-7 text-green-600 dark:text-green-400" />
      </div>
      <h2 className="text-2xl lg:text-xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-3">
        Application Submitted Successfully!
      </h2>
      <p className="text-base lg:text-sm text-gray-600 dark:text-gray-400 mb-6 lg:mb-4 max-w-md leading-relaxed">
        Thank you for your interest in joining our team. We&apos;ll review your application and get back to you soon.
      </p>
      <div className="bg-lightblueactive/10 border border-lightblueactive/20 rounded-lg p-4 lg:p-3 max-w-md">
        <p className="text-sm text-lightblueactive font-semibold mb-2">
          What happens next?
        </p>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 text-left leading-relaxed">
          <li>• Our team will review your application within 3-5 business days</li>
          <li>• If you&apos;re a good fit, we&apos;ll reach out to schedule an interview</li>
          <li>• You&apos;ll receive an email confirmation shortly</li>
        </ul>
      </div>
    </motion.div>
  );
}
