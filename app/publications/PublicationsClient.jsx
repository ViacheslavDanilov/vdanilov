"use client";

import React from "react";
import FilteredGrid from "@/components/FilteredGrid";
import PublicationCard from "@/components/PublicationCard";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import generated from "@/lib/publications.generated.json";
import siteOnly from "@/lib/publications-site.json";
import { publicationsSummary } from "@/lib/publications";

// The record fields come from research-record, the site-only fields from publications-site.json
const PUBLICATIONS_DATA = generated.publications.map((publication) => ({
  ...publication,
  ...siteOnly[publication.id],
  category: publication.type,
}));

const FILTER_OPTIONS = [
  { id: "featured", label: "Featured", icon: faStar /* faStar */ },
  { id: "all", label: "All", icon: "" /* faLayerGroup */ },
  { id: "Journal", label: "Journal", icon: "" /* faBook */ },
  { id: "Conference", label: "Conference", icon: "" /* faUsers */ },
  { id: "Blog Post", label: "Blog Post", icon: "" /* faPenNib */ },
  { id: "Dataset", label: "Dataset", icon: "" /* faDatabase */ },
];

export default function Publications() {
  return (
    <div className="min-h-screen pt-24">
      <div className="flex flex-col items-center pt-12 md:pt-24 gap-36 pb-48">
        {/* Header Section */}
        <section className="w-full max-w-7xl mx-auto px-6">
          <header className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-strong mb-4">
              Publications
            </h1>
            <p className="text-muted mt-3 max-w-3xl mx-auto leading-relaxed text-balance">
              {publicationsSummary()}
            </p>
          </header>

          <FilteredGrid
            items={PUBLICATIONS_DATA}
            options={FILTER_OPTIONS}
            label="Filter publications"
            layoutId="publications-filter"
            gridClassName="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-start"
            renderItem={(publication) => (
              <PublicationCard publication={publication} />
            )}
            empty={
              <p className="text-center text-muted italic py-12">
                No publications found for this category.
              </p>
            }
          />
        </section>
      </div>
    </div>
  );
}
