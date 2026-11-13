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
import NextProject from "@/components/project/NextProject";

export const metadata = pageMetadata({
  title: "Video Bokeh",
  description:
    "Synthetic video with exact depth, alpha masks, optical flow and rendered bokeh for training depth-aware video bokeh models, with a library, a fixed set of 300 sequences and a web demo.",
  path: "/portfolio/video-bokeh/",
  image: {
    url: "/portfolio/previews/video-bokeh.jpg",
    alt: "Video Bokeh - synthetic video with exact depth and rendered bokeh",
  },
});

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "Depth-aware video bokeh models learn from an all-in-focus video paired with a defocused version of it. Real pairs of sharp and defocused video are hard to capture, so every video bokeh dataset synthesizes the defocus.",
  },
  {
    icon: faBullseye,
    label: "Task",
    text: "Build a pipeline that composes training video from still-image layers, with exact disparity, alpha masks, optical flow and occlusion, and a bokeh renderer fast enough to run inside a training loop.",
  },
  {
    icon: faCogs,
    label: "Action",
    text: "Prepared a library of 8,586 foregrounds and 20,000 backgrounds with estimated disparity, then composited sequences in which objects move in depth, and rendered their bokeh from the layers.",
  },
  {
    icon: faChartLine,
    label: "Result",
    text: "Released the library and a fixed set of 300 sequences. The renderer takes about 5 ms per frame at 1024 × 1024 pixels on one GPU, more than ten times faster than the other renderers that take layers.",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Viacheslav Danilov",
    role: "Senior Research Scientist",
    organization: "Pompeu Fabra University",
    location: "Barcelona · Spain 🇪🇸",
    photo: "/people/viacheslav-danilov.webp",
    links: {
      linkedin: "https://www.linkedin.com/in/viacheslav-danilov/",
      github: "https://github.com/ViacheslavDanilov",
      researchgate: "https://www.researchgate.net/profile/Viacheslav-Danilov-2",
      googleScholar:
        "https://scholar.google.com/citations?user=SJidGZkAAAAJ&hl=en",
      email: "viacheslav.v.danilov@gmail.com",
    },
  },
  {
    name: "Valéry Dewil",
    role: "Postdoctoral Fellow",
    organization: "Pompeu Fabra University",
    location: "Barcelona · Spain 🇪🇸",
    photo: "/people/john-doe.webp",
    links: {
      github: "https://github.com/Valery-Dewil",
      researchgate:
        "https://www.researchgate.net/scientific-contributions/Valery-Dewil-2196478430",
      googleScholar:
        "https://scholar.google.com/citations?user=JWWBYTcAAAAJ&hl=en",
      email: "valery.dewil@ens-paris-saclay.fr",
    },
  },
  {
    name: "Pablo Arias",
    role: "Assistant Professor",
    organization: "Pompeu Fabra University",
    location: "Barcelona · Spain 🇪🇸",
    photo: "/people/pablo-arias.webp",
    links: {
      website: "https://www.upf.edu/web/pablo-arias",
      linkedin:
        "https://www.linkedin.com/in/pablo-arias-mart%C3%ADnez-132316290/",
      github: "https://github.com/pariasm",
      researchgate: "https://www.researchgate.net/profile/Pablo-Arias-5",
      googleScholar:
        "https://scholar.google.com/citations?user=9XSPStkAAAAJ&hl=en",
      orcid: "https://orcid.org/0000-0002-6961-5156",
      email: "pablo.arias@upf.edu",
    },
  },
  {
    name: "Nicola Brandonisio",
    role: "Senior AI Architect",
    organization: "Huawei",
    location: "Nice · France 🇫🇷",
    photo: "/people/nicola-brandonisio.webp",
    links: {
      linkedin: "https://www.linkedin.com/in/nicola-brandonisio-b64788a/",
      researchgate:
        "https://www.researchgate.net/scientific-contributions/Nicola-Brandonisio-2243595869",
      googleScholar:
        "https://scholar.google.com/citations?user=YIS8FW0AAAAJ&hl=en",
      email: "nicola.brandonisio@huawei.com",
    },
  },
];

const RESOURCES = [
  {
    label: "GitHub",
    url: "https://github.com/ViacheslavDanilov/video-bokeh",
  },
  {
    label: "Dataset",
    url: "https://huggingface.co/datasets/vdanilov/video-bokeh",
  },
];

const TECH_STACK = [
  "Python",
  "PyTorch",
  "Depth Anything V2",
  "FastAPI",
  "Next.js",
  "TypeScript",
];

// A caption chip laid over one cell of a video that tiles several streams
const StreamLabel = ({ children }) => (
  <span className="m-1 self-end justify-self-start rounded bg-black/60 px-1.5 py-0.5 text-[10px] leading-tight text-legacy-gray-200 backdrop-blur-sm sm:m-2 sm:rounded-md sm:px-2 sm:text-xs">
    {children}
  </span>
);

export default function ProjectPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-24">
        <ProjectHeader
          title="Video Bokeh"
          subtitle="Synthetic video with exact depth, alpha masks, optical flow and bokeh for training depth-aware video bokeh models"
          banner={{
            image: "/portfolio/previews/video-bokeh.jpg",
            alt: "Video Bokeh - synthetic video with exact depth and rendered bokeh",
          }}
          client={{
            name: "Huawei",
            url: "https://www.huawei.com/",
            location: "Nice · France 🇫🇷",
          }}
          techStack={TECH_STACK}
          resources={RESOURCES}
        />

        <div className="space-y-16">
          <Highlights items={HIGHLIGHTS_ITEMS} />

          <CoreTeam members={TEAM_MEMBERS} />

          <Section title="Overview">
            <div className="prose prose-invert max-w-none">
              <p className="text-body leading-relaxed mb-4 text-justify">
                Bokeh is the blur that a shallow depth of field gives a
                photograph, and it is hardest to render at depth
                discontinuities, where the blurred edge of a near object should
                partly reveal the background behind it. A single frame does not
                show that background, so a model that sees only the frame and
                its disparity makes errors there. To learn the effect, a video
                bokeh model trains on pairs of an all-in-focus video and a
                defocused version of the same video.
              </p>
              <p className="text-body leading-relaxed mb-4 text-justify">
                Published real pairs are still images taken at two apertures,
                and video pairs are hard to capture, so every video bokeh
                dataset synthesizes its defocus. Video Bokeh is a pipeline that
                composes such video from still-image layers, and a dataset made
                with it. Each sequence holds its all-in-focus frames, their
                disparity and a soft alpha mask for every object. On request it
                also holds exact optical flow, occlusion masks in both
                directions, and bokeh from a layered renderer. The work was done
                at Pompeu Fabra University for Huawei&apos;s depth-aware video
                bokeh research, and the code and the dataset are public.
              </p>
              <p className="text-body leading-relaxed mb-6 text-justify">
                A web demo generates a sequence from a seed and plays its
                streams side by side, in step, so a person can judge them
                against each other. A walkthrough is shown in{" "}
                <a href="#figure-1" className="text-accent hover:underline">
                  Figure 1
                </a>
                .
              </p>
            </div>

            {/* Figure 1: Demo Video */}
            <figure id="figure-1" className="scroll-mt-24">
              <div className="mx-auto w-full max-w-3xl rounded-xl overflow-hidden border border-white/10">
                <AutoplayVideo
                  aspectRatio="16 / 9"
                  poster="/portfolio/video-bokeh/demo-video-bokeh-poster.webp"
                  controls
                  aria-label="Video Bokeh web demo: generating a sequence and comparing its streams"
                  className="block w-full h-auto"
                >
                  <source
                    src="/portfolio/video-bokeh/demo-video-bokeh.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </AutoplayVideo>
              </div>
              <figcaption className="text-center text-sm text-muted mt-3">
                <span className="text-body">Figure 1.</span> Walkthrough of the
                web demo: generating a sequence, comparing its streams side by
                side, and changing the bokeh strength.
              </figcaption>
            </figure>
          </Section>

          <Section title="Data">
            <p className="text-body leading-relaxed mb-4 text-justify">
              The inputs are still images only, and a depth estimator gives each
              of them a disparity map once, so every later sequence reads a
              ready library:
            </p>
            <ul className="space-y-2 text-body mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-legacy-gray-200">Foregrounds:</strong>{" "}
                  8,586 generated cut-outs from MAGICK with high-quality alpha
                  mattes, 7,727 in the train split and 859 in the test split.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-legacy-gray-200">Backgrounds:</strong>{" "}
                  20,000 photographs from BG-20k, 15,000 in the train split and
                  5,000 in the test split, following the dataset&apos;s own
                  split.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-legacy-gray-200">Fixed set:</strong>{" "}
                  300 sequences written once from the test split, with the
                  settings and seeds recorded, so a network trained on the train
                  split can be evaluated on assets it never saw.
                </span>
              </li>
            </ul>

            <p className="text-body leading-relaxed mb-6 text-justify">
              The library and the fixed set are on Hugging Face, 115 GB and 79
              GB. Every sequence of the fixed set has 80 frames and 2.9 objects
              on average, and all but two of its 869 objects move in depth. The
              streams of one sequence are shown in{" "}
              <a href="#figure-2" className="text-accent hover:underline">
                Figure 2
              </a>
              , and three more sequences at two time steps each in{" "}
              <a href="#figure-3" className="text-accent hover:underline">
                Figure 3
              </a>
              .
            </p>

            {/* Figure 2: Streams of one sequence */}
            <figure id="figure-2" className="scroll-mt-24 mb-8">
              <div className="relative mx-auto w-full max-w-2xl rounded-xl overflow-hidden border border-white/10">
                <AutoplayVideo
                  aspectRatio="3 / 2"
                  poster="/portfolio/video-bokeh/demo-video-bokeh-streams-poster.webp"
                  controls
                  aria-label="The six streams of one Video Bokeh sequence: all-in-focus, bokeh, disparity, alpha, optical flow and occlusion"
                  className="block w-full h-auto"
                >
                  <source
                    src="/portfolio/video-bokeh/demo-video-bokeh-streams.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </AutoplayVideo>
                <div className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-2">
                  <StreamLabel>All in focus</StreamLabel>
                  <StreamLabel>Bokeh</StreamLabel>
                  <StreamLabel>Disparity</StreamLabel>
                  <StreamLabel>Alpha</StreamLabel>
                  <StreamLabel>Optical flow</StreamLabel>
                  <StreamLabel>Occlusion</StreamLabel>
                </div>
              </div>
              <figcaption className="text-center text-sm text-muted mt-3">
                <span className="text-body">Figure 2.</span> The streams of one
                sequence, played in step: the sharp composite, its bokeh,
                disparity, alpha, optical flow and the occlusion mask.
              </figcaption>
            </figure>

            {/* Figure 3: Example sequences */}
            <figure id="figure-3" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/video-bokeh/examples.webp"
                alt="Three example sequences at two time steps each, with the all-in-focus frame, alpha masks, disparity, optical flow, occlusion mask and bokeh"
                width={2063}
                height={2273}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-muted mt-3">
                <span className="text-body">Figure 3.</span> Three sequences at
                two frames each. From left to right: the all-in-focus frame,
                alpha masks, disparity, optical flow, the occlusion mask and
                bokeh.
              </figcaption>
            </figure>
          </Section>

          <Section title="Methods">
            <p className="text-body leading-relaxed mb-4 text-justify">
              The pipeline has two stages, shown in{" "}
              <a href="#figure-4" className="text-accent hover:underline">
                Figure 4
              </a>
              :
            </p>
            <ul className="space-y-4 text-body mb-6 text-justify">
              <li>
                <strong className="text-legacy-gray-200">
                  Stage A (Library):
                </strong>{" "}
                A monocular depth estimator, Depth Anything V2 by default, gives
                each foreground and background a disparity map, once and
                offline. Each foreground&apos;s matte replaces the unreliable
                estimate at its soft edge with disparity from inside the object.
              </li>
              <li>
                <strong className="text-legacy-gray-200">
                  Stage B (Sequences):
                </strong>{" "}
                Objects move over a background that a 2D camera motion warps. An
                object that approaches or recedes changes its size on screen and
                its disparity by the same factor, and the disparity inside it
                keeps the shape the estimator gave it, so the blur can vary
                within the object. Every layer&apos;s known motion gives exact
                optical flow and an occlusion mask in each direction.
              </li>
            </ul>
            <p className="text-body leading-relaxed mb-6 text-justify">
              Each object&apos;s alpha mask is soft, so a blurred edge mixes the
              object with what lies behind it, and amodal, so it includes the
              parts hidden by nearer objects. Stage B writes the sequences to
              disk, or runs inside a training loop&apos;s data loader, so a
              network receives sequences generated in memory. The depth
              estimator, the assets and the bokeh renderer can each be replaced.
            </p>

            {/* Figure 4: Pipeline */}
            <figure id="figure-4" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/video-bokeh/pipeline.webp"
                alt="Pipeline overview: Stage A builds a library of disparity maps from foregrounds and backgrounds, and Stage B composites layers into sequences with disparity, alpha masks, optical flow, occlusion masks and bokeh"
                width={2750}
                height={761}
                maxWidth="full"
              />
              <figcaption className="text-center text-sm text-muted mt-3">
                <span className="text-body">Figure 4.</span> Stage A builds the
                library once. Stage B composites layers into a sequence, with
                each object&apos;s trajectory, and renders its streams.
              </figcaption>
            </figure>
          </Section>

          <Section title="Results">
            <p className="text-body leading-relaxed mb-4 text-justify">
              The layered renderer was compared with four published ones on 120
              sequences of 24 frames at 1024 × 1024 pixels, against a layered
              ray tracer that composites the layers in display values, as the
              pipeline does:
            </p>
            <ul className="space-y-2 text-body mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-legacy-gray-200">Speed:</strong> About
                  5 ms per frame at 1024 × 1024 pixels on one NVIDIA GeForce RTX
                  5090. Of the renderers that take layers, it is more than ten
                  times faster than the others at every width, and on the CPU it
                  takes under a second per frame.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-legacy-gray-200">
                    Edge accuracy:
                  </strong>{" "}
                  Near object edges it is on average the closest to the
                  reference in every subset, ahead of BokehMe by 1.3 dB on smoke
                  to 7.0 dB on hair. The lead comes from sequences with one
                  object, and the order depends on how the reference composites.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-legacy-gray-200">Generation:</strong>{" "}
                  Writing a fixed-set sequence of 80 frames took 75 s on
                  average, with bokeh rendered on the GPU and every stream
                  written.
                </span>
              </li>
            </ul>

            <p className="text-body leading-relaxed mb-6 text-justify">
              The bokeh strength is a setting of the renderer, and the same
              sequence at three strengths is shown in{" "}
              <a href="#figure-5" className="text-accent hover:underline">
                Figure 5
              </a>
              .
            </p>

            {/* Figure 5: Bokeh strengths */}
            <figure id="figure-5" className="scroll-mt-24">
              <div className="relative mx-auto w-full max-w-4xl rounded-xl overflow-hidden border border-white/10">
                <AutoplayVideo
                  aspectRatio="4 / 1"
                  poster="/portfolio/video-bokeh/demo-video-bokeh-strengths-poster.webp"
                  controls
                  aria-label="One Video Bokeh sequence in focus and at bokeh strengths 8, 16 and 32"
                  className="block w-full h-auto"
                >
                  <source
                    src="/portfolio/video-bokeh/demo-video-bokeh-strengths.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </AutoplayVideo>
                <div className="pointer-events-none absolute inset-0 grid grid-cols-4 grid-rows-1">
                  <StreamLabel>All in focus</StreamLabel>
                  <StreamLabel>
                    <span className="sm:hidden">8</span>
                    <span className="hidden sm:inline">Strength 8</span>
                  </StreamLabel>
                  <StreamLabel>
                    <span className="sm:hidden">16</span>
                    <span className="hidden sm:inline">Strength 16</span>
                  </StreamLabel>
                  <StreamLabel>
                    <span className="sm:hidden">32</span>
                    <span className="hidden sm:inline">Strength 32</span>
                  </StreamLabel>
                </div>
              </div>
              <figcaption className="text-center text-sm text-muted mt-3">
                <span className="text-body">Figure 5.</span> One sequence in
                focus and at bokeh strengths 8, 16 and 32, played in step. The
                strength is the blur radius in pixels, at a width of 1024
                pixels, for one unit of disparity from the focus.
              </figcaption>
            </figure>
          </Section>

          <Section title="Conclusion">
            <p className="text-body leading-relaxed mb-4 text-justify">
              Video Bokeh gives a depth-aware bokeh model exact supervision at
              object edges, where real data is hardest to get, and generates it
              cheaply enough to run inside a training loop. Its sequences are
              composed from flat layers rather than rendered from 3D scenes, so
              they have no camera parallax, shadows or refraction, and the
              disparity inside an object is estimated, not rendered.
            </p>
            <p className="text-body leading-relaxed text-justify">
              The remaining limits are not fundamental: motion blur could be
              added along each layer&apos;s known motion, and the renderer can
              write the same scenes at other strengths. The data is for
              non-commercial research, as the licenses of its source images
              require.
            </p>
          </Section>

          <NextProject id="video-bokeh" />
        </div>
      </div>
      <div className="pb-24" />
    </div>
  );
}
