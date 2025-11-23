import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MenuBar } from "./ui/glow-menu";
import {
  Home,
  Briefcase,
  GraduationCap,
  FolderGit2,
  BookOpen,
  Users,
} from "lucide-react";

// Menu glow gradient configuration
// Cool Blue (Soft)
const GLOW_GRADIENT =
  "radial-gradient(circle, rgba(3, 177, 251, 0.2) 0%, rgba(2,141,200,0.075) 50%, rgba(1,106,150,0) 100%)";
const ICON_COLOR = "text-blue-500";

// Electric Blue (Vibrant)
// const GLOW_GRADIENT = "radial-gradient(circle, rgba(96, 165, 250, 0.40) 0%, rgba(59, 130, 246, 0.22) 50%, rgba(37, 99, 235, 0) 100%)";
// const ICON_COLOR = "text-blue-400";

// Slate Blue (Muted)
// const GLOW_GRADIENT = "radial-gradient(circle, rgba(100, 116, 139, 0.35) 0%, rgba(71, 85, 105, 0.18) 50%, rgba(51, 65, 85, 0) 100%)";
// const ICON_COLOR = "text-slate-400";

// Navigation Items Array
const navItems = [
  {
    icon: Home,
    label: "Home",
    href: "/",
    gradient: GLOW_GRADIENT,
    iconColor: ICON_COLOR,
  },
  {
    icon: Briefcase,
    label: "Experience",
    href: "/experience",
    gradient: GLOW_GRADIENT,
    iconColor: ICON_COLOR,
  },
  {
    icon: GraduationCap,
    label: "Education",
    href: "/education",
    gradient: GLOW_GRADIENT,
    iconColor: ICON_COLOR,
  },
  {
    icon: FolderGit2,
    label: "Portfolio",
    href: "/portfolio",
    gradient: GLOW_GRADIENT,
    iconColor: ICON_COLOR,
  },
  {
    icon: BookOpen,
    label: "Publications",
    href: "/publications",
    gradient: GLOW_GRADIENT,
    iconColor: ICON_COLOR,
  },
  {
    icon: Users,
    label: "References",
    href: "/references",
    gradient: GLOW_GRADIENT,
    iconColor: ICON_COLOR,
  },
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("Home");

  // Update active section based on current route
  useEffect(() => {
    const activeItem = navItems.find((item) => item.href === location.pathname);
    if (activeItem) {
      setActiveSection(activeItem.label);
    }
  }, [location.pathname]);

  // Navigation handler
  const handleNavClick = (label, href) => {
    navigate(href);
  };

  return (
    <nav className="relative top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-sm border-b border-accent/20">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-none"
          >
            <img
              src="./content/logo.png"
              alt="Viacheslav Danilov"
              className="h-10 w-auto"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <MenuBar
              items={navItems}
              activeItem={activeSection}
              onItemClick={handleNavClick}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
