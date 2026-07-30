import React from "react";
import { NewsPost, resolveLocalized } from "@/content/news";
import { Reveal } from "@/components/ui/Reveal";

interface ArticleHeroProps {
  post: NewsPost;
  locale: string;
}

export function ArticleHero({ post, locale }: ArticleHeroProps) {
  const title = resolveLocalized(post.title, locale);
  const teaser = resolveLocalized(post.teaser || post.excerpt, locale);
  const tag = post.tag || post.category || "News";

  return (
    <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24 border-b border-card-border bg-background-subtle">
      <div className="absolute inset-0 bg-[var(--hero-wash)] pointer-events-none opacity-50" />
      <div className="max-w-[800px] mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <Reveal>
          <div className="flex items-center justify-center gap-3 text-small font-bold text-muted-foreground mb-6">
            <span className="text-foreground">K-Aqua</span>
            <span className="w-1 h-1 rounded-full bg-card-border" />
            <time dateTime={post.date}>{post.date}</time>
            <span className="w-1 h-1 rounded-full bg-card-border" />
            <span className="text-primary">{tag}</span>
          </div>
        </Reveal>
        
        <Reveal delay={0.1}>
          <h1 className="text-h1 lg:text-[4rem] font-heading font-extrabold tracking-tight text-foreground leading-[1.1] mb-6 animate-reveal">
            {title}
          </h1>
        </Reveal>
        
        {teaser && (
          <Reveal delay={0.2}>
            <p className="text-lead text-muted-foreground leading-relaxed font-body font-normal">
              {teaser}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
