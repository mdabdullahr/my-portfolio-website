import React, { useRef, useState } from "react";
import { BsGithub } from "react-icons/bs";
import {
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPhoneAlt,
  FaUser,
  FaWhatsapp,
} from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { PiPhoneCallFill } from "react-icons/pi";
import Swal from "sweetalert2";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/md.abdullah.hossain.16133",
    Icon: FaFacebookF,
  },
  { label: "X (Twitter)", href: "https://x.com/MAbdullah38476", Icon: FaTwitter },
  { label: "GitHub", href: "https://github.com/mdabdullahr", Icon: BsGithub },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abdullah-programmer",
    Icon: FaLinkedinIn,
  },
];

const ContactInfo = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    if (isSending) return;

    const formElement = form.current;
    if (!formElement) return;

    const formData = new FormData(formElement);
    if (formData.get("_honey")) return;

    setIsSending(true);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/mdabdullah162005@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
            _subject: "New message from your portfolio website",
            _template: "table",
            _captcha: "false",
            _honey: formData.get("_honey"),
          }),
        }
      );
      const data = await response.json();

      if (!response.ok || !(data.success === "true" || data.success === true)) {
        throw new Error(
          data.message ||
            "Please try again or email mdabdullah162005@gmail.com directly."
        );
      }

      await Swal.fire({
        icon: "success",
        title: "Message sent successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      formElement.reset();
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Unable to send message",
        text: `${error.message || "Please try again later."} You can also email mdabdullah162005@gmail.com directly.`,
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="contact-info-section scroll-mt-28">
      <div
        data-aos="fade-up"
        data-aos-duration="1200"
        className="contact-info-container"
      >
        <header className="contact-info-header">
          <h2 className="skills-v2-title rajdhani-bold">Contact</h2>
          <p className="skills-v2-subtitle contact-info-subtitle">
            Have a project in mind or need help with your website? Send me a
            message and I will get back to you soon.
          </p>
        </header>

        <div className="contact-info-card">
          <div className="contact-info-details">
            <h3 className="contact-info-heading">
              <span className="contact-info-heading-icon" aria-hidden="true">
                <PiPhoneCallFill />
              </span>
              Contact Information
            </h3>

            <div className="contact-info-list">
              <div className="contact-info-row">
                <span className="contact-info-row-icon" aria-hidden="true">
                  <FaUser />
                </span>
                <div className="contact-info-row-copy">
                  <span className="contact-info-label">Full Name</span>
                  <span className="contact-info-value">Abdullah</span>
                </div>
              </div>

              <div className="contact-info-row">
                <span className="contact-info-row-icon" aria-hidden="true">
                  <FaMapMarkerAlt />
                </span>
                <div className="contact-info-row-copy">
                  <span className="contact-info-label">Address</span>
                  <span className="contact-info-value">
                    Khulna, Bangladesh
                  </span>
                </div>
              </div>

              <div className="contact-info-row">
                <span className="contact-info-row-icon" aria-hidden="true">
                  <FaPhoneAlt />
                </span>
                <div className="contact-info-row-copy">
                  <span className="contact-info-label">Mobile</span>
                  <a className="contact-info-value" href="tel:+8801768262031">
                    +8801768262031
                  </a>
                </div>
              </div>

              <div className="contact-info-row">
                <span className="contact-info-row-icon" aria-hidden="true">
                  <FaWhatsapp />
                </span>
                <div className="contact-info-row-copy">
                  <span className="contact-info-label">WhatsApp</span>
                  <a
                    className="contact-info-value"
                    href="https://wa.me/8801927785731"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +8801927785731
                  </a>
                </div>
              </div>

              <div className="contact-info-row">
                <span className="contact-info-row-icon" aria-hidden="true">
                  <FaEnvelope />
                </span>
                <div className="contact-info-row-copy">
                  <span className="contact-info-label">Email</span>
                  <a
                    className="contact-info-value contact-info-email"
                    href="mailto:mdabdullah162005@gmail.com"
                  >
                    mdabdullah162005@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-info-social">
              <h4>Follow me</h4>
              <div className="contact-info-social-links">
                {socialLinks.map((socialLink) => (
                  <a
                    key={socialLink.label}
                    href={socialLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-info-social-link"
                    aria-label={`Follow me on ${socialLink.label}`}
                  >
                    <socialLink.Icon aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form
            ref={form}
            onSubmit={sendEmail}
            className="contact-info-form"
          >
            <input
              type="text"
              name="_honey"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              hidden
            />
            <div className="contact-info-field">
              <label htmlFor="contact-name">Your Name</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                required
                placeholder="Name"
              />
            </div>

            <div className="contact-info-field">
              <label htmlFor="contact-email">Your Email</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                required
                placeholder="email"
              />
            </div>

            <div className="contact-info-field">
              <label htmlFor="contact-message">Your Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows="7"
                required
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="contact-info-submit"
              disabled={isSending}
            >
              <span>{isSending ? "Sending..." : "Send Email"}</span>
              <FaPaperPlane aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
