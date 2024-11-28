"use client";

import Image from "next/image";
import { Review } from "../lib/reviews";
import reviewsData from "../lib/reviews";
import React from "react";
import {
    motion,
    useInView,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";

interface ReviewsSectionProps {
    title: string;
    source?: 'Google' | 'Upwork';
}

export function ReviewsSection({ title, source }: ReviewsSectionProps) {
    // Filter reviews based on isFeatured and source
    const reviews = reviewsData.filter(
        (review) => review.isFeatured && (!source || review.source === source)
    );

    return (

        <section className="flex flex-col items-center justify-center mt-[12rem] sm:mt-[5rem] max-w-[min(75rem,96svw)] tracking-tighter mx-auto">
            <motion.div className="mb-12 sm:mb-6 w-full text-center text-darkblue dark:text-white text-4xl xs:text-xl sm:text-2xl font-bold">
                {title}
            </motion.div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 gap-6 w-full">
                {reviews.map((review, index) => (
                    <ReviewCard key={index} review={review} />
                ))}
            </div>
            <a
                href="/reviews"
                className="mt-8 text-lightblueactive underline hover:text-lightbluehover"
            >
                View all reviews
            </a>
        </section>
    );
}

interface ReviewCardProps {
    review: Review;
}

import Link from "next/link";
import {FaStar} from "react-icons/fa";

function ReviewCard({ review }: ReviewCardProps) {
    const {
        name,
        position,
        company,
        companyLogo,
        profileImage,
        rating,
        comment,
        companyLink,
    } = review;

    return (
        <div className="bg-dimlightblue dark:bg-deepBlue rounded-[20px] p-8">
            <div className="flex mb-4">
                {profileImage ? (
                    <Image
                        src={profileImage}
                        alt={`${name}'s profile`}
                        height={50}
                        width={50}
                        className="h-12 w-12 rounded-2xl object-cover"
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
                {comment}
            </p>
            <div className="flex items-center mt-4 text-deepBlue dark:text-gray-200">
                {Array.from({ length: rating }).map((_, i) => (
                    <FaStar />
                ))}
            </div>
        </div>
    );
}

