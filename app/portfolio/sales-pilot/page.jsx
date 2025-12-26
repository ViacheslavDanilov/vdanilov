import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faSearch,
  faBullseye,
  faCogs,
  faChartLine,
  faExternalLinkAlt,
  faGlobe,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faResearchgate,
  faGoogleScholar,
  faOrcid,
} from "@fortawesome/free-brands-svg-icons";
import ImageLightbox from "@/components/ImageLightbox";
import { GlowCard } from "@/components/ui/glow-card";

export const metadata = {
  title: "Sales Pilot – Viacheslav Danilov",
  description:
    "AI-powered lead scoring system that transforms manual lead generation into a streamlined, scalable process using hybrid heuristics and OpenAI embeddings.",
};

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "Manual lead sourcing on freelance platforms like Upwork was slow, unscalable, and lacked targeting accuracy.",
  },
  {
    icon: faBullseye,
    label: "Task",
    text: "Lead the design of an AI-driven scoring system to automate and prioritize high-fit leads.",
  },
  {
    icon: faCogs,
    label: "Action",
    text: "Built a hybrid scoring engine using explainable heuristics and OpenAI embeddings to rank jobs, contacts, and companies.",
  },
  {
    icon: faChartLine,
    label: "Result",
    text: "Reduced lead sourcing time from days to minutes and improved outreach accuracy through high-quality lead filtering.",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Viacheslav Danilov",
    role: "R&D Lead",
    organization: "Symfa",
    location: "Barcelona · Spain 🇪🇸",
    photo: "/portfolio/team/viacheslav-danilov.webp",
    links: {
      linkedin: "https://www.linkedin.com/in/viacheslav-danilov/",
      github: "https://github.com/ViacheslavDanilov",
      researchgate: "https://www.researchgate.net/profile/Viacheslav-Danilov-2",
      google: "https://scholar.google.com/citations?user=SJidGZkAAAAJ&hl=en",
      email: "viacheslav.v.danilov@gmail.com",
    },
  },
  {
    name: "Anton Makoveev",
    role: "Middle ML Engineer",
    organization: "Symfa",
    location: "Prague · Czechia 🇨🇿",
    photo: "/portfolio/team/anton-makoveev.webp",
    links: {
      linkedin: "https://www.linkedin.com/in/anton-makoveev/",
      github: "https://github.com/mak-en",
      orcid: "https://orcid.org/0000-0002-1819-3942",
      google: "https://scholar.google.com/citations?user=fOscab0AAAAJ",
      email: "makoveev90@gmail.com",
    },
  },
  {
    name: "Mikhail Vinogradov",
    role: "Middle Data Scientist",
    organization: "Symfa",
    location: "Barcelona · Spain 🇪🇸",
    photo: "/portfolio/team/mikhail-vinogradov.webp",
    links: {
      linkedin: "https://www.linkedin.com/in/michaelvin1322",
      github: "https://github.com/michaelvin1322",
      email: "mikhail.vinogradov@symfa.com",
    },
  },
  {
    name: "Aleksandr Nasstrom",
    role: "Senior JS Developer",
    organization: "Symfa",
    location: "Barcelona · Spain 🇪🇸",
    photo: "/portfolio/team/aleksandr-nasstrom.webp",
    links: {
      linkedin: "https://www.linkedin.com/in/a-nasstrom",
      github: "https://github.com/a-nasstrom",
      email: "a.nasstrom@symfa.com",
    },
  },
  {
    name: "Rita Tretyakevich",
    role: "Business Analyst",
    organization: "Symfa",
    location: "Warsaw · Poland 🇵🇱",
    photo: "/portfolio/team/rita-tretyakevich.webp",
    links: {
      linkedin: "https://www.linkedin.com/in/rita-tretyakevich/",
      email: "m.tretyakevich@symfa.com",
    },
  },
  {
    name: "Vitali Yurkevich",
    role: "Product Owner",
    organization: "Symfa",
    location: "Miami · United States 🇺🇸",
    photo: "/portfolio/team/vitali-yurkevich.webp",
    links: {
      linkedin: "https://www.linkedin.com/in/vitalisymfa",
      email: "vitaly.yurkevich@symfa.com",
    },
  },
];

const RESOURCES = [
  {
    label: "Presentation",
    url: "https://www.linkedin.com/posts/viacheslav-danilov_the-future-of-business-challenges-activity-7315342704802959379-spfI",
  },
];

const TECH_STACK = ["Python", "OpenAI", "scikit-learn", "DVC", "CI/CD", "LLM"];

function TeamMemberCard({ member }) {
  const iconMap = {
    linkedin: faLinkedin,
    github: faGithub,
    researchgate: faResearchgate,
    google: faGoogleScholar,
    orcid: faOrcid,
    globe: faGlobe,
    email: faEnvelope,
  };

  return (
    <GlowCard
      glowColor="blue"
      customSize={true}
      className="w-full h-full p-5"
      enableSpotlight={true}
      enableBorderGlow={true}
      spotlightSize={240}
    >
      {/* Centered vertical layout */}
      <div className="flex flex-col items-center text-center h-full">
        {/* Photo */}
        <div className="relative w-24 h-24 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-accent/20 shadow-lg bg-dark mb-4">
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 80px, 96px"
            className="object-cover"
          />
        </div>
        {/* Info */}
        <h4 className="text-base font-bold text-light mb-1.5">{member.name}</h4>
        <p className="text-sm font-medium text-accent mb-2">{member.role}</p>
        <p className="text-sm text-gray-300 mb-2">{member.organization}</p>
        <p className="text-sm text-gray-500 mb-4">{member.location}</p>
        {/* Social Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-auto">
          {Object.entries(member.links).map(([key, url]) => (
            <a
              key={key}
              href={key === "email" ? `mailto:${url}` : url}
              target={key === "email" ? undefined : "_blank"}
              rel={key === "email" ? undefined : "noopener noreferrer"}
              className="text-gray-400 hover:text-light transition-all duration-300 transform hover:scale-110"
              aria-label={key}
            >
              <FontAwesomeIcon
                icon={iconMap[key]}
                className="w-4 h-4"
                style={{
                  width: "1rem",
                  height: "1rem",
                  display: "block",
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </GlowCard>
  );
}

export default function ProjectPage() {
  return (
    <main className="min-h-screen pt-24">
      <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-24">
        {/* Back Navigation */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-accent 
                     transition-colors mb-8 group"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
          />
          <span>Back to Portfolio</span>
        </Link>

        {/* Project Header */}
        <header className="mb-16 p-6 rounded-2xl bg-light/[0.03]">
          <h1 className="text-3xl md:text-4xl font-bold text-light mb-3">
            Sales Pilot
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            AI-powered lead scoring system that transforms manual lead
            generation into a streamlined, scalable, and data-driven process
          </p>

          {/* Divider */}
          <div className="h-px bg-light/10 my-8" />

          {/* Client */}
          <div className="text-sm text-gray-400">
            <span className="text-gray-400 font-medium">Client: </span>
            <a
              href="https://symfa.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Symfa
            </a>
            <span className="text-gray-400"> · Miami · United States 🇺🇸</span>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 text-[11px] rounded-full bg-white/5 border border-white/10 text-gray-400"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-light/10 my-8" />

          {/* Resources */}
          <div className="flex flex-wrap gap-2">
            {RESOURCES.map((resource) => (
              <a
                key={resource.label}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium 
                           rounded-lg bg-accent/10 text-accent border border-accent/30 
                           hover:bg-accent/20 transition-colors"
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

        {/* Content Sections */}
        <div className="space-y-16">
          {/* Highlights - STAR Section */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-6 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {HIGHLIGHTS_ITEMS.map((item, index) => (
                <GlowCard
                  key={item.label}
                  glowColor="blue"
                  customSize={true}
                  className="group w-full h-full p-5"
                  enableSpotlight={true}
                  enableBorderGlow={true}
                  spotlightSize={240}
                >
                  <div className="flex flex-col gap-3">
                    {/* Icon + Label row */}
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={item.icon}
                        className="w-3.5 h-3.5 text-white/70 transition-colors duration-300 group-hover:text-accent"
                        style={{
                          width: "0.875rem",
                          height: "0.875rem",
                          display: "inline-block",
                        }}
                      />
                      <span className="text-xs uppercase tracking-wider text-light transition-colors duration-300 group-hover:text-accent font-semibold">
                        {item.label}
                      </span>
                    </div>
                    {/* Description */}
                    <p className="text-sm text-light/80 leading-relaxed text-justify">
                      {item.text}
                    </p>
                  </div>
                </GlowCard>
              ))}
            </div>
          </section>

          {/* Core Team */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-6 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Core Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {TEAM_MEMBERS.map((member) => (
                <TeamMemberCard key={member.name} member={member} />
              ))}
            </div>
          </section>

          {/* Summary */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Summary
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-4 text-justify">
                Sales Pilot is an AI-powered system that transforms manual lead
                generation into a streamlined, scalable, and data-driven
                process. Designed to target freelance and consulting
                opportunities, primarily on Upwork and LinkedIn, the system
                identifies promising job postings, assesses the publishing
                contacts, and evaluates associated companies to prioritize
                high-quality leads.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify">
                The innovation lies in its component-based scoring architecture.
                It evaluates each lead across three pillars – job description,
                contact profile, and company fit – using both deterministic
                heuristics and embedding-based semantic models. The final result
                is a dynamic lead scoring engine that automates decision-making,
                allowing sales and growth teams to focus on outreach with the
                highest potential for success. This not only accelerates the
                workflow but also significantly enhances targeting accuracy and
                lead quality.
              </p>
            </div>
          </section>

          {/* Data */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Data
            </h2>

            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The system integrates and processes diverse datasets from several
              public and third-party platforms:
            </p>
            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Job Data:</strong> Pulled
                  from Upwork&apos;s public API, including metadata like job
                  descriptions, client spending history, and ratings.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Company Data:</strong>{" "}
                  Enriched via Apollo and other business intelligence sources,
                  including industry, size, location, and revenue signals.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Contact Data:</strong>{" "}
                  Retrieved via LinkedIn scraping and profile parsing.
                </span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              The data is stored in a dedicated MongoDB database, normalized
              using a custom feature labeling scheme (0–4 scale) to ensure
              consistency across structured and unstructured fields. Features
              requiring semantic interpretation (e.g., job description, contact
              role) are further processed using OpenAI&apos;s{" "}
              <a
                href="https://platform.openai.com/docs/models/text-embedding-3-large"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                text-embedding-3-large
              </a>{" "}
              vectors.
            </p>
          </section>

          {/* Methods */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Methods
            </h2>

            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The project employs a hybrid evaluation model combining
              explainable heuristic-based logic with semantic vector scoring.
              Key techniques include:
            </p>

            <ul className="space-y-4 text-gray-300 mb-6 text-justify">
              <li>
                <strong className="text-gray-200">
                  Heuristic-based scoring:
                </strong>{" "}
                Deterministic scoring of structured data fields (e.g., location,
                university, Upwork payment verification) with weighted formulas
                across components.
              </li>
              <li>
                <strong className="text-gray-200">
                  Component-based lead modeling:
                </strong>
                <ul className="mt-2 ml-4 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>
                      <strong className="text-gray-300">Job:</strong> Assessed
                      by employer rating, money spent, description quality, and
                      payment verification.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>
                      <strong className="text-gray-300">Contact:</strong>{" "}
                      Evaluated by seniority (title), location, education, and
                      past employment.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>
                      <strong className="text-gray-300">Company:</strong> Scored
                      by size, revenue, industry alignment, and geography.
                    </span>
                  </li>
                </ul>
              </li>
              <li>
                <strong className="text-gray-200">
                  OpenAI embedding class assignment:
                </strong>{" "}
                For unstructured text fields, the system embeds input into
                3072-D space and assigns labels based on proximity to
                pre-labeled centroids (0–4 score classes).
              </li>
              <li>
                <strong className="text-gray-200">Weighted aggregation:</strong>{" "}
                Final lead score = 0.10 × Job + 0.40 × Contact + 0.50 × Company.
                This ensures relevance filtering tailored to different business
                priorities.
              </li>
            </ul>

            {/* Figure 1: Workflow */}
            <figure id="figure-1" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/sales-pilot/sales-pilot-workflow.webp"
                alt="Sales Pilot Workflow"
                width={1920}
                height={1080}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> Sales Pilot
                workflow showing the component-based lead scoring architecture.
              </figcaption>
            </figure>
          </section>

          {/* Results */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Results
            </h2>

            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The system enables proactive engagement with high-quality
              prospects, yielding better conversion rates and streamlined
              workflows:
            </p>

            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">
                    Lead Filtering Accuracy:
                  </strong>{" "}
                  Only leads scoring above 2.5 (on a 0–4 scale) are passed to
                  outreach tools, ensuring high-fit contacts.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Efficiency Gains:</strong>{" "}
                  Reduced manual lead sourcing time from hours/days to minutes,
                  automating the full funnel from job discovery to contact
                  personalization.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">
                    Semantic Robustness:
                  </strong>{" "}
                  Embedding-based scoring proved effective across varied job
                  descriptions and role titles, achieving consistent
                  categorization even with diverse phrasing.
                </span>
              </li>
            </ul>
          </section>

          {/* Conclusion */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Conclusion
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              Sales Pilot demonstrates how AI and ML can transform outbound lead
              generation from a time-intensive, manual task into a strategic and
              scalable advantage. By integrating heuristic scoring with
              embedding-powered NLP, the system identifies the most promising
              opportunities for outreach — tailored to different operational
              strategies.
            </p>
            <p className="text-gray-300 leading-relaxed text-justify">
              Future enhancements could include continuous retraining of
              embeddings with feedback loops, expansion to other platforms
              beyond Upwork and LinkedIn, and integration with CRM systems for
              fully automated outreach workflows.
            </p>
          </section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </main>
  );
}
