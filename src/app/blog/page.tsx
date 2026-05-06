import type { Metadata } from 'next';
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
    url: 'https://naveenda.live/blog',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <section className="px-8 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Blog <span className="bg-teal-800 w-4 h-4 rounded-full inline-block" />
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                Writing about machine learning, AI engineering, and career strategy for software engineers.
              </p>
            </div>

            {posts.length === 0 ? (
              <p className="text-gray-500 text-lg">Posts coming soon.</p>
            ) : (
              <div className="space-y-8">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    {post.thumbnail && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-8">
                      <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
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
                      <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-teal-800 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 leading-relaxed mb-4">{post.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
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
