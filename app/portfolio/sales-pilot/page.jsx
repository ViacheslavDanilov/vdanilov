import {
  faSearch,
  faBullseye,
  faCogs,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import ImageLightbox from "@/components/ImageLightbox";
import { pageMetadata } from "@/lib/metadata";
import ProjectHeader from "@/components/project/ProjectHeader";
import Highlights from "@/components/project/Highlights";
import CoreTeam from "@/components/project/CoreTeam";
import Section from "@/components/project/Section";

export const metadata = pageMetadata({
  title: "Sales Pilot",
  description:
    "AI-powered lead scoring system using hybrid heuristics and OpenAI embeddings to automate and prioritize high-fit leads at scale.",
  path: "/portfolio/sales-pilot/",
  image: {
    url: "/portfolio/previews/sales-pilot.jpg",
    alt: "Sales Pilot - AI-powered lead scoring",
  },
});

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
    photo: "/people/viacheslav-danilov.webp",
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
    role: "ML Engineer",
    organization: "Symfa",
    location: "Prague · Czechia 🇨🇿",
    photo: "/people/anton-makoveev.webp",
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
    role: "Data Scientist",
    organization: "Symfa",
    location: "Barcelona · Spain 🇪🇸",
    photo: "/people/mikhail-vinogradov.webp",
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
    photo: "/people/aleksandr-nasstrom.webp",
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
    photo: "/people/rita-tretyakevich.webp",
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
    photo: "/people/vitali-yurkevich.webp",
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

export default function ProjectPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-24">
        <ProjectHeader
          title="Sales Pilot"
          subtitle="AI-powered lead scoring system that transforms manual lead generation into a streamlined, scalable, and data-driven process"
          banner={{
            image: "/portfolio/previews/sales-pilot.jpg",
            alt: "Sales Pilot - AI-powered sales assistant platform",
          }}
          client={{
            name: "Symfa",
            url: "https://symfa.com/",
            location: "Miami · United States 🇺🇸",
          }}
          techStack={TECH_STACK}
          resources={RESOURCES}
        />

        {/* Content Sections */}
        <div className="space-y-16">
          <Highlights items={HIGHLIGHTS_ITEMS} />

          <CoreTeam members={TEAM_MEMBERS} />

          {/* Overview */}
          <Section title="Overview">
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
                It evaluates each lead across three pillars (job description,
                contact profile, and company fit) using both deterministic
                heuristics and embedding-based semantic models. The final result
                is a dynamic lead scoring engine that automates decision-making,
                allowing sales and growth teams to focus on outreach with the
                highest potential for success. This not only accelerates the
                workflow but also significantly enhances targeting accuracy and
                lead quality.
              </p>
            </div>
          </Section>

          {/* Data */}
          <Section title="Data">
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
          </Section>

          {/* Methods */}
          <Section title="Methods">
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
                width={2500}
                height={2443}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> Sales Pilot
                workflow showing the component-based lead scoring architecture.
              </figcaption>
            </figure>
          </Section>

          {/* Results */}
          <Section title="Results">
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
          </Section>

          {/* Conclusion */}
          <Section title="Conclusion">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              Sales Pilot demonstrates how AI and ML can transform outbound lead
              generation from a time-intensive, manual task into a strategic and
              scalable advantage. By integrating heuristic scoring with
              embedding-powered NLP, the system identifies the most promising
              opportunities for outreach, tailored to different operational
              strategies.
            </p>
            <p className="text-gray-300 leading-relaxed text-justify">
              Future enhancements could include continuous retraining of
              embeddings with feedback loops, expansion to other platforms
              beyond Upwork and LinkedIn, and integration with CRM systems for
              fully automated outreach workflows.
            </p>
          </Section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </div>
  );
}
