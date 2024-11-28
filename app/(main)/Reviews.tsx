import {ReviewsSection} from "~/app/(main)/ReviewsSection";
import {motion, useInView} from "framer-motion";
import React, {useRef} from "react";

export default function Reviews() {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.15, once: true });
    return (
        <div className="mt-[12rem] sm:mt-[5rem] md:px-6">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="mb-12 sm:mb-6 w-full text-center text-darkblue dark:text-white">
                <h2 className="text-4xl xs:text-xl sm:text-2xl font-bold">Why Clients Love Us</h2>
                <p>Don’t take a word for it. See what our partners have to say about us</p>
            </motion.div>
            <ReviewsSection title="Google Reviews" source="Google" truncatedChars={200} showFeatured={true} showAllReviewsLink={true}/>
            <ReviewsSection title="Upwork Reviews" source="Upwork" truncatedChars={150} showFeatured={true} showAllReviewsLink={true}/>
        </div>
    );
}