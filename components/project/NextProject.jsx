import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import PortfolioCard from "@/components/PortfolioCard";
import Section from "@/components/project/Section";
import { PROJECTS, getNextProjects } from "@/lib/projects";

// The closing block of a project page: a related project, one from another
// category, and a way back to all of them
export default function NextProject({ id }) {
  return (
    <Section title="Keep Exploring" headingClassName="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {getNextProjects(id).map((project) => (
          <PortfolioCard
            key={project.id}
            project={project}
            titleAs="h3"
            sizes="(max-width: 767px) calc(100vw - 3rem), (max-width: 1023px) calc(50vw - 2.25rem), 476px"
          />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Link
          href="/portfolio"
          className="group relative inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-semibold text-light transition-colors duration-300 hover:bg-white/10 hover:border-white/30 after:absolute after:-inset-y-1.5 after:inset-x-0 focus-visible:after:hidden"
        >
          All {PROJECTS.length} projects
          <FontAwesomeIcon
            icon={faArrowRight}
            className="opacity-60 transition-transform duration-300 motion-safe:group-hover:translate-x-1"
            style={{ width: "0.75rem", height: "0.75rem" }}
            aria-hidden="true"
          />
        </Link>
      </div>
    </Section>
  );
}
