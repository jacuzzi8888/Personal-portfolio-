
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { ArrowLeft, Calendar, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getPostBySlug, getAllPosts } from "@/lib/blog"
import { notFound } from "next/navigation"

interface BlogPostPageProps {
    params: Promise<{
        slug: string
    }>
}

import { Metadata } from "next"

// ... imports

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params
    const post = getPostBySlug(slug)

    if (!post) {
        return {
            title: 'Post Not Found',
        }
    }

    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            publishedTime: post.date,
            tags: post.tags,
        },
    }
}

export async function generateStaticParams() {
    const posts = getAllPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params
    const post = getPostBySlug(slug)

    if (!post) {
        notFound()
    }

    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Button variant="ghost" asChild className="mb-8 pl-0 hover:pl-2 transition-all">
                <Link href="/blog" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Blog
                </Link>
            </Button>

            <article className="prose prose-invert prose-lg max-w-none">
                <div className="mb-8 border-b border-border/40 pb-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{post.title}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={post.date}>{post.date}</time>
                    </div>
                </div>

                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-6 mb-3" {...props} />,
                        p: ({ node, ...props }) => <p className="leading-relaxed mb-4 text-muted-foreground" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
                        li: ({ node, ...props }) => <li className="text-muted-foreground" {...props} />,
                        blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground" {...props} />,
                        code: ({ node, className, children, ...props }: any) => {
                            const match = /language-(\w+)/.exec(className || '')
                            return match ? (
                                <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                </pre>
                            ) : (
                                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                                    {children}
                                </code>
                            )
                        }
                    }}
                >
                    {post.content}
                </ReactMarkdown>
            </article>
        </div>
    )
}
