# Writing content

Every file in this folder that ends in `.mdx` becomes a post at `/writing/<filename-without-extension>`. There's no admin panel — add a file, commit, deploy.

## Frontmatter

```yaml
---
title: "Post title"                      # required
excerpt: "One or two sentences."         # required — used on cards + social previews
tags: ["Tag One", "Tag Two"]             # required — powers the tag filter on /writing
coverImage: "/images/my-cover.jpg"       # optional — put the file in /public
publishedAt: "2026-08-01"                # required — controls sort order
updatedAt: "2026-08-02"                  # optional
readingMinutes: 5                        # optional — auto-estimated from word count if omitted
trending: true                           # optional — pins the post + shows a "Trending" badge
status: draft                            # optional — set to "draft" to hide from the public site
slug: custom-url-slug                    # optional — defaults to the filename
---
```

## Available components in the post body

```mdx
<Callout type="note">A neutral note.</Callout>
<Callout type="tip">Something useful.</Callout>
<Callout type="warning">Something to flag.</Callout>

<Video src="/videos/demo.mp4" poster="/images/poster.jpg" caption="Optional caption" />

<YouTube id="dQw4w9WgXcQ" caption="Optional caption" />
```

Standard Markdown (headings, lists, tables, blockquotes, images, code fences with language tags for syntax highlighting) all work as expected. Only `##` and `###` headings show up in the auto-generated table of contents.
