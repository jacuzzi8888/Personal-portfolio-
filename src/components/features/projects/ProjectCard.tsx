
"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Project } from "@/stores/projectStore"

interface ProjectCardProps {
    project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <Card className="h-full flex flex-col overflow-hidden border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    {/* Placeholder for project image - will be replaced with actual image later */}
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 text-4xl font-bold">
                        {project.name.charAt(0)}
                    </div>
                    {project.case_study?.imageUrl && (
                        <img
                            src={project.case_study.imageUrl}
                            alt={project.name}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                    )}
                </div>

                <CardHeader>
                    <div className="flex justify-between items-start gap-2">
                        <CardTitle className="text-xl font-bold line-clamp-1">{project.name}</CardTitle>
                    </div>
                    <CardDescription className="line-clamp-2 mt-2">
                        {project.description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-secondary/50 hover:bg-secondary/70">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </CardContent>

                <CardFooter className="flex gap-2 pt-4 border-t border-border/40">
                    <Button variant="outline" size="sm" className="flex-1 gap-2" asChild>
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                            Code
                        </a>
                    </Button>
                    {project.live_url && (
                        <Button variant="default" size="sm" className="flex-1 gap-2" asChild>
                            <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                                Live Demo
                            </a>
                        </Button>
                    )}
                    <Button variant="ghost" size="sm" className="flex-1" asChild>
                        <Link href={`/projects/${project.id}`}>
                            Details
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    )
}
