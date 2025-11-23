
import Link from "next/link"
import { getAllPosts } from "@/lib/blog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

export default function BlogPage() {
    const posts = getAllPosts()

    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 mb-12">
                <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Thoughts on software engineering, leadership, and the future of tech.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`}>
                        <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                    <Calendar className="h-4 w-4" />
                                    {post.date}
                                </div>
                                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                                <CardDescription className="line-clamp-3 mt-2">
                                    {post.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
