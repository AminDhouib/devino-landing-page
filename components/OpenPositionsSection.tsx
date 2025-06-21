// components/careers/OpenPositionsSection.tsx
"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
    MdPeople,
    MdLocationOn,
    MdSchedule,
    MdFilterList,
    MdSearch,
    MdStar,
    MdWorkOutline,
    MdClose,
    MdChevronLeft,
    MdChevronRight,
    MdSend,
    MdCheck,
    MdPerson,
    MdWork,
    MdDescription,
    MdFavorite,
    MdUpload,
    MdEmail
} from "react-icons/md";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import { jobsData } from "~/lib/jobs";
import { applicationConfigs } from "~/lib/application-config";
import AwsmButton from "~/components/AwsmButton";
import QuestionField from "~/components/application/QuestionField";
import ApplicationSuccessModal, { SubmissionResult } from "~/components/ApplicationSuccess";
import {
    FormSection,
    ApplicationResponse,
} from "~/types/application";
import {FaMessage} from "react-icons/fa6";

type JobPosition = {
    id: string;
    title: string;
    department: string;
    type: "Full-time" | "Part-time" | "Contract";
    level: "Junior" | "Mid" | "Senior" | "Lead";
    location: string;
    description: string;
    requirements: string[];
    benefits: string[];
    skills: string[];
    featured?: boolean;
};

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

// Helper function to truncate description
const truncateDescription = (text: string, maxLength: number = 120): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
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
    const [selectedPosition, setSelectedPosition] = useState<JobPosition | null>(null);
    const [showApplicationForm, setShowApplicationForm] = useState(false);
    const [currentSection, setCurrentSection] = useState(-1); // -1 for job details, 0+ for form sections
    const [responses, setResponses] = useState<ApplicationResponse[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});

    // Get positions from imported data
    const positions = jobsData.positions;

    // Filter positions based on search and filters
    const filteredPositions = positions.filter(position => {
        const matchesSearch = position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            position.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            position.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesDepartment = selectedDepartment === "all" || position.department === selectedDepartment;
        const matchesLevel = selectedLevel === "all" || position.level === selectedLevel;
        const matchesType = selectedType === "all" || position.type === selectedType;

        return matchesSearch && matchesDepartment && matchesLevel && matchesType;
    });

    // Separate featured positions
    const featuredPositions = filteredPositions.filter(pos => pos.featured);
    const regularPositions = filteredPositions.filter(pos => !pos.featured);

    const openJobDetails = (position: JobPosition) => {
        setSelectedPosition(position);
        setCurrentSection(-1);
        setShowApplicationForm(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setShowApplicationForm(false);
        setSelectedPosition(null);
        setCurrentSection(-1);
        setResponses([]);
        setErrors({});
        setSubmissionResult(null);
        setUploadedFiles({});
        document.body.style.overflow = 'unset';
    };

    const startApplication = () => {
        setCurrentSection(0);
    };

    const config = selectedPosition ? applicationConfigs[selectedPosition.id] : null;

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

        if (errors[questionId]) {
            setErrors(prev => {
                const updated = { ...prev };
                delete updated[questionId];
                return updated;
            });
        }
    };

    const validateSection = (section: FormSection): boolean => {
        const newErrors: Record<string, string> = {};
        let isValid = true;

        for (const question of section.questions) {
            const response = getResponse(question.id);

            if (question.required && (!response ||
                (typeof response === 'string' && !response.trim()) ||
                (Array.isArray(response) && response.length === 0))) {
                newErrors[question.id] = `${question.label} is required`;
                isValid = false;
                continue;
            }

            if (response && question.validation) {
                const validation = question.validation;

                if (typeof response === 'string') {
                    if (validation.min && response.length < validation.min) {
                        newErrors[question.id] = `Minimum ${validation.min} characters required`;
                        isValid = false;
                    }
                    if (validation.max && response.length > validation.max) {
                        newErrors[question.id] = `Maximum ${validation.max} characters allowed`;
                        isValid = false;
                    }
                    if (validation.pattern && !new RegExp(validation.pattern).test(response)) {
                        newErrors[question.id] = 'Invalid format';
                        isValid = false;
                    }
                }
            }
        }

        setErrors(prev => ({ ...prev, ...newErrors }));
        return isValid;
    };

    const handleNext = () => {
        if (!config) return;

        if (currentSection >= 0) {
            const currentSectionData = config.sections[currentSection];
            if (validateSection(currentSectionData)) {
                setCurrentSection(prev => Math.min(prev + 1, config.sections.length - 1));
            }
        } else {
            setCurrentSection(0);
        }
    };

    const handlePrevious = () => {
        if (currentSection === 0) {
            setCurrentSection(-1);
        } else {
            setCurrentSection(prev => Math.max(prev - 1, 0));
        }
    };

    const handleSubmit = async () => {
        if (!config || !selectedPosition) return;

        const currentSectionData = config.sections[currentSection];
        if (!validateSection(currentSectionData)) return;

        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('positionId', selectedPosition.id);

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

            const firstName = responses.find(r => r.questionId === 'firstName')?.value || '';
            const lastName = responses.find(r => r.questionId === 'lastName')?.value || '';
            const email = responses.find(r => r.questionId === 'email')?.value as string || '';
            const applicantName = `${firstName} ${lastName}`.trim();

            setSubmissionResult({
                applicationId: result.applicationId || `DEV_${Date.now()}`,
                applicantName: result.applicantName || applicantName,
                positionTitle: selectedPosition.title,
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

    const isLastSection = config ? currentSection === config.sections.length - 1 : false;
    const isFirstSection = currentSection === 0;
    const progress = config && currentSection >= 0 ? ((currentSection + 1) / config.sections.length) * 100 : 0;

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
                        Find your perfect role and start your journey with us.
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

                {/* Results Count */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isInView ? 1 : 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="mb-8 lg:mb-6"
                >
                    <p className="text-gray-600 dark:text-gray-400">
                        Showing <span className="font-semibold text-darkblue dark:text-white">{filteredPositions.length}</span> position{filteredPositions.length !== 1 ? 's' : ''}
                        {searchTerm && (
                            <span> for &quot;<span className="text-lightblueactive">{searchTerm}</span>&quot;</span>
                        )}
                    </p>
                </motion.div>

                {/* Featured Positions */}
                {featuredPositions.length > 0 && (
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
                            {featuredPositions.map((position, index) => (
                                <JobCard
                                    key={position.id}
                                    position={position}
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
                {regularPositions.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <h3 className="text-3xl lg:text-2xl font-bold text-darkblue dark:text-white mb-8 lg:mb-6">
                            All Positions
                        </h3>
                        <div className="grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-8 lg:gap-6">
                            {regularPositions.map((position, index) => (
                                <JobCard
                                    key={position.id}
                                    position={position}
                                    index={index}
                                    isInView={isInView}
                                    onApplyClick={openJobDetails}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* No Results */}
                {filteredPositions.length === 0 && (
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
                            Try adjusting your search criteria or check back later for new opportunities.
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
                {showApplicationForm && selectedPosition && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-0 lg:p-0">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl h-auto max-h-[90vh] lg:rounded-none lg:shadow-none lg:w-full lg:h-full lg:max-w-full lg:max-h-full flex flex-col"
                        >
                            {/* Header */}
                            <div className="px-6 lg:px-8 py-6 border-b border-gray-200 dark:border-gray-700 bg-darkblue text-white flex-shrink-0">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold">{selectedPosition.title}</h2>
                                        <p className="text-white/80 mt-1">
                                            {currentSection === -1 ? 'Position Details' : 'Application Form'}
                                        </p>
                                    </div>
                                    <button
                                        onClick={closeModal}
                                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                    >
                                        <MdClose className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Progress Bar for Application Form */}
                                {config && currentSection >= 0 && (
                                    <div className="mt-6">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span>Step {currentSection + 1} of {config.sections.length}</span>
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
                                    {currentSection === -1 ? (
                                        <JobDetailsModal
                                            key="job-details"
                                            position={selectedPosition}
                                            onApply={startApplication}
                                        />
                                    ) : config ? (
                                        <ApplicationFormContent
                                            key={`section-${currentSection}`}
                                            config={config}
                                            currentSection={currentSection}
                                            responses={responses}
                                            errors={errors}
                                            uploadedFiles={uploadedFiles}
                                            updateResponse={updateResponse}
                                            setUploadedFiles={setUploadedFiles}
                                        />
                                    ) : null}
                                </AnimatePresence>
                            </div>

                            {/* Footer */}
                            {currentSection >= 0 && config && (
                                <div className="px-6 lg:px-8 py-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                                    <div className="flex lg:flex-col flex-row lg:items-stretch items-center justify-between gap-4">
                                        <AwsmButton>
                                            <button
                                                onClick={handlePrevious}
                                                className="flex items-center justify-center space-x-2 px-6 py-3"
                                            >
                                                <FaArrowLeft className="w-4 h-4" />
                                                <span>{isFirstSection ? 'Back to Details' : 'Previous'}</span>
                                            </button>
                                        </AwsmButton>

                                        {isLastSection ? (
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
                            )}
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

// Filter Select Component
const FilterSelect = ({
                          options,
                          value,
                          onChange,
                          icon
                      }: {
    options: FilterOption[];
    value: string;
    onChange: (value: string) => void;
    icon: React.ReactNode;
}) => {
    return (
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
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-darkblue dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
};

// Job Card Component
const JobCard = ({
                     position,
                     index,
                     isInView,
                     featured = false,
                     onApplyClick
                 }: {
    position: JobPosition;
    index: number;
    isInView: boolean;
    featured?: boolean;
    onApplyClick: (position: JobPosition) => void;
}) => {
    const cardRef = useRef(null);
    const cardInView = useInView(cardRef, { amount: 0.15, once: false });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{
                opacity: isInView && cardInView ? 1 : 0,
                y: isInView && cardInView ? 0 : 30
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
                                    {position.title}
                                </h3>
                                {featured && (
                                    <MdStar className="w-5 h-5 text-lightblueactive flex-shrink-0" />
                                )}
                            </div>
                            <div className="inline-flex items-center text-sm font-semibold text-lightblueactive bg-lightblueactive/15 px-3 py-1.5 rounded-full">
                                {position.level}
                            </div>
                        </div>
                    </div>

                    {/* Department and Location */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
                        <span className="flex items-center">
                            <MdPeople className="w-4 h-4 mr-1.5" />
                            {position.department}
                        </span>
                        <span className="flex items-center">
                            <MdLocationOn className="w-4 h-4 mr-1.5" />
                            {position.location}
                        </span>
                    </div>

                    {/* Description */}
                    <div className="flex-1">
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            {truncateDescription(position.description, 120)}
                        </p>
                    </div>

                    {/* Skills Preview */}
                    <div className="w-full">
                        <div className="flex flex-wrap gap-2">
                            {position.skills.slice(0, 3).map((skill, skillIndex) => (
                                <span
                                    key={skillIndex}
                                    className="px-2.5 py-1 bg-white/70 dark:bg-gray-700/70 text-darkblue dark:text-gray-200 rounded-lg text-xs font-medium border border-gray-200/50 dark:border-gray-600/50"
                                >
                                    {skill}
                                </span>
                            ))}
                            {position.skills.length > 3 && (
                                <span className="px-2.5 py-1 bg-lightblueactive/10 text-lightblueactive rounded-lg text-xs font-medium">
                                    +{position.skills.length - 3} more
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
                                    onApplyClick(position);
                                }}
                                className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium"
                            >
                                Learn More & Apply
                                <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                        </AwsmButton>
                    </div>

                    {/* Hover Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 rounded-[24px] bg-gradient-to-t from-lightblueactive/5 to-transparent pointer-events-none"
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};

// Job Details Modal Component
const JobDetailsModal = ({
                             position,
                             onApply
                         }: {
    position: JobPosition;
    onApply: () => void;
}) => {
    return (
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
                            {position.level}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            {position.department} • {position.type}
                        </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-6">
                        <span className="flex items-center">
                            <MdLocationOn className="w-4 h-4 mr-1.5" />
                            {position.location}
                        </span>
                        <span className="flex items-center">
                            <MdSchedule className="w-4 h-4 mr-1.5" />
                            {position.type}
                        </span>
                    </div>
                </div>

                {/* Full Description */}
                <div>
                    <h3 className="text-lg font-semibold text-darkblue dark:text-white mb-3">
                        About This Role
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {position.description}
                    </p>
                </div>

                {/* Requirements */}
                {position.requirements && position.requirements.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold text-darkblue dark:text-white mb-3">
                            Requirements
                        </h3>
                        <ul className="space-y-2">
                            {position.requirements.map((req, index) => (
                                <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                                    <MdCheck className="w-4 h-4 text-lightblueactive mt-0.5 flex-shrink-0" />
                                    <span>{req}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Skills */}
                <div>
                    <h3 className="text-lg font-semibold text-darkblue dark:text-white mb-3">
                        Skills & Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {position.skills.map((skill, index) => (
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
                {position.benefits && position.benefits.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold text-darkblue dark:text-white mb-3">
                            What We Offer
                        </h3>
                        <ul className="space-y-2">
                            {position.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                                    <MdStar className="w-4 h-4 text-lightblueactive mt-0.5 flex-shrink-0" />
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

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
};

// Application Form Content Component
const ApplicationFormContent = ({
                                    config,
                                    currentSection,
                                    responses,
                                    errors,
                                    uploadedFiles,
                                    updateResponse,
                                    setUploadedFiles
                                }: {
    config: any;
    currentSection: number;
    responses: ApplicationResponse[];
    errors: Record<string, string>;
    uploadedFiles: Record<string, File>;
    updateResponse: (questionId: string, value: string | string[] | File) => void;
    setUploadedFiles: React.Dispatch<React.SetStateAction<Record<string, File>>>;
}) => {
    const currentSectionData = config.sections[currentSection];

    const getResponse = (questionId: string): string | string[] | File => {
        const response = responses.find(r => r.questionId === questionId);
        return response?.value || '';
    };

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
            {/* Section Navigation */}
            <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-6 overflow-x-auto">
                    {config.sections.map((section: any, index: number) => {
                        const Icon = sectionIcons[section.id] || MdDescription;
                        const isActive = index === currentSection;
                        const isCompleted = index < currentSection;

                        return (
                            <div
                                key={section.id}
                                className={`flex items-center space-x-2 whitespace-nowrap transition-colors duration-200 ${
                                    isActive
                                        ? 'text-darkblue'
                                        : isCompleted
                                            ? 'text-green-600'
                                            : 'text-gray-400'
                                }`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                                    isActive
                                        ? 'bg-darkblue text-white'
                                        : isCompleted
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-200 dark:bg-gray-700'
                                }`}>
                                    {isCompleted ? (
                                        <MdCheck className="w-4 h-4" />
                                    ) : (
                                        <Icon className="w-4 h-4" />
                                    )}
                                </div>
                                <span className="text-sm font-medium">{section.title}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-2xl font-bold text-darkblue dark:text-white mb-2">
                        {currentSectionData.title}
                    </h3>
                    {currentSectionData.description && (
                        <p className="text-gray-600 dark:text-gray-400">
                            {currentSectionData.description}
                        </p>
                    )}
                </div>

                <div className="space-y-6">
                    {currentSectionData.questions.map((question: any) => (
                        <QuestionField
                            key={question.id}
                            question={question}
                            value={getResponse(question.id)}
                            onChange={(value) => updateResponse(question.id, value)}
                            error={errors[question.id]}
                            onFileUpload={(file) => handleFileUpload(question.id, file)}
                            uploadedFile={uploadedFiles[question.id]}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};