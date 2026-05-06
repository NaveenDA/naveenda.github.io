import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
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
    ? `https://naveenda.live${post.thumbnail}`
    : 'https://naveenda.live/og-image.jpg';

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://naveenda.live/blog/${slug}`,
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
      <main className="min-h-screen bg-slate-50">
        <article className="px-8 py-20">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-gray-500 hover:text-teal-800 transition-colors mb-10 cursor-pointer"
            >
              ← All posts
            </Link>

            <header className="mb-12">
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span>·</span>
                <span>{post.readingTime} min read</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">{post.description}</p>
              <div className="flex flex-wrap gap-2 mt-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            {post.thumbnail && (
              <div className="mb-12 rounded-2xl overflow-hidden">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-auto"
                />
              </div>
            )}

            <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-a:text-teal-800 prose-a:no-underline hover:prose-a:underline prose-code:bg-slate-100 prose-code:px-1 prose-code:rounded">
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
