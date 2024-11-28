import { Link } from "next/link"; // Or whatever router you're using
import { FaComments } from "react-icons/fa"; // Example meaningful icon

 const FancyButton = ({ isInView }: { isInView: boolean }) => (
    <Link
        href="https://calendly.com/amin-dhouib"
        className="relative z-30 inline-flex items-center justify-center w-auto px-7 py-3.5 sm:px-5 sm:py-3 md:px-6 md:py-3 font-semibold text-white text-[22px] sm:text-lg md:text-xl rounded-[28px] bg-skybg dark:bg-white dark:text-skybg dark:border-transparent border border-lightblue transition-all duration-300 group ring-1 ring-lightblue ring-offset-2 ring-offset-skybg hover:ring-offset-lightblue ease focus:outline-none mt-8"
        target="_blank"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.25 }}
    >
        {/* Background Effects */}
        <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
        <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>

        {/* Icon and Text */}
        <span className="relative z-20 flex items-center">
      <FaComments className="mr-2 w-5 h-5" />
      Let’s talk
    </span>
    </Link>
);

export default FancyButton;
