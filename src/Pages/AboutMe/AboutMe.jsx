import React from "react";
import {
  FaUserTie,
  FaLaptopCode,
  FaBrain,
  FaFootballBall,
  FaPeopleArrows,
  FaFlagCheckered,
} from "react-icons/fa";

const AboutMe = () => {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="3000"
      className="max-w-[1320px] mx-auto mt-20 xl:mt-30"
    >
      <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-white mb-10 text-center rajdhani-bold">
        About Me
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {/* Block 1 */}
        <div data-aos="zoom-in" data-aos-duration="3000">
          <div className="border border-[#E9004C]/20 p-5 xl:p-10 rounded-2xl transform hover:scale-105 transition-transform duration-1000 ease-in-out h-full">
            <FaUserTie className="text-[#E9004C] text-3xl mb-2" />
            <p className="text-[#9F9F9F] text-[16px] md:text-[18px] xl:text-xl leading-relaxed">
              Hi! I'm <span className="text-white font-semibold">Abdullah</span>
              , a passionate MERN Stack Developer from Bangladesh 🇧🇩. I
              specialize in building modern, clean, and responsive full-stack
              applications using MongoDB, Express.js, React, and Node.js. I
              enjoy working with clean code and modern tools.
            </p>
          </div>
        </div>

        {/* Block 2 */}
        <div data-aos="zoom-in" data-aos-duration="3000">
          <div className="border border-[#E9004C]/20 p-5 xl:p-10 rounded-2xl transform hover:scale-105 transition-transform duration-1000 ease-in-out h-full">
            <FaLaptopCode className="text-[#E9004C] text-3xl mb-2" />
            <p className="text-[#9F9F9F] text-[16px] md:text-[18px] xl:text-xl leading-relaxed">
              I’m currently learning Next.js and enjoy applying each new concept
              directly into my projects. This hands-on approach allows me to
              grasp ideas faster, retain them better, and apply them efficiently
              in real-world development situations that require practical
              thinking.
            </p>
          </div>
        </div>

        {/* Block 3 */}
        <div data-aos="zoom-in" data-aos-duration="3000">
          <div className="border border-[#E9004C]/20 p-5 xl:p-10 rounded-2xl transform hover:scale-105 transition-transform duration-1000 ease-in-out h-full">
            <FaBrain className="text-[#E9004C] text-3xl mb-2" />
            <p className="text-[#9F9F9F] text-[16px] md:text-[18px] xl:text-xl leading-relaxed">
              I'm hardworking, consistent, and deeply passionate about
              problem-solving through code. I love taking on technical
              challenges, writing maintainable code, and continuously improving
              my development skills to grow both personally and professionally
              in the software field.
            </p>
          </div>
        </div>

        {/* Block 4 */}
        <div data-aos="zoom-in" data-aos-duration="3000">
          <div className="border border-[#E9004C]/20 p-5 xl:p-10 rounded-2xl transform hover:scale-105 transition-transform duration-1000 ease-in-out h-full">
            <FaFootballBall className="text-[#E9004C] text-3xl mb-2" />
            <p className="text-[#9F9F9F] text-[16px] md:text-[18px] xl:text-xl leading-relaxed">
              Outside of coding, I enjoy playing football ⚽ which helps me stay
              active and mentally refreshed. I believe that balancing technology
              with real-world activities improves focus, boosts creativity, and
              prevents burnout while working on long coding sessions.
            </p>
          </div>
        </div>

        {/* Block 5 */}
        <div data-aos="zoom-in" data-aos-duration="3000">
          <div className="border border-[#E9004C]/20 p-5 xl:p-10 rounded-2xl transform hover:scale-105 transition-transform duration-1000 ease-in-out h-full">
            <FaPeopleArrows className="text-[#E9004C] text-3xl mb-2" />
            <p className="text-[#9F9F9F] text-[16px] md:text-[18px] xl:text-xl leading-relaxed">
              I’m friendly and collaborative. I work well in teams, communicate
              clearly, and value others’ opinions. Building strong
              relationships, adapting quickly, and contributing to group success
              is something I naturally enjoy in both tech and non-tech
              environments.
            </p>
          </div>
        </div>

        {/* Block 6 */}
        <div data-aos="zoom-in" data-aos-duration="3000">
          <div className="border border-[#E9004C]/20 p-5 xl:p-10 rounded-2xl transform hover:scale-105 transition-transform duration-1000 ease-in-out h-full">
            <FaFlagCheckered className="text-[#E9004C] text-3xl mb-2" />
            <p className="text-[#9F9F9F] text-[16px] md:text-[18px] xl:text-xl leading-relaxed">
              My goal is to become a skilled full-stack developer. Through
              consistent learning, hard work, and a never-give-up mindset, I aim
              to master multiple technologies and contribute to impactful
              projects while growing in a positive team environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
