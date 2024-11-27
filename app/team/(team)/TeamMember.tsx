import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, FC } from "react";
import {
    FaLinkedin,
    FaGithub,
    FaBehance,
    FaInstagram,
    FaYoutube,
    FaTiktok,
} from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";

const platformIcons = {
    linkedin: FaLinkedin,
    github: FaGithub,
    behance: FaBehance,
    instagram: FaInstagram,
    youtube: FaYoutube,
    tiktok: FaTiktok,
    website: AiOutlineGlobal,
};

interface SocialLink {
    platform: string;
    url: string;
}

interface ITeamMember {
    id: number;
    name: string;
    role: string;
    description: string;
    picture: string;
    socialLinks?: SocialLink[];
}

const TeamMember: FC<{ member: ITeamMember, index: number }> = ({ member, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            style={{ zIndex: 40 - index }}
            className={`relative dark:bg-deepBlue dark:border-darkblue flex flex-col items-center cursor-pointer rounded-lg border-2 transition-all duration-300 ease-in-out ${
                isOpen ? "scale-105 border-b-0" : "scale-100"
            } `}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            onClick={() => setIsOpen(!isOpen)}
        >
            <Image
                src={`/team/${member.picture}.png`}
                alt={`${member.name} picture`}
                height={366}
                width={366}
                className={`w-full shadow-lg ${!isOpen ? "filter grayscale" : ""}`}
            />
            <div className="mt-2 text-center p-1 pb-3">
                <h2 className="my-2 font-bold text-2xl sm:text-xl dark:text-white">
                    {member.name}
                </h2>
                <span className="text-xl sm:text-lg dark:text-gray-400">
          {member.role}
        </span>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "fit-content", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-lg border-l-2 border-r-2 border-b-2 text-center p-4 pt-2 bg-white rounded-bl-lg rounded-br-lg shadow-lg absolute -left-[2px] -right-[2px] top-[99%] h-fit w-[calc(2px + 100%)] dark:bg-deepBlue dark:text-white dark:border-darkblue"
                    >
                        <div className="h-[1px] bg-gray-300 w-[50%] mx-auto mt-3"></div>
                        <div className="flex justify-center gap-2 my-3">
                            {member.socialLinks?.map((link, index) => {
                                const Icon =
                                    platformIcons[
                                        link.platform.toLowerCase() as keyof typeof platformIcons
                                        ];
                                return (
                                    Icon && (
                                        <a
                                            key={index}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-xl dark:bg-opacity-100 bg-darkblue bg-opacity-10 hover:bg-opacity-20 transition-all"
                                        >
                                            <Icon className="w-4 h-4 text-darkblue dark:text-white" />
                                        </a>
                                    )
                                );
                            })}
                        </div>
                        <p>{member.description}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default TeamMember;
