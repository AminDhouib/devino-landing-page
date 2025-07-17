// components/careers/OpenPositionsSection.tsx
"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
    MdPeople, MdLocationOn, MdSchedule, MdFilterList, MdSearch,
    MdStar, MdWorkOutline, MdClose, MdCheck, MdPerson,
    MdWork, MdDescription, MdFavorite, MdUpload
} from "react-icons/md";
import { FaArrowLeft, FaArrowRight, FaMessage } from "react-icons/fa6";
import { getAllJobs, getFeaturedJobs, getJobById } from "~/data/jobs";
import { JobDefinition, ApplicationResponse } from "~/lib/scoring/types";
import AwsmButton from "~/components/AwsmButton";
import QuestionField from "~/components/application/QuestionField";
import ApplicationSuccessModal, { SubmissionResult } from "~/components/ApplicationSuccess";

type FilterOption = {
    label: string;
    value: string;
};

const departments: FilterOption[] = [
    { label: "All Departments", value: "all" },
    { label: "Engineering", value: "Engineering" },
    { label: "Design", value: "Design" },
    { label: "Marketing", value: "Marketing" },
    { label: "Operations", value: "Operations" }
];

const levels: FilterOption[] = [
    { label: "All Levels", value: "all" },
    { label: "Junior", value: "Junior" },
    { label: "Mid", value: "Mid" },
    { label: "Senior", value: "Senior" },
    { label: "Lead", value: "Lead" }
];

const types: FilterOption[] = [
    { label: "All Types", value: "all" },
    { label: "Full-time", value: "Full-time" },
    { label: "Part-time", value: "Part-time" },
    { label: "Contract", value: "Contract" }
];

const sectionIcons: Record<string, any> = {
    personal: MdPerson,
    experience: MdWork,
    technical: MdDescription,
    skills: MdDescription,
    culture: MdFavorite,
    documents: MdUpload
};

export default function OpenPositionsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.15, once: true });

    // Filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("all");
    const [selectedLevel, setSelectedLevel] = useState("all");
    const [selectedType, setSelectedType] = useState("all");

    // Application modal states
    const [selectedJob, setSelectedJob] = useState<JobDefinition | null>(null);
    const [showApplicationForm, setShowApplicationForm] = useState(false);
    const [showJobDetails, setShowJobDetails] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responses, setResponses] = useState<ApplicationResponse[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});

    // Get positions
    const allJobs = getAllJobs();
    const featuredJobs = getFeaturedJobs();

    // Filter positions
    const filteredJobs = allJobs.filter(job => {
        const matchesSearch =
            job.meta.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.meta.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesDepartment = selectedDepartment === "all" || job.meta.department === selectedDepartment;
        const matchesLevel = selectedLevel === "all" || job.meta.level === selectedLevel;
        const matchesType = selectedType === "all" || job.meta.type === selectedType;

        return matchesSearch && matchesDepartment && matchesLevel && matchesType;
    });

    const featuredFiltered = filteredJobs.filter(job => job.meta.featured);
    const regularFiltered = filteredJobs.filter(job => !job.meta.featured);

    const openJobDetails = (job: JobDefinition) => {
        setSelectedJob(job);
        setShowJobDetails(true);
        setShowApplicationForm(true);
        setCurrentQuestionIndex(0);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setShowApplicationForm(false);
        setSelectedJob(null);
        setShowJobDetails(true);
        setCurrentQuestionIndex(0);
        setResponses([]);
        setErrors({});
        setSubmissionResult(null);
        setUploadedFiles({});
        document.body.style.overflow = 'unset';
    };

    const startApplication = () => {
        setShowJobDetails(false);
        setCurrentQuestionIndex(0);
    };

    const getResponse = (questionId: string): string | string[] | File => {
        const response = responses.find(r => r.questionId === questionId);
        return response?.value || '';
    };

    const updateResponse = (questionId: string, value: string | string[] | File) => {
        setResponses(prev => {
            const existing = prev.findIndex(r => r.questionId === questionId);
            const newResponse: ApplicationResponse = { questionId, value };

            if (existing >= 0) {
                const updated = [...prev];
                updated[existing] = newResponse;
                return updated;
            } else {
                return [...prev, newResponse];
            }
        });

        // Clear error for this question
        if (errors[questionId]) {
            setErrors(prev => {
                const updated = { ...prev };
                delete updated[questionId];
                return updated;
            });
        }
    };

    const validateCurrentQuestion = (): boolean => {
        if (!selectedJob || showJobDetails) return true;

        const currentQuestion = selectedJob.form[currentQuestionIndex];
        const response = getResponse(currentQuestion.id);

        if (currentQuestion.required && (!response ||
            (typeof response === 'string' && !response.trim()) ||
            (Array.isArray(response) && response.length === 0))) {
            setErrors(prev => ({
                ...prev,
                [currentQuestion.id]: `${currentQuestion.label} is required`
            }));
            return false;
        }

        // Clear any existing error
        setErrors(prev => {
            const updated = { ...prev };
            delete updated[currentQuestion.id];
            return updated;
        });

        return true;
    };

    const handleNext = () => {
        if (!selectedJob) return;

        if (showJobDetails) {
            startApplication();
            return;
        }

        if (!validateCurrentQuestion()) return;

        if (currentQuestionIndex < selectedJob.form.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (!selectedJob) return;

        if (currentQuestionIndex === 0) {
            setShowJobDetails(true);
        } else {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleSubmit = async () => {
        if (!selectedJob || !validateCurrentQuestion()) return;

        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('positionId', selectedJob.id);

            const responseData = responses.map(response => {
                if (response.value instanceof File) {
                    formData.append(`file_${response.questionId}`, response.value);
                    return {
                        questionId: response.questionId,
                        value: response.value.name
                    };
                }
                return response;
            });

            formData.append('responses', JSON.stringify(responseData));

            const response = await fetch('/api/applications', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to submit application');
            }

            const result = await response.json();
            const applicantName = getResponse('firstName') + ' ' + getResponse('lastName');
            const email = getResponse('email') as string;

            setSubmissionResult({
                applicationId: result.applicationId,
                applicantName: result.applicantName || applicantName.trim(),
                positionTitle: selectedJob.meta.title,
                score: result.score || 85,
                email
            });

            setShowApplicationForm(false);
        } catch (error) {
            console.error('Submission error:', error);
            alert('There was an error submitting your application. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const isLastQuestion = selectedJob ? currentQuestionIndex === selectedJob.form.length - 1 : false;
    const progress = selectedJob && !showJobDetails ?
        ((currentQuestionIndex + 1) / selectedJob.form.length) * 100 : 0;

    return (
        <>
            <motion.div className="mt-[12rem] lg:mt-[5rem] max-w-[min(75rem,96svw)] lg:max-w-[100%] lg:px-6 w-full flex flex-col mx-auto mb-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 lg:mb-12"
                >
                    <div className="inline-flex items-center space-x-3 bg-lightblueactive/10 text-lightblueactive px-6 py-2 rounded-full text-sm font-medium mb-6">
                        <MdWorkOutline className="w-4 h-4" />
                        <span>Open Positions</span>
                    </div>

                    <h2 className="text-5xl lg:text-4xl sm:text-3xl font-bold text-darkblue dark:text-white mb-6">
                        Join Our Growing{" "}
                        <span className="text-lightblueactive">Team</span>
                    </h2>

                    <p className="text-xl lg:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        We&apos;re always looking for talented individuals who share our values and passion for excellence.
                    </p>
                </motion.div>

                {/* Search and Filters */}
                <motion.section
                    ref={ref}
                    className="w-full mx-auto mb-16 lg:mb-12"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    <div className="bg-pastelBlue dark:bg-deepBlue rounded-[32px] p-8 lg:p-6 shadow-lg">
                        {/* Search Bar */}
                        <div className="relative mb-6 lg:mb-4">
                            <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-darkblue dark:text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search positions, skills, or keywords..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 lg:py-2.5 border border-lightblueactive/20 rounded-lg bg-white dark:bg-gray-800 text-darkblue dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lightblueactive focus:border-transparent"
                            />
                        </div>

                        {/* Filters */}
                        <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-3">
                            <FilterSelect
                                options={departments}
                                value={selectedDepartment}
                                onChange={setSelectedDepartment}
                                icon={<MdFilterList className="w-4 h-4" />}
                            />
                            <FilterSelect
                                options={levels}
                                value={selectedLevel}
                                onChange={setSelectedLevel}
                                icon={<MdPeople className="w-4 h-4" />}
                            />
                            <FilterSelect
                                options={types}
                                value={selectedType}
                                onChange={setSelectedType}
                                icon={<MdSchedule className="w-4 h-4" />}
                            />
                        </div>
                    </div>
                </motion.section>

                {/* Featured Positions */}
                {featuredFiltered.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mb-16 lg:mb-12"
                    >
                        <h3 className="text-3xl lg:text-2xl font-bold text-darkblue dark:text-white mb-8 lg:mb-6 flex items-center">
                            <MdStar className="w-6 h-6 lg:w-5 lg:h-5 text-lightblueactive mr-2" />
                            Featured Positions
                        </h3>
                        <div className="grid grid-cols-2 lg:grid-cols-1 gap-8 lg:gap-6">
                            {featuredFiltered.map((job, index) => (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    index={index}
                                    isInView={isInView}
                                    featured={true}
                                    onApplyClick={openJobDetails}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Regular Positions */}
                {regularFiltered.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <h3 className="text-3xl lg:text-2xl font-bold text-darkblue dark:text-white mb-8 lg:mb-6">
                            All Positions
                        </h3>
                        <div className="grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-8 lg:gap-6">
                            {regularFiltered.map((job, index) => (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    index={index}
                                    isInView={isInView}
                                    onApplyClick={openJobDetails}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* No Results */}
                {filteredJobs.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-center py-16 lg:py-12"
                    >
                        <div className="w-24 h-24 mx-auto mb-6 bg-lightblueactive/20 rounded-full flex items-center justify-center">
                            <MdSearch className="w-12 h-12 text-lightblueactive" />
                        </div>
                        <h3 className="text-2xl lg:text-xl font-bold text-darkblue dark:text-white mb-4">
                            No positions found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Try adjusting your search criteria or check back later.
                        </p>
                        <AwsmButton>
                            <button
                                onClick={() => {
                                    setSearchTerm("");
                                    setSelectedDepartment("all");
                                    setSelectedLevel("all");
                                    setSelectedType("all");
                                }}
                            >
                                Clear All Filters
                            </button>
                        </AwsmButton>
                    </motion.div>
                )}
            </motion.div>

            {/* Application Modal */}
            <AnimatePresence>
                {showApplicationForm && selectedJob && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-0 lg:p-0">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl h-auto max-h-[90vh] lg:rounded-none lg:w-full lg:h-full flex flex-col"
                        >
                            {/* Header */}
                            <div className="px-6 lg:px-8 py-6 border-b border-gray-200 dark:border-gray-700 bg-darkblue text-white flex-shrink-0">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold">{selectedJob.meta.title}</h2>
                                        <p className="text-white/80 mt-1">
                                            {showJobDetails ? 'Position Details' : `Question ${currentQuestionIndex + 1} of ${selectedJob.form.length}`}
                                        </p>
                                    </div>
                                    <button
                                        onClick={closeModal}
                                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                    >
                                        <MdClose className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Progress Bar */}
                                {!showJobDetails && (
                                    <div className="mt-6">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span>Progress</span>
                                            <span>{Math.round(progress)}% Complete</span>
                                        </div>
                                        <div className="w-full bg-white/20 rounded-full h-2">
                                            <motion.div
                                                className="bg-white rounded-full h-2"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progress}%` }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto">
                                <AnimatePresence mode="wait">
                                    {showJobDetails ? (
                                        <JobDetailsModal
                                            key="job-details"
                                            job={selectedJob}
                                            onApply={startApplication}
                                        />
                                    ) : (
                                        <ApplicationFormContent
                                            key={`question-${currentQuestionIndex}`}
                                            job={selectedJob}
                                            currentQuestionIndex={currentQuestionIndex}
                                            response={getResponse(selectedJob.form[currentQuestionIndex].id)}
                                            error={errors[selectedJob.form[currentQuestionIndex].id]}
                                            updateResponse={updateResponse}
                                            uploadedFiles={uploadedFiles}
                                            setUploadedFiles={setUploadedFiles}
                                        />
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Footer */}
                            <div className="px-6 lg:px-8 py-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                                <div className="flex lg:flex-col flex-row lg:items-stretch items-center justify-between gap-4">
                                    <AwsmButton>
                                        <button
                                            onClick={handlePrevious}
                                            className="flex items-center justify-center space-x-2 px-6 py-3"
                                        >
                                            <FaArrowLeft className="w-4 h-4" />
                                            <span>{showJobDetails || currentQuestionIndex === 0 ? 'Back to Details' : 'Previous'}</span>
                                        </button>
                                    </AwsmButton>

                                    {showJobDetails ? (
                                        <AwsmButton>
                                            <button
                                                onClick={startApplication}
                                                className="flex items-center justify-center space-x-2 px-8 py-3"
                                            >
                                                Apply for This Position
                                                <FaArrowRight className="w-4 h-4" />
                                            </button>
                                        </AwsmButton>
                                    ) : isLastQuestion ? (
                                        <AwsmButton>
                                            <button
                                                onClick={handleSubmit}
                                                disabled={isSubmitting}
                                                className="flex items-center justify-center space-x-2 px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                        <span>Submitting...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaMessage className="w-4 h-4" />
                                                        <span>Submit Application</span>
                                                    </>
                                                )}
                                            </button>
                                        </AwsmButton>
                                    ) : (
                                        <AwsmButton>
                                            <button
                                                onClick={handleNext}
                                                className="flex items-center justify-center space-x-2 px-6 py-3"
                                            >
                                                <span>Next</span>
                                                <FaArrowRight className="w-4 h-4" />
                                            </button>
                                        </AwsmButton>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Success Modal */}
            <AnimatePresence>
                {submissionResult && (
                    <ApplicationSuccessModal
                        result={submissionResult}
                        onClose={closeModal}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

/* ---------- Component Implementations ---------- */

const FilterSelect = ({ options, value, onChange, icon }: {
    options: FilterOption[];
    value: string;
    onChange: (value: string) => void;
    icon: React.ReactNode;
}) => (
    <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-darkblue dark:text-gray-400">
            {icon}
        </div>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 lg:py-2 border border-lightblueactive/20 rounded-lg bg-white dark:bg-gray-800 text-darkblue dark:text-white focus:outline-none focus:ring-2 focus:ring-lightblueactive focus:border-transparent appearance-none cursor-pointer"
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

const JobCard = ({ job, index, isInView, featured = false, onApplyClick }: {
    job: JobDefinition;
    index: number;
    isInView: boolean;
    featured?: boolean;
    onApplyClick: (job: JobDefinition) => void;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 30
        }}
        transition={{
            duration: 0.6,
            delay: index * 0.1,
            ease: "easeOut"
        }}
        className="group cursor-pointer"
    >
        <div className="relative w-full h-[420px] lg:h-[400px]">
            <motion.div
                className={`bg-pastelBlue dark:bg-deepBlue text-darkblue dark:text-white rounded-[24px] transition-all duration-300 h-full w-full p-6 flex flex-col gap-4 shadow-sm hover:shadow-md ${
                    featured
                        ? 'ring-2 ring-lightblueactive/40 shadow-lg'
                        : 'border border-gray-200/50 dark:border-gray-700/50'
                }`}
            >
                {/* Header */}
                <div className="flex items-start justify-between w-full">
                    <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-3">
                            <h3 className="text-xl lg:text-lg font-bold text-darkblue dark:text-white line-clamp-2">
                                {job.meta.title}
                            </h3>
                            {featured && (
                                <MdStar className="w-5 h-5 text-lightblueactive flex-shrink-0" />
                            )}
                        </div>
                        <div className="inline-flex items-center text-sm font-semibold text-lightblueactive bg-lightblueactive/15 px-3 py-1.5 rounded-full">
                            {job.meta.level}
                        </div>
                    </div>
                </div>

                {/* Department and Location */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
                    <span className="flex items-center">
                        <MdPeople className="w-4 h-4 mr-1.5" />
                        {job.meta.department}
                    </span>
                    <span className="flex items-center">
                        <MdLocationOn className="w-4 h-4 mr-1.5" />
                        {job.meta.location}
                    </span>
                </div>

                {/* Description */}
                <div className="flex-1">
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        {job.meta.description.length > 120
                            ? job.meta.description.substring(0, 120) + "..."
                            : job.meta.description}
                    </p>
                </div>

                {/* Skills Preview */}
                <div className="w-full">
                    <div className="flex flex-wrap gap-2">
                        {job.skills.slice(0, 3).map((skill, skillIndex) => (
                            <span
                                key={skillIndex}
                                className="px-2.5 py-1 bg-white/70 dark:bg-gray-700/70 text-darkblue dark:text-gray-200 rounded-lg text-xs font-medium border border-gray-200/50 dark:border-gray-600/50"
                            >
                                {skill}
                            </span>
                        ))}
                        {job.skills.length > 3 && (
                            <span className="px-2.5 py-1 bg-lightblueactive/10 text-lightblueactive rounded-lg text-xs font-medium">
                                +{job.skills.length - 3} more
                            </span>
                        )}
                    </div>
                </div>

                {/* Apply Button */}
                <div className="mt-auto pt-4">
                    <AwsmButton className="w-full">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onApplyClick(job);
                            }}
                            className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium"
                        >
                            Learn More & Apply
                            <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                    </AwsmButton>
                </div>
            </motion.div>
        </div>
    </motion.div>
);

const JobDetailsModal = ({ job, onApply }: {
    job: JobDefinition;
    onApply: () => void;
}) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="p-6 lg:p-8"
    >
        <div className="space-y-6">
            {/* Position Overview */}
            <div>
                <div className="flex items-center gap-4 mb-4">
                    <span className="inline-flex items-center text-sm font-semibold text-lightblueactive bg-lightblueactive/15 px-3 py-1.5 rounded-full">
                        {job.meta.level}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        {job.meta.department} • {job.meta.type}
                    </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-6">
                    <span className="flex items-center">
                        <MdLocationOn className="w-4 h-4 mr-1.5" />
                        {job.meta.location}
                    </span>
                    <span className="flex items-center">
                        <MdSchedule className="w-4 h-4 mr-1.5" />
                        {job.meta.type}
                    </span>
                </div>
            </div>

            {/* Full Description */}
            <div>
                <h3 className="text-lg font-semibold text-darkblue dark:text-white mb-3">
                    About This Role
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {job.meta.description}
                </p>
            </div>

            {/* Requirements */}
            <div>
                <h3 className="text-lg font-semibold text-darkblue dark:text-white mb-3">
                    Requirements
                </h3>
                <ul className="space-y-2">
                    {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <MdCheck className="w-4 h-4 text-lightblueactive mt-0.5 flex-shrink-0" />
                            <span>{req}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Skills */}
            <div>
                <h3 className="text-lg font-semibold text-darkblue dark:text-white mb-3">
                    Skills & Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                        <span
                            key={index}
                            className="px-3 py-1.5 bg-lightblueactive/10 text-lightblueactive rounded-lg text-sm font-medium"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* Benefits */}
            <div>
                <h3 className="text-lg font-semibold text-darkblue dark:text-white mb-3">
                    What We Offer
                </h3>
                <ul className="space-y-2">
                    {job.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <MdStar className="w-4 h-4 text-lightblueactive mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Apply Button */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <AwsmButton>
                    <button
                        onClick={onApply}
                        className="w-full flex items-center justify-center gap-3 py-3 text-base font-medium"
                    >
                        Apply for This Position
                        <FaArrowRight className="w-4 h-4" />
                    </button>
                </AwsmButton>
            </div>
        </div>
    </motion.div>
);

const ApplicationFormContent = ({
                                    job,
                                    currentQuestionIndex,
                                    response,
                                    error,
                                    updateResponse,
                                    uploadedFiles,
                                    setUploadedFiles
                                }: {
    job: JobDefinition;
    currentQuestionIndex: number;
    response: string | string[] | File;
    error?: string;
    updateResponse: (questionId: string, value: string | string[] | File) => void;
    uploadedFiles: Record<string, File>;
    setUploadedFiles: React.Dispatch<React.SetStateAction<Record<string, File>>>;
}) => {
    const currentQuestion = job.form[currentQuestionIndex];

    const handleFileUpload = (questionId: string, file: File | null) => {
        if (file) {
            setUploadedFiles(prev => ({ ...prev, [questionId]: file }));
            updateResponse(questionId, file);
        } else {
            setUploadedFiles(prev => {
                const updated = { ...prev };
                delete updated[questionId];
                return updated;
            });
            updateResponse(questionId, '');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="p-6 lg:p-8"
        >
            <div className="space-y-6">
                <div>
                    <h3 className="text-2xl font-bold text-darkblue dark:text-white mb-2">
                        {currentQuestion.label}
                    </h3>
                    {currentQuestion.description && (
                        <p className="text-gray-600 dark:text-gray-400">
                            {currentQuestion.description}
                        </p>
                    )}
                </div>

                <QuestionField
                    question={currentQuestion}
                    value={response}
                    onChange={(value) => updateResponse(currentQuestion.id, value)}
                    error={error}
                    onFileUpload={(file) => handleFileUpload(currentQuestion.id, file)}
                    uploadedFile={uploadedFiles[currentQuestion.id]}
                />
            </div>
        </motion.div>
    );
};