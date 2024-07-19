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
      "Founder and CEO of Devino with a bachelor's degree in Software Engineering. In his free time, he is a motivational speaker, plays sports, and loves to spend time networking and connecting with people. His core business philosophy: Bring value to others and hopefully value will eventually come back your way.",
    picture: "amin",
  },
  {
    id: 2,
    name: "Med Amine K’haili",
    role: "Full Stack Software Engineer",
    description:
      "Software engineer by day, gaming aficionado by night, and gym rat on weekends. Passionate about coding, conquering challenges, and embracing the occasional craziness. Introverted yet fun-loving, He thrives on getting things done with precision and meeting deadlines like a pro.",
    picture: "MedAmine",
  },
  {
    id: 3,
    name: "Sofien Hafdhi",
    role: "Full Stack Software Engineer",
    description:
      "Software Engineer and a full-time geek. He's a tech enthusiast, a coding wizard, and a problem-solving ninja. When he's not coding, he's probably gaming, reading, or watching anime.",
    picture: "sofien",
  },
  {
    id: 4,
    name: "Chedli Ghorbel",
    role: "AI & Web Automations Engineer",
    description:
      "A part time chess player when he's not looking for bugs, you'll always find him playing chess. He's also an ai enthusiast so we won't be surprised if he made an AI model to replace his job so he can enjoy playing chess more.",
    picture: "chedli",
  },
  {
    id: 5,
    name: "Omayma Korbi",
    role: "UI/UX Designer",
    description:
      "She is the graphic guru by day, coding wizard by moonlight, sales maestro in the afternoon, and social media sorcerer by night. Multitasking is her cardio, and she has more hats than a magician's rabbit. 🎩 Music and singing are her jam, and she's as addicted to nature as a squirrel to acorns. Catch her if you can – she's got a bubbly energy that rivals a shaken soda bottle! ✨",
    picture: "omayma",
  },
  {
    id: 6,
    name: "Maryem Bouchiba",
    role: "Marketing & Design Specialist",
    description:
      "Filmmaker, Advertising Specialist and Video Editor. She spent 48hrs working non-stop for fun.\n" +
      "She has great cinematography skills, even using her old iPhone -5, Llamas, Critics and Skateboard lover. \n" +
      "She's a Realism portrait and Mosaic artist.",
    picture: "mariem",
  },
  {
    id: 7,
    name: "Emaan Shakil",
    role: "Marketing & Design Specialist",
    description:
      "You will catch her behind the scenes making your feed pop by waving her editing wand to turn 'meh' into 'wow'. Your content maestro, composing viral magic with every edit! She is constantly Insta stalking for the next perfect content.\n" +
      "Meet ups? Sure! Phone calls? Let's just say she has got a built-in 'call aversion' button. Don't give her that look, she can make an exception for you! She loves capturing moments, exploring new places, watching F.R.I.E.N.D.S on repeat and of course chocolate!",
    picture: "emaan",
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
