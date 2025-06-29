import React from "react";

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  const handleContentClick = (e) => {
    e.stopPropagation(); // Prevent overlay click
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0C0C0C] bg-opacity-70 p-0 md:p-4"
      onClick={handleOverlayClick}
    >
      <div
        onClick={handleContentClick}
        className="bg-[#E9004C]/5 text-white p-4 md:p-6 rounded-lg max-w-[1320px] w-full h-screen overflow-y-auto relative mx-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl font-bold cursor-pointer"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-white mb-8 rajdhani-bold">
          {project.name}
        </h2>

        {/* Images */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.values(project.image).map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`modal-img-${idx}`}
              className="rounded-lg w-full object-cover h-40 md:h-60"
            />
          ))}
        </div>

        <p className="text-[#9F9F9F] text-[16px] md:text-lg xl:text-xl my-6">
          {project.description}
        </p>

        <h3 className="text-xl md:text-2xl rajdhani-bold">Tech Stack :</h3>
        <div className="flex flex-wrap gap-5 mt-3">
          {project.techStack.map((stack, index) => (
            <p
              key={index}
              className="text-[#E9004C] bg-[#E9004C]/20 transition-all duration-600 px-4 py-2 rounded-md"
            >
              {stack}
            </p>
          ))}
        </div>

        <p className="mt-8 text-lg xl:text-xl">
          <span>Live Site :</span>
           <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Visit here
          </a>
        </p>

        <h3 className="mt-8 text-lg lg:text-xl mb-2">GitHub Links:</h3>
        <ul className="list-disc ml-6 mb-4 text-lg">
          <li>
            <a
              href={project.githubLinks.frontend}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Frontend Repo
            </a>
          </li>
          <li>
            <a
              href={project.githubLinks.backend}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Backend Repo
            </a>
          </li>
        </ul>

        <h3 className="mt-8 text-xl md:text-2xl xl:text-3xl rajdhani-bold mb-2">Challenges :</h3>
        <p className="text-[#9F9F9F] text-[16px] md:text-lg xl:text-xl">{project.challenges}</p>

        <h3 className="mt-8 text-xl md:text-2xl xl:text-3xl rajdhani-bold mb-2">Future Plans :</h3>
        <p className="text-[#9F9F9F] text-[16px] md:text-lg xl:text-xl">{project.futurePlans}</p>

        <h3 className="mt-8 text-xl md:text-2xl xl:text-3xl rajdhani-bold mb-2">Main Features:</h3>
        <ul className="list-disc ml-6 space-y-3">
          {project.mainFeatures.map((feature, idx) => (
            <li className="text-[#9F9F9F] text-[16px] md:text-lg xl:text-xl" key={idx}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectModal;
