import { LuDownload } from "react-icons/lu";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import profileImage from "../assets/pro-removebg-preview.png";
import patternImage from "../assets/pattrn.svg";

const HeroSection = () => {
  return (
    <div className="relative text-white pt-20 px-0  md:px-20 lg:px-0 overflow-hidden">
      {/* Pattern Background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img
          src={patternImage}
          alt="Pattern"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-10 max-w-[1320px] mx-auto">
        {/* Left Section */}
        <div data-aos="fade-right" className="flex-1 my-10 lg:my-0">
          <p className="text-[28px] rajdhani-bold text-white uppercase mb-4">
            Hello
          </p>
          <h1 className="text-[32px] md:text-[54px] 2xl:text-7xl rajdhani-bold leading-snug">
            i’m Abdullah Hossain
          </h1>
          <h2 className="text-2xl md:text-4xl 2xl:text-5xl rajdhani-bold leading-snug text-[#E9004C] my-5">
            <Typewriter
              words={["MERN Stack Developer"]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={50}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h2>
          <p className="mt-4 text-[#9F9F9F] text-[16px] md:text-xl">
            A personal portfolio is a collection of your work, achievements, and
            skills that highlights your abilities and professional growth. It
            serves as a digital representation of your career.
          </p>

          <button className="mt-10 bg-[#E9004C] text-white cursor-pointer px-10 py-4 text-[16px] rounded-full flex items-center">
            Resume <LuDownload className="ml-2" size={20} />
          </button>
        </div>

        {/* Right Section */}

        <div
          data-aos="fade-left"
          className="flex-1 text-center relative"
        >
          <div className="absolute left-1/2 -translate-x-1/2 top-30 w-72 h-[70vh] bg-[#E9004C] rounded-full blur-3xl opacity-30 z-0"></div>
          <motion.h2 className="absolute text-5xl md:text-[60px] 2xl:text-[80px] text-white mt-4 lg:mt-6 left-1/2 -translate-x-1/2 top-50 w-full rajdhani-bold"
          animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}>
            WEB DEVELOPER
          </motion.h2>
          <img
            src={profileImage}
            alt="Web Designer"
            className="relative mx-auto h-[50vh] md:h-[90vh] w-full object-cover -mb-20"
          />
          <motion.h2
            className="relative bottom-30 text-5xl md:text-[60px] 2xl:text-[80px] text-outline outline-text rajdhani-bold"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            WEB DEVELOPER
          </motion.h2>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
