'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function EduPeakProjectPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const journeyContainerRef = useRef<HTMLDivElement>(null);

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

  // Scroll-based animation for border
  useEffect(() => {
    const handleScroll = () => {
      if (!journeyContainerRef.current) return;

      const container = journeyContainerRef.current;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerHeight = rect.height;
      
      // Calculate scroll progress (0 to 1)
      const containerTop = rect.top;
      const containerBottom = rect.bottom;
      
      let progress = 0;
      
      // Only calculate if container is in or near viewport
      if (containerBottom > 0 && containerTop < windowHeight) {
        // Calculate how much of the container has been scrolled through
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
  const featureCategories = [
    {
      title: 'Course Management',
      features: [
        'Course Creation & Editing',
        'Chapter Management with Drag & Drop',
        'Lesson Management',
        'Scheduled Publishing',
        'Course Levels (Beginner, Intermediate, Advanced)',
        'Course Status (Draft, Published, Archived)',
        'Rich Text Descriptions',
        'Video Upload & Storage',
      ],
      image: '/images/admin-course-basic-info-ui.png',
    },
    {
      title: 'Student Features',
      features: [
        'Course Enrollment & Purchase',
        'Progress Tracking',
        'Assignment Submissions',
        'Interactive Quizzes',
        'Certificate Generation',
        'Badge System (6 Types)',
        'Points System',
        'Wishlist Management',
        'Activity Timeline',
        'Student Dashboard',
      ],
      image: '/images/course-layout-progress-tracking.png',
    },
    {
      title: 'Teacher/Admin Features',
      features: [
        'Course Analytics',
        'Student Management',
        'Assignment Grading',
        'Withdrawal Management',
        'Help Request Handling',
        'Announcement Creation',
        'Review Moderation',
        'Application Review System',
      ],
      image: '/images/admin-student-management-ui.png',
    },
    {
      title: 'Payment & Subscriptions',
      features: [
        'Stripe Integration',
        'Subscription Plans (Personal, Team, Enterprise)',
        'Monthly & Yearly Billing',
        'Coupon System',
        'Invoice Generation',
        'Order History',
        'Payment Transactions',
        'Withdrawal System',
      ],
      image: '/images/admin-subscription-management-ui.png',
    },
    {
      title: 'Analytics & Reporting',
      features: [
        'Dashboard Statistics',
        'Enrollment Analytics',
        'Course Performance Metrics',
        'Financial Analytics',
        'Engagement Analytics',
        'Learning Time Tracking',
        'Search Analytics',
        'Content Audit',
      ],
      image: '/images/admin-analytics-dashbord.png',
    },
    {
      title: 'Communication & Engagement',
      features: [
        'Blog System with Rich Editor',
        'Comment Threading',
        'Reactions System',
        'Announcements',
        'Live Support Calls (Stream.io)',
        'Help Request System',
        'Notifications',
        'Real-time Chat',
      ],
      image: '/images/admin-support-sessions-ui.png',
    },
    {
      title: 'Course Structure',
      features: [
        'Drag & Drop Organization',
        'Chapter Management',
        'Lesson Sequencing',
        'Course Curriculum Display',
      ],
      image: '/images/admin-course-stacturre-ui.png',
    },
    {
      title: 'Assignment Management',
      features: [
        'Assignment Creation',
        'File Submissions',
        'Grading System',
        'Feedback System',
        'Submission Tracking',
      ],
      image: '/images/admin-course-assinment-submission-ui.png',
    },
  ];

  const techStack = [
    { name: 'Next.js 15.3.8', category: 'Framework' },
    { name: 'React 19.0.0', category: 'Library' },
    { name: 'TypeScript 5.0', category: 'Language' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Prisma 6.8.2', category: 'ORM' },
    { name: 'NextAuth.js 5.0', category: 'Authentication' },
    { name: 'Tailwind CSS 4', category: 'Styling' },
    { name: 'Radix UI', category: 'Components' },
    { name: 'Stripe', category: 'Payments' },
    { name: 'AWS S3 / Tigris', category: 'Storage' },
    { name: 'Stream.io', category: 'Video Calls' },
    { name: 'Brevo / Resend', category: 'Email' },
    { name: 'Arcjet', category: 'Rate Limiting' },
    { name: 'TipTap', category: 'Rich Text Editor' },
    { name: 'TanStack Table', category: 'Data Tables' },
    { name: 'Framer Motion', category: 'Animations' },
  ];

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
                alt="Full screen image"
                fill
                className="object-contain rounded-2xl"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      )}

      <Header />
      <div className="h-full w-full mx-auto max-w-[60.5rem] px-6">
        <main className="flex flex-col w-full min-h-screen h-full pt-24">
          {/* Header Section */}
          <div className="w-full flex items-center justify-between gap-5 mb-10 max-md:flex-col max-md:items-start">
            <div>
              <h1 className="font-bold text-2xl tracking-widest text-white mb-2">
                EduPeak LMS
              </h1>
              <p className="text-blue-400 text-sm font-medium">
                Learning Management System • Version 0.1.0
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm text-white max-sm:flex-col max-sm:w-full">
              <Link
                href="https://knowledge-share-eta.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 bg-gray-400/10 max-sm:w-full max-sm:justify-center rounded-full py-2 px-6 hover:bg-blue-600/20 hover:text-blue-400 transition-all"
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
                  <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                  <path d="M3.6 9h16.8"></path>
                  <path d="M3.6 15h16.8"></path>
                  <path d="M11.5 3a17 17 0 0 0 0 18"></path>
                  <path d="M12.5 3a17 17 0 0 1 0 18"></path>
                </svg>
                Live Demo
              </Link>
              <Link
                href="https://github.com/sohagdev2019/knowledge-share.git"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 bg-gray-400/10 max-sm:w-full max-sm:justify-center rounded-full py-2 px-6 hover:bg-gray-700/20 hover:text-white transition-all"
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
                  <path d="M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z"></path>
                </svg>
                Source Code
              </Link>
            </div>
          </div>

          {/* Project Overview */}
          <div className="mb-16">
            <p className="text-gray-400 leading-relaxed text-lg mb-8">
              <span className="text-white font-semibold">EduPeak LMS</span> is a comprehensive Learning Management System with{' '}
              <span className="text-white font-semibold">200+ features</span> designed to deliver an exceptional educational experience. 
              From course creation to analytics, payments to gamification, EduPeak provides everything needed for modern online learning.
            </p>

            {/* Hero Image */}
            <div
              className="relative w-full h-auto rounded-xl overflow-hidden mb-8 border-2 border-gray-400/30 hover:border-blue-500/50 transition-all duration-300 bg-gray-900/50 cursor-pointer"
              onClick={() => handleImageClick('/images/hero_section.png')}
            >
              <Image
                src="/images/hero_section.png"
                alt="EduPeak LMS Hero Section"
                width={1200}
                height={800}
                className="w-full h-auto object-contain rounded-xl"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2 max-sm:grid-cols-2">
              <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-400/20 text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">200+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Features</div>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-400/20 text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">4</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">User Roles</div>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-400/20 text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">10+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Integrations</div>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-400/20 text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">16</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Tech Stack</div>
              </div>
            </div>
          </div>

          {/* Feature Categories Journey */}
          <div ref={journeyContainerRef} className="mb-16 relative">
            <h2 className="font-bold text-xl tracking-widest text-white mb-8 uppercase pl-6 border-l-4 border-blue-500">
              Feature Journey
            </h2>

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

            <div className="space-y-16">
              {featureCategories.map((category, index) => (
                <div key={category.title} className="relative">
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Timeline Dot - Centered on border */}
                    <div className="absolute w-4 h-4 rounded-full bg-blue-500 border-4 border-gray-900 z-10 hidden md:block shadow-lg shadow-blue-500/50" style={{ left: '-6px' }} />

                    <div className="md:ml-20 flex-1">
                      <div className="flex flex-col gap-6">
                        <div>
                          <h3 className="font-bold text-xl tracking-wide text-white mb-3">
                            {category.title}
                          </h3>
                          <ul className="text-gray-400 space-y-2">
                            {category.features.map((feature) => (
                              <li key={feature} className="flex items-start gap-2">
                                <span className="text-blue-400 mt-1">✓</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Feature Image */}
                        <div
                          className="relative w-full h-auto rounded-xl overflow-hidden mt-4 border-2 border-gray-400/30 hover:border-blue-500/50 transition-all duration-300 bg-gray-900/50 cursor-pointer"
                          onClick={() => handleImageClick(category.image)}
                        >
                          <Image
                            src={category.image}
                            alt={category.title}
                            width={1200}
                            height={800}
                            className="w-full h-auto object-contain rounded-xl"
                            sizes="(max-width: 768px) 100vw, 800px"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack */}
          <div className="mb-16">
            <h2 className="font-bold text-xl tracking-widest text-white mb-8 uppercase">
              Technology Stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="bg-gray-800/30 rounded-lg p-4 border border-gray-400/20 hover:border-blue-500/50 transition-all"
                >
                  <div className="text-white font-medium mb-1">{tech.name}</div>
                  <div className="text-xs text-gray-400">{tech.category}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Highlights */}
          <div className="mb-16">
            <h2 className="font-bold text-xl tracking-widest text-white mb-8 uppercase">
              Additional Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/20 rounded-lg p-6 border border-gray-400/20">
                <h3 className="font-semibold text-white mb-3">Security Features</h3>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Rate limiting with Arcjet</li>
                  <li>• Authentication middleware</li>
                  <li>• Session security</li>
                  <li>• CSRF protection</li>
                  <li>• Error logging & tracking</li>
                </ul>
              </div>
              <div className="bg-gray-800/20 rounded-lg p-6 border border-gray-400/20">
                <h3 className="font-semibold text-white mb-3">Performance Features</h3>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Server-side rendering</li>
                  <li>• Image optimization</li>
                  <li>• Code splitting</li>
                  <li>• Lazy loading</li>
                  <li>• Database indexing</li>
                </ul>
              </div>
              <div className="bg-gray-800/20 rounded-lg p-6 border border-gray-400/20">
                <h3 className="font-semibold text-white mb-3">User Roles</h3>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• SuperAdmin - Platform management</li>
                  <li>• Admin - Course & user management</li>
                  <li>• Teacher - Course creation & analytics</li>
                  <li>• Student - Learning & engagement</li>
                </ul>
              </div>
              <div className="bg-gray-800/20 rounded-lg p-6 border border-gray-400/20">
                <h3 className="font-semibold text-white mb-3">Key Integrations</h3>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Stripe - Payment processing</li>
                  <li>• AWS S3 - File storage</li>
                  <li>• Stream.io - Video calls</li>
                  <li>• Brevo/Resend - Email service</li>
                  <li>• NextAuth - Authentication</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

