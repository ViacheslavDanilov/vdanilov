"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import CyberneticCard from "@/components/ui/cybernetic-card";
import { Tab } from "@/components/ui/tab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLink,
  faBriefcase,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

const ExperienceCard = ({ experience }) => {
  const [activeTab, setActiveTab] = useState("responsibilities");

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const tabs = [
    { id: "responsibilities", label: "Responsibilities", icon: faBriefcase },
    { id: "publications", label: "Publications", icon: faBook },
  ];

  // Toggle accordion: clicking same tab closes it
  const handleTabClick = (tabId) => {
    if (activeTab === tabId) {
      setActiveTab(null); // Close if already open
    } else {
      setActiveTab(tabId); // Open new tab
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "responsibilities":
        return (
          <ul className="space-y-3">
            {experience.responsibilities.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-accent mt-2" />
                <p className="text-sm text-gray-300 leading-relaxed text-justify">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        );
      case "publications":
        return (
          <ul className="space-y-3">
            {experience.publications.map((pub, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-accent mt-2" />
                <div className="flex-1">
                  <div className="flex items-start gap-2">
                    {pub.type && (
                      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-white/5 text-neutral-300 border border-white/10 flex-shrink-0">
                        {pub.type}
                      </span>
                    )}
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent hover:text-light transition-colors inline-flex items-start gap-2 group flex-1"
                    >
                      <span className="leading-relaxed">{pub.title}</span>
                      <FontAwesomeIcon
                        icon={faExternalLink}
                        className="w-3 h-3 mt-1 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
                      />
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <CyberneticCard className="h-full flex flex-col">
      {/* Mobile Layout: Centered logo and info */}
      <div className="flex flex-col md:hidden items-center mb-6 space-y-4">
        <div className="relative w-32 h-32 rounded-2xl overflow-hidden border border-light/10 bg-card/50 flex items-center justify-center p-4">
          <Image
            src={`${basePath}${experience.logo}`}
            alt={`${experience.company} logo`}
            fill
            className="object-contain p-4"
            sizes="128px"
          />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold text-light">{experience.title}</h3>
          <p className="text-sm font-medium text-accent">
            {experience.company}
          </p>
          <div className="flex flex-wrap gap-2 justify-center text-xs text-gray-400">
            <span>{experience.period}</span>
            <span>•</span>
            <span>{experience.duration}</span>
          </div>
          <p className="text-sm text-gray-400">{experience.location}</p>
        </div>
      </div>

      {/* Desktop Layout: Horizontal logo and info */}
      <div className="hidden md:flex flex-row gap-6 mb-6 items-start">
        <div className="relative w-32 h-32 flex-shrink-0 rounded-2xl overflow-hidden border border-light/10 bg-card/50 flex items-center justify-center">
          <Image
            src={`${basePath}${experience.logo}`}
            alt={`${experience.company} logo`}
            fill
            className="object-contain p-4"
            sizes="128px"
          />
        </div>
        <div className="flex-1 space-y-2">
          <h3 className="text-2xl font-bold text-light">{experience.title}</h3>
          <p className="text-base font-medium text-accent">
            {experience.company}
          </p>
          <div className="flex flex-wrap gap-2 text-sm text-gray-400">
            <span>{experience.period}</span>
            <span>•</span>
            <span>{experience.duration}</span>
          </div>
          <p className="text-sm text-gray-400">{experience.location}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-1 mb-6 bg-card/30 rounded-full p-1 border border-light/10">
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            text={tab.label}
            icon={tab.icon}
            selected={activeTab === tab.id}
            setSelected={() => handleTabClick(tab.id)}
          />
        ))}
      </div>

      {/* Tab Content with Animation - Accordion Style */}
      <AnimatePresence mode="wait">
        {activeTab && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              {renderTabContent()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </CyberneticCard>
  );
};

export default ExperienceCard;
