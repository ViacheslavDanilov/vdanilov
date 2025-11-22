import React from "react";
import { FlipWords } from "./ui/flip-words";
import { Mail, Phone, Send, FileText, FolderGit2 } from "lucide-react";

const Hero = () => {
  const roles = ["Tech Lead", "Engineering Manager", "Research Scientist"];

  return (
    <section id="hero" className="w-full max-w-7xl mx-auto px-6 py-12 md:py-24">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text Content */}
        <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
          <p className="text-lg md:text-xl text-accent font-medium">
            Hi there, I am
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-light tracking-tight">
            Viacheslav Danilov, PhD
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-400 min-h-[1.5em] flex items-center justify-center md:justify-start">
            I am a
            <FlipWords words={roles} className="text-light" />
          </h2>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-400 pt-4">
            <a
              href="mailto:viacheslav.v.danilov@gmail.com"
              className="flex items-center hover:text-accent transition-colors duration-300"
              aria-label="Email Viacheslav Danilov"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email
            </a>
            <a
              href="https://wa.me/+34634810041"
              className="flex items-center hover:text-accent transition-colors duration-300"
              aria-label="Contact via WhatsApp"
            >
              <Phone className="w-5 h-5 mr-2" />
              WhatsApp
            </a>
            <a
              href="https://t.me/ballmaske"
              className="flex items-center hover:text-accent transition-colors duration-300"
              aria-label="Contact via Telegram"
            >
              <Send className="w-5 h-5 mr-2" />
              Telegram
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-6">
            <a
              href="https://drive.google.com/file/d/1jYs54eFCYc367ZKhWjH1Xfry4_sFI7Ir/view?usp=drive_link"
              className="inline-flex items-center bg-accent text-light px-8 py-3 rounded-full font-medium hover:bg-accent/80 transition-colors duration-300 shadow-lg hover:shadow-accent/50"
              aria-label="Download CV"
            >
              <FileText className="w-5 h-5 mr-2" />
              Download CV
            </a>
            <a
              href="https://vdanilov.com/portfolio/"
              className="inline-flex items-center border border-gray-600 text-light px-8 py-3 rounded-full font-medium hover:border-accent hover:text-accent transition-colors duration-300"
              aria-label="View my projects portfolio"
            >
              <FolderGit2 className="w-5 h-5 mr-2" />
              View my projects
            </a>
          </div>
        </div>

        {/* Video Content */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="relative w-64 h-64 md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-4 border-accent/20 shadow-2xl bg-dark">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="content/viacheslav-danilov-1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
