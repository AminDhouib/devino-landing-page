"use client";

import Image from "next/image";
import { Review } from "../lib/reviews";
import reviewsData from "../lib/reviews";
import React from "react";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import {
    motion
} from "framer-motion";

interface ReviewsSectionProps {
    title: string;
    source?: 'Google' | 'Upwork';
    truncatedChars?: number;
}

export function ReviewsSection({ title, source, truncatedChars }: ReviewsSectionProps) {
    // Filter reviews based on isFeatured and source
    const reviews = reviewsData.filter(
        (review) => review.isFeatured && (!source || review.source === source)
    );

    return (

        <section className="flex flex-col items-center justify-center mt-[12rem] sm:mt-[5rem] max-w-[min(75rem,96svw)] tracking-tighter mx-auto">
            <motion.div className="mb-12 sm:mb-6 w-full text-center text-darkblue dark:text-white text-4xl xs:text-xl sm:text-2xl font-bold">
                {title}
            </motion.div>
            <div className="columns-3 w-full p-4 box-border  w-full">
                {reviews.map((review, index) => (
                    <ReviewCard key={index} review={review} truncatedChars={truncatedChars || 999}/>
                ))}
            </div>
            <Link
                href="/reviews"
                className="bg-lightblueactive text-white mt-8 dark:bg-white dark:text-darkblue whitespace-nowrap py-3 px-10 md:px-8 items-center hover:scale-105 uppercase font-mono w-max tracking-wide transition-all duration-300 rounded-[40px] font-semibold text-xl md:text-lg"
            >
                View all reviews
            </Link>
        </section>
    );
}

interface ReviewCardProps {
    review: Review;
    truncatedChars?: number; // Optional prop for truncating the comment
}

export function ReviewCard({ review, truncatedChars }: ReviewCardProps) {
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
        <div className="break-inside-avoid relative bg-dimlightblue dark:bg-deepBlue rounded-[20px] mb-3 p-8">
            {/* Link icon */}
      {/*      {link && (
                <Link
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 text-darkblue dark:text-white"
                >
                    <FaArrowUpRightFromSquare className="text-xl" />
                </Link>
            )}*/}

            <div className="flex mb-4">
                {profileImage ? (
                    <Image
                        src={profileImage}
                        alt={`${name}'s profile`}
                        height={50}
                        width={50}
                        className="h-16 w-16 rounded-2xl object-cover"
                    />
                ) : (
                    <div className="h-16 w-16 rounded-2xl bg-darkblue dark:bg-lightbg2 text-white text-2xl flex items-center justify-center">
                        {name.charAt(0)}
                    </div>
                )}
                <div className="ml-4 flex flex-col gap-1">
                    {companyLogo ? (
                        companyLink ? (
                            <Link href={companyLink}>
                                <Image
                                    src={companyLogo}
                                    alt={`${company} logo`}
                                    height={50}
                                    width={50}
                                    className="h-6 w-auto grayscale invert dark:brightness-[0] cursor-pointer"
                                />
                            </Link>
                        ) : (
                            <Image
                                src={companyLogo}
                                alt={`${company} logo`}
                                height={50}
                                width={50}
                                className="h-5 grayscale brightness-[100] invert dark:brightness-[0]"
                            />
                        )
                    ) : null}
                    <h2 className="text-darkblue dark:text-white font-semibold">
                        {name}
                    </h2>
                    <p className="text-darkblue dark:text-gray-400 text-sm">
                        {position}
                        {!companyLogo ? (
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
                                    at {company}
                                </>
                            )
                        ) : null}
                    </p>
                </div>
            </div>
            <p className="text-lg font-medium lg:text-base dark:text-gray-300">
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
