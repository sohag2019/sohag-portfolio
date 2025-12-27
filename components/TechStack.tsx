'use client';

import { useState, useEffect, useRef } from 'react';

const skillCategories = [
  {
    name: 'Languages',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M8 6h8M8 12h8M8 18h8" strokeLinecap="round" />
        <path d="M4 6h2M4 12h2M4 18h2" strokeLinecap="round" />
        <path d="M18 6h2M18 12h2M18 18h2" strokeLinecap="round" />
      </svg>
    ),
    skills: ['TypeScript', 'Python', 'Go'],
  },
  {
    name: 'Backend',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <rect x="2" y="4" width="20" height="4" rx="1" />
        <rect x="2" y="10" width="20" height="4" rx="1" />
        <rect x="2" y="16" width="20" height="4" rx="1" />
      </svg>
    ),
    skills: ['Node.js', 'PostgreSQL', 'Redis'],
  },
  {
    name: 'Cloud',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
    skills: ['AWS', 'Kubernetes', 'Docker'],
  },
];

export default function TechStack() {
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
      className={`flex flex-col mt-7 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="mb-6">
        <h2
          className={`font-bold text-lg tracking-widest text-white uppercase mb-2 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
        >
          Core Skills
        </h2>
        <div
          className={`h-px w-full bg-gradient-to-r from-transparent via-gray-600 to-transparent transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
        ></div>
      </div>

      <div className="flex flex-row gap-6 max-md:flex-col max-md:gap-8">
        {skillCategories.map((category, categoryIndex) => (
          <div
            key={category.name}
            className={`flex flex-col gap-3 flex-1 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
            style={{
              transitionDelay: isVisible ? `${300 + categoryIndex * 100}ms` : '0ms',
            }}
          >
            {/* Category Header */}
            <div className="flex items-center gap-2.5">
              <div className="text-gray-400 transition-colors duration-300">
                {category.icon}
              </div>
              <h3 className="text-white text-base font-semibold">{category.name}</h3>
            </div>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                <div
                  key={skill}
                  className={`px-3 py-1.5 bg-gray-800/90 rounded-full text-white text-xs font-medium border border-gray-700/60 hover:border-gray-600 hover:bg-gray-700/90 transition-all duration-300 transform hover:scale-105 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-5'
                  }`}
                  style={{
                    transitionDelay: isVisible
                      ? `${400 + categoryIndex * 100 + skillIndex * 80}ms`
                      : '0ms',
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
