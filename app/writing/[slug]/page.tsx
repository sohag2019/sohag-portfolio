import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReadingProgress from '@/components/writing/ReadingProgress';
import TableOfContents from '@/components/writing/TableOfContents';
import ShareBar from '@/components/writing/ShareBar';
import { mdxComponents } from '@/components/writing/mdx-components';
import { getAllWritingSlugs, getWritingBySlug, getRelatedWriting } from '@/lib/writing';
import { extractHeadings } from '@/lib/headings';

const SITE_URL = 'https://www.sohagdev.com';

function fmtDate(iso?: string) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  } catch {
    return '';
  }
}

export async function generateStaticParams() {
  return getAllWritingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getWritingBySlug(slug);
  if (!post) return {};

  const url = `${SITE_URL}/writing/${post.slug}`;
  const images = post.coverImage ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }] : undefined;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: 'article',
      publishedTime: post.publishedAt,
      tags: post.tags,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function WritingPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getWritingBySlug(slug);
  if (!post) notFound();

  const [{ content }, related] = await Promise.all([
    compileMDX({
      source: post.content,
      components: mdxComponents,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }],
            [rehypePrettyCode, { theme: 'github-dark', keepBackground: false }],
          ],
        },
      },
    }),
    getRelatedWriting(post),
  ]);

  const headings = extractHeadings(post.content);
  const url = `${SITE_URL}/writing/${post.slug}`;

  return (
    <>
      <Header />
      <ReadingProgress />
      <main style={{ paddingTop: 40 }}>
        <article className="py-12">
          <div className="nav-container">
            {/* Meta / hero */}
            <div className="article-hero">
              <Link href="/writing" className="article-back">
                ← All writing
              </Link>

              <div className="article-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="article-tag">{tag}</span>
                ))}
                {post.trending && <span className="article-tag article-tag-trending">✦ Trending</span>}
              </div>

              <h1 className="article-title">{post.title}</h1>
              <p className="article-excerpt">{post.excerpt}</p>

              <div className="article-meta-row">
                <span>{fmtDate(post.publishedAt)}</span>
                <span className="wcard-dot" />
                <span>{post.readingMinutes} min read</span>
              </div>

              <ShareBar title={post.title} url={url} />
            </div>

            {post.coverImage && (
              <div className="article-cover">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.coverImage} alt="" />
              </div>
            )}

            {/* Content + TOC */}
            <div className="article-layout">
              <div className="mdx-content">{content}</div>
              <TableOfContents headings={headings} />
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="article-related">
                <span className="article-related-label">More from Writing</span>
                <div className="article-related-grid">
                  {related.map((p) => (
                    <Link key={p.slug} href={`/writing/${p.slug}`} className="article-related-card">
                      <span className="article-related-tag">{p.tags[0] ?? 'Writing'}</span>
                      <span className="article-related-title">{p.title}</span>
                      <span className="article-related-arrow">Read →</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
