/**
 * Images in MDX content vary wildly in intrinsic size, so we render a plain
 * lazy-loaded <img> (styled to fill the column width) instead of next/image,
 * which needs known dimensions up front. Alt text doubles as a caption.
 */
export function MdxImage({ alt, ...props }: React.ComponentPropsWithoutRef<'img'>) {
  return (
    <figure className="mdx-media">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt={alt ?? ''} loading="lazy" {...props} />
      {alt ? <figcaption>{alt}</figcaption> : null}
    </figure>
  );
}
