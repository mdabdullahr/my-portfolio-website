import React from "react";
import { BsGithub } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import { Link, useLocation } from "react-router";
import logo from "../assets/logo.png";

const Navbar = () => {
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

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  const links = (
    <>
  <li>
    <Link
      to="/#home"
      onClick={() => handleSectionClick("home")}
      className="text-white hover:text-[#E9004C] hover:bg-[#E9004C]/20 transition-all duration-600 px-4 py-2 rounded-md cursor-pointer"
    >
      Home
    </Link>
  </li>
  <li>
    <Link
      to="/#about"
      onClick={() => handleSectionClick("about")}
      className="text-white hover:text-[#E9004C] hover:bg-[#E9004C]/20 transition-all duration-600 px-4 py-2 rounded-md cursor-pointer"
    >
      About Me
    </Link>
  </li>
  <li>
    <Link
      to="/#skills"
      onClick={() => handleSectionClick("skills")}
      className="text-white hover:text-[#E9004C] hover:bg-[#E9004C]/20 transition-all duration-600 px-4 py-2 rounded-md cursor-pointer"
    >
      Skills
    </Link>
  </li>
  <li>
    <Link
      to="/#projects"
      onClick={() => handleSectionClick("projects")}
      className="text-white hover:text-[#E9004C] hover:bg-[#E9004C]/20 transition-all duration-600 px-4 py-2 rounded-md cursor-pointer"
    >
      Projects
    </Link>
  </li>
  <li>
    <Link
      to="/#contact"
      onClick={() => handleSectionClick("contact")}
      className="text-white hover:text-[#E9004C] hover:bg-[#E9004C]/20 transition-all duration-600 px-4 py-2 rounded-md cursor-pointer"
    >
      Contact
    </Link>
  </li>
</>

  );
  return (
    <div data-aos="fade-down" className="fixed top-0 left-0 w-full z-50 bg-transparent bg-opacity-50 backdrop-blur-xs">
      <div className="navbar max-w-[1320px] mx-auto px-5 py-5 md:px-20 lg:px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className=" mr-5 lg:hidden text-black dark:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#0C0C0C]/90 bg-opacity-50 backdrop-blur-md rounded-box mt-3 w-52 p-10 shadow z-[999] absolute"
            >
              {links}
            </ul>
          </div>
          <Link
            to="/"
            onClick={handleLogoClick}
            className="navbar-home-link flex items-center"
            aria-label="Abdullah - Home"
          >
            <img
              className="w-6 h-6 lg:h-10 lg:w-10 mr-2"
              src={logo}
              alt="logo"
            />
            <h3 className="text-2xl md:text-3xl lg:text-4xl rajdhani-bold font-bold text-white hidden md:block">
              Abdullah
            </h3>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 rajdhani-bold text-[16px] gap-6">
            {links}
          </ul>
        </div>
        <div className="navbar-end gap-2 md:gap-5">
          <a
            href="https://www.facebook.com/md.abdullah.hossain.16133"
            target="_blank"
            className="bg-white/10 p-3 lg:p-4 rounded-full hover:bg-[#E9004C] cursor-pointer transition-all duration-600 hidden md:flex"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://x.com/MAbdullah38476"
            target="_blank"
            className="bg-white/10 p-3 lg:p-4 rounded-full hover:bg-[#E9004C] cursor-pointer transition-all duration-600"
          >
            <FaTwitter />
          </a>
          <a
            href="https://github.com/mdabdullahr"
            target="_blank"
            className="bg-white/10 p-3 lg:p-4 rounded-full hover:bg-[#E9004C] cursor-pointer transition-all duration-600"
          >
            <BsGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/abdullah-programmer"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 p-3 lg:p-4 rounded-full hover:bg-[#E9004C] cursor-pointer transition-all duration-600"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="/Abdullah-Resume.pdf"
            download="Abdullah-Resume.pdf"
            className="p-3 lg:p-4 rounded-full bg-[#E9004C] cursor-pointer"
          >
            <LuDownload></LuDownload>
          </a>
         
        </div>
      </div>
    </div>
  );
};

export default Navbar;
