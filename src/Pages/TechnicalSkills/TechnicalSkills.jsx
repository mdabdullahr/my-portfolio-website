import React, { useRef, useState } from "react";
import {
  FaBolt,
  FaBoxOpen,
  FaBug,
  FaChartLine,
  FaClipboardList,
  FaClone,
  FaCloud,
  FaCloudUploadAlt,
  FaCode,
  FaCogs,
  FaCreditCard,
  FaCubes,
  FaDatabase,
  FaEnvelope,
  FaEnvelopeOpenText,
  FaExchangeAlt,
  FaFileAlt,
  FaGlobe,
  FaImage,
  FaLanguage,
  FaLayerGroup,
  FaListAlt,
  FaLock,
  FaPaintBrush,
  FaPlug,
  FaPuzzlePiece,
  FaSearch,
  FaServer,
  FaShieldAlt,
  FaShoppingCart,
  FaSitemap,
  FaSyncAlt,
  FaTachometerAlt,
  FaThLarge,
  FaUserShield,
  FaWrench,
} from "react-icons/fa";
import {
  SiBootstrap,
  SiBricks,
  SiCloudflare,
  SiCpanel,
  SiCss3,
  SiElementor,
  SiExpress,
  SiFramer,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMake,
  SiMongodb,
  SiMui,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiVercel,
  SiWoocommerce,
  SiWordpress,
} from "react-icons/si";

/* Technology content lives here — used by both the marquee and the tabbed grid */
const skillsV2Categories = [
  {
    id: "frontend",
    name: "Frontend Development",
    icon: FaCode,
    items: [
      { name: "HTML5", icon: SiHtml5 },
      { name: "CSS3", icon: SiCss3 },
      { name: "JavaScript", icon: SiJavascript },
      { name: "React.js", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Bootstrap", icon: SiBootstrap },
      { name: "Material UI", icon: SiMui },
      { name: "Framer Motion", icon: SiFramer },
    ],
  },
  {
    id: "backend",
    name: "Backend Development",
    icon: FaDatabase,
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Supabase", icon: SiSupabase },
      { name: "MySQL", icon: SiMysql },
      { name: "REST API", icon: FaServer },
      { name: "JWT", icon: SiJsonwebtokens },
      { name: "Webhooks", icon: FaExchangeAlt },
      { name: "Authentication", icon: FaUserShield },
    ],
  },
  {
    id: "cms",
    name: "CMS & Builders",
    icon: SiWordpress,
    items: [
      { name: "WordPress", icon: SiWordpress },
      { name: "WooCommerce", icon: SiWoocommerce },
      { name: "Framer", icon: SiFramer },
      { name: "Elementor Pro", icon: SiElementor },
      { name: "WPBakery", icon: FaLayerGroup },
      { name: "Bricks Builder", icon: SiBricks },
      { name: "JetEngine", icon: FaCogs },
      { name: "Gravity Forms", icon: FaClipboardList },
    ],
  },
  {
    id: "configuration",
    name: "Configuration",
    icon: FaCloud,
    items: [
      { name: "Git & GitHub", icon: SiGithub },
      { name: "cPanel", icon: SiCpanel },
      { name: "Cloudflare", icon: SiCloudflare },
      { name: "Vercel / Netlify", icon: SiVercel },
      { name: "Domain Config", icon: FaGlobe },
      { name: "SSL / HTTPS", icon: FaShieldAlt },
      { name: "SMTP Setup", icon: FaEnvelope },
      { name: "Hosting Setup", icon: FaServer },
      { name: "Make.com", icon: SiMake },
      { name: "Systeme.io", badge: "S" },
    ],
  },
];

/* Part 1 uses the same category data — one flattened source of truth */
const allTechSkills = skillsV2Categories.flatMap(
  (category) => category.items
);

/* WordPress tag marquee data */
const wordpressTagsRowOne = [
  { label: "Custom Theme Development", icon: FaCode },
  { label: "Child Theme Setup", icon: FaClone },
  { label: "Plugin Development", icon: FaPuzzlePiece },
  { label: "Plugin Customization", icon: FaCogs },
  { label: "Theme Customization", icon: FaPaintBrush },
  { label: "Payment Gateway Integration", icon: FaCreditCard },
  { label: "Custom Post Types", icon: FaListAlt },
  { label: "Custom Fields (ACF)", icon: FaCubes },
  { label: "Gutenberg Blocks", icon: FaThLarge },
  { label: "Elementor Hooks", icon: FaPlug },
  { label: "Headless WordPress", icon: SiWordpress },
  { label: "WooCommerce Store Setup", icon: SiWoocommerce },
  { label: "Product & Inventory Setup", icon: FaBoxOpen },
  { label: "Checkout Optimization", icon: FaShoppingCart },
  { label: "Multi-language (WPML / Polylang)", icon: FaLanguage },
];

const wordpressTagsRowTwo = [
  { label: "Speed Optimization", icon: FaTachometerAlt },
  { label: "Core Web Vitals", icon: FaChartLine },
  { label: "Caching Setup", icon: FaBolt },
  { label: "Image Optimization", icon: FaImage },
  { label: "Database Optimization", icon: FaDatabase },
  { label: "Malware Removal", icon: FaBug },
  { label: "Login Security", icon: FaLock },
  { label: "Firewall & Hardening", icon: FaShieldAlt },
  { label: "Backup & Restore", icon: FaCloudUploadAlt },
  { label: "Website Migration", icon: FaExchangeAlt },
  { label: "Staging Setup", icon: FaClone },
  { label: "On-Page SEO", icon: FaSearch },
  { label: "Sitemap & Schema Markup", icon: FaSitemap },
  { label: "API Integration", icon: FaPlug },
  { label: "Bug Fixing & Troubleshooting", icon: FaWrench },
  { label: "Updates & Maintenance", icon: FaSyncAlt },
  { label: "Landing Page Design", icon: FaFileAlt },
  { label: "Form & CRM Integration", icon: FaEnvelopeOpenText },
];

/* Small letter fallback for brands without an icon in the current library */
const SkillLetterBadge = ({ children, large = false }) => (
  <span
    className={`skills-v2-letter-badge${
      large ? " skills-v2-letter-badge--lg" : ""
    }`}
    aria-hidden="true"
  >
    {children}
  </span>
);

const TechnicalSkills = () => {
  const [activeCategoryId, setActiveCategoryId] = useState(
    skillsV2Categories[0].id
  );
  const tabRefs = useRef([]);

  const handleTabKeyDown = (event, index) => {
    const lastIndex = skillsV2Categories.length - 1;
    let nextIndex = index;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = index === lastIndex ? 0 : index + 1;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = index === 0 ? lastIndex : index - 1;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = lastIndex;
    } else {
      return;
    }

    event.preventDefault();
    setActiveCategoryId(skillsV2Categories[nextIndex].id);
    window.requestAnimationFrame(() => tabRefs.current[nextIndex]?.focus());
  };

  return (
    <section
      id="skills"
      className="skills-v2-section scroll-mt-28 relative overflow-hidden"
    >
      {/* Subtle grid-line pattern and soft accent glow */}
      <div
        className="skills-v2-pattern absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      ></div>
      <div
        className="skills-v2-glow absolute inset-x-0 top-0 z-0 pointer-events-none"
        aria-hidden="true"
      ></div>

      <div className="relative z-10 mt-20 xl:mt-30 max-w-[1320px] mx-auto">
        {/* ---------- Heading block ---------- */}
        <div
          data-aos="fade-up"
          data-aos-duration="1200"
          className="skills-v2-heading"
        >
          <h2 className="skills-v2-title rajdhani-bold">
            Technical <span className="text-[#E9004C]">Skills</span>
          </h2>
          <p className="skills-v2-subtitle">
            A versatile set of technologies covering frontend, backend, CMS,
            databases, and deployment. I continuously expand my toolkit to build
            modern, maintainable, and scalable web applications.
          </p>
        </div>

        {/* ---------- Part 1: tech chip marquee ---------- */}
        <div
          data-aos="fade-up"
          data-aos-duration="1200"
          className="skills-v2-rail"
        >
          <div className="skills-v2-rail-tilt">
            <div className="skills-v2-marquee">
              <div className="skills-v2-marquee-track">
                {[0, 1].map((copyIndex) => (
                  <ul
                    key={copyIndex}
                    className="skills-v2-marquee-group"
                    aria-hidden={copyIndex === 1 ? "true" : undefined}
                  >
                    {allTechSkills.map((skill) => {
                      const Icon = skill.icon;

                      return (
                        <li
                          key={`${copyIndex}-${skill.name}`}
                          className="skills-v2-marquee-item"
                        >
                          {Icon ? (
                            <Icon size={18} aria-hidden="true" />
                          ) : (
                            <SkillLetterBadge>{skill.badge}</SkillLetterBadge>
                          )}
                          <span>{skill.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Part 2: category tabs + skill grid ---------- */}
        <div
          data-aos="fade-up"
          data-aos-duration="1200"
          className="skills-v2-category-block"
        >
          <div className="skills-v2-tabs-wrap">
            <div
              className="skills-v2-tabs"
              role="tablist"
              aria-label="Technical skill categories"
              aria-orientation="horizontal"
            >
              {skillsV2Categories.map((category, index) => {
                const CategoryIcon = category.icon;
                const isActive = category.id === activeCategoryId;

                return (
                  <button
                    key={category.id}
                    ref={(element) => {
                      tabRefs.current[index] = element;
                    }}
                    type="button"
                    role="tab"
                    id={`skills-v2-tab-${category.id}`}
                    aria-selected={isActive}
                    aria-controls={`skills-v2-panel-${category.id}`}
                    tabIndex={isActive ? 0 : -1}
                    className="skills-v2-tab"
                    onClick={() => setActiveCategoryId(category.id)}
                    onKeyDown={(event) => handleTabKeyDown(event, index)}
                  >
                    <CategoryIcon size={18} aria-hidden="true" />
                    <span>{category.name}</span>
                    <span className="skills-v2-tab-count" aria-hidden="true">
                      {category.items.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {skillsV2Categories.map((category) => {
            const isActive = category.id === activeCategoryId;

            return (
              <div
                key={category.id}
                id={`skills-v2-panel-${category.id}`}
                role="tabpanel"
                aria-labelledby={`skills-v2-tab-${category.id}`}
                tabIndex={0}
                hidden={!isActive}
                className="skills-v2-panel"
              >
                <h3 className="sr-only">{category.name}</h3>
                {/* Remount the active grid so cards replay their stagger */}
                <ul
                  key={
                    isActive
                      ? `${category.id}-${activeCategoryId}`
                      : category.id
                  }
                  className="skills-v2-skill-grid"
                >
                  {category.items.map((skill, index) => {
                    const SkillIcon = skill.icon;

                    return (
                      <li
                        key={skill.name}
                        className="skills-v2-skill-item"
                        style={{ "--skills-v2-index": index }}
                      >
                        <article
                          tabIndex={0}
                          className="skills-v2-skill-card"
                        >
                          <span
                            className="skills-v2-skill-icon"
                            aria-hidden="true"
                          >
                            {SkillIcon ? (
                              <SkillIcon size={28} />
                            ) : (
                              <SkillLetterBadge large>
                                {skill.badge}
                              </SkillLetterBadge>
                            )}
                          </span>
                          <h4 className="skills-v2-skill-name">
                            {skill.name}
                          </h4>
                        </article>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        {/* ---------- Part 3: WordPress work tags ---------- */}
        <div
          data-aos="fade-up"
          data-aos-duration="1200"
          className="skills-v2-tags-block"
        >
          <div className="skills-v2-tags-rows">
            {/* Row 1 — scrolls right to left */}
            <div className="skills-v2-marquee skills-v2-tags-marquee">
              <div className="skills-v2-marquee-track">
                {[0, 1].map((copyIndex) => (
                  <ul
                    key={copyIndex}
                    className="skills-v2-marquee-group"
                    aria-hidden={copyIndex === 1 ? "true" : undefined}
                  >
                    {wordpressTagsRowOne.map((tag) => {
                      const TagIcon = tag.icon;

                      return (
                        <li
                          key={`${copyIndex}-${tag.label}`}
                          className="skills-v2-marquee-item"
                        >
                          <TagIcon size={18} aria-hidden="true" />
                          <span>{tag.label}</span>
                        </li>
                      );
                    })}
                  </ul>
                ))}
              </div>
            </div>

            {/* Row 2 — scrolls left to right */}
            <div className="skills-v2-marquee skills-v2-tags-marquee skills-v2-marquee--reverse">
              <div className="skills-v2-marquee-track">
                {[0, 1].map((copyIndex) => (
                  <ul
                    key={copyIndex}
                    className="skills-v2-marquee-group"
                    aria-hidden={copyIndex === 1 ? "true" : undefined}
                  >
                    {wordpressTagsRowTwo.map((tag) => {
                      const TagIcon = tag.icon;

                      return (
                        <li
                          key={`${copyIndex}-${tag.label}`}
                          className="skills-v2-marquee-item"
                        >
                          <TagIcon size={18} aria-hidden="true" />
                          <span>{tag.label}</span>
                        </li>
                      );
                    })}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;
