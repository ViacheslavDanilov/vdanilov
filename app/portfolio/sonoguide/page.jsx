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
  title: "SonoGuide",
  description:
    "Deep learning solution for surgical tool segmentation in 3D ultrasound, achieving 93.6% Dice score for real-time catheter localization.",
  path: "/portfolio/sonoguide/",
  image: {
    url: "/portfolio/previews/sonoguide.jpg",
    alt: "SonoGuide - Surgical tool segmentation in 3D ultrasound",
  },
});

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "Accurate localization of catheters in 3D ultrasound during minimally invasive surgery was hindered by speckle noise, low resolution, and complex instrument geometry.",
  },
  {
    icon: faBullseye,
    label: "Task",
    text: "Develop a deep learning solution (V-net) to segment surgical tools in noisy ultrasound volumes for real-time surgical navigation.",
  },
  {
    icon: faCogs,
    label: "Action",
    text: "Designed a fully 3D neural network with dense skip-connections, dynamic training strategy, and test-time augmentation to boost segmentation accuracy and robustness.",
  },
  {
    icon: faChartLine,
    label: "Result",
    text: "Achieved 93.6% Dice score, 13 points higher than U-net, and enabled precise, automated catheter detection in clinical ultrasound workflows.",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Viacheslav Danilov",
    role: "Research Scientist",
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
    name: "Olga Gerget",
    role: "Professor",
    organization: "Tomsk Polytechnic University",
    location: "Tomsk · Russia 🇷🇺",
    photo: "/people/jane-doe.webp",
    links: {
      globe: "https://ieeexplore.ieee.org/author/37086166435",
      orcid: "https://orcid.org/0000-0002-6242-9502",
      researchgate: "https://www.researchgate.net/profile/Olga-Gerget",
      email: "olgagerget@mail.ru",
    },
  },
  {
    name: "Nikolay Vasilyev",
    role: "Cardiac Surgeon",
    organization: "Boston Children's Hospital",
    location: "Boston · United States 🇺🇸",
    photo: "/people/nikolay-vasilyev.webp",
    links: {
      linkedin: "https://www.linkedin.com/in/nikolayvasilyev/",
      researchgate: "https://www.researchgate.net/profile/Nikolay-Vasilyev-2",
      google: "https://scholar.google.com/citations?user=HnEl5nYAAAAJ&hl=en",
      email: "nikolay.v.vasilyev.md@gmail.com",
    },
  },
  {
    name: "Maria Ledesma",
    role: "Professor",
    organization: "Technical University of Madrid",
    location: "Madrid · Spain 🇪🇸",
    photo: "/people/maria-ledesma.webp",
    links: {
      globe: "https://ieeexplore.ieee.org/author/37327193600",
      linkedin: "https://www.linkedin.com/in/maria-j-ledesma-carbayo-440aa8275",
      orcid: "https://orcid.org/0000-0001-6846-3923",
      google: "https://scholar.google.es/citations?user=jCcBex0AAAAJ&hl=en",
      email: "mj.ledesma@upm.es",
    },
  },
];

const RESOURCES = [
  {
    label: "PhD Thesis",
    url: "https://earchive.tpu.ru/handle/11683/61940?locale=en",
  },
  {
    label: "PhD Abstract",
    url: "https://earchive.tpu.ru/handle/11683/61925?locale=en",
  },
  {
    label: "Journal Article",
    url: "https://doi.org/10.1016/j.compmedimag.2023.102188",
  },
];

const TECH_STACK = ["TensorFlow", "Keras", "Python", "scikit-learn", "OpenCV"];

export default function ProjectPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-24">
        <ProjectHeader
          title="SonoGuide"
          subtitle="Deep segmentation for guiding surgical tools in 3D ultrasound"
          banner={{
            image: "/portfolio/previews/sonoguide.jpg",
            alt: "SonoGuide - AI-guided ultrasound imaging assistant",
          }}
          client={{
            name: "Boston Children's Hospital",
            url: "https://www.childrenshospital.org/",
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
                Minimally invasive cardiac procedures demand real-time,
                high-fidelity imaging of surgical tools like catheters. However,
                3D{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Echocardiography"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  echocardiography
                </a>
                , a cost-effective modality, suffers from speckle noise and low
                resolution, making device localization challenging.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify">
                This project addressed this limitation by designing a custom
                deep learning solution based on a modified U-net, termed V-net,
                tailored for medical image segmentation under noisy conditions.
                The proposed V-net introduces additional dense skip-connections
                within both encoder and decoder paths to combat gradient
                vanishing and overfitting.
              </p>
            </div>
          </Section>

          {/* Data */}
          <Section title="Data">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              This study used a specialized dataset consisting of 75
              three-dimensional grayscale ultrasound volumes collected during
              minimally invasive cardiac procedures on three Yorkshire pigs. The
              imaging was performed at Boston Children&apos;s Hospital using a
              Philips iE33 ultrasound system.
            </p>

            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Resolution:</strong>{" "}
                  176×176×208 voxels per volume
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Challenges:</strong> Speckle
                  noise and low contrast posing significant segmentation
                  difficulties
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Augmentation:</strong>{" "}
                  Synthetic data generation using kinematics of flexible robots
                </span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              The catheter used in this study is shown in{" "}
              <a href="#figure-1" className="text-accent hover:underline">
                Figure 1
              </a>
              , while{" "}
              <a href="#figure-2" className="text-accent hover:underline">
                Figure 2
              </a>{" "}
              illustrates the challenging visibility of catheters in raw
              ultrasound data.
            </p>

            {/* Figure 1: Catheter */}
            <figure id="figure-1" className="mb-8 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/sonoguide/catheter-and-pigtail.webp"
                alt="Catheter and Pigtail"
                width={929}
                height={319}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> The catheter
                with pigtail tip used during minimally invasive cardiac
                procedures.
              </figcaption>
            </figure>

            {/* Figure 2: Source Data */}
            <figure id="figure-2" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/sonoguide/example-of-catheter-source-data.webp"
                alt="Catheter Source Data"
                width={1600}
                height={550}
                maxWidth="3xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 2.</span> Example of
                catheter visibility in raw 3D ultrasound data across multiple
                planes (highlighted in green circles and ellipses).
              </figcaption>
            </figure>
          </Section>

          {/* Methods */}
          <Section title="Methods">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              To address the challenges of catheter segmentation in noisy 3D
              ultrasound data, we developed V-net, a fully volumetric
              convolutional neural network based on the U-net architecture,
              enhanced for depth, gradient stability, and feature reuse.
            </p>

            <ul className="space-y-4 text-gray-300 mb-6 text-justify">
              <li>
                <strong className="text-gray-200">Architecture:</strong> The
                V-net employs a symmetric encoder-decoder structure with dense
                skip-connections, dilated convolutions, instance normalization,
                ELU activations, and dropout.
              </li>
              <li>
                <strong className="text-gray-200">Training Strategy:</strong>{" "}
                Cyclical learning rate schedule and variable batch size strategy
                based on the Fibonacci sequence.
              </li>
              <li>
                <strong className="text-gray-200">
                  Hyperparameter Tuning:
                </strong>{" "}
                T-test-based selection method reducing the search space from
                millions to a few hundred combinations.
              </li>
              <li>
                <strong className="text-gray-200">Inference:</strong> Test-time
                augmentation (TTA) to enhance segmentation stability.
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              The full V-net architecture is shown in{" "}
              <a href="#figure-3" className="text-accent hover:underline">
                Figure 3
              </a>
              , and the dense feature transfer mechanism is illustrated in{" "}
              <a href="#figure-4" className="text-accent hover:underline">
                Figure 4
              </a>
              .
            </p>

            {/* Figure 3: V-net Architecture */}
            <figure id="figure-3" className="mb-8 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/sonoguide/v-net-architecture.webp"
                alt="V-net Architecture"
                width={2036}
                height={1266}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 3.</span> Full V-net
                architecture highlighting the layered structure and rich network
                of skip-connections.
              </figcaption>
            </figure>

            {/* Figure 4: Feature Transfer (GIF) */}
            <figure id="figure-4" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/sonoguide/v-net-feature-transfer.gif"
                alt="V-net Feature Transfer"
                width={552}
                height={281}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 4.</span> Dense feature
                transfer during encoding and decoding, allowing early-layer
                features to influence deeper representations.
              </figcaption>
            </figure>
          </Section>

          {/* Results */}
          <Section title="Results">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The V-net architecture achieved high spatial precision in
              localizing catheters despite strong speckle noise and anatomical
              occlusion:
            </p>

            <ul className="space-y-2 text-gray-300 mb-4">
              <li>
                <strong className="text-gray-200">V-net (TTA):</strong>{" "}
                <span className="font-semibold text-light">
                  93.6 ± 2.4% DSC
                </span>
              </li>
              <li>
                <strong className="text-gray-200">Standard U-net:</strong> 80.5
                ± 5.8% DSC
              </li>
              <li>
                <strong className="text-gray-200">SegNet / FCN:</strong> &lt;25%
                DSC on average
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              Segmentation accuracy on synthetic and real samples is shown in{" "}
              <a href="#figure-5" className="text-accent hover:underline">
                Figure 5
              </a>{" "}
              and{" "}
              <a href="#figure-6" className="text-accent hover:underline">
                Figure 6
              </a>
              , and the comparison with other networks is presented in{" "}
              <a href="#figure-7" className="text-accent hover:underline">
                Figure 7
              </a>
              .
            </p>

            {/* Figure 5: Synthetic Sample */}
            <figure id="figure-5" className="mb-8 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/sonoguide/segmentation-of-synthetic-sample.webp"
                alt="Segmentation of Synthetic Sample"
                width={1650}
                height={1100}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 5.</span> Segmentation
                results on a synthetic sample showing network prediction (white)
                vs ground truth (red).
              </figcaption>
            </figure>

            {/* Figure 6: Real Sample */}
            <figure id="figure-6" className="mb-8 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/sonoguide/segmentation-of-real-sample.webp"
                alt="Segmentation of Real Sample"
                width={1650}
                height={1100}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 6.</span> Segmentation
                results on a real ultrasound sample across axial, sagittal, and
                coronal planes.
              </figcaption>
            </figure>

            {/* Figure 7: Network Comparison */}
            <figure id="figure-7" className="mb-8 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/sonoguide/comparison-with-other-networks.webp"
                alt="Comparison with Other Networks"
                width={3400}
                height={1500}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 7.</span> Performance
                comparison of V-net against FCN, SegNet, Deep Medic, and U-net
                variants.
              </figcaption>
            </figure>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              The videos below demonstrate 3D volumetric segmentation in static
              and dynamic series:
            </p>

            {/* Video Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Video 1: Static 3D */}
              <figure className="scroll-mt-24">
                <AutoplayVideo
                  controls
                  className="w-full rounded-lg border border-white/10"
                >
                  <source
                    src="/portfolio/sonoguide/segmentation-of-a-static-3d-series.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </AutoplayVideo>
                <figcaption className="text-center text-sm text-gray-400 mt-2">
                  Segmentation of a static 3D series
                </figcaption>
              </figure>

              {/* Video 2: Dynamic 3D */}
              <figure className="scroll-mt-24">
                <AutoplayVideo
                  controls
                  className="w-full rounded-lg border border-white/10"
                >
                  <source
                    src="/portfolio/sonoguide/segmentation-of-a-dynamic-3d-series.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </AutoplayVideo>
                <figcaption className="text-center text-sm text-gray-400 mt-2">
                  Segmentation of a dynamic 3D series
                </figcaption>
              </figure>
            </div>
          </Section>

          {/* Conclusion */}
          <Section title="Conclusion">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              This project showcases a robust, deployable solution for
              segmenting surgical instruments in noisy 3D ultrasound,
              significantly enhancing intraoperative navigation. The V-net
              model&apos;s innovations in architecture, training strategy, and
              data synthesis demonstrate both academic rigor and practical
              value.
            </p>
            <p className="text-gray-300 leading-relaxed text-justify">
              Future work may include adapting the model for other
              low-resolution modalities, extending real-time capabilities, and
              integrating AR-based visualization during surgery. The methods are
              also applicable to oncology, neurosurgery, and vascular
              interventions.
            </p>
          </Section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </div>
  );
}
