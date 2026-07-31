import React from "react";
import Link from "next/link";
import { NewsPost, resolveLocalized } from "@/content/news";
import { ArrowRight } from "lucide-react";

interface BlogCardProps {
  post: NewsPost;
  locale: string;
}

export function BlogCard({ post, locale }: BlogCardProps) {
  const title = resolveLocalized(post.title, locale);
  const rawExcerpt = resolveLocalized(post.teaser || post.excerpt, locale);
  const excerpt = rawExcerpt.length > 120 ? rawExcerpt.substring(0, 117) + "..." : rawExcerpt;
  const tag = post.tag || post.category;

  return (
    <Link
      href={`/${locale}/news/${post.slug}`}
      className="group relative flex flex-col justify-between h-full bg-card hover:bg-card-tint border border-card-border hover:border-primary transition-all duration-300 rounded-[24px] p-8 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-diffuse hover:shadow-lift"
    >
      <div className="flex flex-col gap-5">
        {/* Meta Info */}
        <div className="flex items-center gap-3 text-small text-muted-foreground font-semibold">
          <time dateTime={post.date}>{post.date}</time>
          {tag && (
            <>
              <span className="w-1 h-1 rounded-full bg-card-border" />
              <span className="text-primary">{tag}</span>
            </>
          )}
        </div>

        {/* Content */}
        <div>
          <div className="font-heading font-extrabold text-[22px] leading-[1.25] tracking-tight text-foreground group-hover:text-primary transition-colors mb-3 line-clamp-3">
            {title}
          </div>
          <p className="text-body text-muted-foreground line-clamp-3 leading-relaxed">
            {excerpt}
          </p>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-2 text-primary font-bold text-small tracking-wide">
        <span>{locale === 'de' ? `Fachartikel lesen` : locale === 'ar' ? `اقرأ المقال` : `Read article`}</span>
        <span className="sr-only"> - {title}</span>
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
