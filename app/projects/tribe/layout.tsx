import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TRIBE - Community App',
  description: 'TRIBE is a community-driven app that lets users create and join communities, share posts, engage with likes and comments, and chat in real time. Built with React, TypeScript, Tailwind CSS, PocketBase, and TanStack Router.',
  keywords: [
    'TRIBE',
    'Community App',
    'Social Network',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'PocketBase',
    'TanStack Router',
    'Real-time Chat',
    'Community Platform'
  ],
  openGraph: {
    title: 'TRIBE - Community App | Sohag Hossain',
    description: 'A community-driven app that lets users create and join communities, share posts, engage with likes and comments, and chat in real time.',
    url: 'https://www.sohagdev.com/projects/tribe',
    images: ['/images/hero_section.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TRIBE - Community App',
    description: 'A community-driven app that lets users create and join communities, share posts, engage with likes and comments, and chat in real time.',
    images: ['/images/hero_section.png'],
  },
  alternates: {
    canonical: 'https://www.sohagdev.com/projects/tribe',
  },
};

export default function TribeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

