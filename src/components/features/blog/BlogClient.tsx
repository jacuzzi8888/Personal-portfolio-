"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Search, X } from "lucide-react"
import type { BlogPost } from "@/lib/blog"

interface BlogClientProps {
    posts: BlogPost[]
}

export function BlogClient({ posts }: BlogClientProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedTag, setSelectedTag] = useState<string | null>(null)

    // Extract all unique tags
    const allTags = useMemo(() => {
        const tags = new Set<string>()
        posts.forEach(post => post.tags.forEach(tag => tags.add(tag)))
        return Array.from(tags).sort()
    }, [posts])

    // Filter posts based on search and tag
    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesSearch = searchQuery === "" ||
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.description.toLowerCase().includes(searchQuery.toLowerCase())

            const matchesTag = selectedTag === null || post.tags.includes(selectedTag)

            return matchesSearch && matchesTag
        })
    }, [posts, searchQuery, selectedTag])

    const clearFilters = () => {
        setSearchQuery("")
        setSelectedTag(null)
    }

    return (
        <>
            {/* Search and Filter Section */}
            <div className="mb-8 space-y-4">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-muted-foreground mr-2">Filter by tag:</span>
                    {allTags.map((tag) => (
                        <Badge
                            key={tag}
                            variant={selectedTag === tag ? "default" : "secondary"}
                            className="cursor-pointer hover:bg-primary/80 transition-colors"
                            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                        >
                            {tag}
                        </Badge>
                    ))}
                    {(searchQuery || selectedTag) && (
                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors ml-2"
                        >
                            <X className="h-3 w-3" />
                            Clear filters
                        </button>
                    )}
                </div>
            </div>

            {/* Results */}
            {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
                    <button
                        onClick={clearFilters}
                        className="mt-4 text-primary hover:underline"
                    >
                        Clear filters
                    </button>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredPosts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`}>
                            <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer bg-card/50 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            {post.date}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            {post.readingTime} min read
                                        </div>
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
            )}
        </>
    )
}
