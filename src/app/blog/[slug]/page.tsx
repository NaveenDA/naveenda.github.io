import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { getPostBySlug, getAllSlugs } from '@/lib/blog';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const ogImage = post.thumbnail
    ? `https://naveenda.github.io${post.thumbnail}`
    : 'https://naveenda.github.io/og-image.jpg';

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://naveenda.github.io/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: ['Naveen DA'],
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <article className="px-6 md:px-10 py-20 md:py-28">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-gold-ink transition-colors mb-10"
            >
              &larr; All posts
            </Link>

            <header className="mb-12">
              <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase tracking-wide mb-4">
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
              <h1 className="font-display text-4xl md:text-5xl mb-6 leading-tight">
                {post.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">{post.description}</p>
              <div className="flex flex-wrap gap-x-3 text-[11px] text-muted-foreground uppercase tracking-wide mt-6">
                {post.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </header>

            {post.thumbnail && (
              <div className="relative mb-12 aspect-video border border-border">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            )}

            <div className="prose prose-lg max-w-none prose-headings:font-display prose-a:text-gold-ink prose-a:no-underline hover:prose-a:underline prose-code:bg-secondary prose-code:px-1 prose-code:rounded-none prose-blockquote:border-l-gold">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
