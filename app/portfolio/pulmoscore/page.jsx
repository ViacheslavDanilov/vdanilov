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
  title: "PulmoScore",
  description:
    "Two-stage ML workflow for COVID-19 severity scoring on chest X-rays, achieving MAE of 0.30 and 11× faster processing.",
  path: "/portfolio/pulmoscore/",
  image: {
    url: "/portfolio/previews/pulmoscore.jpg",
    alt: "PulmoScore - COVID-19 severity scoring",
  },
});

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "Beth Israel Deaconess Medical Center needed a faster, more accurate tool for diagnosing COVID-19 from chest X-rays.",
  },
  {
    icon: faBullseye,
    label: "Task",
    text: "Design and implement an ML pipeline to segment lungs and assess disease severity on chest radiographs.",
  },
  {
    icon: faCogs,
    label: "Action",
    text: "Built a two-stage model using DeepLabV3+ and MA-Net, trained on diverse datasets for robust lung and infection detection.",
  },
  {
    icon: faChartLine,
    label: "Result",
    text: "Achieved 0.30 MAE out of 6.0 and 11× faster processing, enabling scalable, real-time diagnostics.",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Viacheslav Danilov",
    role: "Lead ML Engineer",
    organization: "Quantori",
    location: "Cambridge · United States 🇺🇸",
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
    name: "Alex Proutski",
    role: "Research Scientist",
    organization: "Quantori",
    location: "Hague · Netherlands 🇳🇱",
    photo: "/people/alex-proutski.webp",
    links: {
      linkedin: "https://www.linkedin.com/in/alexanderproutski/",
      email: "alex_proutski@hotmail.com",
    },
  },
  {
    name: "David Nefaridze",
    role: "Data Scientist",
    organization: "Quantori",
    location: "Tbilisi · Georgia 🇬🇪",
    photo: "/people/john-doe.webp",
    links: {
      linkedin: "http://linkedin.com/in/david-nefaridze",
      github: "https://github.com/datonefaridze",
      email: "datonefaridze495@gmail.com",
    },
  },
  {
    name: "Diana Litmanovich",
    role: "Chief of Cardiothoracic Imaging",
    organization: "Beth Israel Deaconess Medical Center",
    location: "Boston · United States 🇺🇸",
    photo: "/people/diana-litmanovich.webp",
    links: {
      globe:
        "https://findadoc.bidmc.org/details/929/diana-litmanovich-diagnostic_radiology-boston-needham",
      linkedin: "https://www.linkedin.com/in/diana-litmanovich-55577276",
      researchgate: "https://www.researchgate.net/profile/Diana-Litmanovich",
      google: "https://scholar.google.com/citations?user=i3JdQAYAAAAJ&hl=en",
      email: "dlitmano@bidmc.harvard.edu",
    },
  },
  {
    name: "Yuriy Gankin",
    role: "Chief Science Officer",
    organization: "Quantori",
    location: "Cambridge · United States 🇺🇸",
    photo: "/people/yuriy-gankin.webp",
    links: {
      globe: "https://quantori.com/about/yuriy-gankin",
      linkedin: "https://www.linkedin.com/in/yuriygankin/",
      orcid: "https://orcid.org/0000-0003-0046-1037",
      google: "https://scholar.google.com/citations?user=0H_Ty8sAAAAJ",
      email: "yuriy.gankin@quantori.com",
    },
  },
];

const RESOURCES = [
  {
    label: "Journal Paper",
    url: "https://www.nature.com/articles/s41598-022-15013-z",
  },
  {
    label: "GitHub",
    url: "https://github.com/ViacheslavDanilov/covid_scoring",
  },
  { label: "Models", url: "https://zenodo.org/doi/10.5281/zenodo.8393555" },
  {
    label: "Dataset 1",
    url: "https://data.mendeley.com/datasets/8gf9vpkhgy/2",
  },
  {
    label: "Dataset 2",
    url: "https://data.mendeley.com/datasets/36fjrg9s69/1",
  },
];

const TECH_STACK = [
  "PyTorch",
  "scikit-learn",
  "Albumentations",
  "Supervisely",
  "Weights & Biases",
  "OpenCV",
];

const SEGMENTATION_RESULTS = [
  { src: "/portfolio/pulmoscore/unet.webp", model: "U-Net", score: 4 },
  {
    src: "/portfolio/pulmoscore/unet-plus-plus.webp",
    model: "U-Net++",
    score: 5,
  },
  {
    src: "/portfolio/pulmoscore/deeplab-v3.webp",
    model: "DeepLabV3",
    score: 0,
  },
  {
    src: "/portfolio/pulmoscore/deeplab-v3-plus.webp",
    model: "DeepLabV3+",
    score: 3,
  },
  { src: "/portfolio/pulmoscore/fpn.webp", model: "FPN", score: 4 },
  { src: "/portfolio/pulmoscore/linknet.webp", model: "LinkNet", score: 3 },
  { src: "/portfolio/pulmoscore/pspnet.webp", model: "PSPNet", score: 3 },
  { src: "/portfolio/pulmoscore/pan.webp", model: "PAN", score: 5 },
  { src: "/portfolio/pulmoscore/manet.webp", model: "MA-Net", score: 5 },
];

export default function ProjectPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-24">
        <ProjectHeader
          title="PulmoScore"
          subtitle="Two-stage ML workflow for COVID-19 severity scoring on chest X-rays"
          banner={{
            image: "/portfolio/previews/pulmoscore.jpg",
            alt: "PulmoScore - COVID-19 severity scoring on chest X-rays",
          }}
          client={{
            name: "Beth Israel Deaconess Medical Center",
            url: "https://www.bidmc.org/",
            location: "Boston · United States 🇺🇸",
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
                This project developed a two-stage ML-driven workflow for
                segmenting and scoring lung diseases on chest X-rays, with a
                focus on COVID-19. The approach combined lung segmentation and
                disease localization, followed by a severity scoring process to
                provide quantitative assessments aligned with radiological
                practices.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify">
                Using publicly available datasets, the best-performing solution
                integrated DeepLabV3+ for lung segmentation and MA-Net for
                disease segmentation, achieving a mean absolute error (MAE) of
                0.30 out of 6.0 – significantly outperforming established
                methods like{" "}
                <a
                  href="https://www.sciencedirect.com/science/article/pii/S136184152100092X"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  BS-net
                </a>{" "}
                and{" "}
                <a
                  href="https://www.nature.com/articles/s41598-020-76550-z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  COVID-Net-S
                </a>
                . The workflow is 11 times faster than comparable solutions and
                adaptable to broader applications, including pneumonia and
                tuberculosis.
              </p>
            </div>
          </Section>

          {/* Data */}
          <Section title="Data">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The dataset for this study was carefully curated to address both
              lung segmentation and disease-scoring tasks, drawing from diverse
              publicly available sources:
            </p>
            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Lung Segmentation:</strong>{" "}
                  6,810 X-rays from three datasets (Darwin, Montgomery,
                  Shenzhen) providing diverse examples of lung pathologies and
                  healthy subjects
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">
                    Disease Segmentation:
                  </strong>{" "}
                  1,364 X-rays from four COVID-19 datasets (ACCD, CRD, CCXD,
                  FCXD) and two normal datasets (CXN, RSNA) representing 580
                  COVID-19 and 784 normal cases
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Source Diversity:</strong>{" "}
                  Data sourced from over 40 institutions worldwide, ensuring
                  robust model generalization
                </span>
              </li>
            </ul>
          </Section>

          {/* Methods */}
          <Section title="Methods">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The proposed workflow inherits the quantification and
              qualification of lung diseases from expert radiologists and
              fulfills the following processing steps (
              <a href="#figure-1" className="text-accent hover:underline">
                Figure 1
              </a>
              ):
            </p>

            <ul className="space-y-4 text-gray-300 mb-6 text-justify">
              <li>
                <strong className="text-gray-200">
                  Stage I (Lung Segmentation):
                </strong>{" "}
                Pixel-level localization of the lungs and removal of irrelevant
                areas using DeepLabV3+ architecture.
              </li>
              <li>
                <strong className="text-gray-200">
                  Stage II (Disease Segmentation):
                </strong>{" "}
                Identification of infected lung regions with nine tested neural
                networks: U-Net, U-Net++, DeepLabV3, DeepLabV3+, FPN, LinkNet,
                PSPNet, PAN, and MA-Net.
              </li>
              <li>
                <strong className="text-gray-200">
                  Stage III (Severity Scoring):
                </strong>{" "}
                Quantification and qualification of infected regions to compute
                an overall severity score per patient, aligned with radiological
                practices.
              </li>
            </ul>

            {/* Figure 1: COVID Scoring Workflow */}
            <figure id="figure-1" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/pulmoscore/covid-scoring-workflow.webp"
                alt="COVID Scoring Workflow"
                width={4124}
                height={916}
                maxWidth="full"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> Two-stage COVID
                severity scoring workflow showing lung segmentation, disease
                detection, and severity quantification.
              </figcaption>
            </figure>
          </Section>

          {/* Results */}
          <Section title="Results">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The proposed workflow demonstrated high accuracy and efficiency in
              segmenting lungs, identifying infected regions, and computing
              severity scores for COVID-19 patients:
            </p>

            <ul className="space-y-2 text-gray-300 mb-4">
              <li>
                <strong className="text-gray-200">Best Accuracy:</strong>{" "}
                DeepLabV3+ (Stage I) + MA-Net (Stage II) achieved MAE of{" "}
                <span className="font-semibold">0.30</span> out of 6.0,
                significantly outperforming BS-net (MAE: 2.52) and COVID-Net-S
                (MAE: 1.83).
              </li>
              <li>
                <strong className="text-gray-200">Processing Speed:</strong> The
                fastest solution (DeepLabV3+ + PSPNet) processed{" "}
                <span className="font-semibold">12.5 images/second</span>, while
                the most accurate achieved 7.9 images/second.
              </li>
              <li>
                <strong className="text-gray-200">Efficiency Gain:</strong>{" "}
                <span className="text-light font-semibold">11× faster</span>{" "}
                than BS-net and COVID-Net-S (0.7 and 0.6 images/s respectively).
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              The model comparison chart (
              <a href="#figure-2" className="text-accent hover:underline">
                Figure 2
              </a>
              ) summarizes the performance across all tested architectures,
              while
              <a href="#figure-3" className="text-accent hover:underline">
                {" "}
                Figure 3
              </a>{" "}
              shows detailed segmentation results for each neural network.
            </p>

            {/* Figure 2: Model Comparison */}
            <figure id="figure-2" className="mb-6 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/pulmoscore/model-comparison.webp"
                alt="Model Performance Comparison"
                width={2999}
                height={1499}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 2.</span> Performance
                comparison of tested neural network architectures showing MAE
                and processing speed.
              </figcaption>
            </figure>

            {/* Figure 3: Segmentation Results Grid */}
            <figure id="figure-3" className="scroll-mt-24">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {SEGMENTATION_RESULTS.map((item) => (
                  <div key={item.model} className="flex flex-col">
                    <ImageLightbox
                      src={item.src}
                      alt={`${item.model} Segmentation Results`}
                      width={2958}
                      height={2539}
                      maxWidth="full"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 320px"
                      className="rounded-lg"
                    />
                    <p className="text-center text-sm text-gray-300 mt-2">
                      <span className="font-medium">{item.model}</span>
                      <span className="text-gray-500"> · Score: </span>
                      <span className="text-accent font-semibold">
                        {item.score}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
              <figcaption className="text-center text-sm text-gray-400 mt-4">
                <span className="text-gray-300">Figure 3.</span> Segmentation
                results comparison across all tested architectures. Cyan
                delineation: lung segmentation (Stage I); Red mask: disease
                prediction (Stage II); Yellow mask: ground truth.
              </figcaption>
            </figure>
          </Section>

          {/* Conclusion */}
          <Section title="Conclusion">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The proposed two-stage workflow accurately segmented lung regions
              and quantified infection severity, offering a significant
              improvement over existing methods in both accuracy and speed. By
              combining DeepLabV3+ for lung segmentation and MA-Net for disease
              segmentation, the system provided reliable diagnostic support for
              COVID-19 and other respiratory diseases.
            </p>
            <p className="text-gray-300 leading-relaxed text-justify">
              Future directions include adapting this workflow for real-time
              clinical deployment and expanding its application to other
              pulmonary conditions, such as pneumonia and tuberculosis.
            </p>
          </Section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </div>
  );
}
