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
  title: "Deep Deface",
  description:
    "GPU-accelerated 3D anonymization pipeline for CT and MRI scans, detecting and blurring facial/ear regions while preserving 100% of brain anatomy.",
  path: "/portfolio/deep-deface/",
  image: {
    url: "/portfolio/previews/deep-deface.jpg",
    alt: "Deep Deface - 3D face anonymization",
  },
});

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "Biospective needed to share 3D CT/MRI scans securely across sites, while removing facial/ear features and preserving brain anatomy for downstream neuro-analysis.",
  },
  {
    icon: faBullseye,
    label: "Task",
    text: "Design a GPU-accelerated anonymization pipeline capable of real-time processing and ready for clinical deployment in PACS workflows.",
  },
  {
    icon: faCogs,
    label: "Action",
    text: "Built a two-stage EfficientDet-3D model with CUDA-powered mosaicing to blur facial regions, protecting all intracranial voxels with a 2mm safety margin.",
  },
  {
    icon: faChartLine,
    label: "Result",
    text: "Achieved 96% F1-score on CT and 94% on MRI with sub-second processing per slice; now integrated into PACS for secure multi-site neuroimaging studies.",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Viacheslav Danilov",
    role: "Senior Data Scientist",
    organization: "Intelerad Medical Systems",
    location: "Montreal · Canada 🇨🇦",
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
    name: "Alexey Kachalov",
    role: "Senior Data Scientist",
    organization: "Intelerad Medical Systems",
    location: "Montreal · Canada 🇨🇦",
    photo: "/people/alexey-kachalov.webp",
    links: {
      linkedin: "https://www.linkedin.com/in/alexey-kachalov",
      kaggle: "https://www.kaggle.com/alekseykachalov",
      email: "alexey.kachalov@yandex.ru",
    },
  },
  {
    name: "Efim Furman",
    role: "Machine Learning Director",
    organization: "Intelerad Medical Systems",
    location: "Boston · United States 🇺🇸",
    photo: "/people/efim-furman.webp",
    links: {
      facebook: "https://www.facebook.com/efim.furman",
      linkedin: "https://www.linkedin.com/in/fima-furman-74133a",
      email: "efimfurman@gmail.com",
    },
  },
];

const RESOURCES = [
  {
    label: "Tests on CT",
    url: "https://drive.google.com/drive/folders/1bWEE2quPNKTIp6L_SxCC4zrjkDcjdtuL",
  },
  {
    label: "Tests on MRI",
    url: "https://drive.google.com/drive/folders/1HOTZ6ybV1E_vlAqeeTjhMTC0qv4KQnof",
  },
];

const TECH_STACK = [
  "TensorFlow",
  "Python",
  "PyDICOM",
  "scikit-learn",
  "OpenCV",
  "CUDA",
];

export default function ProjectPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-24">
        <ProjectHeader
          title="Deep Deface"
          subtitle="GPU-accelerated 3D face and ear anonymization for CT and MRI scans"
          banner={{
            image: "/portfolio/previews/deep-deface.jpg",
            alt: "Deep Deface - GPU-accelerated 3D face anonymization",
          }}
          client={{
            name: "Biospective",
            url: "https://biospective.com/",
            location: "Montreal · Canada 🇨🇦",
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
                Modern rendering pipelines let anyone reconstruct a
                patient&apos;s full head from standard CT or MRI data, making it
                possible to re-identify individuals, even when metadata are
                stripped, via consumer-grade facial recognition software.
                Conventional DICOM de-identification focuses on tags, leaving
                pixel data exposed.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify">
                Our team designed Deep Deface, a commercial-grade model that
                detects face and both ears inside full 3D medical volumes and
                applies either mosaicing or Gaussian blur to those regions only.
                Crucially, the algorithm preserves 100% of intracranial anatomy,
                ensuring no loss for downstream neuro-analysis. Deployed on
                hospital GPUs, it anonymizes an average head scan in under 1
                second end-to-end, enabling real-time protection inside PACS or
                cloud pipelines. Early adopters use it to unlock secure
                multi-site neuroimaging studies.
              </p>
            </div>
          </Section>

          {/* Data */}
          <Section title="Data">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              To build a detector that generalizes across scanners and pulse
              sequences, we assembled a deliberately diverse corpus and applied
              careful, privacy-preserving preparation steps before any model
              training began.
            </p>

            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">
                    Imaging Sources and Scale:
                  </strong>{" "}
                  551 head CT series and 555 head MRI series (210 T1-weighted,
                  244 T2-weighted, 101 FLAIR), totaling ~1.1k studies and ~240
                  GB of voxel data (
                  <a href="#figure-1" className="text-accent hover:underline">
                    Figure 1
                  </a>
                  ,{" "}
                  <a href="#figure-2" className="text-accent hover:underline">
                    Figure 2
                  </a>
                  ).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">
                    Pre-processing Workflow:
                  </strong>{" "}
                  DICOM files were converted to NIfTI, CT intensities were
                  clipped to [-1000 HU, 3000 HU], and all volumes were resampled
                  to an isotropic 1 mm grid; MRI volumes were z-score
                  normalized.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">
                    Annotation Protocol:
                  </strong>{" "}
                  Three clinicians drew 3D bounding boxes around each face, left
                  ear, and right ear in 3D Slicer (
                  <a href="#figure-3" className="text-accent hover:underline">
                    Figure 3
                  </a>
                  ); inter-rater agreement reached κ = 0.92 after consensus
                  passes.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Dataset Split:</strong> A
                  hold-out set of 83 CT and 84 MRI series, never seen during
                  development, was reserved for final evaluation.
                </span>
              </li>
            </ul>

            {/* Figure 1: CT Patient Samples */}
            <figure id="figure-1" className="mb-6 scroll-mt-24">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ImageLightbox
                  src="/portfolio/deep-deface/ct-patient-1.webp"
                  alt="CT Patient Sample 1"
                  width={2896}
                  height={1896}
                  maxWidth="full"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
                <ImageLightbox
                  src="/portfolio/deep-deface/ct-patient-2.webp"
                  alt="CT Patient Sample 2"
                  width={2896}
                  height={1896}
                  maxWidth="full"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
                <ImageLightbox
                  src="/portfolio/deep-deface/ct-patient-3.webp"
                  alt="CT Patient Sample 2"
                  width={2896}
                  height={1896}
                  maxWidth="full"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> Sample CT head
                scans from the dataset showing 3D reconstructions of patient
                facial features.
              </figcaption>
            </figure>

            {/* Figure 2: MRI Samples */}
            <figure id="figure-2" className="mb-6 scroll-mt-24">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ImageLightbox
                  src="/portfolio/deep-deface/mri-t1.webp"
                  alt="MRI T1-weighted sample"
                  width={2988}
                  height={1896}
                  maxWidth="full"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
                <ImageLightbox
                  src="/portfolio/deep-deface/mri-t2.webp"
                  alt="MRI T2-weighted sample"
                  width={2974}
                  height={1896}
                  maxWidth="full"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
                <ImageLightbox
                  src="/portfolio/deep-deface/mri-flair.webp"
                  alt="MRI FLAIR sample"
                  width={2974}
                  height={1896}
                  maxWidth="full"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 2.</span> MRI head scans
                across different sequences: T1-weighted (left), T2-weighted
                (center), and FLAIR (right).
              </figcaption>
            </figure>

            {/* Figure 3: Annotation Examples */}
            <figure id="figure-3" className="scroll-mt-24">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ImageLightbox
                  src="/portfolio/deep-deface/labeling-right-ear.webp"
                  alt="Right ear annotation in 3D Slicer"
                  width={2886}
                  height={1842}
                  maxWidth="full"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
                <ImageLightbox
                  src="/portfolio/deep-deface/labeling-face.webp"
                  alt="Face annotation in 3D Slicer"
                  width={2886}
                  height={1842}
                  maxWidth="full"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
                <ImageLightbox
                  src="/portfolio/deep-deface/labeling-left-ear.webp"
                  alt="Left ear annotation in 3D Slicer"
                  width={2886}
                  height={1842}
                  maxWidth="full"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 3.</span> 3D bounding box
                annotations in 3D Slicer for right ear (left), face (center),
                and left ear (right).
              </figcaption>
            </figure>
          </Section>

          {/* Methods */}
          <Section title="Methods">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              Once the data were prepared, we designed a two-stage pipeline that
              balances speed, accuracy, and anatomical safety.
            </p>

            <ul className="space-y-4 text-gray-300 mb-6 text-justify">
              <li>
                <strong className="text-gray-200">
                  Stage 1 (3D Object Detector):
                </strong>{" "}
                EfficientDet-style backbone with depth-wise separable
                convolutions (~33M parameters). Training used focal loss with
                class balancing and heavy 3D augmentations (random affine,
                elastic warps, Poisson noise) to mimic real-world acquisition
                variability.
              </li>
              <li>
                <strong className="text-gray-200">
                  Stage 2 (Region-selective Anonymizer):
                </strong>{" "}
                For every detected box, CUDA kernels apply either block-wise
                mosaicing or Gaussian blur with σ = 8. A 2 mm padding rule
                guarantees that the anonymized mask never crosses into the brain
                parenchyma, thus preserving all intracranial voxels for
                downstream neuro-analysis.
              </li>
              <li>
                <strong className="text-gray-200">Latency Engineering:</strong>{" "}
                The network runs at 37 ms per slice on an NVIDIA RTX 3090 and
                880 ms per slice on a 24-core Threadripper, enabling both
                real-time GPU workflows and overnight CPU batch jobs.
              </li>
            </ul>
          </Section>

          {/* Results */}
          <Section title="Results">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              Rigorous testing on an unseen cohort of 83 CT and 84 MRI series
              shows that Deep Deface meets both speed and accuracy targets while
              guaranteeing that no brain voxels are altered.
            </p>

            <ul className="space-y-2 text-gray-300 mb-4 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">CT Performance:</strong> The
                  model reaches an F1-score of{" "}
                  <span className="font-semibold">96.0%</span>, with a mean
                  Average Precision (mAP) of 74.1%. Faces are found most
                  reliably at 81.1% AP; left and right ears follow at 70.3% and
                  71.0% respectively.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">MRI Performance:</strong>{" "}
                  Performance remains high, yielding{" "}
                  <span className="font-semibold">93.9%</span> F1 and 92.6% mAP
                  across T1, T2, and FLAIR sequences. MRI faces show
                  near-perfect localization (97.2% AP), while ears achieve 92.6%
                  and 88.0% AP.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Safety Margin:</strong> Zero
                  false negatives on intracranial tissue were observed – every
                  voxel belonging to the brain proper remained unmodified,
                  confirming the 2 mm padding rule effectively protects
                  analytical regions.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Throughput:</strong> On an
                  NVIDIA RTX 3090, the end-to-end pipeline processes a slice in
                  37 milliseconds, implying a typical 300-slice head volume is
                  anonymized in &lt;11 seconds, fast enough for real-time PACS
                  workflows.
                </span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              Visual evaluation of model predictions shows accurate detection
              across all views (
              <a href="#figure-4" className="text-accent hover:underline">
                Figure 4
              </a>{" "}
              for CT,{" "}
              <a href="#figure-5" className="text-accent hover:underline">
                Figure 5
              </a>{" "}
              for MRI).
            </p>

            {/* Figure 4: CT Detection Results */}
            <figure id="figure-4" className="mb-6 scroll-mt-24">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <AutoplayVideo controls className="w-full rounded-lg">
                  <source
                    src="/portfolio/deep-deface/detection-ct-axial.mp4"
                    type="video/mp4"
                  />
                </AutoplayVideo>
                <AutoplayVideo controls className="w-full rounded-lg">
                  <source
                    src="/portfolio/deep-deface/detection-ct-coronal.mp4"
                    type="video/mp4"
                  />
                </AutoplayVideo>
                <AutoplayVideo controls className="w-full rounded-lg">
                  <source
                    src="/portfolio/deep-deface/detection-ct-sagittal.mp4"
                    type="video/mp4"
                  />
                </AutoplayVideo>
              </div>
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 4.</span> Detection
                results on CT data across axial (left), coronal (center), and
                sagittal (right) views.
              </figcaption>
            </figure>

            {/* Figure 5: MRI Detection Results */}
            <figure id="figure-5" className="scroll-mt-24">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <AutoplayVideo controls className="w-full rounded-lg">
                  <source
                    src="/portfolio/deep-deface/detection-mri-axial.mp4"
                    type="video/mp4"
                  />
                </AutoplayVideo>
                <AutoplayVideo controls className="w-full rounded-lg">
                  <source
                    src="/portfolio/deep-deface/detection-mri-coronal.mp4"
                    type="video/mp4"
                  />
                </AutoplayVideo>
                <AutoplayVideo controls className="w-full rounded-lg">
                  <source
                    src="/portfolio/deep-deface/detection-mri-sagittal.mp4"
                    type="video/mp4"
                  />
                </AutoplayVideo>
              </div>
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 5.</span> Detection
                results on MRI data across axial (left), coronal (center), and
                sagittal (right) views.
              </figcaption>
            </figure>
          </Section>

          {/* Conclusion */}
          <Section title="Conclusion">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              Deep Deface proves privacy and data fidelity can coexist: it
              neutralizes biometric risk while preserving 100% of brain voxels,
              which is key for downstream AI diagnostics. The solution enables
              secure data sharing across institutions while maintaining full
              compliance with privacy regulations.
            </p>
            <p className="text-gray-300 leading-relaxed text-justify">
              Next steps include PET/SPECT support, on-device inference for edge
              scanners, and auditable logs to comply with evolving biometric
              regulations.
            </p>
          </Section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </div>
  );
}
