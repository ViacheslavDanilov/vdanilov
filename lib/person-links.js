import { faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookSquare,
  faGithub,
  faGitlab,
  faGoogleScholar,
  faKaggle,
  faLinkedin,
  faOrcid,
  faResearchgate,
} from "@fortawesome/free-brands-svg-icons";

// Reading order of a person's links: own site, professional, code, research profiles, social, email
export const PERSON_LINKS = [
  { key: "website", icon: faGlobe, label: "Website" },
  { key: "linkedin", icon: faLinkedin, label: "LinkedIn" },
  { key: "github", icon: faGithub, label: "GitHub" },
  { key: "gitlab", icon: faGitlab, label: "GitLab" },
  { key: "kaggle", icon: faKaggle, label: "Kaggle" },
  { key: "researchgate", icon: faResearchgate, label: "ResearchGate" },
  { key: "googleScholar", icon: faGoogleScholar, label: "Google Scholar" },
  { key: "orcid", icon: faOrcid, label: "ORCID" },
  { key: "facebook", icon: faFacebookSquare, label: "Facebook" },
  { key: "email", icon: faEnvelope, label: "Email" },
];

// Links in the order above, whatever the order of the keys in the data
export function orderedPersonLinks(links) {
  const known = new Set(PERSON_LINKS.map(({ key }) => key));
  for (const key of Object.keys(links)) {
    if (!known.has(key)) throw new Error(`Unknown person link: ${key}`);
  }
  return PERSON_LINKS.filter(({ key }) => links[key]).map((link) => {
    const isEmail = link.key === "email";
    return {
      ...link,
      href: isEmail ? `mailto:${links[link.key]}` : links[link.key],
      external: !isEmail,
    };
  });
}
