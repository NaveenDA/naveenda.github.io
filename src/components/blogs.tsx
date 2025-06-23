"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail?: string;
  categories: string[];
}

const Blogs = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        // Using a CORS proxy to fetch the Medium RSS feed
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://naveenda.medium.com/feed');
        const data = await response.json();
        console.log('Raw API response:', data);
        
        const noNeed = ["Div === Span"]
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
          
          // remove the posts that contains the words in the noNeed array in title and items doesn't have thumbnail§
          const filteredPosts = posts.filter((post: BlogPost) => !noNeed.some((word: string) => post.title.includes(word)) && !post.thumbnail);
          setPosts(filteredPosts);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <section className="min-h-screen bg-slate-50 px-8 py-20" id="blogs">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6">
            Blogs <span className="bg-teal-800 w-4 h-4 rounded-full inline-block" />
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Sharing my thoughts and experiences in machine learning, AI, and technology.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-800 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog posts...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.a
                key={post.link}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {post.thumbnail && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 min-h-[200px]"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">{post.pubDate}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-800 transition-colors">
                    {post.title}
                  </h3>
                  <div 
                    className="text-gray-600 line-clamp-3 mb-4"
                    dangerouslySetInnerHTML={{ __html: post.description }}
                  />
                  <div className="flex items-center text-teal-800 font-medium">
                    Read More
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </div>
                  <div className="">
                    {post.categories.map((category) => (
                      <span key={category} className="inline-block bg-slate-100 text-slate-800  text-xs px-2 py-1 rounded-md mr-2 mt-1">
                        {category}
                      </span>
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