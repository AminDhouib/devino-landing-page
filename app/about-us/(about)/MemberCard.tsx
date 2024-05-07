import I from "next/image";
import { motion, useInView } from "framer-motion";
import L from "next/link";
import { FaAt, FaGithub, FaLinkedin } from "react-icons/fa6";
import { useRef } from "react";

const Link = motion(L);
const Image = motion(I);

type Props = {
  member: {
    name: string;
    position: string;
    image: string;
    linkedin: string;
    github: string;
    email: string;
  };
  i: number;
};

const containerAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  hover: {},
};

const imageAnimation = {
  initial: { scale: 1, rotate: 0 },
  animate: {},
  hover: { scale: 1.1, rotate: -1 },
};

const infoAnimation = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 0, y: 50 },
  hover: { y: 0, opacity: 1 },
};

const socialButtonAnimation = {
  initial: { opacity: 0, x: 0 },
  animate: { opacity: 1, x: 80 },
  hover: { x: 0 },
};

const socialIcons = [
  { icon: FaLinkedin, link: "" },
  { icon: FaGithub, link: "" },
  { icon: FaAt, link: "" },
];

const transition = { type: "spring", damping: 10, stiffness: 150 };

export default function MemberCard({ member, i }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.1, once: true });

  const { name, position, image, linkedin, github, email } = member;
  const socialLinks = [linkedin, github, email];

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      whileHover="hover"
      variants={containerAnimation}
      transition={{ ...transition, delay: i * 0.03 }}
      className="bg-white flex flex-col justify-between rounded-2xl w-full h-[20rem] relative overflow-hidden"
    >
      <Image
        variants={imageAnimation}
        transition={{ ...transition }}
        src={`/team/${image}`}
        height={1000}
        width={1000}
        alt={name}
        className="rounded-2xl w-full h-full object-cover"
      />
      <motion.div
        variants={infoAnimation}
        transition={{ ...transition }}
        className="absolute bg-white bg-opacity-50 bottom-2 left-[2.5%] w-[95%] p-4 backdrop-blur-3xl rounded-2xl shadow-md"
      >
        <p className="text-xl font-bold">{name}</p>
        <p className="text-xl font-semibold">{position}</p>
      </motion.div>

      <div className="flex items-center justify-between flex-col absolute top-6 right-6 gap-3">
        {socialLinks.map((link, j) => {
          const Icon = socialIcons[j].icon;
          return (
            <Link
              key={"social-link-" + i + link + j}
              href={link}
              variants={socialButtonAnimation}
              transition={{ ...transition, delay: j * 0.1 }}
              className="bg-white p-2 rounded-2xl text-lg bg-opacity-35 backdrop-blur-3xl"
            >
              <Icon />
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
