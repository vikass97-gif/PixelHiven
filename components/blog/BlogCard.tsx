import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import type { BlogPost } from "@/data/blog-posts";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${post.publishedAt}T00:00:00Z`));

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        href={`/blog/${post.slug}`}
        className="flex h-48 items-center justify-center bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700"
        aria-label={`Read ${post.title}`}
      >
        <BookOpen
          className="h-16 w-16 text-white/90 transition duration-300 group-hover:scale-110"
          aria-hidden="true"
        />
      </Link>

      <div className="flex flex-1 flex-col p-7">
        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
          {post.category}
        </span>

        <h2 className="mt-4 text-2xl font-bold leading-tight text-gray-900 transition group-hover:text-indigo-600">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        <p className="mt-4 flex-1 leading-7 text-gray-600">
          {post.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-gray-100 pt-5 text-sm text-gray-500">
          <time dateTime={post.publishedAt}>{formattedDate}</time>

          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {post.readingTime}
          </span>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-5 inline-flex items-center gap-2 font-semibold text-indigo-600 transition hover:text-indigo-700"
        >
          Read article
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
