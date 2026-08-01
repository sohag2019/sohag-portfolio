import type { MDXComponents } from 'mdx/types';
import CodeBlock from './CodeBlock';
import { MdxImage } from './MdxImage';
import Video from './Video';
import YouTube from './YouTube';
import Callout from './Callout';

function MdxLink(props: React.ComponentPropsWithoutRef<'a'>) {
  const isExternal = typeof props.href === 'string' && /^https?:\/\//.test(props.href);
  return (
    <a
      {...props}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    />
  );
}

export const mdxComponents: MDXComponents = {
  img: MdxImage,
  pre: CodeBlock,
  a: MdxLink,
  Video,
  YouTube,
  Callout,
};
