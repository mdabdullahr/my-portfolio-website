import React, { useEffect, useRef } from "react";
import { FaGraduationCap, FaAward, FaWrench, FaBriefcase } from "react-icons/fa";

/* Journey content lives here — edit labels, titles, metadata, or icons below */
const experienceV2Stages = [
  {
    label: "Education",
    icon: FaGraduationCap,
    title: "Bachelor of Science (BS)",
    meta: "National University (2025 - Running)",
    text: "Pursuing a Bachelor of Science degree at the National University of Bangladesh while actively learning and building projects in programming alongside.",
    status: "in-progress",
  },
  {
    label: "Certification",
    icon: FaAward,
    title: "Complete Web Development Course",
    meta: "Programming Hero (2025)",
    text: "Currently pursuing a complete web development course focusing on modern technologies including JavaScript, React, Node.js, Express.js, MongoDB, Firebase, and Express.",
    status: "in-progress",
  },
  {
    label: "Specialization",
    icon: FaWrench,
    title: "WordPress & WooCommerce Expert",
    meta: "Hands-on Professional Practice",
    text: "Custom theme customization, plugin integration and critical bug fixing. Malware removal, security hardening and performance tuning. On-page SEO and landing-page design for marketing campaigns.",
  },
  {
    label: "Experience",
    icon: FaBriefcase,
    title: "Professional WordPress Developer",
    meta: "Independent & Contract Clients | 2021 — Present",
    text: "Delivered 100+ WordPress projects for clients worldwide — full site builds, custom themes and WooCommerce stores. Designed responsive, conversion-focused pages with Elementor Pro. Improved site speed and Core Web Vitals through caching, image and database optimization. Handled hosting, domain setup, migration, security hardening and ongoing maintenance.",
    featured: true,
    present: true,
  },
];

const ExperienceGrowth = () => {
  const listRef = useRef(null);

  useEffect(() => {
    const listElement = listRef.current;
    if (!listElement) return undefined;

    const items = Array.from(
      listElement.querySelectorAll(".experience-v2-item")
    );

    const showAll = () => {
      items.forEach((item) => item.classList.add("is-visible"));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      showAll();
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="scroll-mt-28 relative overflow-hidden">
      {/* Subtle grid-line pattern (existing accent color at very low opacity) */}
      <div
        className="experience-v2-pattern absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      ></div>

      <div className="relative z-10 mt-20 xl:mt-30 max-w-[1320px] mx-auto">
        {/* ---------- Heading block ---------- */}
        <div
          data-aos="fade-up"
          data-aos-duration="1200"
          className="experience-v2-heading"
        >
          <h2 className="experience-v2-title rajdhani-bold">
            Experience &amp; <span className="text-[#E9004C]">Growth</span>
          </h2>
          <p className="experience-v2-subtitle">
            My journey combines continuous learning with hands-on experience
            across diverse web projects. Each challenge has strengthened my
            technical skills, adaptability, and approach to problem-solving.
          </p>
        </div>

        {/* ---------- Journey step cards ---------- */}
        <ol ref={listRef} className="experience-v2-list">
          {experienceV2Stages.map((stage, index) => {
            const Icon = stage.icon;

            return (
              <li
                key={stage.title}
                data-aos="fade-up"
                data-aos-delay={index * 120}
                data-aos-duration="900"
                className="experience-v2-item"
              >
                {/* Left rail: ghost number, connector line, accent dot */}
                <div className="experience-v2-rail" aria-hidden="true">
                  <span className="experience-v2-step-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="experience-v2-connector"></span>
                  <span className="experience-v2-dot"></span>
                </div>

                {/* Step card */}
                <article
                  tabIndex={0}
                  className={`experience-v2-card${
                    stage.featured ? " experience-v2-card--featured" : ""
                  }`}
                  aria-labelledby={`experience-v2-title-${index}`}
                >
                  <div className="experience-v2-card-top">
                    <div className="experience-v2-card-head">
                      <span className="experience-v2-icon" aria-hidden="true">
                        <Icon size={20} />
                      </span>
                      <span className="experience-v2-label">{stage.label}</span>

                      {stage.status === "in-progress" && (
                        <span className="experience-v2-status experience-v2-status--progress">
                          <span
                            className="experience-v2-status-dot"
                            aria-hidden="true"
                          ></span>
                          In progress
                        </span>
                      )}

                      {stage.present && (
                        <span className="experience-v2-status experience-v2-status--present">
                          <span
                            className="experience-v2-status-dot"
                            aria-hidden="true"
                          ></span>
                          Present
                        </span>
                      )}
                    </div>

                    <p className="experience-v2-meta">{stage.meta}</p>
                  </div>

                  <h3
                    id={`experience-v2-title-${index}`}
                    className="experience-v2-card-title"
                  >
                    {stage.title}
                  </h3>
                  <p className="experience-v2-card-text">{stage.text}</p>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default ExperienceGrowth;
