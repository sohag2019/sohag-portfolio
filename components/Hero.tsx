'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`pb-20 pt-16 flex flex-col items-center text-center transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Profile Photo */}
      <div
        className={`relative w-32 h-32 mb-8 rounded-full overflow-hidden transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full p-1">
          <div className="w-full h-full bg-[#0a0a0a] rounded-full p-1">
            <div className="w-full h-full rounded-full overflow-hidden">
              <Image
                src="/images/my-images/sohagdev.png"
                alt="Sohag Hossain - Full Stack Developer Profile Photo"
                width={128}
                height={128}
                className="w-full h-full object-cover rounded-full"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Title */}
      <h1
        className={`text-5xl md:text-6xl font-bold mb-4 transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Sohag Hossain
        </span>
        <span className="ml-3 text-2xl">🚀</span>
      </h1>

      {/* Subtitle with line */}
      <div
        className={`flex items-center gap-4 mb-6 transition-all duration-700 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-gray-600 to-gray-600"></div>
        <p className="text-white text-lg font-medium">Full Stack Developer</p>
        <div className="h-px w-16 bg-gradient-to-l from-transparent via-gray-600 to-gray-600"></div>
      </div>

      {/* Description */}
      <p
        className={`text-gray-400 text-lg mb-8 max-w-2xl transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        Leading teams to architect scalable, enterprise-grade solutions across the full stack
      </p>

      {/* Call-to-Action Buttons */}
      <div
        className={`flex items-center gap-4 flex-wrap justify-center transition-all duration-700 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <Link
          href="/#projects"
          className="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-purple-500/20"
        >
          View My Work
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </Link>
        <Link
          href="/#contact"
          className="px-6 py-3 bg-gray-800/80 rounded-lg text-white font-semibold border border-gray-700/50 hover:border-gray-600 hover:bg-gray-700/80 transition-all duration-300 transform hover:scale-105"
        >
          Get in Touch
        </Link>
        <a
          href="https://drive.google.com/file/d/1wHVsrVJdO8dgw7B0FV_uQqnahajS_62b/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-gray-800/90 rounded-lg text-white font-semibold border border-gray-700/60 hover:border-gray-600 hover:bg-gray-700/90 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          View Resume
        </a>
      </div>
    </div>
  );
}
