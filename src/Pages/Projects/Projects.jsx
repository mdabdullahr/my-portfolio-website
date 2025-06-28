import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProjectModal from "./ProjectModal";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetch("/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  const openModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="scroll-mt-28">
      <div
        data-aos="fade-up"
        data-aos-duration="3000"
        className="mt-20 xl:mt-30 max-w-[1320px] mx-auto"
      >
        <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-center text-white mb-12 rajdhani-bold">
          My Projects
        </h2>

        <div className="space-y-10">
          {projects.map((project) => (
            <div
              data-aos="fade-up"
              data-aos-duration="3000"
              key={project.id}
              className="bg-[#E9004C]/2 rounded-xl overflow-hidden flex flex-col lg:flex-row items-center shadow-2xs shadow-[#E9004C]/10 border-2 border-[#E9004C]/10"
            >
              {/* Image Slider */}
              <div
                data-aos="zoom-in"
                data-aos-duration="3000"
                className="w-full lg:w-[60%] m-0 lg:m-6 rounded-xl border-0 lg:border-2 border-[#E9004C]/20"
              >
                <Swiper
                  modules={[Autoplay, Navigation, Pagination]}
                  spaceBetween={30}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  loop={true}
                >
                  <SwiperSlide>
                    <img
                      src={project.image.img1}
                      alt="project-img1"
                      className="w-full h-[30vh] md:h-[50vh] object-cover rounded-xl"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src={project.image.img2}
                      alt="project-img2"
                      className="w-full h-[30vh] md:h-[50vh] object-cover rounded-xl"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src={project.image.img3}
                      alt="project-img3"
                      className="w-full h-[30vh] md:h-[50vh] object-cover rounded-xl"
                    />
                  </SwiperSlide>
                </Swiper>
              </div>

              {/* Project Info */}
              <div
                data-aos="fade-left"
                data-aos-duration="3000"
                className="p-5"
              >
                <h3 className="text-xl lg:text-3xl rajdhani-bold font-bold text-gray-800 dark:text-white mb-3">
                  {project.name}
                </h3>
                <p className="text-lg md:text-xl text-[#9F9F9F] line-clamp-2">
                  {project.description}
                </p>
                <ul className="mt-8 space-y-3 text-[#9F9F9F] text-lg md:text-xl line-clamp-4">
                  {project.mainFeatures.map((feature, index) => (
                    <li key={index}>
                      {index + 1}. {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-5 mt-8">
                  {project.techStack.map((stack, index) => (
                    <p
                      key={index}
                      className="text-[#E9004C] bg-[#E9004C]/20 transition-all duration-600 px-4 py-2 rounded-md"
                    >
                      {stack}
                    </p>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-5 mt-8">
                  <Link
                    to={project.liveLink}
                    target="_blank"
                    className="text-white bg-[#E9004C] px-5 rounded-full text-lg py-2"
                  >
                    Live
                  </Link>

                  <div className="relative inline-block">
                    <details className="dropdown dropdown-top">
                      <summary className="m-0 px-4 py-2 bg-[#E9004C] rounded-full cursor-pointer text-white">
                        GitHub
                      </summary>
                      <ul className="p-2 shadow menu dropdown-content z-[10] bg-white text-black rounded w-40">
                        <li className="text-[#E9004C] text-xl bg-[#E9004C]/10 rounded mb-2">
                          <a
                            href={project.githubLinks.frontend}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Frontend
                          </a>
                        </li>
                        <li className="text-[#E9004C] text-xl bg-[#E9004C]/10 rounded">
                          <a
                            href={project.githubLinks.backend}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Backend
                          </a>
                        </li>
                      </ul>
                    </details>
                  </div>

                  <button
                    onClick={() => openModal(project)}
                    className="text-white bg-[#E9004C] px-5 rounded-full text-lg py-2 cursor-pointer"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal call */}
        {modalOpen && (
          <ProjectModal project={selectedProject} onClose={closeModal} />
        )}
      </div>
    </section>
  );
};

export default Projects;
