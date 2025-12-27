import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TechStack from '@/components/TechStack';
import WorkExperience from '@/components/WorkExperience';
import ModernWebCapabilities from '@/components/ModernWebCapabilities';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

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
