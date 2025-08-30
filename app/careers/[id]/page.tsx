"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import AppHeader from "~/app/AppHeader";
import ApplicationForm from "~/components/application/ApplicationForm";
import { jobs } from "~/data/jobs";
import { toast } from 'react-toastify';

export default function JobApplicationPage() {
  const params = useParams();
  const positionId = params.id as string;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Find the job by ID
  const job = jobs.find(j => j.id === positionId);
  
  if (!job) {
    notFound();
  }

  const handleSubmit = async (data: Record<string, any>, files: Record<string, File>) => {
    setIsSubmitting(true);
    
    try {
      // Debug: Log the data being submitted
      console.log('Submitting form data:', data);
      console.log('Available fields:', Object.keys(data));
      console.log('Required fields check:', {
        hasEmail: !!data.contact_email,
        hasName: !!data.full_name,
        email: data.contact_email,
        name: data.full_name
      });
      
      // Prepare form data for submission
      const formData = new FormData();
      formData.append('positionId', positionId);
      formData.append('responses', JSON.stringify(data));
      formData.append('formName', `${positionId}-application`);
      
      // Add files
      Object.entries(files).forEach(([key, file]) => {
        formData.append(`file_${key}`, file);
      });

      // Call the API
      const response = await fetch('/api/applications/submit', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Submission failed');
      }

      const result = await response.json();
      console.log('Application submitted successfully:', result);
      
      toast.success('🎉 Application submitted successfully! We\'ll be in touch soon.');
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Application submission failed:', error);
      toast.error(`❌ Submission failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AppHeader
        description={`Apply for ${job.meta.title} at Devino`}
        ogTitle={`Apply for ${job.meta.title} - Devino Careers`}
        ogUrl={`https://devino.ca/careers/${positionId}`}
        metaDescription={`Submit your application for the ${job.meta.title} position at Devino. Join our remote-first team that values innovation and personal growth.`}
      />

      <main className="min-h-screen bg-body dark:bg-darkbg py-12 lg:py-8 md:py-6">
        <div className="container mx-auto px-6 lg:px-4">
          <div className="max-w-4xl mx-auto">
            {/* Card-style container */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Header with dark blue background */}
              <div className="bg-[#01204c] text-white p-6 lg:p-8">
                <div className="mb-4">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-blue-200 mb-2">
                    <span className="bg-blue-700 px-2 py-1 rounded">{job.meta.department}</span>
                    <span>{job.meta.type}</span>
                    <span>•</span>
                    <span>{job.meta.level}</span>
                    <span>•</span>
                    <span>{job.meta.location}</span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold mb-3">
                    {job.meta.title}
                  </h1>
                </div>
              </div>

              {/* Form content */}
              <div className="p-6 lg:p-8">
                {/* Job Description */}
                {job.meta.description && (
                  <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                    {typeof job.meta.description === 'string' ? (
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {job.meta.description}
                      </p>
                    ) : job.meta.description.type === 'html' ? (
                      <div 
                        className="prose prose-gray dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: job.meta.description.content }}
                      />
                    ) : (
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {job.meta.description.content}
                      </p>
                    )}
                  </div>
                )}

                <ApplicationForm
                  formConfig={job.formConfig}
                  positionId={job.id}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  submitSuccess={submitSuccess}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
