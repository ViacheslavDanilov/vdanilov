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
  faGitlab,
  faLinkedin,
  faResearchgate,
  faGoogleScholar,
  faOrcid,
} from "@fortawesome/free-brands-svg-icons";
import ImageLightbox from "@/components/ImageLightbox";
import { GlowCard } from "@/components/ui/glow-card";

export const metadata = {
  title: "Wavelets in the Brain – Viacheslav Danilov",
  description:
    "Non-invasive ICP monitoring using deep learning on cerebral blood flow signals. Achieved 71% predictions within ±6 mmHg in the clinically critical 0–15 mmHg range.",
};

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "Clinicians at Vall d'Hebron Barcelona Hospital needed a safe, scalable method to monitor intracranial pressure in patients with neurological conditions, as the current invasive approach requires drilling into the skull and carries risks of infection and hemorrhage.",
  },
  {
    icon: faBullseye,
    label: "Task",
    text: "Develop a non-invasive, machine learning-based solution to estimate ICP from cerebral blood flow signals acquired using near-infrared photonic sensors.",
  },
  {
    icon: faCogs,
    label: "Action",
    text: "Designed and validated a wavelet-based deep learning model (mWDN), benchmarking it against 9 time-series models and deploying an ensemble strategy with rigorous preprocessing and cross-validation.",
  },
  {
    icon: faChartLine,
    label: "Result",
    text: "Achieved 71% of predictions within ±6 mmHg in the clinically critical 0–15 mmHg range, enabling accurate, bedside-compatible ICP tracking without surgical intervention.",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Viacheslav Danilov",
    role: "Lead ML Engineer",
    organization: "Pompeu Fabra University",
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
    name: "Monica Torrecilla",
    role: "Biophotonics Scientist",
    organization: "ICFO",
    location: "Barcelona · Spain 🇪🇸",
    photo: "/portfolio/team/monica-torrecilla.webp",
    links: {
      globe:
        "https://becarios.fundacionlacaixa.org/en/monica-torrecilla-vall-llossera-B006214",
      researchgate:
        "https://www.researchgate.net/profile/Monica-Torrecilla-Vall-Llossera",
      email: "monica.torrecilla@icfo.eu",
    },
  },
  {
    name: "Turgut Durduran",
    role: "Biophotonics Scientist​",
    organization: "ICFO",
    location: "Barcelona · Spain 🇪🇸",
    photo: "/portfolio/team/turgut-durduran.webp",
    links: {
      globe: "https://www.icrea.cat/community/icreas/16857/turgut-durduran/",
      linkedin: "https://www.linkedin.com/in/turgut-durduran-5a47a294",
      researchgate: "https://www.researchgate.net/profile/Turgut-Durduran",
      google: "https://scholar.google.com/citations?user=c7reUlAAAAAJ&hl=en",
      email: "turgut.durduran@icfo.eu",
    },
  },
  {
    name: "Maria Poca",
    role: "Lead Neurosurgeon",
    organization: "Vall d'Hebron Hospital",
    location: "Barcelona · Spain 🇪🇸",
    photo: "/portfolio/team/maria-poca.webp",
    links: {
      globe:
        "https://www.vallhebron.com/es/profesionales/maria-antonia-poca-pastor",
      orcid: "https://orcid.org/0000-0002-3831-0536",
      email: "pocama@neurotrauma.net",
    },
  },
  {
    name: "Gemma Piella",
    role: "Professor",
    organization: "Pompeu Fabra University",
    location: "Barcelona · Spain 🇪🇸",
    photo: "/portfolio/team/gemma-piella.webp",
    links: {
      globe: "https://memoir.icrea.cat/academia_awardees/piella-gemma/",
      linkedin: "https://www.linkedin.com/in/gemma-piella-a234b4/",
      researchgate: "https://www.researchgate.net/profile/Gemma-Piella",
      google: "https://scholar.google.com/citations?user=Q6zjCpsAAAAJ&hl=en",
      email: "gemma.piella@upf.edu",
    },
  },
];

const RESOURCES = [
  {
    label: "Conference Paper 1",
    url: "https://doi.org/10.1364/ECBO.2025.W5B.5",
  },
  {
    label: "Conference Paper 2",
    url: "https://doi.org/10.1364/ECBO.2025.S4F.2",
  },
  {
    label: "Conference Paper 3",
    url: "https://doi.org/10.1364/BRAIN.2024.BTu3C.7",
  },
  {
    label: "ECBO Presentation",
    url: "https://drive.google.com/file/d/1IC40WYQNwFS8-loEpr2xpsERPapCBeHu/view?usp=sharing",
  },
  {
    label: "GitLab",
    url: "https://gitlab.icfo.net/medoptics/safe-icp",
  },
];

const TECH_STACK = [
  "Python",
  "PyTorch",
  "fast.ai",
  "Gradio",
  "DVC",
  "Weights & Biases",
];

function TeamMemberCard({ member }) {
  const iconMap = {
    linkedin: faLinkedin,
    github: faGithub,
    gitlab: faGitlab,
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
            Wavelets in the Brain
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Deep learning for non-invasive intracranial pressure monitoring
          </p>

          {/* Divider */}
          <div className="h-px bg-light/10 my-8" />

          {/* Client */}
          <div className="text-sm text-gray-400">
            <span className="text-gray-400 font-medium">Client: </span>
            <a
              href="https://www.vallhebron.com/en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Vall d&apos;Hebron Hospital
            </a>
            <span className="text-gray-400"> · Barcelona · Spain 🇪🇸</span>
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

          {/* Overview */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Overview
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-4 text-justify">
                Intracranial pressure (ICP) monitoring is vital in diagnosing
                conditions such as traumatic brain injury and hydrocephalus, but
                the current gold standard is invasive and risky. This project
                leverages biophotonics and machine learning to provide an
                accurate, non-invasive alternative.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify">
                We used cerebral blood flow (CBF) measurements acquired via{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Diffuse_correlation_spectroscopy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  diffuse correlation spectroscopy
                </a>{" "}
                (DCS) and developed a deep learning pipeline to predict ICP from
                these signals. After benchmarking 10 state-of-the-art
                architectures, a wavelet-based model (mWDN) was selected and
                further enhanced via ensemble techniques. This work was
                validated on one of the largest existing datasets of patients
                with idiopathic normal pressure hydrocephalus (iNPH), totaling
                over 200 hours of data across 44 patients.
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
              This study utilized synchronized, high-resolution recordings of
              CBF and ground-truth ICP from 44 patients diagnosed with iNPH at
              Vall d&apos;Hebron University Hospital. The CBF signals were
              measured non-invasively using a near-infrared DCS probe placed on
              the frontal lobes, while ICP ground truth was recorded via an
              invasive subdural catheter (
              <a href="#figure-1" className="text-accent hover:underline">
                Figure 1
              </a>
              ).
            </p>

            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">CBF Source:</strong> DCS
                  optical probe (785 nm, frontal lobes, 40 Hz)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">ICP Source:</strong>{" "}
                  Invasive subdural sensors (Raumedic Neurodur-P)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Preprocessing:</strong>{" "}
                  Signal normalization, artifact filtering, statistical outlier
                  removal (Tukey fence, Kolmogorov–Smirnov distance)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Time Windowing:</strong>{" "}
                  600-sample segments (~15-second windows)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Dataset Size:</strong> 22
                  subjects (90 hours) for training/validation, 22 subjects (110
                  hours) for testing
                </span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              The test set reflects real-world deployment conditions with no
              data leakage, ensuring robust generalization.
            </p>

            {/* Figure 1 */}
            <figure id="figure-1" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/wavelets-in-the-brain/cbf-and-icp-acquisition.webp"
                alt="CBF and ICP Acquisition Setup"
                width={1920}
                height={1080}
                maxWidth="full"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> Simultaneous
                acquisition setup showing both invasive (subdural catheter) and
                non-invasive (DCS probe) modalities.
              </figcaption>
            </figure>
          </section>

          {/* Methods */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Methods
            </h2>

            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The proposed approach frames ICP prediction as a supervised
              regression problem using short segments of CBF signals as input (
              <a href="#figure-2" className="text-accent hover:underline">
                Figure 2
              </a>
              ). The primary model used was the multilevel Wavelet Decomposition
              Network (mWDN), selected for its ability to capture
              multi-resolution temporal dynamics inherent in pulsatile CBF
              signals.
            </p>

            <ul className="space-y-4 text-gray-300 mb-6 text-justify">
              <li>
                <strong className="text-gray-200">Model Benchmarking:</strong>{" "}
                mWDN was compared against 9 state-of-the-art architectures
                including ResCNN, InceptionTime, XceptionTime, LSTM-FCN,
                GRU-FCN, TST, TCN, MultiRocket, and XCM.
              </li>
              <li>
                <strong className="text-gray-200">
                  Sliding Window Modeling:
                </strong>{" "}
                Each 600-sample CBF window (15 seconds) is mapped to the
                corresponding mean ICP value over the same interval.
              </li>
              <li>
                <strong className="text-gray-200">Loss Tuning:</strong> Models
                were trained using multiple loss functions (MAE, MSE, Huber, and
                Log-Cosh) to assess robustness to outliers and physiological
                variability.
              </li>
              <li>
                <strong className="text-gray-200">Cross-Validation:</strong> A
                two-level scheme was used – 5-fold intra-subject validation and
                inter-subject hold-out evaluation – to prevent data leakage and
                test generalization.
              </li>
              <li>
                <strong className="text-gray-200">Ensembling:</strong>{" "}
                Top-performing models (mWDN, InceptionTime, and XCM) were
                combined to enhance stability and reduce variance.
              </li>
            </ul>

            {/* Figure 2 */}
            <figure id="figure-2" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/wavelets-in-the-brain/cbf-to-icp-workflow.webp"
                alt="CBF to ICP Prediction Workflow"
                width={1920}
                height={1080}
                maxWidth="full"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 2.</span> High-level
                overview of the prediction pipeline from CBF signal ingestion to
                ICP estimation and error metric computation.
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
              The proposed model demonstrated robust performance in predicting
              ICP across clinically meaningful ranges:
            </p>

            <ul className="space-y-2 text-gray-300 mb-4">
              <li>
                <strong className="text-gray-200">Validation MAE:</strong>{" "}
                <span className="text-light font-semibold">2.6 mmHg</span> –
                aligning with international clinical accuracy standards.
              </li>
              <li>
                <strong className="text-gray-200">Test MAE:</strong>{" "}
                <span className="font-semibold">5.8 mmHg</span> on unseen
                subjects.
              </li>
              <li>
                <strong className="text-gray-200">Test RMSE:</strong>{" "}
                <span className="font-semibold">6.7 mmHg</span>.
              </li>
              <li>
                <strong className="text-gray-200">Ensemble Performance:</strong>{" "}
                MAE of{" "}
                <span className="text-light font-semibold">4.4 mmHg</span>, RMSE
                of <span className="font-semibold">5.7 mmHg</span>.
              </li>
              <li>
                <strong className="text-gray-200">Clinical Accuracy:</strong>{" "}
                <span className="text-light font-semibold">70%</span> of
                predictions within ±6 mmHg in the 0–15 mmHg range.
              </li>
              <li>
                <strong className="text-gray-200">ROC Analysis:</strong> AUC ≈{" "}
                <span className="font-semibold">0.82</span>, indicating high
                discriminative power.
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              According to standards set by the American National Standards
              Institute and the Association for the Advancement of Medical
              Instrumentation, non-invasive ICP monitoring must achieve ±2 mmHg
              accuracy for values in the 0–20 mmHg range. While the test MAE
              exceeds this strict threshold, the model remains clinically
              actionable in the most relevant range for iNPH patients (
              <a href="#figure-3" className="text-accent hover:underline">
                Figure 3
              </a>
              ).
            </p>

            {/* Figure 3 */}
            <figure id="figure-3" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/wavelets-in-the-brain/error-distribution-mWDN.webp"
                alt="Error Distribution of mWDN Model"
                width={1920}
                height={1080}
                maxWidth="lg"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 3.</span> Error
                distribution of the mWDN model showing prediction accuracy
                across different ICP ranges.
              </figcaption>
            </figure>
          </section>

          {/* Conclusion */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Conclusion
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              This work presents a clinically viable, non-invasive method for
              ICP estimation using deep learning on CBF signals acquired via
              diffuse correlation spectroscopy. By training a wavelet-based
              neural network on synchronized invasive and non-invasive
              recordings from 44 iNPH patients at Vall d&apos;Hebron University
              Hospital, we demonstrated that ICP can be accurately predicted
              from CBF dynamics without the need for surgical monitoring.
            </p>
            <p className="text-gray-300 leading-relaxed text-justify">
              The model achieved a mean absolute error of 2.6 mmHg on validation
              data, aligning with the ±2 mmHg accuracy target. On a held-out
              test set, performance remained robust (MAE: 5.8 mmHg), with 70% of
              predictions within ±6 mmHg in the 0–15 mmHg interval, where
              clinical intervention is often most critical.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
