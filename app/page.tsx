import type { Metadata } from 'next';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Snapshot from '@/components/Snapshot';
import LiveStatusStrip from '@/components/LiveStatusStrip';
import Currently from '@/components/Currently';
import WritingSection from '@/components/WritingSection';
import TechStack from '@/components/TechStack';
import WorkExperience from '@/components/WorkExperience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SectionTracker from '@/components/SectionTracker';
import Reveal from '@/components/Reveal';
import {
  getStatus,
  getWork,
  getProjects,
  getStackStats,
  getHero,
  getCurrently,
  getContact,
} from '@/lib/data';
import { getWriting } from '@/lib/writing';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Sohag Hossain — Full Stack Developer with 4+ years experience building React, Next.js, Node.js, and cloud products. View experience, projects, and get in touch.',
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
  ],
  openGraph: {
    title: 'Sohag Hossain — Full Stack Developer',
    description:
      'Full Stack Developer with 4+ years experience. React, Next.js, Node.js, PostgreSQL, and cloud infrastructure.',
    url: 'https://www.sohagdev.com',
    siteName: 'Sohag Hossain',
    images: [
      {
        url: '/images/hero_section.png',
        width: 1200,
        height: 630,
        alt: 'Sohag Hossain - Full Stack Developer',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sohag Hossain — Full Stack Developer',
    description:
      'Full Stack Developer with 4+ years experience. React, Next.js, Node.js, and cloud infrastructure.',
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

export default async function Home() {
  const [status, work, projects, stack, writing, hero, currently, contact] = await Promise.all([
    getStatus(),
    getWork(),
    getProjects(),
    getStackStats(),
    getWriting(),
    getHero(),
    getCurrently(),
    getContact(),
  ]);

  return (
    <>
      <Header />
      <SectionTracker
        sections={['overview', 'experience', 'projects', 'stack', 'writing', 'connect']}
      />

      {/* 1. Identity — who / role / years / CTAs (recruiter first 3s) */}
      <section aria-label="Hero section" data-track="overview">
        <Hero content={hero} resumeUrl={contact.resumeUrl} />
        <LiveStatusStrip status={status} />
      </section>

      {/* 2. Quick personal facts */}
      <Snapshot />

      {/* 3. Experience — credibility next */}
      <section
        id="experience"
        aria-label="Work experience"
        data-track="experience"
        style={{ scrollMarginTop: 80 }}
      >
        <Reveal>
          <div data-reveal>
            <WorkExperience entries={work} />
          </div>
        </Reveal>
      </section>

      {/* 4. Projects — proof of work */}
      <section
        id="projects"
        aria-label="Projects"
        data-track="projects"
        style={{ scrollMarginTop: 80 }}
      >
        <Reveal>
          <div data-reveal>
            <Projects items={projects} />
          </div>
        </Reveal>
      </section>

      {/* 5. Stack — skills */}
      <section
        id="stack"
        aria-label="Technology stack"
        data-track="stack"
        style={{ scrollMarginTop: 80 }}
      >
        <Reveal>
          <div data-reveal>
            <TechStack stats={stack} />
          </div>
        </Reveal>
      </section>

      {/* 6. Currently — professional focus (not informal filler) */}
      <section aria-label="Currently working on">
        <Reveal>
          <div data-reveal>
            <Currently content={currently} />
          </div>
        </Reveal>
      </section>

      {/* 7. Writing — secondary depth */}
      <section aria-label="Writing" data-track="writing">
        <Reveal>
          <div data-reveal>
            <WritingSection posts={writing} />
          </div>
        </Reveal>
      </section>

      {/* 8. Contact */}
      <section
        id="connect"
        aria-label="Contact information"
        data-track="connect"
        style={{ scrollMarginTop: 80 }}
      >
        <Reveal>
          <div data-reveal>
            <Contact content={contact} />
          </div>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
