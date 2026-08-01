interface YouTubeProps {
  id: string;
  title?: string;
  caption?: string;
}

export default function YouTube({ id, title = 'Embedded video', caption }: YouTubeProps) {
  return (
    <figure className="mdx-media">
      <div className="mdx-video-wrap">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
