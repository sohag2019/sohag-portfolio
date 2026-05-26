import type { Metadata } from 'next';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Currently from '@/components/Currently';
import SelectedWork from '@/components/SelectedWork';
import LabSection from '@/components/LabSection';
import WritingSection from '@/components/WritingSection';
import LifeSection from '@/components/LifeSection';
import TechStack from '@/components/TechStack';
import WorkExperience from '@/components/WorkExperience';
import ModernWebCapabilities from '@/components/ModernWebCapabilities';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Portfolio of Sohag Hossain, a Full Stack Developer specializing in React, Next.js, TypeScript, Node.js, and modern web technologies. View my projects, work experience, and get in touch.',
  keywords: [
    'Sohag Hossain',
    'Full Stack Developer',
    'Web Developer',
    'React Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'Node.js Developer',
    'Portfolio',
    'Software Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Web Development',
    'JavaScript Developer',
    'Portfolio Website',
    'Developer Portfolio'
  ],
  openGraph: {
    title: 'Sohag Hossain - Full Stack Developer Portfolio',
    description: 'Portfolio of Sohag Hossain, a Full Stack Developer specializing in React, Next.js, TypeScript, Node.js, and modern web technologies.',
    url: 'https://www.sohagdev.com',
    siteName: 'Sohag Hossain - Portfolio',
    images: [
      {
        url: '/images/hero_section.png',
        width: 1200,
        height: 630,
        alt: 'Sohag Hossain - Full Stack Developer Portfolio',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sohag Hossain - Full Stack Developer Portfolio',
    description: 'Portfolio of Sohag Hossain, a Full Stack Developer specializing in React, Next.js, TypeScript, Node.js, and modern web technologies.',
    images: ['/images/hero_section.png'],
    creator: '@sohagmia360',
  },
  alternates: {
    canonical: 'https://www.sohagdev.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <section aria-label="Hero section">
        <Hero />
      </section>
      <section aria-label="Currently working on">
        <Currently />
      </section>
      <section aria-label="Writing">
        <WritingSection />
      </section>
      <section id="stack" aria-label="Technology stack" style={{ scrollMarginTop: 80 }}>
        <TechStack />
      </section>
      <section id="projects" aria-label="Projects" style={{ scrollMarginTop: 80 }}>
        <Projects />
      </section>
      <section id="experience" aria-label="Work experience" style={{ scrollMarginTop: 80 }}>
        <WorkExperience />
      </section>
      <section id="connect" aria-label="Contact information" style={{ scrollMarginTop: 80 }}>
        <Contact />
      </section>
      <Footer />
    </>
  );
}
