import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EduPeak LMS - Learning Management System',
  description: 'EduPeak LMS is a comprehensive Learning Management System with 200+ features including course management, analytics, payments, gamification, and more. Built with Next.js 15, React 19, TypeScript, PostgreSQL, and modern technologies.',
  keywords: [
    'EduPeak',
    'LMS',
    'Learning Management System',
    'Online Education',
    'Course Management',
    'Next.js',
    'React',
    'TypeScript',
    'PostgreSQL',
    'Stripe',
    'Educational Technology'
  ],
  openGraph: {
    title: 'EduPeak LMS - Learning Management System | Sohag Hossain',
    description: 'A comprehensive Learning Management System with 200+ features designed to deliver an exceptional educational experience.',
    url: 'https://www.sohagdev.com/projects/edupeak',
    images: ['/images/hero_section.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EduPeak LMS - Learning Management System',
    description: 'A comprehensive Learning Management System with 200+ features designed to deliver an exceptional educational experience.',
    images: ['/images/hero_section.png'],
  },
  alternates: {
    canonical: 'https://www.sohagdev.com/projects/edupeak',
  },
};

export default function EduPeakLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

