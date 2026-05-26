import Header from '@/components/Header';
import LabSection from '@/components/LabSection';
import Footer from '@/components/Footer';

export default function LabPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: 40 }}>
        <LabSection />
      </main>
      <Footer />
    </>
  );
}
