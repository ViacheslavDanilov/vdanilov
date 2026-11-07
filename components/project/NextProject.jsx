import Link from "next/link";
import PortfolioCard from "@/components/PortfolioCard";
import Section from "@/components/project/Section";
import { getNextProject } from "@/lib/projects";

// The closing block of a project page: one related project and a way back to all of them
export default function NextProject({ id }) {
  return (
    <Section title="Next project" headingClassName="mb-6">
      <div className="max-w-md">
        <PortfolioCard project={getNextProject(id)} />
      </div>
      <Link
        href="/portfolio"
        className="relative after:absolute after:-inset-y-3 after:inset-x-0 focus-visible:after:hidden inline-block mt-6 text-sm text-gray-400 transition-colors duration-300 hover:text-accent hover:underline"
      >
        All projects
      </Link>
    </Section>
  );
}
