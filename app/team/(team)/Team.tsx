"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Member from "./Member";
import {
  FaLinkedin,
  FaGithub,
  FaBehance,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";

type SocialLink = {
  platform: string;
  url: string;
};

type IMember = {
  id: number;
  name: string;
  role: string;
  description: string;
  picture: string;
  socialLinks?: SocialLink[];
};

const members: IMember[] = [
  {
    id: 1,
    name: "Amin Dhouib",
    role: "CEO",
    description:
        "As Devino’s visionary founder, Amin’s motto is simple: create value, and it will come back full circle. With a solid foundation in software engineering, Amin leads with passion, connecting ideas and people. In his free time, he’s a motivational speaker, a sports enthusiast, and an advocate for growth through collaboration.",
    picture: "amin",
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/amin-dhouib" },
      { platform: "github", url: "https://github.com/amindhouib" },
    ],
  },
  {
    id: 2,
    name: "Med Amine K’haili",
    role: "Full Stack Software Engineer",
    description:
        "By day, he’s a full-stack engineer; by night, a gamer and fitness buff. Amine’s drive to conquer challenges and crush deadlines is only matched by his unique flair for innovation.",
    picture: "amine",
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/medaminekhaili" },
      { platform: "github", url: "https://github.com/medaminekhaili" },
    ],
  },
  {
    id: 3,
    name: "Aladdin Bensalah",
    role: "Full Stack & UI/UX Engineer",
    description:
        "Aladdin has three ‘wishes’: to code, to design, and to craft unforgettable web experiences. With each project, he works his magic to deliver captivating, seamless digital journeys. When it comes to web wizardry, Aladdin’s spells are second to none.",
    picture: "aladdin",
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/aladdin-bensalah" },
      { platform: "github", url: "https://github.com/aladdinbensalah" },
    ],
  },
  {
    id: 4,
    name: "Jedidiah Amaraegbu",
    role: "Full Stack Software Engineer",
    description:
        "Known for his laser-sharp focus and knack for organization, Jedidiah is the team’s reliability powerhouse. Adaptable and detail-oriented, he’s committed to delivering top-notch results, every time. If precision is key, Jedidiah’s got it covered.",
    picture: "jedidiah",
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/jedidiah-amaraegbu" },
    ],
  },
  {
    id: 5,
    name: "Ala Bouali",
    role: "Cybersecurity Engineer",
    description:
        "This cybersecurity expert is our digital guardian, known for discovering critical vulnerabilities and building the popular Bane Python library. With a passion for iron-clad security, Ala ensures that every piece of software we create is as secure as it is powerful.",
    picture: "ala",
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/ala-bouali" },
      { platform: "github", url: "https://github.com/alabouali" },
    ],
  },
  {
    id: 6,
    name: "Chedli Ghorbel",
    role: "AI & Web Automations Engineer",
    description:
        "A part-time chess player when he's not looking for bugs, you'll always find him playing chess. As an AI expert, we won't be surprised if he made an AI model to replace his job so he can enjoy playing chess more.",
    picture: "chedli",
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/chedli-ghorbel" },
      { platform: "github", url: "https://github.com/chedlighorbel" },
    ],
  },
  {
    id: 7,
    name: "Maryem Bouchiba",
    role: "Marketing & Design Specialist",
    description:
        "A creative powerhouse, Maryem is a filmmaker, advertising expert, and design virtuoso. With her keen eye for detail, she brings cinematic flair to every project, turning even the simplest concepts into visually captivating stories. For Maryem, creativity knows no bounds.",
    picture: "maryem",
    socialLinks: [
      { platform: "behance", url: "https://behance.net/maryembouchiba" },
      { platform: "instagram", url: "https://instagram.com/maryembouchiba" },
    ],
  },
];

const platformIcons = {
  linkedin: FaLinkedin,
  github: FaGithub,
  behance: FaBehance,
  instagram: FaInstagram,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  website: AiOutlineGlobal,
};

export default function Team() {
  const [isOpen, setIsOpen] = useState(false);
  const [memberData, setMemberData] = useState<IMember | null>(null);
  const [openId, setOpenId] = useState<number | null>(null);

  const handleMouseEnter = (member: IMember) => {
    if (memberData?.id === member.id) {
      handleMouseLeave();
    } else {
      setMemberData(member);
      setOpenId(member.id);
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    setMemberData(null);
    setOpenId(null);
  };

  return (
      <section className="py-[2rem] tracking-tighter max-w-[min(75rem,96svw)] mx-auto">
        <div className="grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 m-20 sm:m-10 gap-10">
          {members.map((member) => (
              <motion.div
                  key={member.id}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleMouseEnter(member)}
                  onMouseEnter={() => handleMouseEnter(member)}
                  className="relative flex flex-col"
              >
                <Member member={member} openId={openId} />

                <AnimatePresence>
                  {isOpen && memberData?.id === member.id && (
                      <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "fit-content", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-lg border-l-2 border-r-2 border-b-2 text-center p-4 pt-0 bg-white rounded-bl-lg rounded-br-lg shadow-lg z-[1000] absolute left-0 right-0 top-[100%] h-fit w-full overflow-hidden scale-105"
                      >
                        <div className="flex justify-center gap-2 my-2">
                          {member.socialLinks?.map((link, index) => {
                            const Icon = platformIcons[link.platform.toLowerCase() as keyof typeof platformIcons];
                            return (
                                Icon && (
                                    <a
                                        key={index}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition-all"
                                    >
                                      <Icon className="w-5 h-5" />
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
          ))}
        </div>
      </section>
  );
}
