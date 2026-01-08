"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/features/projects/ProjectCard"
import { useProjectStore } from "@/stores/projectStore"
import { Skeleton } from "@/components/ui/skeleton"

export function FeaturedProjects() {
    const { projects, isLoading, error, fetchProjects } = useProjectStore()

    useEffect(() => {
        if (projects.length === 0) {
            fetchProjects()
        }
    }, [projects.length, fetchProjects])

    // Show top 3 projects
    const featuredProjects = projects.slice(0, 3)

    return (
        <section className="py-24 bg-background">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-2">
                            Featured Projects
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl">
                            A selection of my recent work showcasing full-stack development and system design.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <Button variant="outline" size="lg" asChild className="gap-2">
                            <Link href="/projects">
                                View All Projects
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>

                {isLoading ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="space-y-4">
                                <Skeleton className="h-48 w-full rounded-xl" />
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                        ))}
                    </div>
                ) : featuredProjects.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {featuredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </motion.div>
                ) : !error ? (
                    <div className="text-center py-12 text-muted-foreground">
                        <p>No projects yet. Check back soon!</p>
                    </div>
                ) : null}

                {/* Error State */}
                {error && !isLoading && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <AlertCircle className="h-12 w-12 text-destructive/60 mb-4" />
                        <p className="text-muted-foreground mb-4">Failed to load projects. Please try again.</p>
                        <Button
                            variant="outline"
                            onClick={() => fetchProjects()}
                            className="gap-2"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Retry
                        </Button>
                    </div>
                )}
            </div>
        </section>
    )
}
