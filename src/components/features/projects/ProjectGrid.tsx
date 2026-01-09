
"use client"

import { ProjectCard } from "./ProjectCard"
import { Skeleton } from "@/components/ui/skeleton"
import { useProjectStore } from "@/stores/projectStore"
import { useEffect, useMemo } from "react"
import { motion } from "framer-motion"

interface ProjectGridProps {
    filterTags?: string[]
}

export function ProjectGrid({ filterTags = [] }: ProjectGridProps) {
    const { projects, isLoading, fetchProjects } = useProjectStore()

    useEffect(() => {
        fetchProjects()
    }, [fetchProjects])

    // Filter projects based on selected tags
    const filteredProjects = useMemo(() => {
        if (filterTags.length === 0) return projects
        return projects.filter(project =>
            filterTags.some(tag => project.tags.includes(tag))
        )
    }, [projects, filterTags])

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

    if (filteredProjects.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                    {filterTags.length > 0
                        ? "No projects match the selected filters."
                        : "No projects found."}
                </p>
            </div>
        )
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
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
            {filteredProjects.map((project) => (
                <motion.div key={project.id} variants={item}>
                    <ProjectCard project={project} />
                </motion.div>
            ))}
        </motion.div>
    )
}

