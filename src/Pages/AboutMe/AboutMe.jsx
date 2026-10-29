import React, { useEffect, useRef, useState } from "react";
import {
  FaArrowRight,
  FaBriefcase,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import { Link } from "react-router";
import profileImage from "../../assets/my-image.png";

/* OLD ABOUT SECTION START (imports)
   import {
     FaUserTie,
     FaLaptopCode,
     FaBrain,
     FaFootballBall,
     FaPeopleArrows,
     FaFlagCheckered,
   } from "react-icons/fa";
    OLD ABOUT SECTION END */

/* Skill highlights for the About V3 chips */
const aboutV3Skills = [
  "Custom WordPress Development",
  "WooCommerce Store Setup",
  "Elementor Design",
  "Speed & SEO Optimization",
  "Responsive & Secure Builds",
  "MERN for Custom Features",
];

const aboutStats = [
  {
    target: 100,
    suffix: "+",
    label: "Projects Completed",
    ariaLabel: "100 plus projects completed",
  },
  {
    target: 80,
    suffix: "+",
    label: "Happy Clients",
    ariaLabel: "80 plus happy clients",
  },
  {
    target: 70,
    suffix: "+",
    label: "Client Reviews",
    ariaLabel: "70 plus client reviews",
  },
  {
    target: 15,
    suffix: "+",
    label: "Custom Features Built",
    ariaLabel: "15 plus custom features built",
  },
];

const AboutStats = () => {
  const statsRef = useRef(null);
  const [counts, setCounts] = useState(() =>
    Object.fromEntries(aboutStats.map((stat) => [stat.label, 0]))
  );

  useEffect(() => {
    const statsElement = statsRef.current;
    if (!statsElement) return undefined;

    let animationFrame = null;
    let startTime = null;
    let hasStarted = false;
    const duration = 1800;

    const animateCounters = (timestamp) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;

      setCounts(
        Object.fromEntries(
          aboutStats.map((stat) => [
            stat.label,
            progress === 1 ? stat.target : Math.floor(stat.target * easedProgress),
          ])
        )
      );

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animateCounters);
      }
    };

    const startAnimation = () => {
      if (hasStarted) return;
      hasStarted = true;
      observer?.disconnect();
      setCounts(Object.fromEntries(aboutStats.map((stat) => [stat.label, 0])));
      startTime = null;
      animationFrame = window.requestAnimationFrame(animateCounters);
    };

    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              if (!entry.isIntersecting) return;
              startAnimation();
            },
            { threshold: 0.2 }
          )
        : null;

    if (observer) {
      observer.observe(statsElement);
    } else {
      startAnimation();
    }

    return () => {
      observer?.disconnect();
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div ref={statsRef} className="about-stats-section">
      <div className="about-stats-grid">
        <article
          data-aos="fade-up"
          className="about-stats-experience"
          aria-label="2 plus years of experience"
        >
          <div className="about-stats-experience-top">
            <span
              className="about-stats-experience-number"
              aria-hidden="true"
            >
              <span>2</span>
              <span>+</span>
            </span>
            <h3 className="about-stats-experience-title">
              <span>Years Of</span>
              <span>Experience</span>
            </h3>
          </div>
          <p className="about-stats-description">
            Business consulting consultants provide expert advice and guidance
            to help businesses improve their performance and efficiency.
          </p>
        </article>

        <div className="about-stats-small-grid">
          {aboutStats.map((stat, index) => (
            <article
              key={stat.label}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="about-stats-card"
            >
              <p
                className="about-stats-number"
                aria-label={stat.ariaLabel}
              >
                <span>{counts[stat.label]}</span>
                <span>{stat.suffix}</span>
              </p>
              <h3 className="about-stats-label">{stat.label}</h3>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

const AboutMe = () => {
  return (
    <>
      {/* ================= OLD ABOUT SECTION START =================
      <section id="about" className="scroll-mt-28">
        <div
          data-aos="fade-up"
          data-aos-duration="3000"
          className="mt-20 xl:mt-30 max-w-[1320px] mx-auto"
        >
          <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-white mb-10 text-center rajdhani-bold">
            About Me
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            Block 1
            <div data-aos="zoom-in" data-aos-duration="3000">
              <div className="border border-[#E9004C]/20 p-5 xl:p-10 rounded-2xl transform hover:scale-105 transition-transform duration-1000 ease-in-out h-full">
                <FaUserTie className="text-[#E9004C] text-3xl mb-2" />
                <p className="text-[#9F9F9F] text-[16px] md:text-lg xl:text-xl leading-relaxed">
                  Hi! I'm{" "}
                  <span className="text-white font-semibold">Abdullah</span>, a
                  passionate MERN Stack Developer from Bangladesh 🇧🇩. I specialize
                  in building modern, clean, and responsive full-stack
                  applications using MongoDB, Express.js, React, and Node.js. I
                  enjoy working with clean code and modern tools.
                </p>
              </div>
            </div>

            Block 2
            <div data-aos="zoom-in" data-aos-duration="3000">
              <div className="border border-[#E9004C]/20 p-5 xl:p-10 rounded-2xl transform hover:scale-105 transition-transform duration-1000 ease-in-out h-full">
                <FaLaptopCode className="text-[#E9004C] text-3xl mb-2" />
                <p className="text-[#9F9F9F] text-[16px] md:text-[18px] xl:text-xl leading-relaxed">
                  I’m currently learning Next.js and enjoy applying each new
                  concept directly into my projects. This hands-on approach allows
                  me to grasp ideas faster, retain them better, and apply them
                  efficiently in real-world development situations that require
                  practical thinking.
                </p>
              </div>
            </div>

            Block 3
            <div data-aos="zoom-in" data-aos-duration="3000">
              <div className="border border-[#E9004C]/20 p-5 xl:p-10 rounded-2xl transform hover:scale-105 transition-transform duration-1000 ease-in-out h-full">
                <FaBrain className="text-[#E9004C] text-3xl mb-2" />
                <p className="text-[#9F9F9F] text-[16px] md:text-[18px] xl:text-xl leading-relaxed">
                  I'm hardworking, consistent, and deeply passionate about
                  problem-solving through code. I love taking on technical
                  challenges, writing maintainable code, and continuously
                  improving my development skills to grow both personally and
                  professionally in the software field.
                </p>
              </div>
            </div>

            Block 4
            <div data-aos="zoom-in" data-aos-duration="3000">
              <div className="border border-[#E9004C]/20 p-5 xl:p-10 rounded-2xl transform hover:scale-105 transition-transform duration-1000 ease-in-out h-full">
                <FaFootballBall className="text-[#E9004C] text-3xl mb-2" />
                <p className="text-[#9F9F9F] text-[16px] md:text-[18px] xl:text-xl leading-relaxed">
                  Outside of coding, I enjoy playing football ⚽ which helps me
                  stay active and mentally refreshed. I believe that balancing
                  technology with real-world activities improves focus, boosts
                  creativity, and prevents burnout while working on long coding
                  sessions.
                </p>
              </div>
            </div>

            Block 5
            <div data-aos="zoom-in" data-aos-duration="3000">
              <div className="border border-[#E9004C]/20 p-5 xl:p-10 rounded-2xl transform hover:scale-105 transition-transform duration-1000 ease-in-out h-full">
                <FaPeopleArrows className="text-[#E9004C] text-3xl mb-2" />
                <p className="text-[#9F9F9F] text-[16px] md:text-[18px] xl:text-xl leading-relaxed">
                  I’m friendly and collaborative. I work well in teams,
                  communicate clearly, and value others’ opinions. Building strong
                  relationships, adapting quickly, and contributing to group
                  success is something I naturally enjoy in both tech and non-tech
                  environments.
                </p>
              </div>
            </div>

            Block 6
            <div data-aos="zoom-in" data-aos-duration="3000">
              <div className="border border-[#E9004C]/20 p-5 xl:p-10 rounded-2xl transform hover:scale-105 transition-transform duration-1000 ease-in-out h-full">
                <FaFlagCheckered className="text-[#E9004C] text-3xl mb-2" />
                <p className="text-[#9F9F9F] text-[16px] md:text-[18px] xl:text-xl leading-relaxed">
                  My goal is to become a skilled full-stack developer. Through
                  consistent learning, hard work, and a never-give-up mindset, I
                  aim to master multiple technologies and contribute to impactful
                  projects while growing in a positive team environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      ================= OLD ABOUT SECTION END ================= */}

      {/* ================= OLD ABOUT V2 START =================
      <section id="about" className="scroll-mt-28 relative overflow-hidden">
        ---------- Subtle grid-line pattern (existing accent color at very low opacity) ----------
        <div
          className="about-v2-pattern absolute inset-0 z-0 pointer-events-none"
          aria-hidden="true"
        ></div>

        <div className="relative z-10 mt-20 xl:mt-30 mb-10 max-w-[1320px] mx-auto">
          <div className="about-v2-grid grid grid-cols-1 gap-10">
            ---------- Left column: profile card ----------
            <article
              data-aos="zoom-in"
              data-aos-duration="1200"
              className="about-v2-card w-full max-w-[420px] mx-auto lg:mx-0 rounded-2xl border border-[#E9004C]/20 bg-[#E9004C]/5 overflow-hidden flex flex-col"
            >
              ---------- Photo with soft accent glow behind it (height follows the right column on desktop) ----------
              <div className="about-v2-photo relative w-full overflow-hidden">
                <div
                  className="about-v2-photo-glow absolute inset-0 z-0"
                  aria-hidden="true"
                ></div>
                <img
                  src={profileImage}
                  alt="Abdullah"
                  loading="lazy"
                  className="relative z-10 w-full h-full object-cover object-top"
                />
              </div>

              ---------- Card footer ----------
              <div className="shrink-0 border-t border-[#E9004C]/20 p-5 md:p-6">
                <h3 className="text-2xl rajdhani-bold text-white">
                  Abdullah
                </h3>
                <p className="mt-1 text-sm text-[#9F9F9F]">
                  WordPress Developer &amp; WooCommerce Specialist
                </p>
                <p className="mt-4 flex items-center gap-2 text-sm text-[#9F9F9F]">
                  <FaMapMarkerAlt
                    className="text-[#E9004C] shrink-0"
                    aria-hidden="true"
                  />
                  Khulna, Bangladesh
                </p>
              </div>
            </article>

            ---------- Right column: content ----------
            <div
              data-aos="fade-up"
              data-aos-duration="1200"
              className="about-v2-content min-w-0 flex flex-col"
            >
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-white rajdhani-bold">
                About <span className="text-[#E9004C]">me</span>
              </h2>

              <p className="about-v2-copy mt-6 max-w-[65ch] text-pretty text-[18px] leading-[1.7] text-[#9F9F9F]">
                I'm Abdullah, a WordPress developer with 3+ Years of experience
                building fast, secure, and responsive websites. I work with
                businesses on custom WordPress sites, WooCommerce stores, and page
                designs using Elementor and DIVI.
              </p>

              <p className="about-v2-copy mt-4 max-w-[65ch] text-pretty text-[18px] leading-[1.7] text-[#9F9F9F]">
                From the first layout to launch and ongoing maintenance, I focus on
                usability, performance, and a setup you can confidently manage. My
                MERN stack experience also helps me build custom features when a
                project needs them.
              </p>

              ---------- Divider ----------
              <hr className="my-6 lg:my-7 border-t border-[#E9004C]/20" />

              ---------- Feature checklist ----------
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
                {aboutV3Skills.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-[15px] md:text-[16px] text-white"
                  >
                    <FaCheckCircle
                      className="mt-0.5 shrink-0 text-[#E9004C]"
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              ---------- Buttons ----------
              <div className="about-v2-actions mt-7 flex flex-col sm:flex-row flex-wrap gap-3.5">
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-[10px] bg-[#E9004C] px-[22px] py-[14px] font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#E9004C]/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E9004C]"
                >
                  <LuDownload size={20} aria-hidden="true" />
                  Download Resume
                </a>

                <Link
                  to="/#contact"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-[10px] border border-[#E9004C]/40 bg-transparent px-[22px] py-[14px] font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#E9004C]/10 hover:border-[#E9004C]/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E9004C]"
                >
                  <FaPaperPlane size={18} aria-hidden="true" />
                  Let's discuss your project
                </Link>
              </div>
            </div>
          </div>

          ---------- NEW ABOUT STATS START ----------
          <AboutStats />
          ---------- NEW ABOUT STATS END ----------
        </div>
      </section>
      ================= OLD ABOUT V2 END ================= */}

      {/* ================= NEW ABOUT V3 START ================= */}
      <section
        id="about"
        className="about-v3-section scroll-mt-28 relative overflow-hidden"
      >
        <div
          className="about-v3-pattern absolute inset-0 z-0 pointer-events-none"
          aria-hidden="true"
        ></div>

        <div className="relative z-10 mt-20 xl:mt-30 mb-10 max-w-[1320px] mx-auto">
          <div className="about-v3-grid">
            <div
              data-aos="fade-right"
              data-aos-duration="1200"
              className="about-v3-photo-col"
            >
              <div className="about-v3-photo-wrap">
                <div className="about-v3-photo-back" aria-hidden="true"></div>
                <div className="about-v3-photo-dots" aria-hidden="true"></div>

                <div className="about-v3-photo-frame">
                  <img
                    src={profileImage}
                    alt="Abdullah, WordPress Developer &amp; WooCommerce Specialist"
                    loading="lazy"
                  />
                </div>

                <div className="about-v3-info about-v3-info--location">
                  <FaMapMarkerAlt aria-hidden="true" size={13} />
                  <span>Khulna, Bangladesh</span>
                </div>

                <div className="about-v3-info about-v3-info--experience">
                  <FaBriefcase aria-hidden="true" size={13} />
                  <span>2+ Years Experience</span>
                </div>
              </div>
            </div>

            <div
              data-aos="fade-up"
              data-aos-duration="1200"
              className="about-v3-text"
            >
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-white rajdhani-bold">
                About <span className="text-[#E9004C]">me</span>
              </h2>

              <div className="about-v3-identity">
                <span className="about-v3-identity-name">Abdullah</span>
                <span
                  className="about-v3-identity-sep"
                  aria-hidden="true"
                >
                  —
                </span>
                <span className="about-v3-identity-role">
                  WordPress Developer &amp; WooCommerce Specialist
                </span>
              </div>

              <div className="about-v3-copy-wrap">
                <p className="about-v3-copy">
                  I'm{" "}
                  <span className="about-v3-inline-name">Abdullah</span>, a
                  WordPress developer with 2+ Years of experience building fast,
                  secure, and responsive websites. I work with businesses on
                  custom WordPress sites, WooCommerce stores, and page designs
                  using Elementor.
                </p>
                <p className="about-v3-copy">
                  From the first layout to launch and ongoing maintenance, I
                  focus on usability, performance, and a setup you can
                  confidently manage. My MERN stack experience also helps me
                  build custom features when a project needs them.
                </p>
              </div>

              <ul className="about-v3-chips" aria-label="Core skills">
                {aboutV3Skills.map((skill) => (
                  <li key={skill} className="about-v3-chip">
                    <FaCheckCircle aria-hidden="true" size={13} />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>

              <div className="about-v3-actions">
                <a
                  href="/Abdullah-Resume.pdf"
                  download="Abdullah-Resume.pdf"
                  className="about-v3-btn about-v3-btn--primary"
                >
                  <LuDownload size={20} aria-hidden="true" />
                  Download Resume
                  <span className="about-v3-btn-arrow" aria-hidden="true">
                    <FaArrowRight size={13} />
                  </span>
                </a>

                <Link
                  to="/#contact"
                  className="about-v3-btn about-v3-btn--secondary"
                >
                  <FaPaperPlane size={17} aria-hidden="true" />
                  Let's discuss your project
                </Link>
              </div>
            </div>
          </div>

          <AboutStats />
        </div>
      </section>
      {/* ================= NEW ABOUT V3 END ================= */}
    </>
  );
};

export default AboutMe;
