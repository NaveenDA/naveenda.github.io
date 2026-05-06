import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  thumbnail?: string;
  content: string;
  readingTime: number;
}

export interface BlogPostMeta extends Omit<BlogPost, 'content'> {}

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));

  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    const { data, content } = matter(raw);

    return {
      slug,
      title: data.title ?? '',
      description: data.description ?? '',
      date: data.date ?? '',
      tags: data.tags ?? [],
      thumbnail: data.thumbnail,
      readingTime: estimateReadingTime(content),
    } satisfies BlogPostMeta;
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? '',
    description: data.description ?? '',
    date: data.date ?? '',
    tags: data.tags ?? [],
    thumbnail: data.thumbnail,
    content,
    readingTime: estimateReadingTime(content),
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}
