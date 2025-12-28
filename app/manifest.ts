import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sohag Hossain - Full Stack Developer Portfolio',
    short_name: 'Sohag Hossain',
    description: 'Portfolio of Sohag Hossain, a Full Stack Developer specializing in React, Next.js, TypeScript, Node.js, and modern web technologies.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}

