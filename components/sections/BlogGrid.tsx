import React from "react";
import { NewsPost } from "@/content/news";
import { BlogCard } from "@/components/ui/BlogCard";
import { Reveal } from "@/components/ui/Reveal";

interface BlogGridProps {
  posts: NewsPost[];
  locale: string;
}

export function BlogGrid({ posts, locale }: BlogGridProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-12 lg:py-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.05}>
              <BlogCard post={post} locale={locale} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
