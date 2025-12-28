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
  openGraph: {
    title: 'Sohag Hossain - Full Stack Developer Portfolio',
    description: 'Portfolio of Sohag Hossain, a Full Stack Developer specializing in React, Next.js, TypeScript, Node.js, and modern web technologies.',
    url: 'https://www.sohagdev.com',
    images: ['/images/hero_section.png'],
  },
  alternates: {
    canonical: 'https://www.sohagdev.com',
  },
};

export default function Home() {
  return (
    <>
      <div className="h-full w-full mx-auto max-w-[60.5rem] px-6">
        <Header />
        <main className="w-full min-h-screen h-full pb-10 pt-24">
          <Hero />
          <TechStack />
          <WorkExperience />
          <ModernWebCapabilities />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
