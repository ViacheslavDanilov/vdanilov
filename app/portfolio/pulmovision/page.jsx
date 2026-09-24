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
  title: "PulmoVision",
  description:
    "Explainable AI framework for detecting pulmonary edema features in chest X-rays using deep learning segmentation and object detection.",
  path: "/portfolio/pulmovision/",
  image: {
    url: "/portfolio/previews/pulmovision.jpg",
    alt: "PulmoVision - AI for pulmonary edema detection",
  },
});

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "Radiologists at Beth Israel Deaconess Medical Center lacked an AI tool to reliably detect pulmonary edema in chest X-rays, making diagnosis time-consuming and subjective.",
  },
  {
    icon: faBullseye,
    label: "Task",
    text: "Design and implement segmentation and object detection models to automatically identify and localize edema-related radiographic features.",
  },
  {
    icon: faCogs,
    label: "Action",
    text: "Built an ensemble of eight detection networks with a robust annotation pipeline; optimized inference for real-time deployment using lung segmentation preprocessing.",
  },
  {
    icon: faChartLine,
    label: "Result",
    text: "Achieved mAP of 0.568 with SABL network, enabling real-time clinical support and streamlining radiology workflows with interpretable AI predictions.",
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
    name: "Anton Makoveev",
    role: "CV Engineer",
    organization: "Quantori",
    location: "Cambridge · United States 🇺🇸",
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
    url: "https://doi.org/10.1093/radadv/umae003",
  },
  {
    label: "GitHub",
    url: "https://github.com/ViacheslavDanilov/edema_quantification",
  },
  { label: "Models", url: "https://doi.org/10.5281/zenodo.8393565" },
  { label: "Dataset", url: "https://doi.org/10.5281/zenodo.8383776" },
];

const TECH_STACK = [
  "PyTorch",
  "MMDetection",
  "MMCV",
  "scikit-learn",
  "Albumentations",
  "OpenCV",
];

export default function ProjectPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-24">
        <ProjectHeader
          title="PulmoVision"
          subtitle="Explainable AI for pulmonary edema detection in chest X-rays"
          banner={{
            image: "/portfolio/previews/pulmovision.jpg",
            alt: "PulmoVision - Pulmonary edema detection in chest X-rays",
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
                <a
                  href="https://en.wikipedia.org/wiki/Pulmonary_edema"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Pulmonary edema
                </a>
                , a critical condition often linked to congestive heart failure,
                requires timely and accurate diagnosis for effective treatment
                planning. This project aimed to develop an explainable AI
                solution to assist in the identification and severity assessment
                of pulmonary edema using chest X-rays.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify">
                We implemented a two-stage deep learning framework: lung
                segmentation and edema feature localization. The segmentation
                stage focused on isolating lung regions, while the detection
                stage utilized multiple object detection networks to identify
                edema-related radiographic features such as cephalization,
                Kerley lines, pleural effusion, infiltrates, and bat wings. The
                methodology integrated state-of-the-art networks, achieving high
                precision in localizing features and providing an interpretable
                diagnostic aid for radiologists.
              </p>
            </div>
          </Section>

          {/* Data */}
          <Section title="Data">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              This study leveraged a robust and clinically relevant dataset to
              ensure precise model training and evaluation:
            </p>
            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Source:</strong> Chest
                  X-rays were sourced from the{" "}
                  <a
                    href="https://physionet.org/content/mimic-cxr-jpg/2.1.0/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Medical Information Mart for Intensive Care
                  </a>{" "}
                  (MIMIC) database.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Dataset Size:</strong> 1,000
                  annotated chest X-rays representing 741 patients with
                  suspected pulmonary edema.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Features:</strong>{" "}
                  Cephalization, Kerley lines, pleural effusion, bat wings, and
                  infiltrates.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Annotation Method:</strong>{" "}
                  Cephalization and Kerley lines were delineated using
                  polylines; pleural effusion, bat wings, and infiltrates were
                  marked with binary segmentation masks.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">
                    Annotation Platform:
                  </strong>{" "}
                  The{" "}
                  <a
                    href="https://supervisely.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Supervisely
                  </a>{" "}
                  computer vision platform facilitated high-quality, consistent
                  annotations.
                </span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              Radiological features such as cephalization, Kerley lines, pleural
              effusion, bat wings, and infiltrates were labeled by an
              experienced radiologist (
              <a href="#figure-1" className="text-accent hover:underline">
                Figure 1
              </a>
              ).
            </p>

            {/* Figure 1: Annotation Methodology */}
            <figure id="figure-1" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/pulmovision/chest-xray-annotation-methodology.webp"
                alt="Chest X-ray Annotation Methodology"
                width={5120}
                height={2124}
                maxWidth="full"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> Chest X-ray
                annotation methodology showing the radiographic features of
                pulmonary edema: cephalization, Kerley lines, pleural effusion,
                bat wings, and infiltrates.
              </figcaption>
            </figure>
          </Section>

          {/* Methods */}
          <Section title="Methods">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The project implemented a comprehensive two-stage methodology
              tailored for the detection and localization of pulmonary edema
              features:
            </p>

            <ul className="space-y-4 text-gray-300 mb-6 text-justify">
              <li>
                <strong className="text-gray-200">Lung Segmentation:</strong>{" "}
                Combined predictions from three segmentation models (DeepLabV3,
                MA-Net, and FPN) in an ensemble approach. Achieved Dice
                Similarity Coefficients exceeding 94%, ensuring precise lung
                boundary delineation.
              </li>
              <li>
                <strong className="text-gray-200">Feature Detection:</strong>{" "}
                Eight object detection networks were trained to specialize in
                detecting individual features, including SABL, TOOD, Cascade
                RPN, PAA, Faster R-CNN, GFL, FSAF, and ATSS.
              </li>
              <li>
                <strong className="text-gray-200">Training Strategy:</strong>{" "}
                Each network was configured to address imbalances in feature
                representation, with tailored confidence thresholds to optimize
                F1 scores.
              </li>
              <li>
                <strong className="text-gray-200">Evaluation Metrics:</strong>{" "}
                Used average precision (AP), mean average precision (mAP), and
                latency to assess network performance across all feature
                classes.
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              The two-stage detection workflow is illustrated in{" "}
              <a href="#figure-2" className="text-accent hover:underline">
                Figure 2
              </a>
              , showing lung segmentation followed by feature detection.
            </p>

            {/* Figure 2: Feature Detection Workflow */}
            <figure id="figure-2" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/pulmovision/feature-detection-workflow.webp"
                alt="Feature Detection Workflow"
                width={4640}
                height={1156}
                maxWidth="full"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 2.</span> Two-stage
                feature detection workflow: lung segmentation using ensemble
                models followed by object detection for edema features.
              </figcaption>
            </figure>
          </Section>

          {/* Results */}
          <Section title="Results">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The developed framework demonstrated high precision and efficiency
              in localizing radiographic features of pulmonary edema:
            </p>

            <ul className="space-y-2 text-gray-300 mb-4">
              <li>
                <strong className="text-gray-200">SABL:</strong> Achieved the
                highest mAP of{" "}
                <span className="font-semibold text-light">0.568</span> and
                excelled in detecting pleural effusion (AP: 0.599), infiltrates
                (AP: 0.395), and bat wings (AP: 0.926).
              </li>
              <li>
                <strong className="text-gray-200">TOOD & Cascade RPN:</strong>{" "}
                Showed strong capabilities in detecting bat wings (AP: 0.918)
                and cephalization (AP: 0.532).
              </li>
              <li>
                <strong className="text-gray-200">Faster R-CNN:</strong>{" "}
                Delivered the shortest processing time of{" "}
                <span className="font-semibold text-light">42 ms</span> per
                image, demonstrating suitability for high-throughput clinical
                workflows.
              </li>
              <li>
                <strong className="text-gray-200">Bat Wings Detection:</strong>{" "}
                All networks demonstrated exceptional accuracy with average
                precision scores exceeding 0.90.
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              The integration of segmentation and detection networks provides a
              scalable solution for automating radiographic assessments, with
              applications in real-time diagnostic workflows and severity
              grading systems. The network performance comparison is shown in{" "}
              <a href="#figure-3" className="text-accent hover:underline">
                Figure 3
              </a>
              .
            </p>

            {/* Figure 3: Network Comparison */}
            <figure id="figure-3" className="mb-6 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/pulmovision/comparison-of-detection-networks.webp"
                alt="Comparison of Detection Networks"
                width={8160}
                height={4000}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 3.</span> Comparison of
                detection networks showing mAP scores, latency, and number of
                parameters for each model.
              </figcaption>
            </figure>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              Visual assessment of network predictions for bat wings (
              <a href="#figure-4" className="text-accent hover:underline">
                Figure 4
              </a>
              ) and pleural effusion (
              <a href="#figure-5" className="text-accent hover:underline">
                Figure 5
              </a>
              ) demonstrates the model&apos;s capabilities across different
              radiographic features.
            </p>

            {/* Figure 4: Bat Wing Predictions */}
            <figure id="figure-4" className="mb-6 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/pulmovision/comparison-of-bat-wing-predictions.webp"
                alt="Comparison of Bat Wing Predictions"
                width={2720}
                height={5440}
                maxWidth="md"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 4.</span> Comparison of
                bat wing predictions across all detection networks,
                demonstrating exceptional accuracy with AP scores exceeding
                0.90.
              </figcaption>
            </figure>

            {/* Figure 5: Effusion Predictions */}
            <figure id="figure-5" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/pulmovision/comparison-of-effusion-predictions.webp"
                alt="Comparison of Pleural Effusion Predictions"
                width={2720}
                height={5440}
                maxWidth="md"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 5.</span> Comparison of
                pleural effusion predictions showing varying performance across
                networks, with TOOD identifying both effusions.
              </figcaption>
            </figure>
          </Section>

          {/* Conclusion */}
          <Section title="Conclusion">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              This project demonstrated the effectiveness of an explainable AI
              framework in accurately detecting pulmonary edema features from
              chest X-rays, offering enhanced diagnostic support for clinicians.
              The two-stage approach combining lung segmentation with
              specialized object detection networks achieved high precision
              while maintaining interpretability.
            </p>
            <p className="text-gray-300 leading-relaxed text-justify">
              The results highlight the potential for integrating such models
              into clinical workflows, with future improvements focusing on
              severity grading, larger datasets, and real-time implementation in
              hospital radiology departments.
            </p>
          </Section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </div>
  );
}
