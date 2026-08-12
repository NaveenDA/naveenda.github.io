"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { BlogPostMeta } from '@/lib/blog';

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail?: string;
  categories: string[];
}

interface Props {
  localPosts?: BlogPostMeta[];
}

const Blogs = ({ localPosts = [] }: Props) => {
  const [mediumPosts, setMediumPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://naveenda.medium.com/feed');
        const data = await response.json();

        const noNeed = ["Div === Span"];
        if (data.status === 'ok') {
          const posts = data.items.map((item: any) => ({
            title: item.title,
            link: item.link,
            pubDate: new Date(item.pubDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            description: item.description,
            thumbnail: item.thumbnail,
            categories: item.categories || []
          }));

          const filtered = posts.filter((post: MediumPost) =>
            !noNeed.some((word) => post.title.includes(word)) && !post.thumbnail
          );
          setMediumPosts(filtered);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const hasPosts = localPosts.length > 0 || mediumPosts.length > 0;

  return (
    <section className="px-6 md:px-10 py-24 md:py-32 bg-secondary/40" id="blogs">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-8 mb-16 flex-wrap">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-ink mb-4">
              Writing
            </p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Notes from the lab.
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-medium underline underline-offset-4 decoration-foreground/30 hover:decoration-gold-ink transition-colors"
          >
            All posts
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto"></div>
          </div>
        ) : !hasPosts ? (
          <p className="text-muted-foreground">Posts coming soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {localPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block h-full border border-border bg-card">
                  {post.thumbnail && (
                    <div className="relative aspect-video overflow-hidden border-b border-border">
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground uppercase tracking-wide">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </time>
                      <span>{post.readingTime} min read</span>
                    </div>
                    <h3 className="font-display text-xl mb-3 group-hover:text-gold-ink transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
                      {post.description}
                    </p>
                    <div className="flex flex-wrap gap-x-2 text-[11px] text-muted-foreground uppercase tracking-wide">
                      {post.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {mediumPosts.map((post, index) => (
              <motion.a
                key={post.link}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (localPosts.length + index) * 0.1 }}
                className="group block border border-border bg-card"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground uppercase tracking-wide">
                    <span>{post.pubDate}</span>
                    <span className="inline-flex items-center gap-1">
                      Medium <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                  <h3 className="font-display text-xl mb-3 group-hover:text-gold-ink transition-colors">
                    {post.title}
                  </h3>
                  <div
                    className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4"
                    dangerouslySetInnerHTML={{ __html: post.description }}
                  />
                  <div className="flex flex-wrap gap-x-2 text-[11px] text-muted-foreground uppercase tracking-wide">
                    {post.categories.map((category) => (
                      <span key={category}>{category}</span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;
