import Header from '@/components/Header';
import LifeSection from '@/components/LifeSection';
import Footer from '@/components/Footer';

export default function LifePage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: 40 }}>
        <LifeSection />
      </main>
      <Footer />
    </>
  );
}
