"use client"

import { useAuthStore } from "@/stores/authStore"
import { useProjectStore } from "@/stores/projectStore"
import { useEffect, useState, useMemo } from "react"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProjectGrid } from "@/components/features/projects/ProjectGrid"
import { ProjectFormModal } from "@/components/features/projects/ProjectFormModal"

export default function ProjectsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedTags, setSelectedTags] = useState<string[]>([])
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

    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        A collection of my work, ranging from full-stack web applications to complex system architectures.
                    </p>
                </div>
                {isAdmin && (
                    <Button onClick={() => setIsModalOpen(true)} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Project
                    </Button>
                )}
            </div>

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
            <ProjectFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    )
}
