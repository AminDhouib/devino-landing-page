import { motion } from "framer-motion";
import Image from "next/image";
import {FC, useEffect, useState} from "react";

interface IMember {
    id: number;
    name: string;
    role: string;
    description: string;
    picture: string;
}
type Props = {
    member: IMember;
    openId: number | null;
}
const Member: FC<Props> = ({
                                            member,
                                            openId,
                                            }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [ableToLeave, setAbleToLeave] = useState(false);

    useEffect(() => {
        console.log(openId)
        setAbleToLeave(openId != member.id)
        if(openId != member.id) setIsOpen(false);
    }, [openId]);
    return (
        <motion.div
            className={`flex flex-col items-center cursor-pointer rounded-lg border-2 transition-all duration-300 ease-in-out ${isOpen && "scale-105 border-b-0 z-0"}`}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => ableToLeave && setIsOpen(false)}
            onClick={() => (!isOpen || ableToLeave) && setIsOpen(!isOpen)}
        >
            <Image
                src={"/team/" + member.picture + ".png"}
                alt={member.name + "picture"}
                height={366}
                width={366}
                className={`w-full shadow-lg ${!isOpen && "filter grayscale"}`}
            />
            <motion.div className={`mt-2 text-center p-1 pb-3`}>
                <h2 className="my-2 font-bold text-2xl sm:text-xl">{member.name}</h2>
                <span className="text-xl sm:text-lg">{member.role}</span>
            </motion.div>
        </motion.div>
    );
}

export default Member
