import React from "react";
import {
  FaWordpress,
  FaReact,
  FaElementor,
  FaTools,
  FaTachometerAlt,
  FaSearch,
} from "react-icons/fa";
import { FaShieldHalved } from "react-icons/fa6";
import { SiFramer, SiWoocommerce } from "react-icons/si";

/* Card content lives here — edit titles, text, or icons in this array */
const servicesV2 = [
  {
    icon: FaWordpress,
    title: "WordPress Development",
    text: "Custom WordPress websites, business sites, and landing pages. Responsive layouts built with Elementor, flexible features, and a setup you can easily manage.",
  },
  {
    icon: SiFramer,
    title: "Framer Development",
    text: "Professional Framer websites with tailored layouts, smooth animations, and mobile-friendly pages. From business websites to portfolios and creative showcases.",
  },
  {
    icon: FaReact,
    title: "MERN Stack Development",
    text: "Custom web applications built with MongoDB, Express, React, and Node.js. Interactive interfaces, REST APIs, authentication, and database integration.",
  },
  {
    icon: SiWoocommerce,
    title: "WooCommerce eCommerce",
    text: "Online stores with product setup, payment gateway integration, inventory management, and streamlined cart and checkout experiences.",
  },
  {
    icon: FaElementor,
    title: "Elementor & Landing Pages",
    text: "Responsive landing pages and custom Elementor layouts, with clear calls to action and easy-to-edit sections tailored to your business.",
  },
  {
    icon: FaShieldHalved,
    title: "Migration & Maintenance",
    text: "Website migration, hosting and domain setup, backups, updates, and ongoing maintenance to keep your website running reliably.",
  },
  {
    icon: FaTools,
    title: "Customization & Bug Fixing",
    text: "Theme customization, plugin integration, and fixes for layout or functionality issues. Practical improvements tailored to your website and business needs.",
  },
  {
    icon: FaTachometerAlt,
    title: "Speed Optimization",
    text: "Improve loading times and Core Web Vitals with image optimization, caching, database cleanup, and leaner assets for a smoother browsing experience.",
  },
  {
    icon: FaSearch,
    title: "On-Page SEO",
    text: "Search-friendly page structure, metadata, internal links, and sitemap configuration to help search engines understand your content and visitors find what they need.",
  },
];

const Services = () => {
  return (
    <section id="services" className="scroll-mt-28 relative overflow-hidden">
      {/* Subtle grid-line pattern (existing accent color at very low opacity) */}
      <div
        className="services-v2-pattern absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      ></div>

      <div className="relative z-10 mt-20 xl:mt-30 max-w-[1320px] mx-auto">
        {/* ---------- Heading block ---------- */}
        <div
          data-aos="fade-up"
          data-aos-duration="1200"
          className="services-v2-heading"
        >
          <h2 className="services-v2-title rajdhani-bold">
            Professional <span className="text-[#E9004C]">Expertise</span>
          </h2>
          <p className="services-v2-subtitle">
            Specialized in web development, eCommerce, performance optimization,
            migration, and maintenance. I deliver scalable, efficient solutions
            with a strong focus on quality, usability, and performance.
          </p>
        </div>

        {/* ---------- Services grid ---------- */}
        <ul className="services-v2-grid">
          {servicesV2.map((item, index) => {
            const Icon = item.icon;

            return (
              <li
                key={item.title}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="900"
                className="services-v2-item"
              >
                <article
                  tabIndex={0}
                  className="services-v2-card"
                  aria-labelledby={`service-v2-title-${index}`}
                >
                  <div className="services-v2-card-top">
                    <span className="services-v2-icon" aria-hidden="true">
                      <Icon size={23} />
                    </span>
                    <span className="services-v2-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3
                    id={`service-v2-title-${index}`}
                    className="services-v2-card-title"
                  >
                    {item.title}
                  </h3>
                  <p className="services-v2-card-text">{item.text}</p>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Services;
