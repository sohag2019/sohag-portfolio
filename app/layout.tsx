import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sohagdev.com'),
  title: {
    default: "Sohag Hossain - Full Stack Developer",
    template: "%s | Sohag Hossain"
  },
  description: "Full Stack Developer crafting exceptional digital experiences with modern web technologies. Specialized in React, Next.js, TypeScript, Node.js, and cloud technologies.",
  keywords: [
    "Sohag Hossain",
    "Full Stack Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Portfolio",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Web Development",
    "JavaScript Developer"
  ],
  authors: [{ name: "Sohag Hossain" }],
  creator: "Sohag Hossain",
  publisher: "Sohag Hossain",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.sohagdev.com",
    siteName: "Sohag Hossain - Portfolio",
    title: "Sohag Hossain - Full Stack Developer",
    description: "Full Stack Developer crafting exceptional digital experiences with modern web technologies. Specialized in React, Next.js, TypeScript, Node.js, and cloud technologies.",
    images: [
      {
        url: "/images/hero_section.png",
        width: 1200,
        height: 630,
        alt: "Sohag Hossain - Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sohag Hossain - Full Stack Developer",
    description: "Full Stack Developer crafting exceptional digital experiences with modern web technologies.",
    creator: "@sohagmia360",
    images: ["/images/hero_section.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  alternates: {
    canonical: "https://www.sohagdev.com",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sohag Hossain",
    "jobTitle": "Full Stack Developer",
    "url": "https://www.sohagdev.com",
    "sameAs": [
      "https://github.com/sohagzayan",
      "https://www.linkedin.com/in/sohagzayan/",
      "https://twitter.com/sohagmia360"
    ],
    "email": "sohgdev2019@gmail.com",
    "knowsAbout": [
      "Web Development",
      "Full Stack Development",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "JavaScript",
      "PostgreSQL",
      "AWS",
      "Docker",
      "Kubernetes"
    ],
    "description": "Full Stack Developer crafting exceptional digital experiences with modern web technologies."
  };

  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-white min-h-screen`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
