import { getAllPosts } from "@/lib/blog"
import { BlogClient } from "@/components/features/blog/BlogClient"

export default function BlogPage() {
    const posts = getAllPosts()

    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 mb-8">
                <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Thoughts on software engineering, leadership, and the future of tech.
                </p>
            </div>

            <BlogClient posts={posts} />
        </div>
    )
}
