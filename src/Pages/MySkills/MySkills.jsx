import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import SkillCard from "./SkillCard";

const MySkills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch("/skills.json")
      .then((res) => res.json())
      .then((data) => setSkills(data));
  }, []);

  // Split skills
  const firstLine = skills.slice(0, 6);
  const secondLine = skills.slice(6, 12);

  return (
    <section id="skills" className="scroll-mt-28">
      <div
        data-aos="fade-up"
        data-aos-duration="3000"
        className="mt-20 xl:mt-30 max-w-[1320px] mx-auto"
      >
        <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-white mb-10 text-center rajdhani-bold">
          My Skills
        </h2>
        {/* First Line - Left to Right */}
        <div className="overflow-hidden">
          <Marquee
            pauseOnHover={true}
            speed={50}
            gradient={true}
            gradientColor={[0, 0, 0]} // Tailwind gray-100
            gradientWidth="120px" // আগের থেকে বেশি shadow
          >
            <div className="flex">
              {[...firstLine, ...firstLine].map((skill, i) => (
                <SkillCard key={i} skill={skill} />
              ))}
            </div>
          </Marquee>
        </div>
        <div className="h-10"></div> {/* spacing */}
        {/* Second Line - Right to Left */}
        <div className="overflow-hidden">
          <Marquee
            pauseOnHover={true}
            speed={50}
            direction="right"
            gradient={true}
            gradientColor={[243, 244, 246]}
            gradientWidth="120px"
          >
            <div className="flex">
              {[...secondLine, ...secondLine].map((skill, i) => (
                <SkillCard key={i} skill={skill} />
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default MySkills;
