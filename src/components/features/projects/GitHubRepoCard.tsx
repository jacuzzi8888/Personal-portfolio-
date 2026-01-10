"use client"

import { GitHubRepo, formatRepoDate, languageColors } from "@/lib/github"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Star, GitFork } from "lucide-react"

interface GitHubRepoCardProps {
    repo: GitHubRepo
}

export function GitHubRepoCard({ repo }: GitHubRepoCardProps) {
    const languageColor = repo.language ? languageColors[repo.language] || '#888' : null

    return (
        <Card className="h-full flex flex-col border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-lg transition-all duration-300">
            <CardHeader>
                <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-xl font-bold line-clamp-1">{repo.name}</CardTitle>
                    <div className="flex items-center gap-2 text-muted-foreground shrink-0">
                        {repo.stargazers_count > 0 && (
                            <span className="flex items-center gap-1 text-sm">
                                <Star className="h-4 w-4" />
                                {repo.stargazers_count}
                            </span>
                        )}
                        {repo.forks_count > 0 && (
                            <span className="flex items-center gap-1 text-sm">
                                <GitFork className="h-4 w-4" />
                                {repo.forks_count}
                            </span>
                        )}
                    </div>
                </div>
                <CardDescription className="line-clamp-2 mt-2">
                    {repo.description || "No description provided"}
                </CardDescription>
            </CardHeader>

            <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                    {repo.language && (
                        <Badge
                            variant="secondary"
                            className="gap-1"
                            style={{ borderColor: languageColor || undefined }}
                        >
                            <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: languageColor || '#888' }}
                            />
                            {repo.language}
                        </Badge>
                    )}
                    {repo.topics.slice(0, 3).map((topic) => (
                        <Badge key={topic} variant="outline" className="text-xs">
                            {topic}
                        </Badge>
                    ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                    {formatRepoDate(repo.pushed_at)}
                </p>
            </CardContent>

            <CardFooter className="flex gap-2 pt-4 border-t border-border/40">
                <Button variant="outline" size="sm" className="flex-1 gap-2" asChild>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        View Code
                    </a>
                </Button>
                {repo.homepage && (
                    <Button variant="default" size="sm" className="flex-1 gap-2" asChild>
                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            Live Demo
                        </a>
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
