
"use client"

import { useEffect } from "react"
import { useProjectStore } from "@/stores/projectStore"
import { ProjectCard } from "./ProjectCard"
import { Skeleton } from "@/components/ui/skeleton"

export function ProjectGrid() {
    const { projects, isLoading, fetchProjects } = useProjectStore()

    useEffect(() => {
        fetchProjects()
    }, [fetchProjects])

    if (isLoading && projects.length === 0) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex flex-col space-y-3">
                        <Skeleton className="h-[200px] w-full rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (projects.length === 0) {
        return (
            <div className="text-center py-20">
                <h3 className="text-2xl font-bold text-muted-foreground">No projects found</h3>
                <p className="text-muted-foreground mt-2">Check back soon for updates!</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    )
}
