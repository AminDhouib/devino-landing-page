"use client";

import { AnimatePresence, motion } from "framer-motion";
import Member from "./Member";
import { useState } from "react";
type IMember = {
  id: number;
  name: string;
  role: string;
  description: string;
  picture: string;
};
const members: IMember[] = [
  {
    id: 1,
    name: "Amin Dhouib",
    role: "CEO",
    description:
      "As Devino’s visionary founder, Amin’s motto is simple: create value, and it will come back full circle. With a solid foundation in software engineering, Amin leads with passion, connecting ideas and people. In his free time, he’s a motivional speaker, a sports enthusiast, and an advocate for growth through collaboration.",
    picture: "amin",
  },
  {
    id: 2,
    name: "Med Amine K’haili",
    role: "Full Stack Software Engineer",
    description:
      "By day, he’s a full-stack engineer; by night, a gamer and fitness buff. Amine’s drive to conquer challenges and crush deadlines is only matched by his unique flair for innovation.",
    picture: "amine",
  },
  {
    id: 3,
    name: "Aladdin Bensalah",
    role: "Full Stack & UI/UX Engineer",
    description:
      "Aladdin has three ‘wishes’: to code, to design, and to craft unforgettable web experiences. With each project, he works his magic to deliver captivating, seamless digital journeys. When it comes to web wizardry, Aladdin’s spells are second to none.",
    picture: "aladdin",
  },
  {
    id: 4,
    name: "Jedidiah Amaraegbu",
    role: "Full Stack Software Engineer",
    description:
      "Known for his laser-sharp focus and knack for organization, Jedidiah is the team’s reliability powerhouse. Adaptable and detail-oriented, he’s committed to delivering top-notch results, every time. If precision is key, Jedidiah’s got it covered.",
    picture: "jedidiah",
  },
  {
    id: 5,
    name: "Ala Bouali",
    role: "Cybersecurity Engineer",
    description:
      "This cybersecurity expert is our digital guardian, known for discovering critical vulnerabilities and building the popular Bane Python library. With a passion for iron-clad security, Ala ensures that every piece of software we create is as secure as it is powerful.",
    picture: "ala",
  },
  {
    id: 6,
    name: "Chedli Ghorbel",
    role: "AI & Web Automations Engineer",
    description:
      "A part time chess player when he's not looking for bugs, you'll always find him playing chess. As an AI expert, we won't be surprised if he made an AI model to replace his job so he can enjoy playing chess more.",
    picture: "chedli",
  },
  {
    id: 7,
    name: "Maryem Bouchiba",
    role: "Marketing & Design Specialist",
    description:
      "A creative powerhouse, Maryem is a filmmaker, advertising expert, and design virtuoso. With her keen eye for detail, she brings cinematic flair to every project, turning even the simplest concepts into visually captivating stories. For Maryem, creativity knows no bounds.",
    picture: "maryem",
  },
];
export default function Team() {
  const [isOpen, setIsOpen] = useState(false);
  const [memberData, setMemberData] = useState<IMember | null>(null);
  const [openId, setOpenId] = useState<number | null>(null);

  const handleMouseEnter = (member: IMember) => {
    if (memberData?.id == member.id) {
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
        {members.map((member, key) => (
          <motion.div
            key={key}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleMouseEnter(member)}
            onMouseEnter={() => handleMouseEnter(member)}
            className="relative flex flex-col"
          >
            <Member member={member} openId={openId} />

            <AnimatePresence>
              {isOpen && memberData?.id == member.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "fit-content", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-lg mt-[135%] border-l-2 border-r-2 border-b-2 text-center p-4 bg-white rounded-bl-lg rounded-br-lg  shadow-lg z-50 absolute h-fit w-full overflow-hidden scale-105"
                >
                  {member.description}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
