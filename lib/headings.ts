import GithubSlugger from 'github-slugger';

export interface Heading {
  id: string;
  text: string;
  level: number;
}

/**
 * Extracts H2/H3 headings from raw MDX source (skipping fenced code blocks),
 * slugging them with the same algorithm rehype-slug uses so the generated
 * ids line up with the compiled heading anchors.
 */
export function extractHeadings(source: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let inCodeBlock = false;

  for (const rawLine of source.split('\n')) {
    const line = rawLine.trim();
    if (line.startsWith('```') || line.startsWith('~~~')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = /^(#{2,3})\s+(.*)$/.exec(line);
    if (!match) continue;

    const level = match[1].length;
    const text = match[2].replace(/[*_`]/g, '').trim();
    if (!text) continue;

    headings.push({ id: slugger.slug(text), text, level });
  }

  return headings;
}
