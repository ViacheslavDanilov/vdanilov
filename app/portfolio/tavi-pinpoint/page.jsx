import {
  faSearch,
  faBullseye,
  faCogs,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import AutoplayVideo from "@/components/AutoplayVideo";
import ImageLightbox from "@/components/ImageLightbox";
import { pageMetadata } from "@/lib/metadata";
import ProjectHeader from "@/components/project/ProjectHeader";
import Highlights from "@/components/project/Highlights";
import CoreTeam from "@/components/project/CoreTeam";
import Section from "@/components/project/Section";

export const metadata = pageMetadata({
  title: "TAVI PinPoint",
  description:
    "Real-time landmark tracking for safer valve implantation during TAVI procedures using multi-task deep learning with 97% accuracy.",
  path: "/portfolio/tavi-pinpoint/",
  image: {
    url: "/portfolio/previews/tavi-pinpoint.jpg",
    alt: "TAVI PinPoint - Landmark tracking for valve implantation",
  },
});

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "The Kemerovo Cardiology Center needed better intraoperative guidance for TAVI procedures to reduce valve misplacement risks.",
  },
  {
    icon: faBullseye,
    label: "Task",
    text: "Develop an AI-driven visual assistance system for real-time surgical support during transcatheter aortic valve implantation.",
  },
  {
    icon: faCogs,
    label: "Action",
    text: "Applied multi-task deep learning to detect and localize 11 anatomical keypoints from aortography data using ResNet and MobileNet V2.",
  },
  {
    icon: faChartLine,
    label: "Result",
    text: "Delivered 97% accuracy and ~90 FPS speed, improving precision and enabling safer, future-ready valve implantation.",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Viacheslav Danilov",
    role: "Senior Data Scientist",
    organization: "Tomsk Polytechnic University",
    location: "Tomsk · Russia 🇷🇺",
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
    name: "Kirill Klyshnikov",
    role: "Biomedical Scientist",
    organization: "Kemerovo Cardiology Center",
    location: "Kemerovo · Russia 🇷🇺",
    photo: "/people/kirill-klyshnikov.webp",
    links: {
      globe: "https://loop.frontiersin.org/people/1380790/overview",
      linkedin: "https://www.linkedin.com/in/kirill-klyshnikov-83304b78/",
      researchgate: "https://www.researchgate.net/profile/Kirill-Klyshnikov",
      google: "https://scholar.google.com/citations?user=K2r_PIQAAAAJ&hl=en",
      email: "klyshnikovk@gmail.com",
    },
  },
  {
    name: "Anton Kutikhin",
    role: "Research Scientist",
    organization: "Kemerovo Cardiology Center",
    location: "Kemerovo · Russia 🇷🇺",
    photo: "/people/anton-kutikhin.webp",
    links: {
      globe: "https://loop.frontiersin.org/people/98953/overview",
      researchgate: "https://www.researchgate.net/profile/Anton-Kutikhin",
      google: "https://scholar.google.com/citations?user=Ni7zoiYAAAAJ&hl=en",
      email: "antonkutikhin@gmail.com",
    },
  },
  {
    name: "Vladimir Ganyukov",
    role: "Cardiothoracic Surgeon",
    organization: "Kemerovo Cardiology Center",
    location: "Kemerovo · Russia 🇷🇺",
    photo: "/people/vladimir-ganyukov.webp",
    links: {
      globe:
        "https://kemcardio.ru/nauka/nauchnye-podrazdeleniya/otdel-hirurgii-serdca-i-sosudov/",
      linkedin: "https://www.linkedin.com/in/vladimir-ganyukov-6b656b64",
      researchgate: "https://www.researchgate.net/profile/Vladimir-Ganyukov",
      orcid: "https://orcid.org/0000-0002-9704-7678",
      email: "ganyukov@mail.ru",
    },
  },
  {
    name: "Evgeny Ovcharenko",
    role: "Biomedical Engineer",
    organization: "Kemerovo Cardiology Center",
    location: "Kemerovo · Russia 🇷🇺",
    photo: "/people/evgeny-ovcharenko.webp",
    links: {
      globe: "https://loop.frontiersin.org/people/355364/overview",
      linkedin: "https://ru.linkedin.com/in/evgeny-ovcharenko-89098722",
      researchgate: "https://www.researchgate.net/profile/Evgeny-Ovcharenko",
      google: "https://scholar.google.ru/citations?user=taoklzsAAAAJ&hl=en",
      email: "ov.eugene@gmail.com",
    },
  },
];

const RESOURCES = [
  {
    label: "Journal Paper",
    url: "https://doi.org/10.3389/fcvm.2021.697737",
  },
  {
    label: "Interactive Report",
    url: "https://wandb.ai/viacheslav_danilov/tavr_keypoint_tracking/reports/Keypoint-tracking-and-classification--Vmlldzo3ODIyNQ",
  },
  { label: "Dataset", url: "https://data.mendeley.com/datasets/pgynfy766g" },
  {
    label: "News (RSF)",
    url: "https://www.rscf.ru/news/medicine/neyroset-nauchilas-pomogat-v-ustanovke-iskusstvennogo-klapana-v-serdtse/",
  },
  {
    label: "News (Scientific Russia)",
    url: "https://scientificrussia.ru/articles/nejroset-predskazet-lucsee-mesto-dla-ustanovki-iskusstvennogo-klapana-v-serdce",
  },
  {
    label: "News (TASS)",
    url: "https://nauka.tass.ru/nauka/12048261",
  },
];

const TECH_STACK = [
  "TensorFlow",
  "Python",
  "scikit-learn",
  "Supervisely",
  "OpenCV",
];

export default function ProjectPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-24">
        <ProjectHeader
          title="TAVI PinPoint"
          subtitle="Real-time landmark tracking for safer valve implantation during TAVI procedures"
          banner={{
            image: "/portfolio/previews/tavi-pinpoint.jpg",
            alt: "TAVI PinPoint - Real-time landmark tracking during transcatheter aortic valve implantation",
          }}
          client={{
            name: "Kemerovo Cardiology Center",
            url: "https://eng.kemcardio.ru/",
            location: "Kemerovo · Russia 🇷🇺",
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
                This project addresses one of the most critical challenges in
                modern cardiovascular intervention: accurately positioning the
                valve during{" "}
                <a
                  href="https://www.mayoclinic.org/tests-procedures/transcatheter-aortic-valve-replacement/about/pac-20384698"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Transcatheter Aortic Valve Implantation
                </a>{" "}
                (TAVI). Traditional imaging methods offer limited intraoperative
                guidance, risking misplacement and complications.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify">
                To overcome this, we developed a deep learning-based visual
                assistance system using{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Multi-task_learning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  multi-task learning
                </a>{" "}
                (MTL) to simultaneously detect and localize 11 anatomical
                keypoints on both the aortic valve and the delivery system. This
                system was trained on real intraoperative aortography data and
                evaluated across several neural network architectures. The most
                efficient models (ResNet and MobileNet V2) achieved impressive
                accuracy and responsiveness, demonstrating real-time prediction
                capabilities that could enhance clinical outcomes and serve as
                the basis for future robotic surgical systems.
              </p>
            </div>
          </Section>

          {/* Data */}
          <Section title="Data">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The solution was developed and validated using real-world surgical
              imaging data, making its outputs directly relevant for clinical
              applications. The dataset included:
            </p>
            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Source:</strong> Original
                  aortography imaging series from 14 patients undergoing TAVI
                  procedures (2015 – 2018) at the Kemerovo Cardiology Center
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Images:</strong> 3,730
                  grayscale images (1,000×1,000 pixels), labeled with up to 11
                  anatomical and device-related keypoints
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Annotation:</strong> Image
                  annotation was conducted by expert cardiologists using the{" "}
                  <a
                    href="https://supervisely.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Supervisely
                  </a>{" "}
                  platform
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Split:</strong> Training
                  (80%, 2,984 images) and validation (20%, 746 images) sets
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Coverage:</strong> Three
                  critical surgical stages: delivery system positioning,
                  prosthesis deployment initiation, and partial valve release
                </span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              These images captured three critical surgical stages providing a
              diverse and representative training ground for keypoint detection
              (
              <a href="#figure-1" className="text-accent hover:underline">
                Figure 1
              </a>
              ).
            </p>

            {/* Figure 1: Visual Workflow */}
            <figure id="figure-1" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/tavi-pinpoint/visual-workflow-for-intraoperative-labeling.webp"
                alt="Visual workflow for intraoperative landmark labeling"
                width={2268}
                height={2418}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> Visual workflow
                for intraoperative landmark labeling showing the annotation
                process and keypoint identification across surgical stages.
              </figcaption>
            </figure>
          </Section>

          {/* Methods */}
          <Section title="Methods">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The project implemented a multi-task learning architecture to
              simultaneously classify the presence and regress the coordinates
              of keypoints in angiographic images (
              <a href="#figure-2" className="text-accent hover:underline">
                Figure 2
              </a>
              ). This approach offered more efficient representation learning
              compared to single-task methods.
            </p>

            <ul className="space-y-4 text-gray-300 mb-6 text-justify">
              <li>
                <strong className="text-gray-200">Architecture:</strong> A
                shared feature extractor that reduced image dimensionality while
                preserving semantic detail, combined with a classifier for
                multi-label keypoint detection and a regressor for (x, y)
                coordinate prediction.
              </li>
              <li>
                <strong className="text-gray-200">Backbones Tested:</strong>{" "}
                Five architectures were evaluated: MobileNet V2, ResNet V2,
                Inception V3, Inception ResNet V2, and EfficientNet B5.
              </li>
              <li>
                <strong className="text-gray-200">Training Strategy:</strong>{" "}
                Fine-tuning and early stopping were employed to boost
                generalization and prevent overfitting.
              </li>
              <li>
                <strong className="text-gray-200">Loss Functions:</strong>{" "}
                Log-Cosh loss for regression and binary cross-entropy for
                classification, balanced via weighted sum.
              </li>
            </ul>

            {/* Figure 2: Multi-task Learning Workflow */}
            <figure id="figure-2" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/tavi-pinpoint/multi-task-learning-workflow.webp"
                alt="Multi-task learning workflow"
                width={2500}
                height={1952}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 2.</span> Multi-task
                learning workflow showing the shared feature extractor with
                parallel classification and regression heads.
              </figcaption>
            </figure>
          </Section>

          {/* Results */}
          <Section title="Results">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The system achieved real-time performance with high accuracy in
              both keypoint detection and localization. Key outcomes included:
            </p>

            <ul className="space-y-2 text-gray-300 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">
                    ResNet V2 (fine-tuned):
                  </strong>{" "}
                  Reached <span className="font-semibold">97%</span>{" "}
                  classification accuracy and a mean absolute percentage error
                  (MAPE) of <span className="font-semibold">4.7%</span>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">
                    MobileNet V2 (fine-tuned):
                  </strong>{" "}
                  Achieved <span className="font-semibold">96%</span> accuracy
                  and a <span className="font-semibold">5.6%</span> MAPE, while
                  maintaining the highest prediction speed (~
                  <span className="font-semibold">90 FPS</span>)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Model Convergence:</strong>{" "}
                  Rapid convergence with early stopping applied around 22–76
                  epochs depending on architecture
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Performance Gain:</strong>{" "}
                  Fine-tuned models outperformed their non-tuned counterparts
                  across all metrics (F1-score, MAE, RMSE)
                </span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              The analysis also highlighted challenges from class imbalance,
              particularly with underrepresented keypoints (e.g., aortic annulus
              landmarks), which the model handled well despite data limitations.
              Training convergence for selected architectures is shown in{" "}
              <a href="#figure-3" className="text-accent hover:underline">
                Figure 3
              </a>
              , and prediction quality comparison in{" "}
              <a href="#figure-4" className="text-accent hover:underline">
                Figure 4
              </a>
              .
            </p>

            {/* Figure 3: Training Convergence Videos */}
            <figure id="figure-3" className="mb-6 scroll-mt-24">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-lg overflow-hidden">
                  <AutoplayVideo
                    aspectRatio="20 / 23"
                    src="/portfolio/tavi-pinpoint/convergence-mobilenet.mp4"
                    controls
                    className="w-full h-auto"
                  />
                  <p className="text-center text-xs text-gray-500 mt-2">
                    MobileNet V2
                  </p>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <AutoplayVideo
                    aspectRatio="20 / 23"
                    src="/portfolio/tavi-pinpoint/convergence-resnet.mp4"
                    controls
                    className="w-full h-auto"
                  />
                  <p className="text-center text-xs text-gray-500 mt-2">
                    ResNet V2
                  </p>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <AutoplayVideo
                    aspectRatio="20 / 23"
                    src="/portfolio/tavi-pinpoint/convergence-inception.mp4"
                    controls
                    className="w-full h-auto"
                  />
                  <p className="text-center text-xs text-gray-500 mt-2">
                    Inception V3
                  </p>
                </div>
              </div>
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 3.</span> Training
                convergence of selected neural network architectures showing
                prediction quality evolution during training.
              </figcaption>
            </figure>

            {/* Figure 4: Prediction Beginning vs End */}
            <figure id="figure-4" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/tavi-pinpoint/prediction-beginning-vs-end.webp"
                alt="Prediction quality at the beginning vs end of training"
                width={2250}
                height={1750}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 4.</span> Comparison of
                prediction quality at the beginning versus end of training,
                demonstrating significant improvement in keypoint localization.
              </figcaption>
            </figure>
          </Section>

          {/* Conclusion */}
          <Section title="Conclusion">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              This project successfully demonstrates a real-time AI-based system
              for intraoperative landmark tracking during TAVI, offering a
              significant step toward safer, more precise cardiovascular
              surgery. The system&apos;s main contributions are:
            </p>
            <ul className="space-y-2 text-gray-300 mb-4 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  Accurate detection and localization of 11 keypoints critical
                  to valve deployment
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  Support for intraoperative guidance without reliance on
                  preoperative CT models
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  Scalability toward robotic-assisted interventions by supplying
                  continuous, structured input for automated systems
                </span>
              </li>
            </ul>
            <p className="text-gray-300 leading-relaxed text-justify">
              Future directions include expanding the dataset to cover more
              valve models, optimizing for class imbalance, and integrating with
              surgical robotics for semi-automated procedures.
            </p>
          </Section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </div>
  );
}
