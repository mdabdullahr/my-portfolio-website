import React, { useRef } from "react";
import { BsGithub } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { PiPhoneCallFill } from "react-icons/pi";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const ContactInfo = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_m86ygme", "template_c9tjraf", form.current, {
        publicKey: "HYqVXlzLceJ5Gf-3n",
      })
      .then(
        () => {
          Swal.fire({
            icon: "success",
            title: "Message sent successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          e.target.reset();
        },
        (error) => {
          alert.error("FAILED...", error.text);
        }
      );
  };
  return (
    <section id="contact" className="scroll-mt-28">
      <div
        data-aos="fade-up"
        data-aos-duration="3000"
        className="mt-20 xl:mt-30 pb-10 max-w-[1320px] mx-auto"
      >
        <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-white mb-10 text-center rajdhani-bold">
          Contact
        </h2>
        <div className="border-2 border-[#E9004C]/10 rounded-xl flex flex-col md:flex-row  gap-4 lg:gap-8 p-4 lg:p-8">
          <div
            data-aos="zoom-in"
            data-aos-duration="3000"
            className="bg-[#E9004C]/2 flex-1 rounded-xl "
          >
            <h3 className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-white mt-10 mb-14 px-10 rajdhani-bold">
              <PiPhoneCallFill className="text-[#E9004C]" /> Contact Information
            </h3>

            <div className="bg-[#0C0C0C] m-8 rounded-xl h-[65%] border-2 border-[#E9004C]/10">
              <div className="p-8 space-y-4">
                <p className=" text-lg text-[#9F9F9F]">
                  <span className="font-semibold">Full Name : </span> Abdullah
                  Hossain
                </p>
                <p className=" text-lg text-[#9F9F9F]">
                  <span className="font-semibold">Address : </span> Satkhira,
                  Bangladesh
                </p>
                <p className=" text-lg text-[#9F9F9F]">
                  <span className="font-semibold">Mobile : </span>{" "}
                  +8801768262031
                </p>
                <p className=" text-lg text-[#9F9F9F]">
                  <span className="font-semibold">WatsApp :</span>{" "}
                  +8801927785731
                </p>
                <p className=" text-lg text-[#9F9F9F]">
                  <span className="font-semibold">Email :</span>{" "}
                  mdabdullah162005@gmail.com
                </p>
                <div className="flex flex-col md:flex-row items-center gap-5 flex-wrap">
                  <p className=" text-lg text-[#9F9F9F]">
                    <span className="font-semibold">social :</span>{" "}
                  </p>
                  <div className="navbar-end gap-2 md:gap-5">
                    <a
                      href="https://www.facebook.com/md.abdullah.hossain.16133"
                      target="_blank"
                      className="bg-white/10 p-3 lg:p-4 rounded-full hover:bg-[#E9004C] cursor-pointer transition-all duration-600"
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
                      href="https://www.linkedin.com/"
                      target="_blank"
                      className="bg-white/10 p-3 lg:p-4 rounded-full hover:bg-[#E9004C] cursor-pointer transition-all duration-600"
                    >
                      <FaLinkedinIn />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            data-aos="zoom-in"
            data-aos-duration="3000"
            className="bg-[#E9004C]/2 flex-1 rounded-xl p-8"
          >
            <form ref={form} onSubmit={sendEmail} className="space-y-8">
              <div>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-8 py-2 rounded-xl focus:outline-none h-16 bg-[#0C0C0C]  text-white text-lg focus:outline-0 border-2 border-[#E9004C]/10"
                  placeholder="Name"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-8 py-2 rounded-xl focus:outline-none h-16 bg-[#0C0C0C]  text-white text-lg focus:outline-0 border-2 border-[#E9004C]/10"
                  placeholder="email"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  rows="7"
                  required
                  className="w-full px-8 py-5 rounded-xl bg-[#0C0C0C] text-white text-lg focus:outline-0 border-2 border-[#E9004C]/10"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-[#E9004C] text-white text-lg font-semibold px-6 py-2 md:py-4 rounded w-full cursor-pointer"
              >
                Send Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
