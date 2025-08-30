'use client';

import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
    MdPeople,
    MdLocationOn,
    MdTune,
    MdSchedule,
    MdStar,
    MdCheck,
    MdArrowDownward
} from 'react-icons/md';
import { FaArrowRight } from 'react-icons/fa';
import { jobs, JobWithForm } from "~/data/jobs";

// Filter options
const locationOptions = [
    { value: "all", label: "All Locations" },
    { value: "Vancouver", label: "Vancouver" },
    { value: "Remote", label: "Remote" },
    { value: "Hybrid", label: "Hybrid" },
];

const levelOptions = [
    { value: "all", label: "All Levels" },
    { value: "Junior", label: "Junior" },
    { value: "Mid", label: "Mid-Level" },
    { value: "Senior", label: "Senior" },
    { value: "Principal", label: "Principal" },
];

const typeOptions = [
    { value: "all", label: "All Types" },
    { value: "Full-time", label: "Full-time" },
    { value: "Part-time", label: "Part-time" },
    { value: "Contract", label: "Contract" },
];

interface FilterOption {
    value: string;
    label: string;
}

export default function OpenPositionsSection() {
    const router = useRouter();
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.15, once: true });

    // Filter states
    const [selectedLocation, setSelectedLocation] = useState("all");
    const [selectedLevel, setSelectedLevel] = useState("all");
    const [selectedType, setSelectedType] = useState("all");

    // Navigation function
    const navigateToApply = (job: JobWithForm) => {
        router.push(`/careers/${job.id}`);
    };

    // Filter jobs based on selected criteria
    const filteredJobs = useMemo(() => {
        return jobs.filter((job: JobWithForm) => {
            const locationMatch = selectedLocation === "all" || job.meta.location === selectedLocation;
            const levelMatch = selectedLevel === "all" || job.meta.level === selectedLevel;
            const typeMatch = selectedType === "all" || job.meta.type === selectedType;
            
            return locationMatch && levelMatch && typeMatch;
        });
    }, [selectedLocation, selectedLevel, selectedType]);

    const hasActiveFilters = selectedLocation !== "all" || selectedLevel !== "all" || selectedType !== "all";

    return (
        <motion.div 
            ref={ref}
            className="mt-[12rem] lg:mt-[5rem] max-w-[min(75rem,96svw)] lg:max-w-[100%] lg:px-6 w-full flex flex-col mx-auto mb-12"
        >
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16 lg:mb-12"
            >
                <h2 className="text-5xl lg:text-4xl font-black text-darkblue dark:text-white mb-6">
                    Join Our Team
                </h2>
                <p className="text-lg lg:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    Looking for talented developers, designers, and innovators to help us build the future.
                    Find your perfect role and apply today.
                </p>
            </motion.div>

            {/* Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8 lg:mb-6"
            >
                <div className="bg-white dark:bg-gray-800 rounded-2xl lg:rounded-xl p-6 lg:p-4 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
                    <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-3">
                        <FilterSelect
                            options={locationOptions}
                            value={selectedLocation}
                            onChange={setSelectedLocation}
                            icon={<MdLocationOn className="w-4 h-4" />}
                        />
                        <FilterSelect
                            options={levelOptions}
                            value={selectedLevel}
                            onChange={setSelectedLevel}
                            icon={<MdStar className="w-4 h-4" />}
                        />
                        <FilterSelect
                            options={typeOptions}
                            value={selectedType}
                            onChange={setSelectedType}
                            icon={<MdSchedule className="w-4 h-4" />}
                        />
                    </div>
                </div>

                {/* Clear filters */}
                {hasActiveFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 text-center"
                    >
                        <button
                            className="text-sm px-4 py-2 bg-[#01204c] hover:bg-[#193a6a] text-white rounded-full font-medium transition-colors"
                            onClick={() => {
                                setSelectedLocation("all");
                                setSelectedLevel("all");
                                setSelectedType("all");
                            }}
                        >
                            Clear All Filters
                        </button>
                    </motion.div>
                )}
            </motion.div>

            {/* Job Listings */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-4 w-full"
            >
                <AnimatePresence mode="wait">
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map((job: JobWithForm, index: number) => (
                            <JobCard
                                key={job.id}
                                job={job}
                                index={index}
                                isInView={isInView}
                                featured={job.id === 'ai-engineer'}
                                onApplyClick={navigateToApply}
                            />
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full text-center py-12"
                        >
                            <div className="text-gray-500 dark:text-gray-400">
                                <MdTune className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <h3 className="text-lg font-semibold mb-2">No positions found</h3>
                                <p className="text-sm">Try adjusting your filters to see more opportunities.</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
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
    job: JobWithForm;
    index: number;
    isInView: boolean;
    featured?: boolean;
    onApplyClick: (job: JobWithForm) => void;
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
                        {(() => {
                            const description = typeof job.meta.description === 'string' 
                                ? job.meta.description 
                                : job.meta.description.content;
                            return description.length > 120
                                ? description.substring(0, 120) + "..."
                                : description;
                        })()}
                    </p>
                </div>

                {/* Skills Preview */}
                <div className="w-full">
                    <div className="flex flex-wrap gap-2">
                        {job.skills.slice(0, 3).map((skill: string, skillIndex: number) => (
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
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onApplyClick(job);
                        }}
                        data-navigation="true"
                        className="w-full flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium bg-[#01204c] hover:bg-[#193a6a] text-white rounded-full transition-colors"
                    >
                        Learn More & Apply
                        <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </div>
            </motion.div>
        </div>
    </motion.div>
);
