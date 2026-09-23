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
  title: "PulmoLens",
  description:
    "Attention-guided deep learning for COVID-19 and pneumonia detection in chest X-rays, achieving 84% accuracy with Grad-CAM supervision.",
  path: "/portfolio/pulmolens/",
  image: {
    url: "/portfolio/previews/pulmolens.jpg",
    alt: "PulmoLens - COVID-19 and pneumonia detection",
  },
});

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "Clinicians at Beth Israel Deaconess Medical Center lacked an interpretable, accurate tool to distinguish COVID-19 and pneumonia in chest X-rays, limiting rapid triage and diagnostic support during the pandemic.",
  },
  {
    icon: faBullseye,
    label: "Task",
    text: "Develop a robust AI classification pipeline with visual interpretability for radiographic COVID-19 and pneumonia detection.",
  },
  {
    icon: faCogs,
    label: "Action",
    text: "Integrated Grad-CAM-based attention into CNN training, combining multi-source labeled data with indirect supervision to guide model focus on clinically relevant lung regions.",
  },
  {
    icon: faChartLine,
    label: "Result",
    text: "Achieved 84% test accuracy (+11% over baseline) and outperformed larger custom models, while producing transparent, lung-focused visual diagnostics.",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Viacheslav Danilov",
    role: "Lead Data Scientist",
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
    name: "Alexander Kirpich",
    role: "Research Scientist",
    organization: "Georgia State University",
    location: "Atlanta · United States 🇺🇸",
    photo: "/people/alexander-kirpich.webp",
    links: {
      globe: "https://publichealth.gsu.edu/profile/alexander-kirpich/",
      linkedin: "https://www.linkedin.com/in/alexander-kirpich-ph-d-27b8944/",
      researchgate: "https://www.researchgate.net/profile/Alexander-Kirpich",
      google: "https://scholar.google.com/citations?user=-Tf2QG8AAAAJ&hl=en",
      email: "akirpich@gsu.edu",
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
    url: "https://doi.org/10.1016/j.imu.2021.100835",
  },
  {
    label: "Pre-print",
    url: "https://doi.org/10.21203/rs.3.rs-149472/v1",
  },
];

const TECH_STACK = [
  "TensorFlow",
  "Keras",
  "Python",
  "scikit-learn",
  "SHAP",
  "OpenCV",
];

export default function ProjectPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-24">
        <ProjectHeader
          title="PulmoLens"
          subtitle="Attention-guided deep learning for COVID-19 and pneumonia detection in chest X-rays"
          banner={{
            image: "/portfolio/previews/pulmolens.jpg",
            alt: "PulmoLens - Lung X-ray segmentation for intubation detection",
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
                This project aimed to improve the diagnostic performance and
                explainability of AI models for detecting COVID-19 and pneumonia
                from chest X-ray images. The key innovation was the introduction
                of an indirect supervision strategy, where{" "}
                <a
                  href="https://arxiv.org/abs/1610.02391"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Grad-CAM
                </a>{" "}
                heatmaps guided convolutional neural networks during training to
                focus on relevant lung regions.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify">
                To overcome data scarcity and inconsistency, we harmonized and
                relabeled data from five major public datasets. We trained and
                evaluated multiple standard network architectures, progressively
                refining them in three stages: transfer learning, full
                fine-tuning, and indirect supervision. Our experiments showed
                that standard architectures like VGG-16 not only matched but
                outperformed larger, custom{" "}
                <a
                  href="https://doi.org/10.1038/s41598-020-76550-z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  COVID-Net
                </a>{" "}
                models while maintaining transparency in predictions. This
                approach has significant implications for rapid, scalable
                AI-assisted diagnosis in clinical settings.
              </p>
            </div>
          </Section>

          {/* Data */}
          <Section title="Data">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The dataset consisted of 2,631 chest X-ray images, sourced from
              five publicly available datasets:
            </p>
            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <a
                    href="https://arxiv.org/abs/2006.11988"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    COVID Chest X-Ray Dataset
                  </a>{" "}
                  (CCXD)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <a
                    href="https://github.com/agchung/Actualmed-COVID-chestxray-dataset"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Actualmed COVID-19 Chest X-Ray Dataset
                  </a>{" "}
                  (ACCD)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <a
                    href="https://github.com/agchung/Figure1-COVID-chestxray-dataset"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Figure 1 COVID-19 Chest X-Ray Dataset
                  </a>{" "}
                  (FCCD)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <a
                    href="https://www.kaggle.com/datasets/tawsifurrahman/covid19-radiography-database"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    COVID-19 Radiography Database
                  </a>{" "}
                  (CRD)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <a
                    href="https://www.kaggle.com/c/rsna-pneumonia-detection-challenge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    RSNA Pneumonia Detection Dataset
                  </a>{" "}
                  (RSNA)
                </span>
              </li>
            </ul>
            <p className="text-gray-300 leading-relaxed text-justify">
              Images were manually labeled into three consistent classes:
              Normal, Pneumonia, and COVID-19. To ensure class balance,
              duplicates were removed and class-specific quotas were enforced.
              Data was split into training (80%), validation (10%), and testing
              (10%) sets. Only anterior-posterior (AP) and posteroanterior (PA)
              images were retained to maintain diagnostic relevance.
            </p>
          </Section>

          {/* Methods */}
          <Section title="Methods">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The project&apos;s core innovation lies in a three-stage training
              pipeline that combines conventional transfer learning with
              indirect supervision, enabling more focused and interpretable AI
              predictions for medical imaging:
            </p>

            <ul className="space-y-4 text-gray-300 mb-6 text-justify">
              <li>
                <strong className="text-gray-200">
                  Stage I (Transfer Learning):
                </strong>{" "}
                We initialized ten convolutional neural networks (CNNs) such as
                VGG-16, MobileNet V2, and EfficientNet variants using ImageNet
                weights. We trained only the classifier heads while keeping the
                feature extractor layers frozen. Bayesian optimization was used
                for hyperparameter tuning, and regularization techniques
                (dropout, L2 regularization, early stopping) were employed to
                reduce overfitting.
              </li>
              <li>
                <strong className="text-gray-200">
                  Stage II (Full Fine-Tuning):
                </strong>{" "}
                The top-performing models from the first stage (VGG-16,
                MobileNet V2, EfficientNet B1, B3) were fully unfrozen and
                retrained, allowing both feature extractors and classification
                heads to be optimized together at a reduced learning rate.
              </li>
              <li>
                <strong className="text-gray-200">
                  Stage III (Indirect Supervision):
                </strong>{" "}
                This stage introduced the key novelty: an indirect supervision
                mechanism guided by Grad-CAM (Gradient-weighted Class Activation
                Mapping). During training, attention heatmaps were generated and
                used to create soft masks that emphasize the lung areas most
                relevant for diagnosis. These masks were applied to input
                images, and the network was trained using a dual-loss function
                that combined traditional classification loss with an attention
                loss. This encouraged the network to learn not just what the
                correct label is, but also where to look when making
                predictions.
              </li>
            </ul>

            {/* Figure 1: Indirect Supervision Workflow */}
            <figure id="figure-1" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/pulmolens/indirect-supervision-workflow.webp"
                alt="Indirect Supervision Workflow"
                width={5244}
                height={1520}
                maxWidth="full"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> Indirect
                supervision workflow showing Grad-CAM attention map integration,
                shared weights, and attention-based masking during
                backpropagation.
              </figcaption>
            </figure>
          </Section>

          {/* Results */}
          <Section title="Results">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The evaluation of model performance proceeded in three distinct
              training stages, with each phase demonstrating progressive
              improvements in classification accuracy, robustness, and clinical
              relevance:
            </p>

            <ul className="space-y-4 text-gray-300 mb-6 text-justify">
              <li>
                <strong className="text-gray-200">
                  Stage I (Transfer Learning):
                </strong>{" "}
                MobileNet V2, VGG-16, and the EfficientNet B1/B3 models emerged
                as the top performers, achieving validation accuracies of 79–80%
                and testing accuracies of up to 78%.
              </li>
              <li>
                <strong className="text-gray-200">
                  Stage II (Full Fine-Tuning):
                </strong>{" "}
                VGG-16 and MobileNet V2 showed the most significant
                improvements, with validation accuracy increasing by +9% and
                +6%, respectively. VGG-16 reached 87% validation and 82% test
                accuracy.
              </li>
              <li>
                <strong className="text-gray-200">
                  Stage III (Indirect Supervision):
                </strong>{" "}
                Networks trained with attention masks demonstrated more
                anatomically accurate focus on lung regions. VGG-16 achieved the
                highest accuracy overall:{" "}
                <span className="text-light font-semibold">
                  88% validation and 84% test accuracy
                </span>
                , outperforming the best COVID-Net variant (CXR-4A) which peaked
                at 81% accuracy despite being over 11× more complex.
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              <strong className="text-gray-200">Performance Summary:</strong>
            </p>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">VGG-16 (Stage III):</strong>{" "}
                  88% validation, 84% test accuracy
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">
                    MobileNet V2 (Stage III):
                  </strong>{" "}
                  86% validation, 79% test accuracy
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">CXR-4A (COVID-Net):</strong>{" "}
                  81% accuracy on both subsets
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Improvement:</strong>{" "}
                  Grad-CAM integration led to +9% gain for VGG-16 from Stage I
                  to III in COVID-19 detection
                </span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed text-justify">
              The integration of Grad-CAM not only improved classification but
              also made the predictions interpretable. Attention maps confirmed
              that the networks were focusing on clinically relevant lung zones,
              validating the effectiveness of indirect supervision as a
              lightweight yet powerful enhancement to conventional CNN training
              in medical imaging contexts.
            </p>

            {/* Figure 2: COVID-19 Detection Attention Maps */}
            <figure id="figure-2" className="mb-6 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/pulmolens/indirect-supervision-covid-finding.webp"
                alt="COVID-19 Detection Attention Maps"
                width={3060}
                height={3442}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 2.</span> Grad-CAM
                attention maps for COVID-19 detection showing model focus on
                clinically relevant lung regions affected by the disease.
              </figcaption>
            </figure>

            {/* Figure 3: Pneumonia Detection Attention Maps */}
            <figure id="figure-3" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/pulmolens/indirect-supervision-pneumonia-finding.webp"
                alt="Pneumonia Detection Attention Maps"
                width={3059}
                height={3439}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 3.</span> Grad-CAM
                attention maps for pneumonia detection demonstrating
                anatomically accurate focus on affected lung areas.
              </figcaption>
            </figure>
          </Section>

          {/* Conclusion */}
          <Section title="Conclusion">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              This project demonstrates that indirect supervision with attention
              guidance can substantially improve both performance and
              transparency in medical image classification. VGG-16, a standard
              CNN, surpassed more complex models in identifying COVID-19 from
              chest X-rays, proving that smart supervision can outperform
              brute-force architecture scaling.
            </p>
            <p className="text-gray-300 leading-relaxed text-justify">
              The method offers a scalable, interpretable AI solution for
              radiology, with future extensions possible for other diseases and
              imaging modalities.
            </p>
          </Section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </div>
  );
}
