import type { Metadata } from 'next';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
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
      <div className="h-full w-full mx-auto max-w-[60.5rem] px-6">
        <main className="w-full min-h-screen h-full pb-10">
          <section id="tech-stack" aria-label="Technology stack">
            <TechStack />
          </section>
          <section id="work-experience" aria-label="Work experience">
            <WorkExperience />
          </section>
          <section aria-label="Modern web capabilities">
            <ModernWebCapabilities />
          </section>
          <section id="projects" aria-label="Projects">
            <Projects />
          </section>
          <section id="contact" aria-label="Contact information">
            <Contact />
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
