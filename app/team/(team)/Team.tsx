"use client";

import {AnimatePresence, motion} from "framer-motion";
import Member from "./Member";
import {useState} from "react";
type IMember = {
  id: number;
  name: string;
  role: string;
  description: string;
  picture: string;
};
const members: IMember[] = [
  { id: 1, name: "Amin Dhouib", role: "CEO", description: "Founder and CEO of Devino with a bachelor's degree in Software Engineering. In his free time, he is a motivational speaker, plays sports, and loves to spend time networking and connecting with people. His core business philosophy: Bring value to others and hopefully value will eventually come back your way.", picture: "amin" },
  {
    id: 2, name: "Mohamed Bechir Mejri",
    role: "CTO",
    description: "He's a tech enthusiast and dynamic leader with over 16,000 GitHub commits, illustrating his passion for technology. Efficiently blending leadership with technical prowess. Driven by a love for aesthetic UIs, he aims to top the Awwwards with a new website. Beyond work, he enjoys organizing internet data and humorously ventures into cooking, often with mixed results.",
    picture: "bechir",
  },
  { id: 3, name: "Dhia Dahmeni", role: "Tech Lead", description: "Installed Linux in his router and his coffee machine (seriously), won his first hackathon, Has a cockatiel parrot and rides e-bikes everywhere", picture: "dhia" },
  {
    id: 4, name: "Omayma Korbi",
    role: "Product Manager",
    description: "She is the graphic guru by day, coding wizard by moonlight, sales maestro in the afternoon, and social media sorcerer by night. Multitasking is her cardio, and she has more hats than a magician's rabbit. 🎩 Music and singing are her jam, and she's as addicted to nature as a squirrel to acorns. Catch her if you can – she's got a bubbly energy that rivals a shaken soda bottle! ✨",
    picture: "omayma",
  },
  {
    id: 5, name: "Med Amine K’haili",
    role: "Engineer",
    description: "Software engineer by day, gaming aficionado by night, and gym rat on weekends. Passionate about coding, conquering challenges, and embracing the occasional craziness. Introverted yet fun-loving, He thrives on getting things done with precision and meeting deadlines like a pro.",
    picture: "MedAmine",
  },
  {
    id: 6, name: "Ahmed Mabrouk",
    role: "Engineer",
    description: "Frontend Engineer crafting beautiful user experiences, yet his craft blooms globally. When he steps away from the keyboard, he dives into the thrill of competition, mastering challenges in both the online world and the great outdoors. And let me tell you, his headphones are practically glued on, blasting rap from sunup to sundown. It's all about those beats and bars fueling his creative magic.",
    picture: "ahmed",
  },
  {
    id: 7, name: "Mohamed ali Krifa",
    role: "UX/UI Designer",
    description: "He is a  UI/UX Designer and frontend developer, he combines creativity with technology. Outside of the screen, he enjoys fitness, taking part in outdoor activities and gym. Besides creating awesome user experience he knows well how to light his campfire.",
    picture: "dali",
  },
  { id: 8, name: "Chedli Ghorbel", role: "Engineer", description: "A part time chess player when he's not looking for bugs, you'll always find him playing chess. He's also an ai enthusiast so we won't be surprised if he made an AI model to replace his job so he can enjoy playing chess more.", picture: "chedli" },
  { id: 9, name: "Maryem Bouchiba", role: "Editor", description: "Filmmaker, Advertising Specialist and Video Editor. She spent 48hrs working non-stop for fun.\n" +
        "She has great cinematography skills, even using her old iPhone -5, Llamas, Critics and Skateboard lover. \n" +
        "She's a Realism portrait and Mosaic artist.", picture: "mariem" },
  { id: 10, name: "Eman Shakil", role: "Editor", description: "You will catch her behind the scenes making your feed pop by waving her editing wand to turn 'meh' into 'wow'. Your content maestro, composing viral magic with every edit! She is constantly Insta stalking for the next perfect content.\n" +
        "Meet ups? Sure! Phone calls? Let's just say she has got a built-in 'call aversion' button. Don't give her that look, she can make an exception for you! She loves capturing moments, exploring new places, watching F.R.I.E.N.D.S on repeat and of course chocolate!", picture: "emaan" },
];
export default function Team() {
  const [isOpen, setIsOpen] = useState(false);
  const [memberData, setMemberData] = useState<IMember | null>(null);
  const [openId, setOpenId] = useState<number | null>(null);

  const handleMouseEnter = (member: IMember) => {
    if(memberData?.id == member.id) {
      handleMouseLeave();
    } else {
      setMemberData(member);
      setOpenId(member.id);
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    setMemberData(null)
    setOpenId(null);
  };

  return (
      <section
          className="py-[2rem] tracking-tighter max-w-[min(75rem,96svw)] mx-auto"
      >
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
                        className="text-lg mt-[135%] border-l-2 border-r-2 border-b-2 text-center p-4 bg-white rounded-bl-lg rounded-br-lg  shadow-lg z-50 absolute h-fit w-full overflow-hidden scale-105">
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