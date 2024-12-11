"use client";

import Image from "next/image";
import { Review } from "../lib/reviews";
import reviewsData from "../lib/reviews";
import React, {useEffect, useRef, useState} from "react";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import {
    motion, useInView
} from "framer-motion";
import {FaArrowUpRightFromSquare} from "react-icons/fa6";
import {MdOutlineArrowOutward} from "react-icons/md";

interface ReviewsSectionProps {
    title: string;
    source?: 'Google' | 'Upwork';
    truncatedChars?: number;
    showAllReviewsLink?: boolean;
    showFeatured?: boolean;
}

export function ReviewsSection({ title, source, truncatedChars, showAllReviewsLink = false, showFeatured = false }: ReviewsSectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.05, once: true });
    // Filter reviews based on isFeatured and source
    const reviews = reviewsData.filter(
        (review) =>
            (!showFeatured || review.isFeatured) &&
            (!source || review.source === source)
    );

    if (reviews.length === 0) return null;
    return (

        <motion.section
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center max-w-[min(75rem,96svw)] sm:max-w-[100%] sm:px-6 tracking-tighter mx-auto">
            <div className="flex justify-between items-center mb-12 sm:mb-6 w-full mt-8">
                <motion.div className="w-full text-darkblue dark:text-white text-3xl xs:text-xl sm:text-2xl font-bold">
                    {title}
                </motion.div>
                {showAllReviewsLink && (
                    <Link
                        href="/reviews"
                        className="text-darkblue dark:text-white whitespace-nowrap transition-all duration-300 text-xl md:text-lg underlined"
                    >
                        View all reviews
                    </Link>
                )}
            </div>

            <div
                className="columns-3 lg:columns-2 md:columns-1 w-full box-border w-full">
                {reviews.map((review, index) => (
                    <ReviewCard key={index} review={review} truncatedChars={truncatedChars || 999}/>
                ))}
            </div>
        </motion.section>
    );
}

interface ReviewCardProps {
    review: Review;
    truncatedChars?: number; // Optional prop for truncating the comment
}

export function ReviewCard({ review, truncatedChars }: ReviewCardProps) {
    const [isImageValid, setIsImageValid] = useState(true);
    const [isCompanyImageValid, setIsCompanyImageValid] = useState(true);

    const {
        name,
        position,
        company,
        companyLogo,
        profileImage,
        rating,
        comment,
        companyLink,
        link, // New property
    } = review;

    // Truncate the comment if truncatedChars is provided
    const truncatedComment =
        truncatedChars && comment.length > truncatedChars
            ? comment.slice(0, truncatedChars) + "..."
            : comment;

    return (
        <div className="break-inside-avoid relative bg-pastelBlue dark:bg-deepBlue rounded-[20px] mb-3 p-8">
            {link && (
                <Link
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 text-darkblue dark:text-white transition-transform duration-300 ease-in-out hover:translate-x-2 hover:-translate-y-1 hover:text-blue-500"
                >
                    <MdOutlineArrowOutward className="text-3xl"/>
                </Link>
            )}
            <div className="flex mb-4">
                {profileImage && isImageValid ? (
                    <Image
                        src={profileImage}
                        alt={`${name}'s profile`}
                        height={50}
                        width={50}
                        className="h-16 w-16 rounded-2xl object-cover"
                        onError={() => setIsImageValid(false)}
                    />
                ) : (
                    <div className="h-16 w-16 rounded-2xl bg-darkblue dark:bg-lightbg2 text-white text-2xl flex items-center justify-center">
                        {name.charAt(0)}
                    </div>
                )}
                <div className="ml-4 flex flex-col gap-1">
                    {companyLogo && isCompanyImageValid ? (
                        companyLink ? (
                            <Link href={companyLink} target="_blank">
                                <Image
                                    src={companyLogo}
                                    alt={`${company}`}
                                    height={100}
                                    width={200}
                                    className="h-6 w-auto brightness-0 cursor-pointer dark:grayscale-0 dark:invert"
                                    onError={() => setIsCompanyImageValid(false)}
                                />
                            </Link>
                        ) : (
                            <Image
                                src={companyLogo}
                                alt={`${company}`}
                                height={100}
                                width={200}
                                className="h-5 brightness-0 dark:grayscale-0 dark:invert"
                                onError={() => setIsCompanyImageValid(false)}
                            />
                        )
                    ) : null}
                    <h2 className="text-darkblue dark:text-white font-semibold">
                        {name}
                    </h2>
                    <p className="text-darkblue dark:text-gray-400 text-sm">
                        {!position && !company ? null : (
                            <>
                            {position}
                        {!companyLogo || !isCompanyImageValid? (
                            companyLink ? (
                            <>
                        {" "}
                            at{" "}
                            <Link href={companyLink} className="font-bold">
                        {company}
                            </Link>
                            </>
                            ) : (
                            <>
                        {" "}
                            at <span className="font-bold">{company}</span>
                            </>
                            )
                            ) : null}
                            </>
                        )}

                    </p>
                </div>
            </div>
            <p className="lg:text-base dark:text-gray-300">
                {truncatedComment}
            </p>
            <div className="flex items-center mt-4 text-deepBlue dark:text-gray-200">
                {Array.from({ length: rating }).map((_, i) => (
                    <FaStar key={i} />
                ))}
            </div>
        </div>
    );
}
