import { MetadataRoute } from 'next';
import { getWriting } from '@/lib/writing';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.sohagdev.com';
  const now = new Date();
  const posts = await getWriting();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects/edupeak`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects/tribe`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/writing`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${baseUrl}/writing/${post.slug}`,
      lastModified: post.updatedAt ?? post.publishedAt ?? now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}

