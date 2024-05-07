"use client";

import {AnimatePresence, motion, useInView} from "framer-motion";
import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {useDrag} from "@use-gesture/react";
import {log} from "node:util";

const characteristics = [
  { name: "Top Tech skills", inHouse: true, devino: true, freelance: true, vendor: true },
  { name: "Full-time engagement", inHouse: true, devino: true, freelance: true, vendor: true },
  { name: "Complete control over your project", inHouse: true, devino: true, freelance: true, vendor: true },
  { name: "Quick recruitment and onboarding", inHouse: false, devino: true, freelance: true, vendor: false },
  { name: "No overhead costs", inHouse: false, devino: true, freelance: false, vendor: false },
  { name: "No operational burden", inHouse: false, devino: true, freelance: false, vendor: false },
  { name: "Fast team scaling", inHouse: false, devino: true, freelance: false, vendor: false },
  { name: "Easy to substitute", inHouse: false, devino: true, freelance: false, vendor: false },
  { name: "3-day FREE trial", inHouse: false, devino: true, freelance: false, vendor: false },
];

export default function Comparison() {
  const ref = useRef(null);
  const [shownIndex, setShownIndex] = useState(1);
  const [oldIndex, setOldIndex] = useState(1);
  const [allowAutoScroll, setAllowAutoScroll] = useState<boolean>(true);
  const isInView = useInView(ref, { amount: 0.35, once: true });
  useEffect(() => {
    if (!allowAutoScroll) return;
    const interval = setInterval(() => {
      setOldIndex(shownIndex);
      setShownIndex((shownIndex) => (shownIndex === 3 ? 1 : shownIndex + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [shownIndex]);


  const bind = useDrag(
      ({ down, movement: [x] }) => {
        setAllowAutoScroll(false)
        setOldIndex(shownIndex);
        if (down && x > 7) {
          setShownIndex((shownIndex) => (shownIndex === 1 ? 3 : shownIndex - 1));
        } else if (down && x < -7) {
          setShownIndex((shownIndex) => (shownIndex === 3 ? 1 : shownIndex + 1));
        }
      },
      { axis: 'x' },
  )
  return (
      <section
          ref={ref}
          className="w-full pt-[12rem] sm:pt-[6rem] sm:w-full flex flex-col items-center text-center max-w-[min(75rem,96svw)] overflow-hidden mx-auto gap-4 py-0"
      >
        <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 35 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="col-span-3 text-7xl text-darkblue md:text-3xl xs:text-2xl lg:text-6xl font-semibold leading-[1.2]"
        >
          How do we differ from in-house employees?
        </motion.h1>
        <motion.p
            initial={{opacity: 0, y: 35}}
            animate={{opacity: isInView ? 1 : 0, y: isInView ? 0 : 35}}
            transition={{duration: 0.6, ease: "easeInOut", delay: 0.05}}
            className="text-2xl sm:text-sm font-medium pb-8 my-4 sm:my-0"
        >
          Devino is like your in-house team, only without the operational <br/>
          burden and overhead costs.
        </motion.p>
        <motion.div
            initial={{opacity: 0, y: 35}}
            animate={{opacity: isInView ? 1 : 0, y: isInView ? 0 : 35}}
            transition={{duration: 0.6, ease: "easeInOut", delay: 0.06}}
            className="flex w-full px-3"
        >
          <table className="min-w-full bg-transparent">
            <thead>
            <tr>
              <th className="py-3 px-4 uppercase font-semibold text-sm"></th>
              <th className="py-3 px-4 uppercase font-semibold text-center sm:text-xs rounded-t-[40px] text-white bg-darkblue w-56 text-sm">
                <div className=" sm:w-fit sm:h-14 m-auto flex text-center">
                  <div className="m-auto">
                    Devino
                  </div>
                </div>
              </th>
              <th className={`py-3 px-4 uppercase font-semibold text-center sm:text-xs ${shownIndex !== 1 && "sm:hidden"} text-darkblue text-sm`}>
                <div className="sm:w-20 sm:h-14 flex text-center">
                  <div className="m-auto">
                    In House Engineer
                  </div>
                </div>
              </th>
              <th className={`py-3 px-4 uppercase font-semibold text-center sm:text-xs ${shownIndex !== 2 && "sm:hidden"} text-darkblue text-sm`}>
                <div className="sm:w-20 m-auto sm:h-14 flex text-center">
                  <div className="m-auto">
                    Freelance
                  </div>
                </div>
              </th>
              <th className={`py-3 px-4 uppercase font-semibold text-center sm:text-xs ${shownIndex !== 3 && "sm:hidden"} text-darkblue text-sm`}>
                <div className="sm:w-20 sm:h-14 flex text-center">
                  <div className="m-auto">
                    Outsourcing vendor
                  </div>
                </div>
              </th>
            </tr>
            </thead>
            <tbody className="text-gray-700">
            {characteristics.map((characteristic, index) => (
                <tr style={{ touchAction: 'none' }}
                    {...bind()} key={index} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
                  <td className={`md:text-xs text-left px-6 sm:px-4 shadow-[rgba(1,1,1,0.2)_2px_2px_2px_2px] ${index === characteristics.length - 1 ? "shadow-[rgba(1,1,1,0.2)_0px_2px_0px_0px] rounded-bl-[40px]" : index === 0 && "rounded-tl-[40px]"}`}>
                    <div className="sm:w-20">{characteristic.name}</div>
                  </td>
                  <td className={`${index % 2 === 0 ? "bg-lightbg2" : "bg-darkblue"}`}>
                    <div className={`py-3 px-4 flex justify-center sm:min-w-28 h-full w-full`}>
                      {characteristic.devino ? (<Image width="20" className="m-auto" height="20" src="/tick.svg" alt="✔"/>) : (<Image className="m-auto" width="20" height="20"  src="/x_mark.svg" alt="✘"/>)}
                    </div>
                  </td>
                  <AnimatePresence>
                    {shownIndex === 1 && (
                        <motion.td
                            initial={{ x: oldIndex == 3 ? '200px' : "-200px", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            key={1}
                            className={`sm:table-cell hidden ${index === characteristics.length - 1 ? "shadow-[rgba(1,1,1,0.2)_2px_2px_0px_0px] rounded-br-[40px]" : index === 0 ? "rounded-tr-[40px] shadow-[rgba(1,1,1,0.2)_2px_0px_0px_0px]" : 'shadow-[rgba(1,1,1,0.2)_2px_0px_0px_0px]'}  py-3 px-4 ${index === characteristics.length - 1 && "shadow-[rgba(1,1,1,0.2)_0px_2px_0px_0px]"}`}>
                          {characteristic.inHouse ? (<Image width="20" className="mx-auto" height="20" src="/blue-tick.svg" alt="✔"/>) : (<Image className="mx-auto" width="20" height="20"  src="/x_mark.svg" alt="✘"/>)}

                        </motion.td>
                    )}
                    {shownIndex === 2 && (
                        <motion.td
                            initial={{ x: oldIndex == 3 ? '-200px' : "200px", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            key={2}
                            className={`sm:table-cell hidden ${index === characteristics.length - 1 ? "shadow-[rgba(1,1,1,0.2)_2px_2px_0px_0px] rounded-br-[40px]" : index === 0 ? "rounded-tr-[40px] shadow-[rgba(1,1,1,0.2)_2px_0px_0px_0px]" : 'shadow-[rgba(1,1,1,0.2)_2px_0px_0px_0px]'}  py-3 px-4 ${index === characteristics.length - 1 && "shadow-[rgba(1,1,1,0.2)_0px_2px_0px_0px]"}`}>{characteristic.freelance ? (<Image width="20" className="mx-auto" height="20" src="/blue-tick.svg" alt="✔"/>) : (<Image className="mx-auto" width="20" height="20"  src="/x_mark.svg" alt="✘"/>)}</motion.td>
                    )}
                    {shownIndex === 3 && (
                        <motion.td
                            initial={{ x: oldIndex == 1 ? '-200px' : "200px", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            key={3}
                            className={`sm:table-cell hidden ${index === characteristics.length - 1 ? "shadow-[rgba(1,1,1,0.2)_2px_2px_0px_0px] rounded-br-[40px]" : index === 0 ? "rounded-tr-[40px] shadow-[rgba(1,1,1,0.2)_2px_0px_0px_0px]" : 'shadow-[rgba(1,1,1,0.2)_2px_0px_0px_0px]'}  py-3 px-4 ${index === characteristics.length - 1 && "shadow-[rgba(1,1,1,0.2)_0px_2px_0px_0px]"}`}>{characteristic.vendor ? (<Image width="20" className="mx-auto" height="20" src="/blue-tick.svg" alt="✔"/>) : (<Image className="mx-auto" width="20" height="20"  src="/x_mark.svg" alt="✘"/>)}</motion.td>
                    )}
                  </AnimatePresence>

                  <td
                      className={`sm:hidden py-3 px-4 ${index === characteristics.length - 1 && "shadow-[rgba(1,1,1,0.2)_0px_2px_0px_0px]"}`}>{characteristic.inHouse ? (<Image width="20" className="mx-auto" height="20" src="/blue-tick.svg" alt="✔"/>) : (<Image className="mx-auto" width="20" height="20"  src="/x_mark.svg" alt="✘"/>)}</td>
                  <td
                      className={`sm:hidden py-3 px-4 ${index === characteristics.length - 1 && "shadow-[rgba(1,1,1,0.2)_0px_2px_0px_0px]"} `}>{characteristic.freelance ? (<Image width="20" className="mx-auto" height="20" src="/blue-tick.svg" alt="✔"/>) : (<Image className="mx-auto" width="20" height="20"  src="/x_mark.svg" alt="✘"/>)}</td>

                  <td
                      className={`sm:hidden shadow-[rgba(1,1,1,0.2)_2px_2px_0px_0px] ${index === 0 && 'rounded-tr-[40px]'} ${index === characteristics.length - 1 && 'rounded-br-[40px]'} py-3 px-4 `}>{characteristic.vendor ? (<Image width="20" className="mx-auto" height="20" src="/blue-tick.svg" alt="✔"/>) : (<Image className="mx-auto" width="20" height="20"  src="/x_mark.svg" alt="✘"/>)}</td>
                </tr>

            ))}
            <tr>
              <td className="bg-transparent"></td>
              <td className="rounded-b-[40px] bg-darkblue h-10"></td>
              <td className="bg-transparent">
                <div className="hidden sm:flex justify-center gap-1.5">
                  <Image onClick={() => {
                    setAllowAutoScroll(false);
                    setOldIndex(shownIndex);
                    setShownIndex((shownIndex) => (shownIndex === 1 ? 3 : shownIndex - 1));
                  }} width="14" height="14" className="my-auto mr-1" src="/arrow_left.svg" alt={"left"}/>
                  <div onClick={() => {setAllowAutoScroll(false);setOldIndex(shownIndex);setShownIndex(1)}} className={`rounded-full ${shownIndex === 1 ? "bg-darkblue" : "bg-lightgrey cursor-pointer hover:bg-lightbg2"} my-auto h-2 w-2`}></div>
                  <div onClick={() => {setAllowAutoScroll(false);setOldIndex(shownIndex);setShownIndex(2)}} className={`rounded-full ${shownIndex === 2 ? "bg-darkblue" : "bg-lightgrey cursor-pointer hover:bg-lightbg2"} my-auto h-2 w-2`}></div>
                  <div onClick={() => {setAllowAutoScroll(false);setOldIndex(shownIndex);setShownIndex(3)}} className={`rounded-full ${shownIndex === 3 ? "bg-darkblue" : "bg-lightgrey cursor-pointer hover:bg-lightbg2"} my-auto  h-2 w-2`}></div>
                  <Image width="14" onClick={() => {
                    setAllowAutoScroll(false);
                    setOldIndex(shownIndex);
                    setShownIndex((shownIndex) => (shownIndex === 3 ? 1 : shownIndex + 1));
                  }} height="14" className="my-auto ml-1" src="/arrow_right.svg" alt={"left"}/>
                </div>
              </td>
              <td className="sm:hidden bg-transparent"></td>
              <td className="sm:hidden bg-transparent"></td>
            </tr>
            </tbody>
          </table>
        </motion.div>
      </section>
  );
}
