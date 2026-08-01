interface VideoProps {
  src: string;
  poster?: string;
  caption?: string;
}

/** For self-hosted / local video files. Use <YouTube id="..." /> for YouTube links. */
export default function Video({ src, poster, caption }: VideoProps) {
  return (
    <figure className="mdx-media">
      <div className="mdx-video-wrap">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video src={src} poster={poster} controls playsInline preload="metadata" />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
