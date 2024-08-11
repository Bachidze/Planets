import { Link, useParams } from "react-router-dom";
import data from "../../data.json";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from 'framer-motion'

export default function Planets() {
  const params = useParams();
  const [menu, setMenu] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview"); 
  const planetData = data.find(
    (el) => el.name.toLowerCase() === params.id?.toLowerCase()
  );

  if (!planetData) {
    return <h1>Planet not found</h1>;
  }

  const handleMenu = () => {
    setMenu(!menu);
  };

  
  useEffect(() => {
    const closeMenuOnScroll = () => {
      if (menu  && window.scrollY > 100) {
        setMenu(false);
      }
    };

    window.addEventListener('scroll', closeMenuOnScroll);

    
    return () => {
      window.removeEventListener('scroll', closeMenuOnScroll);
    };
  }, [menu]);

  return (
    <>
      <div>
        <div className="flex justify-between  items-center w-[87%] m-auto py-4 md:justify-center md:text-center">
          <div>
            <Link to={'/'}>
              <h1 className="text-[28px] font-normal leading-normal tracking-[-1.05px] md:py-8 md:text-[32px]">The Planets</h1>
            </Link>
            <div className="hidden md:flex gap-11">
            {data.map((el) => (
            <div className="flex flex-row w-[95%] m-auto">
              <div key={el.name} className="flex items-center flex-row gap-4 pb-4">
              {menu ? (
                <img
                  className="w-10 h-10"
                  src={el.images.planet}
                  alt={el.name}
                />
              ) : null}
               <a className="text-[11px] font-bold leading-[25px] tracking-[1px] uppercase" href={`/${el.name}`}>{el.name}</a> 
            </div>
            </div>
          ))}
            </div>
          </div>
          <div
            onClick={handleMenu}
            className="flex flex-col gap-1 cursor-pointer md:hidden"
          >
            <div
              className={`w-8 h-1 bg-white transition-transform duration-300 ${
                menu ? "rotate-45 translate-y-2" : ""
              }`}
            ></div>
            <div
              className={`w-8 h-1 bg-white transition-opacity duration-300 ${
                menu ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`w-8 h-1 bg-white transition-transform duration-300 ${
                menu ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></div>
          </div>
        </div>
        <AnimatePresence>
        {menu?<motion.div
        initial={{ opacity: 0, y: "-100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "-100%" }}
        transition={{ type: "tween", duration: 0.7 }}
        className="absolute p-4 flex flex-col gap-8 bg-[#070724] w-[100%]">
          {data.map((el) => (
            <div className="flex justify-between w-[95%] m-auto border-b">
              <div key={el.name} className="flex items-center gap-4 pb-4">
              {menu ? (
                <img
                  className="w-10 h-10"
                  src={el.images.planet}
                  alt={el.name}
                />
              ) : null}
               <a href={`/${el.name}`}>{el.name}</a> 
            </div>
               <img src="/assets/greatArrow.svg" alt="Arrow" />
            </div>
          ))}
        </motion.div>:null}
        </AnimatePresence>
      </div>
      <div className="border"></div>

      <div className="flex justify-between w-[87%] m-auto py-5">
        <motion.h2
        initial={{x:'20px'}}whileInView={{x:0}} transition={{duration:0.4}}
          className={`cursor-pointer text-[9px]  leading-normal tracking-[1.929px] uppercase font-bold pb-1 ${
            selectedTab === "overview" ? "border-b-2 border-white" : ""
          }`}
          onClick={() => setSelectedTab("overview")}
        >
          Overview
        </motion.h2>
        <motion.h2
        initial={{x:'30px'}}whileInView={{x:0}} transition={{duration:0.6}}
          className={`cursor-pointer text-[9px]  leading-normal tracking-[1.929px] uppercase font-bold pb-1  ${
            selectedTab === "structure" ? "border-b-2 border-white" : ""
          }`}
          onClick={() => setSelectedTab("structure")}
        >
          Structure
        </motion.h2>
        <motion.h2
        initial={{x:'20px'}}whileInView={{x:0}} transition={{duration:0.8}}
          className={`cursor-pointer text-[9px]  leading-normal tracking-[1.929px] uppercase font-bold pb-1  ${
            selectedTab === "surface" ? "border-b-2 border-white" : ""
          }`}
          onClick={() => setSelectedTab("surface")}
        >
          Surface
        </motion.h2>
      </div>
      <div className="border"></div>
      <div className="flex flex-col justify-center items-center pt-[95px]">
        <motion.img
        initial={{x:'80%',opacity:0.4}}
        whileInView={{x:0,opacity:1}}
        transition={{duration:.6}}
          className="w-[111px] h-[111px]"
          src={
            selectedTab === "overview"
              ? planetData.images.planet
              : selectedTab === "structure"
              ? planetData.images.internal
              : planetData.images.geology
          }
          alt="Planet"
        />
      </div>
      <div className="pb-7">
        <div>
        <motion.h3
         initial={{y:'80%',opacity:0.4}}
         whileInView={{y:0,opacity:1}}
         transition={{duration:.6}}
        className="text-[40px] pt-[98px] text-center pb-4 font-normal leading-normal uppercase">
          {planetData.name}
        </motion.h3>
        </div>
        <div>
          <motion.p
           initial={{y:'80%',opacity:0.4}}
           whileInView={{y:0,opacity:1}}
           transition={{duration:.6}}
          className="text-center w-[87%] m-auto text-[11px]  leading-[22px] font-semibold">
            {planetData.overview.content}
          </motion.p>
        </div>
        <motion.div
         initial={{y:'80%',opacity:0.4}}
         whileInView={{y:0,opacity:1}}
         transition={{duration:.6}}
        className="text-center pt-8 flex justify-center items-center gap-1">
          Source:{" "}
          <a
            className="underline"
            href={planetData.overview.source}
            target="_blank"
            rel="noopener noreferrer"
          >
            Wikipedia
          </a>
          <motion.img
          initial={{y:'-80%'}}
          whileInView={{y:0}}

            className="relative top-1"
            src="/assets/InfoArrow.svg"
            alt="Info"
          />
        </motion.div>
      </div>
      <div className="flex flex-col  gap-3 w-[87%] m-auto mb-16">
        <motion.div
         initial={{y:'40%',opacity:0.4}}
        whileInView={{y:0,opacity:1}}
        transition={{duration:.6}}
        className="border p-3 border-white  flex justify-between items-center">
          <h2 className="text-[10px] font-bold leading-4 tracking-[0.727px] uppercase">
            Rotation Time:
          </h2>
          <h3 className="text-[20px] font-normal tracking-[-0.75px] uppercase">
            {planetData.rotation}
          </h3>
        </motion.div>
        <motion.div
         initial={{y:'60%',opacity:0.4}}
        whileInView={{y:0,opacity:1}}
        transition={{duration:.6}}
        className="border p-3 border-white  flex justify-between items-center">
          <h2 className="text-[10px] font-bold leading-4 tracking-[0.727px] uppercase">
            Revolution Time:
          </h2>{" "}
          <h3 className="text-[20px] font-normal tracking-[-0.75px] uppercase">
            {planetData.revolution}
          </h3>
        </motion.div>
        <motion.div
         initial={{y:'80%',opacity:0.4}}
        whileInView={{y:0,opacity:1}}
        transition={{duration:.6}}
        className="border p-3 border-white  flex justify-between items-center">
          <h2 className="text-[10px] font-bold leading-4 tracking-[0.727px] uppercase">
            Radius :
          </h2>
          <h3 className="text-[20px] font-normal tracking-[-0.75px] uppercase">
            {planetData.radius}
          </h3>
        </motion.div>
        <motion.div
         initial={{y:'100%',opacity:0.4}}
        whileInView={{y:0,opacity:1}}
        transition={{duration:.6}}
        className="border p-3 border-white  flex justify-between items-center">
          <h2 className="text-[10px] font-bold leading-4 tracking-[0.727px] uppercase">
            Averge Temp:
          </h2>
          <h3 className="text-[20px] font-normal tracking-[-0.75px] uppercase">
            {planetData.temperature}
          </h3>
        </motion.div>
      </div>
    </>
  );
}
