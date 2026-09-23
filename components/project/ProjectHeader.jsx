import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import ProjectBanner from "@/components/ProjectBanner";

// Back link, banner, and the card with title, client, tech stack and resources
export default function ProjectHeader({
  title,
  subtitle,
  banner,
  client,
  techStack,
  resources,
}) {
  return (
    <>
      <Link
        href="/portfolio"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-accent transition-colors mb-8 group"
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="w-4 h-4 transition-transform group-hover:-translate-x-1"
        />
        <span>Back to Portfolio</span>
      </Link>

      <ProjectBanner image={banner.image} alt={banner.alt} />

      <header className="mb-16 p-6 rounded-2xl bg-light/[0.03]">
        <h1 className="text-3xl md:text-4xl font-bold text-light mb-3">
          {title}
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">{subtitle}</p>

        <div className="h-px bg-light/10 my-8" />

        <div className="text-sm text-gray-400">
          <span className="text-gray-400 font-medium">Client: </span>
          <a
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            {client.name}
          </a>
          <span className="text-gray-400">{` · ${client.location}`}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 text-[11px] rounded-full bg-white/5 border border-white/10 text-gray-400"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="h-px bg-light/10 my-8" />

        <div className="flex flex-wrap gap-2">
          {resources.map((resource) => (
            <a
              key={resource.label}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-accent/10 text-accent border border-accent/30 hover:bg-accent/20 transition-colors"
            >
              {resource.label}
              <FontAwesomeIcon
                icon={faExternalLinkAlt}
                className="w-2.5 h-2.5"
              />
            </a>
          ))}
        </div>
      </header>
    </>
  );
}
