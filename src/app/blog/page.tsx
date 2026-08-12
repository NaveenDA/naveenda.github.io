import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog | Naveen DA',
  description: 'Thoughts on machine learning, AI systems, resume optimization, and software engineering from Naveen DA.',
  openGraph: {
    title: 'Blog | Naveen DA',
    description: 'Thoughts on machine learning, AI systems, resume optimization, and software engineering from Naveen DA.',
    url: 'https://naveenda.github.io/blog',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="px-6 md:px-10 py-20 md:py-28">
          <div className="max-w-3xl mx-auto">
            <div className="mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-ink mb-4">
                Writing
              </p>
              <h1 className="font-display text-5xl md:text-6xl mb-6">
                Blog
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Machine learning, AI engineering, and career strategy for software engineers.
              </p>
            </div>

            {posts.length === 0 ? (
              <p className="text-muted-foreground text-lg">Posts coming soon.</p>
            ) : (
              <div className="border-t border-border">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col md:flex-row gap-6 py-10 border-b border-border hover:bg-secondary/40 transition-colors -mx-4 px-4"
                  >
                    {post.thumbnail && (
                      <div className="relative w-full md:w-56 aspect-video shrink-0 overflow-hidden border border-border">
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase tracking-wide mb-3">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                        <span>&middot;</span>
                        <span>{post.readingTime} min read</span>
                      </div>
                      <h2 className="font-display text-2xl mb-3 group-hover:text-gold-ink transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">{post.description}</p>
                      <div className="flex flex-wrap gap-x-2 text-[11px] text-muted-foreground uppercase tracking-wide">
                        {post.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
