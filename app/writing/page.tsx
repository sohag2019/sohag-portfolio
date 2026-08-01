import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WritingExplorer from '@/components/writing/WritingExplorer';
import { getWriting, getAllWritingTags } from '@/lib/writing';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Notes on architecture, full-stack engineering, and the decisions behind what I build.',
  openGraph: {
    title: 'Writing — Sohag Hossain',
    description:
      'Notes on architecture, full-stack engineering, and the decisions behind what I build.',
    type: 'website',
  },
};

export default async function WritingIndexPage() {
  const [posts, tags] = await Promise.all([getWriting(), getAllWritingTags()]);

  return (
    <>
      <Header />
      <main style={{ paddingTop: 40 }}>
        <section className="py-16">
          <div className="nav-container">
            <div className="flex flex-col gap-1 mb-4">
              <span
                className="font-mono text-[11px] tracking-[0.08em] uppercase"
                style={{ color: 'var(--muted)', opacity: 0.5 }}
              >
                / Writing
              </span>
              <h1
                className="font-medium m-0"
                style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
              >
                Notes from the archive
              </h1>
            </div>
            <p
              className="max-w-[560px] mb-14"
              style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--muted)' }}
            >
              Architecture, full-stack engineering, and the reasoning behind the
              decisions — written the way I&apos;d explain them to another engineer.
            </p>

            <WritingExplorer posts={posts} tags={tags} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
