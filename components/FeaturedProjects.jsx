import React from "react";
import CyberneticCard from "./ui/cybernetic-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const PROJECTS = [
  {
    title: "Project Alpha",
    description:
      "A revolutionary AI-driven platform for predictive analytics in healthcare.",
    stack: ["Next.js", "Python", "TensorFlow", "AWS"],
    link: "#",
    image: "/placeholder-project-1.jpg", // You'll need to replace these
  },
  {
    title: "Project Beta",
    description:
      "Decentralized finance dashboard providing real-time insights and portfolio management.",
    stack: ["React", "Solidity", "Web3.js", "Tailwind"],
    link: "#",
    image: "/placeholder-project-2.jpg",
  },
  {
    title: "Project Gamma",
    description:
      "High-performance e-commerce solution with advanced search and recommendation engine.",
    stack: ["Vue.js", "Node.js", "Elasticsearch", "Redis"],
    link: "#",
    image: "/placeholder-project-3.jpg",
  },
  {
    title: "Project Delta",
    description:
      "Collaborative workspace tool for remote teams with real-time editing and video chat.",
    stack: ["TypeScript", "Socket.io", "WebRTC", "PostgreSQL"],
    link: "#",
    image: "/placeholder-project-4.jpg",
  },
];

const FeaturedProjects = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">
          Featured Projects
        </h2>
        <p className="text-light/60 max-w-2xl mx-auto">
          A selection of key projects demonstrating expertise in AI, web
          development, and scalable systems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {PROJECTS.map((project, index) => (
          <CyberneticCard key={index} className="h-full flex flex-col">
            <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden bg-neutral-800">
              {/* Placeholder for image - using a colored div for now if image fails */}
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-700 flex items-center justify-center text-neutral-500">
                <span className="text-sm">Project Preview</span>
              </div>
              {/* Uncomment when you have real images
              <Image 
                src={project.image} 
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              */}
            </div>

            <div className="flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <a
                  href={project.link}
                  className="text-neutral-400 hover:text-white transition-colors"
                  aria-label={`View ${project.title}`}
                >
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className="w-5 h-5"
                  />
                </a>
              </div>

              <p className="text-neutral-400 mb-6 flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.stack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-neutral-300 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </CyberneticCard>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
