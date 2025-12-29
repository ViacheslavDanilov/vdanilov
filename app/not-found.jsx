"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-12">
      <div className="w-full max-w-4xl mx-auto text-center">
        <div className="space-y-8 sm:space-y-10">
          {/* 404 Circle */}
          <div
            className="w-32 h-32 sm:w-40 sm:h-40 lg:w-44 lg:h-44 mx-auto
                       bg-gradient-to-br from-accent/20 to-accent/5 
                       rounded-full flex items-center justify-center border-2 border-accent/20"
          >
            <span className="text-5xl sm:text-6xl lg:text-7xl font-bold text-accent">
              404
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-light">
            Page Not Found
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
            The page you're looking for seems to have wandered off into the
            digital wilderness. Don't worry, it happens to the best of us!
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
            <Link
              href="/"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 
                         px-6 py-3 rounded-full bg-accent text-dark font-medium
                         hover:bg-accent/90 transition-all duration-300 hover:scale-[1.02]"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Take Me Home
            </Link>

            <button
              onClick={() => router.back()}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 
                         px-6 py-3 rounded-full bg-transparent text-light font-medium
                         border border-white/20 hover:bg-white/5 cursor-pointer
                         transition-all duration-300 hover:scale-[1.02]"
            >
              <svg
                className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Go Back
            </button>
          </div>

          {/* Contact link */}
          <p className="text-sm text-gray-400 px-4 sm:px-0">
            If you think this is a mistake, please{" "}
            <a
              href="mailto:viacheslav.v.danilov@gmail.com"
              className="text-accent hover:underline transition-colors duration-200"
            >
              contact me
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
