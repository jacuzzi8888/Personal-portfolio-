"use client"

import { useAuthStore } from "@/stores/authStore"
import { useProjectStore } from "@/stores/projectStore"
import { useEffect, useState, useMemo } from "react"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectGrid } from "@/components/features/projects/ProjectGrid"
import { GitHubRepoGrid } from "@/components/features/projects/GitHubRepoGrid"
import { ProjectFormModal } from "@/components/features/projects/ProjectFormModal"
import { GitHubRepo } from "@/lib/github"
import { toast } from "sonner"

export default function ProjectsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [prefillData, setPrefillData] = useState<Partial<{
        name: string
        description: string
        github_url: string
        live_url: string
        tags: string[]
    }> | null>(null)

    const { session, checkSession } = useAuthStore()
    const { projects, fetchProjects } = useProjectStore()

    useEffect(() => {
        checkSession()
        fetchProjects()
    }, [checkSession, fetchProjects])

    const isAdmin = !!session

    // Extract all unique tags from projects
    const allTags = useMemo(() => {
        const tags = new Set<string>()
        projects.forEach(project => project.tags.forEach(tag => tags.add(tag)))
        return Array.from(tags).sort()
    }, [projects])

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        )
    }

    const clearFilters = () => {
        setSelectedTags([])
    }

    const handleFeatureRepo = (repo: GitHubRepo) => {
        setPrefillData({
            name: repo.name,
            description: repo.description || '',
            github_url: repo.html_url,
            live_url: repo.homepage || '',
            tags: repo.topics.length > 0 ? repo.topics : (repo.language ? [repo.language] : [])
        })
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
        setPrefillData(null)
    }

    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        A collection of my work, ranging from full-stack web applications to open source contributions.
                    </p>
                </div>
                {isAdmin && (
                    <Button onClick={() => setIsModalOpen(true)} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Project
                    </Button>
                )}
            </div>

            <Tabs defaultValue="featured" className="w-full">
                <TabsList className="mb-6">
                    <TabsTrigger value="featured">Featured</TabsTrigger>
                    <TabsTrigger value="github">GitHub Repos</TabsTrigger>
                </TabsList>

                <TabsContent value="featured">
                    {/* Tag Filter Section */}
                    {allTags.length > 0 && (
                        <div className="mb-8">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-sm text-muted-foreground mr-2">Filter by technology:</span>
                                {allTags.map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant={selectedTags.includes(tag) ? "default" : "secondary"}
                                        className="cursor-pointer hover:bg-primary/80 transition-colors"
                                        onClick={() => toggleTag(tag)}
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                                {selectedTags.length > 0 && (
                                    <button
                                        onClick={clearFilters}
                                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors ml-2"
                                    >
                                        <X className="h-3 w-3" />
                                        Clear ({selectedTags.length})
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                    <ProjectGrid filterTags={selectedTags} />
                </TabsContent>

                <TabsContent value="github">
                    <div className="mb-4 text-sm text-muted-foreground">
                        All public repositories from GitHub, sorted by stars. {isAdmin && "Click 'Feature' to add to featured projects."}
                    </div>
                    <GitHubRepoGrid
                        onFeature={handleFeatureRepo}
                        isAdmin={isAdmin}
                    />
                </TabsContent>
            </Tabs>

            <ProjectFormModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                prefillData={prefillData || undefined}
            />
        </div>
    )
}
