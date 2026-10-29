import React from "react";
import { BsGithub } from "react-icons/bs";
import {
  FaArrowUp,
  FaDownload,
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { Link, useLocation } from "react-router";
import logo from "../assets/logo.png";

const quickLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

const expertise = [
  "WordPress Development",
  "WooCommerce Stores",
  "Elementor Design",
  "Framer Development",
  "Speed & SEO Optimization",
  "MERN Stack Apps",
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/mdabdullahr",
    Icon: BsGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abdullah-programmer",
    Icon: FaLinkedinIn,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/md.abdullah.hossain.16133",
    Icon: FaFacebookF,
  },
  {
    label: "Email",
    href: "mailto:mdabdullah162005@gmail.com",
    Icon: FaEnvelope,
  },
];

const Footer = () => {
  const location = useLocation();

  const handleSectionClick = (sectionId) => {
    if (location.pathname !== "/") return;

    window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const backToTop = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="site-footer" data-aos="fade-up" data-aos-duration="900">
      <div className="site-footer-container">
        <div className="site-footer-grid">
          <section className="site-footer-brand" aria-label="About Abdullah">
            <Link
              to="/"
              onClick={handleLogoClick}
              className="site-footer-logo"
              aria-label="Abdullah - Home"
            >
              <img src={logo} alt="" />
              <span className="rajdhani-bold">Abdullah</span>
            </Link>
            <p className="site-footer-description">
              WordPress Developer &amp; WooCommerce Specialist crafting fast,
              secure and scalable websites, with the MERN stack for custom
              features.
            </p>
            <nav className="site-footer-socials" aria-label="Social links">
              {socialLinks.map((socialLink) => (
                <a
                  key={socialLink.label}
                  href={socialLink.href}
                  target={
                    socialLink.href.startsWith("mailto:")
                      ? undefined
                      : "_blank"
                  }
                  rel={
                    socialLink.href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="site-footer-social"
                  aria-label={
                    socialLink.label === "Email"
                      ? "Email Abdullah"
                      : socialLink.label
                  }
                >
                  <socialLink.Icon aria-hidden="true" />
                </a>
              ))}
            </nav>
          </section>

          <nav className="site-footer-column" aria-label="Quick links">
            <h2 className="site-footer-heading">Quick Links</h2>
            <ul className="site-footer-link-list">
              {quickLinks.map(({ label, id }) => (
                <li key={id}>
                  <Link
                    to={`/#${id}`}
                    onClick={() => handleSectionClick(id)}
                    className="site-footer-link"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section className="site-footer-column">
            <h2 className="site-footer-heading">Expertise</h2>
            <ul className="site-footer-expertise">
              {expertise.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="site-footer-column">
            <h2 className="site-footer-heading">Get in Touch</h2>
            <address className="site-footer-contact">
              <a href="mailto:mdabdullah162005@gmail.com">
                <FaEnvelope aria-hidden="true" />
                <span>mdabdullah162005@gmail.com</span>
              </a>
              <a href="tel:+8801927785731">
                <FaPhoneAlt aria-hidden="true" />
                <span>+880 1927-785731</span>
              </a>
              <p>
                <FaMapMarkerAlt aria-hidden="true" />
                <span>Khulna, Bangladesh</span>
              </p>
            </address>
            <a
              href="/Abdullah-Resume.pdf"
              download="Abdullah-Resume.pdf"
              className="site-footer-resume"
            >
              <FaDownload aria-hidden="true" />
              <span>Download Resume</span>
            </a>
          </section>
        </div>

        <div className="site-footer-bottom">
          <p>
            © {new Date().getFullYear()} Abdullah — WordPress Developer. All
            rights reserved.
          </p>
          <Link to="/" onClick={backToTop} className="site-footer-back-top">
            <span>Back to top</span>
            <span className="site-footer-up-icon" aria-hidden="true">
              <FaArrowUp />
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
