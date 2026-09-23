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
  title: "Stenosis Spotter",
  description:
    "Real-time coronary stenosis detection using deep learning for intraoperative angiographic image analysis with 0.94 mAP.",
  path: "/portfolio/stenosis-spotter/",
  image: {
    url: "/portfolio/previews/stenosis-spotter.jpg",
    alt: "Stenosis Spotter - Coronary stenosis detection",
  },
});

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "Cardiologists at the Kemerovo Cardiology Center needed accurate, real-time detection of coronary stenosis during surgery to reduce diagnostic delays.",
  },
  {
    icon: faBullseye,
    label: "Task",
    text: "Lead deep learning model development and integration for intraoperative angiographic image analysis.",
  },
  {
    icon: faCogs,
    label: "Action",
    text: "Trained and evaluated 8 CNN detectors on 8,325 images, optimizing accuracy vs. inference speed using SageMaker and Bayesian tuning.",
  },
  {
    icon: faChartLine,
    label: "Result",
    text: "RFCN ResNet-101 was deployed in live surgeries, improving diagnostic speed and supporting critical treatment decisions.",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Viacheslav Danilov",
    role: "Senior Data Scientist",
    organization: "University of Leeds",
    location: "Leeds · United Kingdom 🇬🇧",
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
    name: "Alejandro Frangi",
    role: "Professor",
    organization: "University of Leeds",
    location: "Leeds · United Kingdom 🇬🇧",
    photo: "/people/alex-frangi.webp",
    links: {
      globe: "https://research.manchester.ac.uk/en/persons/alejandro-frangi",
      linkedin: "https://www.linkedin.com/in/alejandro-frangi/",
      researchgate: "https://www.researchgate.net/profile/Alejandro-Frangi",
      google: "https://scholar.google.com/citations?user=9fGrB0sAAAAJ",
      email: "alejandro.frangi@manchester.ac.uk",
    },
  },
];

const RESOURCES = [
  {
    label: "Journal Paper 1",
    url: "https://doi.org/10.1038/s41598-021-87174-2",
  },
  {
    label: "Journal Paper 2",
    url: "https://doi.org/10.1134/S0361768821030038",
  },
  {
    label: "Surgery Videos",
    url: "https://drive.google.com/drive/folders/1NWt7ND-3LgvINV6Cnshz1pFLHaqQSL8R",
  },
  {
    label: "News 1 (RSF)",
    url: "https://www.rscf.ru/news/release/neyronnye-seti-suzheniya-krovenosnykh-sosudov/",
  },
  {
    label: "News 2 (TASS)",
    url: "https://nauka.tass.ru/nauka/11272149",
  },
  {
    label: "Dataset",
    url: "https://data.mendeley.com/datasets/ydrm75xywg",
  },
];

const TECH_STACK = [
  "TensorFlow",
  "Python",
  "AWS SageMaker",
  "LabelBox",
  "scikit-learn",
  "OpenCV",
];

export default function ProjectPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-24">
        <ProjectHeader
          title="Stenosis Spotter"
          subtitle="Real-time coronary stenosis detection using deep learning for intraoperative decision support"
          banner={{
            image: "/portfolio/previews/stenosis-spotter.jpg",
            alt: "Stenosis Spotter - Automated coronary artery stenosis detection",
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
                This project addresses a critical need in modern cardiology:
                fast and accurate detection of coronary artery stenosis during
                invasive angiography. Despite angiography being the gold
                standard for diagnosing coronary artery disease, its
                effectiveness can be limited by image noise, patient-specific
                anatomy, and operator variability. To reduce diagnostic errors
                and decision latency, this research implemented deep
                learning-based object detection models to identify stenotic
                lesions in real time.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify">
                Eight convolutional neural network architectures were trained
                and benchmarked on angiographic images from 100 patients. The
                study compared trade-offs between model accuracy and inference
                speed, critical for clinical deployment. Three models stood out:
                Faster-RCNN Inception ResNet (highest accuracy), SSD MobileNet
                (fastest), and RFCN ResNet-101 (best accuracy-speed balance).
                This work demonstrates that deep learning can be reliably
                integrated into real-time clinical workflows, improving
                diagnosis, treatment planning, and potentially surgical
                outcomes.
              </p>
            </div>
          </Section>

          {/* Data */}
          <Section title="Data">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The dataset consisted of 8,325 grayscale angiographic images
              (512×512 to 1000×1000 px) from 100 patients diagnosed with
              coronary artery disease:
            </p>
            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Acquisition:</strong> Images
                  acquired using Coroscop (Siemens) and Innova (GE Healthcare)
                  systems at the Kemerovo Cardiology Center
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Patient Criteria:</strong>{" "}
                  All patients had either angiographically confirmed ≥70%
                  stenosis or functionally verified ischemia
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Data Split:</strong>{" "}
                  Training (80%), validation (10%), and test (10%) sets split by
                  patient to preserve clinical independence
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Annotation:</strong> Manual
                  labeling performed by trained cardiologists using the{" "}
                  <a
                    href="https://labelbox.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    LabelBox
                  </a>{" "}
                  platform
                </span>
              </li>
            </ul>
          </Section>

          {/* Methods */}
          <Section title="Methods">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              Eight CNN object detection models were evaluated to find the
              optimal balance between accuracy and real-time performance:
            </p>

            <ul className="space-y-4 text-gray-300 mb-6 text-justify">
              <li>
                <strong className="text-gray-200">Model Architectures:</strong>{" "}
                SSD MobileNet V1/V2, SSD ResNet-50, Faster-RCNN ResNet-50/101,
                RFCN ResNet-101, Faster-RCNN Inception ResNet, and NASNet were
                tested for their complementary strengths.
              </li>
              <li>
                <strong className="text-gray-200">Transfer Learning:</strong>{" "}
                All models were pretrained on the COCO dataset and fine-tuned on
                the medical angiographic dataset.
              </li>
              <li>
                <strong className="text-gray-200">
                  Training Infrastructure:
                </strong>{" "}
                Amazon SageMaker with Bayesian optimization for hyperparameter
                tuning across encoder type, input size, optimizer, and learning
                rate.
              </li>
              <li>
                <strong className="text-gray-200">Loss Functions:</strong>{" "}
                Smooth L1 for localization and Focal Loss for classification to
                handle class imbalance effectively.
              </li>
              <li>
                <strong className="text-gray-200">
                  Optimization Strategies:
                </strong>{" "}
                Hard example mining (used in MobileNet V2) and architectural
                complexity analysis to understand accuracy-speed trade-offs.
              </li>
            </ul>
          </Section>

          {/* Results */}
          <Section title="Results">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The comparative evaluation of eight deep learning models revealed
              three standout performers, each excelling in different aspects (
              <a href="#figure-1" className="text-accent hover:underline">
                Figure 1
              </a>
              ):
            </p>

            <ul className="space-y-4 text-gray-300 mb-6 text-justify">
              <li>
                <strong className="text-gray-200">
                  Faster-RCNN Inception ResNet
                </strong>{" "}
                (highest accuracy): mAP 0.95, F1-score 0.96, inference speed 3
                FPS. Ideal for scenarios where precision is paramount, such as
                complex or borderline stenotic cases.
              </li>
              <li>
                <strong className="text-gray-200">SSD MobileNet V2</strong>{" "}
                (fastest): mAP 0.83, F1-score 0.80, inference speed 38 FPS.
                Well-suited for real-time use in high-throughput settings or
                emergency diagnostics.
              </li>
              <li>
                <strong className="text-gray-200">RFCN ResNet-101</strong> (best
                balance): mAP 0.94, F1-score 0.96, inference speed 10 FPS.
                Particularly well-suited for live clinical workflows, offering a
                practical compromise for quasi-real-time surgical environments.
              </li>
            </ul>

            {/* Figure 1: Model Performance Comparison */}
            <figure id="figure-1" className="mb-8 scroll-mt-24">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ImageLightbox
                  src="/portfolio/stenosis-spotter/ssd-mobilenet-v1.webp"
                  alt="SSD MobileNet V1 Performance"
                  width={650}
                  height={650}
                  maxWidth="full"
                  sizes="(max-width: 768px) 50vw, 240px"
                />
                <ImageLightbox
                  src="/portfolio/stenosis-spotter/ssd-mobilenet-v2.webp"
                  alt="SSD MobileNet V2 Performance"
                  width={650}
                  height={650}
                  maxWidth="full"
                  sizes="(max-width: 768px) 50vw, 240px"
                />
                <ImageLightbox
                  src="/portfolio/stenosis-spotter/ssd-resnet-50.webp"
                  alt="SSD ResNet-50 Performance"
                  width={650}
                  height={650}
                  maxWidth="full"
                  sizes="(max-width: 768px) 50vw, 240px"
                />
                <ImageLightbox
                  src="/portfolio/stenosis-spotter/faster-rcnn-resnet-50.webp"
                  alt="Faster-RCNN ResNet-50 Performance"
                  width={650}
                  height={650}
                  maxWidth="full"
                  sizes="(max-width: 768px) 50vw, 240px"
                />
                <ImageLightbox
                  src="/portfolio/stenosis-spotter/faster-rcnn-resnet-101.webp"
                  alt="Faster-RCNN ResNet-101 Performance"
                  width={650}
                  height={650}
                  maxWidth="full"
                  sizes="(max-width: 768px) 50vw, 240px"
                />
                <ImageLightbox
                  src="/portfolio/stenosis-spotter/rfcn-resnet-101.webp"
                  alt="RFCN ResNet-101 Performance"
                  width={650}
                  height={650}
                  maxWidth="full"
                  sizes="(max-width: 768px) 50vw, 240px"
                />
                <ImageLightbox
                  src="/portfolio/stenosis-spotter/faster-rcnn-inception-resnet.webp"
                  alt="Faster-RCNN Inception ResNet Performance"
                  width={650}
                  height={650}
                  maxWidth="full"
                  sizes="(max-width: 768px) 50vw, 240px"
                />
                <ImageLightbox
                  src="/portfolio/stenosis-spotter/faster-rcnn-nasnet.webp"
                  alt="Faster-RCNN NASNet Performance"
                  width={650}
                  height={650}
                  maxWidth="full"
                  sizes="(max-width: 768px) 50vw, 240px"
                />
              </div>
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> Performance
                comparison of eight CNN object detection models on coronary
                angiography images.
              </figcaption>
            </figure>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              The detection capabilities were further validated using
              angiographic sequences during minimally invasive surgeries (
              <a href="#figure-2" className="text-accent hover:underline">
                Figure 2
              </a>
              ), highlighting their clinical robustness and practical relevance.
            </p>

            {/* Figure 2: Surgery Videos */}
            <figure id="figure-2" className="scroll-mt-24">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl overflow-hidden border border-white/10">
                  <AutoplayVideo
                    src="/portfolio/stenosis-spotter/surgery-1-rfcn-resnet-101.mp4"
                    controls
                    className="w-full h-auto"
                  >
                    Your browser does not support the video tag.
                  </AutoplayVideo>
                </div>
                <div className="rounded-xl overflow-hidden border border-white/10">
                  <AutoplayVideo
                    src="/portfolio/stenosis-spotter/surgery-2-rfcn-resnet-101.mp4"
                    controls
                    className="w-full h-auto"
                  >
                    Your browser does not support the video tag.
                  </AutoplayVideo>
                </div>
                <div className="rounded-xl overflow-hidden border border-white/10">
                  <AutoplayVideo
                    src="/portfolio/stenosis-spotter/surgery-3-rfcn-resnet-101.mp4"
                    controls
                    className="w-full h-auto"
                  >
                    Your browser does not support the video tag.
                  </AutoplayVideo>
                </div>
              </div>
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 2.</span> Real-time
                stenosis detection during live minimally invasive surgery using
                RFCN ResNet-101.
              </figcaption>
            </figure>
          </Section>

          {/* Conclusion */}
          <Section title="Conclusion">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              This project demonstrated the feasibility of real-time coronary
              stenosis detection using deep learning. By identifying optimal
              trade-offs between inference speed and accuracy, the solution
              empowers interventional cardiologists with immediate, reliable
              decision support. The RFCN ResNet-101 model shows strong potential
              for real-world integration.
            </p>
            <p className="text-gray-300 leading-relaxed text-justify">
              Future directions include enhancing multivessel disease detection,
              expanding dataset diversity, and integrating guidance systems for
              surgical intervention planning.
            </p>
          </Section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </div>
  );
}
