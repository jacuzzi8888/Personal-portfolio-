
"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Github, ExternalLink, Pencil, Trash2 } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Project } from "@/stores/projectStore"
import { useAuthStore } from "@/stores/authStore"
import { DeleteProjectDialog } from "./DeleteProjectDialog"
import { ProjectFormModal } from "./ProjectFormModal"

interface ProjectCardProps {
    project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
    const { session, checkSession } = useAuthStore()
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    useEffect(() => {
        checkSession()
    }, [checkSession])

    const isAdmin = !!session

    return (
        <>
            <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative"
            >
                <Card className="h-full flex flex-col overflow-hidden border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                    <div className="relative aspect-video w-full overflow-hidden bg-muted">
                        {/* Generate a unique gradient based on project name */}
                        {!project.image_url && !project.case_study?.imageUrl && (
                            <div
                                className="absolute inset-0 flex items-center justify-center"
                                style={{
                                    background: `linear-gradient(135deg, 
                                        hsl(${project.name.charCodeAt(0) * 3 % 360}, 60%, 20%) 0%,
                                        hsl(${(project.name.charCodeAt(0) * 3 + 60) % 360}, 50%, 30%) 100%)`
                                }}
                            >
                                <span className="text-6xl font-bold text-white/20">
                                    {project.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}
                        {(project.image_url || project.case_study?.imageUrl) && (
                            <Image
                                src={project.image_url || project.case_study?.imageUrl}
                                alt={project.name}
                                fill
                                className="object-cover transition-transform duration-500 hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        )}

                        {/* Admin controls overlay - visible on hover */}
                        {isAdmin && (
                            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="h-8 w-8 shadow-md"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setIsEditModalOpen(true)
                                    }}
                                >
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="h-8 w-8 shadow-md"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setIsDeleteDialogOpen(true)
                                    }}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
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

            {/* Edit Modal */}
            <ProjectFormModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                projectToEdit={project}
            />

            {/* Delete Dialog */}
            <DeleteProjectDialog
                projectId={project.id}
                projectName={project.name}
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
            />
        </>
    )
}
