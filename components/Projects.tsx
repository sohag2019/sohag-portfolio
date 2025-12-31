'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { getProjectConfig } from '@/lib/projectsConfig';

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const journeyContainerRef = useRef<HTMLDivElement>(null);
  const projectConfig = getProjectConfig('edupeak');

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

  // Scroll-based animation for border
  useEffect(() => {
    const handleScroll = () => {
      if (!journeyContainerRef.current) return;

      const container = journeyContainerRef.current;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerHeight = rect.height;
      
      // Calculate scroll progress (0 to 1)
      // Progress starts when container top enters viewport
      // Progress completes when container bottom exits viewport
      const containerTop = rect.top;
      const containerBottom = rect.bottom;
      
      let progress = 0;
      
      // Only calculate if container is in or near viewport
      if (containerBottom > 0 && containerTop < windowHeight) {
        // Calculate how much of the container has been scrolled through
        // Start point: when container top reaches viewport top
        // End point: when container bottom reaches viewport bottom
        const scrollableDistance = containerHeight + windowHeight;
        const scrolledDistance = windowHeight - containerTop;
        
        progress = Math.max(0, Math.min(1, scrolledDistance / scrollableDistance));
      } else if (containerTop >= windowHeight) {
        // Container hasn't entered viewport yet
        progress = 0;
      } else if (containerBottom <= 0) {
        // Container has completely scrolled past
        progress = 1;
      }

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    if (!selectedImage) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedImage]);

  return (
    <>
      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm fade-in"
          onClick={handleCloseModal}
        >
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-800/80 hover:bg-gray-700/80 text-white transition-all duration-300 hover:scale-110"
              aria-label="Close image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18"></path>
                <path d="M6 6l12 12"></path>
              </svg>
            </button>

            {/* Image with Animated Border */}
            <div className="relative w-full h-full flex items-center justify-center border-2 border-blue-500/50 rounded-2xl animate-border-pulse overflow-hidden">
              <Image
                src={selectedImage}
                alt={selectedImage.includes('hero') ? 'EduPeak LMS Hero Section - Full Screen View' : selectedImage.includes('course') ? 'EduPeak Course Dashboard and Progress Tracking Interface' : selectedImage.includes('admin') ? 'EduPeak Admin Analytics Dashboard' : 'EduPeak LMS Project Screenshot'}
                fill
                className="object-contain rounded-2xl"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      )}

      <div
        ref={sectionRef}
        className={`flex flex-col w-full mt-24 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
      <h2
        id="projects"
        className={`font-bold text-lg tracking-widest text-white uppercase mb-16 pl-6 border-l-4 border-blue-500 transition-all duration-700 delay-100 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}
      >
        Projects
      </h2>

      {/* Journey Container */}
      <div ref={journeyContainerRef} className="flex flex-col w-full relative">
        {/* Scroll-based Animated Journey Line with Deep Dive Effect */}
        <div className="absolute left-0 top-0 bottom-0 w-1 hidden md:block overflow-hidden">
          {/* Base gradient layer */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500 via-blue-400 to-transparent opacity-30"></div>
          
          {/* Scroll-based animated gradient */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500 to-blue-600 transition-transform duration-75 ease-out"
            style={{
              transform: `translateY(${scrollProgress * 100}%)`,
              opacity: 0.8
            }}
          />
          
          {/* Pulsing glow effect */}
          <div 
            className="absolute inset-0 bg-blue-500/20 blur-sm transition-opacity duration-300"
            style={{
              opacity: 0.3 + (scrollProgress * 0.5)
            }}
          />
          
          {/* Progress indicator - fills from top to bottom as you scroll */}
          <div 
            className="absolute top-0 left-0 right-0 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-500 transition-all duration-75 ease-out"
            style={{
              height: `${scrollProgress * 100}%`,
              opacity: 0.6
            }}
          />
        </div>

        {/* Project Introduction */}
        <div
          className={`relative flex flex-col md:flex-row gap-8 mb-16 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Timeline Dot - Centered on border */}
          <div className="absolute w-4 h-4 rounded-full bg-blue-500 border-4 border-gray-900 z-10 hidden md:block shadow-lg shadow-blue-500/50" style={{ left: '-6px' }} />
          
          <div className="md:ml-20 flex-1">
            <div className="flex flex-col gap-6">
              <div className="relative">
                <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-400/20 hover:border-blue-500/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-gray-800/50 flex items-center justify-center border border-gray-400/20">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-400"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <path d="M14 2v6h6"></path>
                        <path d="M16 13H8"></path>
                        <path d="M16 17H8"></path>
                        <path d="M10 9H8"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-2xl tracking-wide text-white mb-1 transition-colors">
                        EduPeak LMS
                      </h3>
                      <p className="text-blue-400 text-sm font-medium">
                        Learning Management System • Version 0.1.0
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    A comprehensive Learning Management System with <span className="text-white font-medium">200+ features</span> designed to deliver an exceptional educational experience. From course creation to analytics, payments to gamification, EduPeak provides everything needed for modern online learning.
                  </p>
                </div>
              </div>

              {/* Hero Image */}
              <div
                className="relative w-full md:w-[calc(100%+1.5rem)] md:-mr-6 h-auto rounded-xl overflow-hidden group border-2 border-gray-400/30 hover:border-blue-500/50 transition-all duration-300 bg-gray-900/50 cursor-pointer"
                onClick={() => handleImageClick('/images/hero_section.png')}
              >
                <Image
                  src="/images/hero_section.png"
                  alt="EduPeak LMS Hero Section"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="100vw"
                />
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                {[
                  { value: '200+', label: 'Features' },
                  { value: '4', label: 'User Roles' },
                  { value: '10+', label: 'Integrations' },
                ].map((stat, index) => (
                  <div
                    key={stat.label}
                    className="group cursor-pointer"
                    style={{
                      animationDelay: isVisible ? `${300 + index * 100}ms` : '0ms',
                    }}
                  >
                    <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-400/20 group-hover:border-blue-500/50 transition-all duration-300 group-hover:scale-105">
                      <div className="text-3xl font-bold text-blue-400 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide group-hover:text-gray-300 transition-colors">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Core Features Journey */}
        <div
          className={`relative flex flex-col md:flex-row gap-8 mb-16 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Timeline Dot - Centered on border */}
          <div className="absolute w-4 h-4 rounded-full bg-blue-500 border-4 border-gray-900 z-10 hidden md:block shadow-lg shadow-blue-500/50" style={{ left: '-6px' }} />
          
          <div className="md:ml-20 flex-1">
            <div className="flex flex-col gap-6">
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-800/50 flex items-center justify-center border border-gray-400/20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-400"
                    >
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                      <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl tracking-wide text-white transition-colors">
                    Core Learning Experience
                  </h3>
                </div>
                <p className="text-gray-400 leading-relaxed mb-6">
                  The foundation of EduPeak is built around creating an intuitive and engaging learning experience. Students can browse courses, track progress, complete assignments, and earn achievements.
                </p>
              </div>

              {/* Feature Image */}
              <div
                className="relative w-full md:w-[calc(100%+1.5rem)] md:-mr-6 h-auto rounded-xl overflow-hidden group border-2 border-gray-400/30 hover:border-blue-500/50 transition-all duration-300 bg-gray-900/50 cursor-pointer"
                onClick={() => handleImageClick('/images/course-layout-progress-tracking.png')}
              >
                <Image
                  src="/images/course-layout-progress-tracking.png"
                  alt="Course Dashboard & Progress Tracking"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="100vw"
                />
              </div>

              {/* Interactive Feature Tags */}
              <div className="grid grid-cols-2 gap-3 mt-2">
                {[
                  'Course Management',
                  'Progress Tracking',
                  'Assignment System',
                  'Interactive Quizzes',
                  'Certificate Generation',
                  'Badges & Gamification',
                ].map((feature, index) => (
                  <div
                    key={feature}
                    onMouseEnter={() => setHoveredFeature(feature)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    className={`bg-gray-800/20 rounded-lg px-4 py-2.5 border border-gray-400/10 text-sm text-gray-300 cursor-pointer transition-all duration-300 ${
                      hoveredFeature === feature
                        ? 'bg-blue-500/10 border-blue-500/50 text-blue-300 scale-105'
                        : 'hover:bg-gray-800/30 hover:border-gray-400/20'
                    }`}
                    style={{
                      animationDelay: isVisible ? `${400 + index * 50}ms` : '0ms',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`transition-transform duration-300 ${hoveredFeature === feature ? 'scale-125' : ''}`}>
                        ✓
                      </span>
                      <span>{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Features Journey */}
        <div
          className={`relative flex flex-col md:flex-row gap-8 mb-16 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Timeline Dot - Centered on border */}
          <div className="absolute w-4 h-4 rounded-full bg-blue-500 border-4 border-gray-900 z-10 hidden md:block shadow-lg shadow-blue-500/50" style={{ left: '-6px' }} />
          
          <div className="md:ml-20 flex-1">
            <div className="flex flex-col gap-6">
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-800/50 flex items-center justify-center border border-gray-400/20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-400"
                    >
                      <path d="M3 3v18h18"></path>
                      <path d="M18 7c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"></path>
                      <path d="M12 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"></path>
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl tracking-wide text-white transition-colors">
                    Advanced Capabilities
                  </h3>
                </div>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Beyond the basics, EduPeak includes powerful analytics, payment processing, live support, and comprehensive admin tools to manage every aspect of the learning platform.
                </p>
              </div>

              {/* Feature Image */}
              <div
                className="relative w-full md:w-[calc(100%+1.5rem)] md:-mr-6 h-auto rounded-xl overflow-hidden group border-2 border-gray-400/30 hover:border-blue-500/50 transition-all duration-300 bg-gray-900/50 cursor-pointer"
                onClick={() => handleImageClick('/images/admin-analytics-dashbord.png')}
              >
                <Image
                  src="/images/admin-analytics-dashbord.png"
                  alt="Analytics & Reporting Dashboard"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="100vw"
                />
              </div>

              {/* Interactive Feature Tags */}
              <div className="grid grid-cols-2 gap-3 mt-2">
                {[
                  'Real-time Analytics',
                  'Stripe Payments',
                  'Live Support Calls',
                  'Blog System',
                  'Announcements',
                  'Multi-tenant Workspaces',
                ].map((feature, index) => (
                  <div
                    key={feature}
                    onMouseEnter={() => setHoveredFeature(feature)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    className={`bg-gray-800/20 rounded-lg px-4 py-2.5 border border-gray-400/10 text-sm text-gray-300 cursor-pointer transition-all duration-300 ${
                      hoveredFeature === feature
                        ? 'bg-blue-500/10 border-blue-500/50 text-blue-300 scale-105'
                        : 'hover:bg-gray-800/30 hover:border-gray-400/20'
                    }`}
                    style={{
                      animationDelay: isVisible ? `${500 + index * 50}ms` : '0ms',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`transition-transform duration-300 ${hoveredFeature === feature ? 'scale-125' : ''}`}>
                        ✓
                      </span>
                      <span>{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack Journey */}
        <div
          className={`relative flex flex-col md:flex-row gap-8 mb-16 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Timeline Dot - Centered on border */}
          <div className="absolute w-4 h-4 rounded-full bg-blue-500 border-4 border-gray-900 z-10 hidden md:block shadow-lg shadow-blue-500/50" style={{ left: '-6px' }} />
          
          <div className="md:ml-20 flex-1">
            <div className="flex flex-col gap-6">
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-800/50 flex items-center justify-center border border-gray-400/20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-400"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                      <path d="M2 17l10 5 10-5"></path>
                      <path d="M2 12l10 5 10-5"></path>
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl tracking-wide text-white transition-colors">
                    Built with Modern Technology
                  </h3>
                </div>
                <p className="text-gray-400 leading-relaxed mb-6">
                  EduPeak leverages cutting-edge technologies to deliver a fast, secure, and scalable learning platform.
                </p>
              </div>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-3">
                {[
                  'Next.js 15',
                  'React 19',
                  'TypeScript',
                  'PostgreSQL',
                  'Prisma',
                  'NextAuth',
                  'Stripe',
                  'AWS S3',
                  'Stream.io',
                  'Tailwind CSS',
                  'Radix UI',
                  'TipTap',
                ].map((tech, index) => (
                  <div
                    key={tech}
                    className={`flex h-9 items-center justify-center gap-1.5 px-5 rounded-full bg-gray-800/30 text-gray-300 border border-gray-400/20 transition-all duration-300 hover:scale-110 hover:border-blue-500/50 hover:text-blue-300 cursor-pointer ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-5'
                    }`}
                    style={{
                      transitionDelay: isVisible ? `${600 + index * 50}ms` : '0ms',
                    }}
                  >
                    <p className="text-xs whitespace-nowrap font-medium">{tech}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project Highlights Journey */}
        <div
          className={`relative flex flex-col md:flex-row gap-8 mb-12 transition-all duration-700 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Timeline Dot - Centered on border */}
          <div className="absolute w-4 h-4 rounded-full bg-blue-500 border-4 border-gray-900 z-10 hidden md:block shadow-lg shadow-blue-500/50" style={{ left: '-6px' }} />
          
          <div className="md:ml-20 flex-1">
            <div className="flex flex-col gap-6">
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-800/50 flex items-center justify-center border border-gray-400/20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-400"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl tracking-wide text-white transition-colors">
                    Project Highlights
                  </h3>
                </div>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Explore the comprehensive feature set and see how EduPeak transforms online education.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 w-full flex-wrap">
                {projectConfig?.liveDemoLink && (
                  <Link
                    href={projectConfig.liveDemoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-gray-800/30 hover:bg-gray-800/50 uppercase text-xs transition-all hover:text-blue-400 rounded-full font-bold text-white flex items-center justify-center px-8 py-4 gap-2 transform hover:scale-105 active:scale-95 border border-gray-400/20 hover:border-blue-500/50"
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
                      className="transition-transform duration-300 group-hover:scale-110"
                    >
                      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                      <path d="M3.6 9h16.8"></path>
                      <path d="M3.6 15h16.8"></path>
                      <path d="M11.5 3a17 17 0 0 0 0 18"></path>
                      <path d="M12.5 3a17 17 0 0 1 0 18"></path>
                    </svg>
                    <span>Live Demo</span>
                  </Link>
                )}
                
                {projectConfig?.showCodeLink && projectConfig?.codeLink ? (
                  <Link
                    href={projectConfig.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-gray-800/30 hover:bg-gray-800/50 uppercase text-xs transition-all hover:text-white rounded-full font-bold text-white flex items-center justify-center px-8 py-4 gap-2 transform hover:scale-105 active:scale-95 border border-gray-400/20 hover:border-gray-500/50"
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
                      className="transition-transform duration-300 group-hover:scale-110"
                    >
                      <path d="M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z"></path>
                    </svg>
                    <span>GitHub</span>
                  </Link>
                ) : projectConfig?.codeLink ? (
                  <div className="group relative bg-gray-800/30 uppercase text-xs rounded-full font-bold text-gray-400 flex items-center justify-center px-8 py-4 gap-2 border border-gray-500/30 cursor-not-allowed">
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
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    <span>Private Repo</span>
                  </div>
                ) : null}
                
                <Link
                  href="/projects/edupeak"
                  onClick={(e) => {
                    // Scroll to top of projects section when clicking "View Full Journey"
                    e.preventDefault();
                    const projectsSection = document.getElementById('projects');
                    if (projectsSection) {
                      // Scroll to top of projects section smoothly
                      projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      // Navigate after scroll animation completes
                      setTimeout(() => {
                        window.location.href = '/projects/edupeak';
                      }, 300);
                    } else {
                      window.location.href = '/projects/edupeak';
                    }
                  }}
                  className="group relative bg-gray-800/30 hover:bg-gray-800/50 uppercase text-xs transition-all hover:text-blue-400 rounded-full font-bold text-white flex items-center justify-center px-8 py-4 gap-2 transform hover:scale-105 active:scale-95 border border-gray-400/20 hover:border-blue-500/50"
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
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6"></path>
                    <path d="M11 13l9 -9"></path>
                    <path d="M15 4h5v5"></path>
                  </svg>
                  <span>View Full Journey</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
