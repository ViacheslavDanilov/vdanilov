"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const PortfolioCard = ({ project }) => {
  const { id, title, description, category, image } = project;

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

          {/* Category Badge - Top Right Corner */}
          <Badge variant="teal" className="absolute top-5 right-5 z-10">
            {category}
          </Badge>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3
            className="text-lg font-semibold text-light mb-2 transition-colors duration-300 
                       group-hover:text-accent line-clamp-1"
          >
            {title}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* View Project Link */}
          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-accent opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <span>View Project</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
        </div>
      </article>
    </Link>
  );
};

export default PortfolioCard;
