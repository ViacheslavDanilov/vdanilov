"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

// Format date from "YYYY-MM" to "January 2025"
const formatDate = (dateString) => {
  if (!dateString) return null;
  const [year, month] = dateString.split("-");
  const date = new Date(year, parseInt(month) - 1);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

// Category display names mapping
const CATEGORY_LABELS = {
  "medical-imaging": "Medical Imaging",
  "clinical-decision-support": "Clinical Decision Support",
  "biomedical-research": "Biomedical Research",
  "medical-devices": "Medical Devices",
  "business-applications": "Business Applications",
};

const PortfolioCard = ({ project }) => {
  const { id, title, description, image, date, categories } = project;
  const formattedDate = formatDate(date);
  const primaryCategory = categories?.[0];
  const categoryLabel = CATEGORY_LABELS[primaryCategory] || primaryCategory;

  return (
    <Link href={`/portfolio/${id}`} className="group block">
      <article
        className="relative overflow-hidden rounded-2xl bg-card border border-white/10 
                   transition-all duration-300 hover:border-accent/30 hover:shadow-lg 
                   hover:shadow-accent/5"
      >
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-102"
          />
          {/* Gradient Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent 
                        opacity-60 transition-opacity duration-300 group-hover:opacity-80"
          />

          {/* Primary Category Badge - Top Right Corner */}
          {categoryLabel && (
            <Badge variant="teal" className="absolute top-5 right-5 z-10">
              {categoryLabel}
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title with Arrow */}
          <div className="flex items-center gap-2 mb-2">
            <h3
              className="text-lg font-semibold text-light transition-colors duration-300 
                         group-hover:text-accent line-clamp-1"
            >
              {title}
            </h3>
            <svg
              className="w-4 h-4 text-accent opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Footer: Date + View Project */}
          <div className="mt-4 flex items-center justify-between">
            {/* Date */}
            {formattedDate && (
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="w-3 h-3"
                  style={{ width: "0.75rem", height: "0.75rem" }}
                />
                <span>{formattedDate}</span>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PortfolioCard;
