import Header from '@/components/Header';
import WritingSection from '@/components/WritingSection';
import Footer from '@/components/Footer';

export default function WritingPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: 40 }}>
        <WritingSection />
      </main>
      <Footer />
    </>
  );
}
