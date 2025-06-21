"use client";

import { motion } from "framer-motion";
import { MdCheck, MdClose, MdEmail, MdStar } from "react-icons/md";

interface SubmissionResult {
    applicationId: string;
    applicantName: string;
    positionTitle: string;
    score: number;
    email: string;
}

interface ApplicationSuccessModalProps {
    result: SubmissionResult;
    onClose: () => void;
}

export default function ApplicationSuccessModal({
                                                    result,
                                                    onClose
                                                }: ApplicationSuccessModalProps) {
    const getScoreMessage = (score: number) => {
        if (score >= 85) return { message: "Excellent application!", color: "text-green-600", icon: "🌟" };
        if (score >= 70) return { message: "Great application!", color: "text-lightblueactive", icon: "⭐" };
        return { message: "Thank you for applying!", color: "text-darkblue", icon: "👍" };
    };

    const scoreInfo = getScoreMessage(result.score);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-0 lg:p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md h-auto lg:rounded-none lg:shadow-none lg:w-full lg:h-full lg:max-w-full lg:max-h-full overflow-hidden flex flex-col"
            >
                {/* Header */}
                <div className="px-8 py-6 bg-darkblue text-white text-center relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                        <MdClose className="w-5 h-5" />
                    </button>

                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                        <MdCheck className="w-8 h-8" />
                    </motion.div>

                    <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
                    <p className="text-white/80">Jazakallahu khair for applying</p>
                </div>

                {/* Content */}
                <div className="px-8 py-6 space-y-6 flex-1 overflow-y-auto">
                    <div className="text-center">
                        <div className="text-3xl mb-2">{scoreInfo.icon}</div>
                        <h3 className={`text-xl font-semibold ${scoreInfo.color} mb-2`}>
                            {scoreInfo.message}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Your application for <strong>{result.positionTitle}</strong> has been received.
                        </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Application ID</span>
                            <span className="font-mono text-sm font-medium">{result.applicationId}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Candidate</span>
                            <span className="text-sm font-medium">{result.applicantName}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Score</span>
                            <div className="flex items-center space-x-2">
                                <MdStar className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm font-medium">{result.score}/100</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-lightblueactive/10 border border-lightblueactive/20 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                            <MdEmail className="w-5 h-5 text-lightblueactive mt-0.5" />
                            <div>
                                <h4 className="font-medium text-darkblue dark:text-white mb-1">
                                    Confirmation Email Sent
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    We've sent a confirmation email to <strong>{result.email}</strong> with your application details.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                        <p>Our team will review your application and get back to you soon.</p>
                        <p className="mt-1"><strong>Barakallahu feek!</strong></p>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-4 bg-gray-50 dark:bg-gray-800 text-center flex-shrink-0">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                    >
                        Close
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export type { SubmissionResult };