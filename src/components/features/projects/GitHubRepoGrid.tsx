"use client"

import { useEffect, useState } from "react"
import { GitHubRepo, fetchGitHubRepos } from "@/lib/github"
import { GitHubRepoCard } from "./GitHubRepoCard"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

interface GitHubRepoGridProps {
    onFeature?: (repo: GitHubRepo) => void
    isAdmin?: boolean
}

export function GitHubRepoGrid({ onFeature, isAdmin }: GitHubRepoGridProps) {
    const [repos, setRepos] = useState<GitHubRepo[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadRepos() {
            setIsLoading(true)
            try {
                const data = await fetchGitHubRepos()
                setRepos(data)
            } catch (err) {
                setError("Failed to load repositories")
            } finally {
                setIsLoading(false)
            }
        }
        loadRepos()
    }, [])

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="space-y-4">
                        <Skeleton className="h-[200px] w-full rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">{error}</p>
            </div>
        )
    }

    if (repos.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No repositories found.</p>
            </div>
        )
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    }

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            {repos.map((repo) => (
                <motion.div key={repo.id} variants={item}>
                    <GitHubRepoCard
                        repo={repo}
                        onFeature={onFeature}
                        isAdmin={isAdmin}
                    />
                </motion.div>
            ))}
        </motion.div>
    )
}
