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
        className="relative after:absolute after:-inset-y-3 after:inset-x-0 focus-visible:after:hidden inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-8 group"
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="w-4 h-4 transition-transform motion-safe:group-hover:-translate-x-1"
        />
        <span>Back to Portfolio</span>
      </Link>

      <ProjectBanner image={banner.image} alt={banner.alt} />

      <header className="mb-16 p-6 rounded-2xl bg-strong/[0.03]">
        <h1 className="text-3xl md:text-4xl font-bold text-strong mb-3">
          {title}
        </h1>
        <p className="text-lg text-muted leading-relaxed">{subtitle}</p>

        <div className="h-px bg-strong/10 my-8" />

        <div className="text-sm text-muted">
          <span className="text-muted font-medium">Client: </span>
          <a
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-2 -mx-2 py-3.5 focus-visible:p-0 focus-visible:m-0 text-accent hover:underline"
          >
            {client.name}
          </a>
          <span className="text-muted">{` · ${client.location}`}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 text-xs rounded-full bg-ink/5 border border-line text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="h-px bg-strong/10 my-8" />

        <div className="flex flex-wrap gap-x-2 gap-y-2.5">
          {resources.map((resource) => (
            <a
              key={resource.label}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative after:absolute after:-inset-y-1.5 after:inset-x-0 focus-visible:after:hidden inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-accent/10 text-accent border border-accent/30 hover:bg-accent/20 transition-colors"
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
