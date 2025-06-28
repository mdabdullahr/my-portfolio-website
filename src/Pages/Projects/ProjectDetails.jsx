import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch("/projects.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id === id);
        setProject(found);
      });
  }, [id]);

  if (!project) return <div className="text-center text-white mt-20">Loading...</div>;

  return (
    <div className="max-w-[960px] mx-auto px-4 py-16 text-white">
      <h2 className="text-4xl font-bold mb-6 rajdhani-bold">{project.name}</h2>
      <img src={project.image} alt={project.name} className="w-full rounded mb-6" />

      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Tech Stack:</h3>
        <ul className="list-disc list-inside ml-4">
          {project.techStack.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Description:</h3>
        <p>{project.description}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Challenges:</h3>
        <p>{project.challenges}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Future Plans:</h3>
        <p>{project.futurePlans}</p>
      </div>

      <div className="flex gap-4 mt-6">
        <a
          href={project.liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition"
        >
          Live Site
        </a>
        <a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-800 transition"
        >
          GitHub Repo
        </a>
      </div>
    </div>
  );
};

export default ProjectDetails;

