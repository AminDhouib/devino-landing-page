"use client";

//TODO: This file seems to do nothing. Needs to be removed.

import MemberCard from "./MemberCard";

const team = [
  {
    name: "Amin Dhouib",
    position: "CEO",
    image: "amin.jpeg",
    linkedin: "",
    github: "",
    email: "",
    bio: "",
    skills: [],
  },
  {
    name: "Chedli",
    position: "Software engineer",
    image: "chedli.jpg",
    linkedin: "",
    github: "",
    email: "",
    bio: "",
    skills: [],
  },
  {
    name: "Mohamed Amine",
    position: "Software Engineer",
    image: "MedAmine.jpeg",
    linkedin: "",
    github: "",
    email: "",
    bio: "",
    skills: [],
  },
  {
    name: "Mery",
    position: "Graphic Designer",
    image: "mery.jpg",
    linkedin: "",
    github: "",
    email: "",
    bio: "",
    skills: [],
  },
];

export default function Team() {
  return (
    <section className="flex items-center justify-center flex-col text-2xl font-medium pt-[7rem] tracking-tighter max-w-[min(75rem,96svw)] mx-auto w-full">
      <div className="flex flex-col gap-16 items-center w-full">
        <h1 className="text-5xl font-bold">Our team</h1>
        <div className="grid grid-cols-5 lg:grid-cols-2 sm:grid-cols-1 gap-2 text-[#1d1e22] w-full p-8">
          {team.map((member, i) => (
            <MemberCard key={member.name + i} member={member} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
