
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Github, ExternalLink, Tag, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useProjectStore, Project } from "@/stores/projectStore"
import { supabase } from "@/lib/supabase"
import { useAuthStore } from "@/stores/authStore"
import { ProjectFormModal } from "@/components/features/projects/ProjectFormModal"
import { DeleteProjectDialog } from "@/components/features/projects/DeleteProjectDialog"

export default function ProjectDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const { projects } = useProjectStore()
    const { session, checkSession } = useAuthStore()
    const [project, setProject] = useState<Project | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    useEffect(() => {
        checkSession()
    }, [checkSession])

    const isAdmin = !!session

    useEffect(() => {
        const fetchProject = async () => {
            setIsLoading(true)
            const id = Number(params.id)

            // First try to find in store
            const existingProject = projects.find(p => p.id === id)
            if (existingProject) {
                setProject(existingProject)
                setIsLoading(false)
                return
            }

            // If not in store, fetch from Supabase
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('id', id)
                    .single()

                if (error) throw error
                setProject(data as Project)
            } catch (error) {
                console.error("Error fetching project:", error)
                // router.push('/404') // Uncomment when 404 page exists
            } finally {
                setIsLoading(false)
            }
        }

        if (params.id) {
            fetchProject()
        }
    }, [params.id, projects, router])

    if (isLoading) {
        return (
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <Skeleton className="h-8 w-32 mb-8" />
                <Skeleton className="h-[400px] w-full rounded-xl mb-8" />
                <div className="space-y-4">
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            </div>
        )
    }

    if (!project) {
        return (
            <div className="container mx-auto py-20 text-center">
                <h1 className="text-2xl font-bold">Project not found</h1>
                <Button asChild className="mt-4">
                    <Link href="/projects">Back to Projects</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Button variant="ghost" asChild className="mb-8 pl-0 hover:pl-2 transition-all">
                    <Link href="/projects" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Projects
                    </Link>
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted border border-border/40">
                            {project.case_study?.imageUrl ? (
                                <Image
                                    src={project.case_study.imageUrl}
                                    alt={project.name}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 66vw"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 text-6xl font-bold">
                                    {project.name.charAt(0)}
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <h1 className="text-4xl font-bold tracking-tight">{project.name}</h1>
                                {isAdmin && (
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="icon" onClick={() => setIsEditModalOpen(true)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="destructive" size="icon" onClick={() => setIsDeleteDialogOpen(true)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        {project.case_study && (
                            <div className="space-y-8">
                                {project.case_study.problem && (
                                    <section>
                                        <h3 className="text-2xl font-bold mb-3">The Problem</h3>
                                        <p className="text-muted-foreground leading-relaxed">{project.case_study.problem}</p>
                                    </section>
                                )}
                                {project.case_study.process && (
                                    <section>
                                        <h3 className="text-2xl font-bold mb-3">The Process</h3>
                                        <p className="text-muted-foreground leading-relaxed">{project.case_study.process}</p>
                                    </section>
                                )}
                                {project.case_study.outcome && (
                                    <section>
                                        <h3 className="text-2xl font-bold mb-3">The Outcome</h3>
                                        <p className="text-muted-foreground leading-relaxed">{project.case_study.outcome}</p>
                                    </section>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="p-6 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm">
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <Tag className="h-4 w-4 text-primary" />
                                Technologies
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <Badge key={tag} variant="secondary">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm space-y-4">
                            <h3 className="font-bold mb-2">Links</h3>
                            <Button className="w-full gap-2" asChild>
                                <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                                    <Github className="h-4 w-4" />
                                    View Source Code
                                </a>
                            </Button>
                            {project.live_url && (
                                <Button variant="outline" className="w-full gap-2" asChild>
                                    <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="h-4 w-4" />
                                        Visit Live Site
                                    </a>
                                </Button>
                            )}
                        </div>

                        {project.case_study?.role && (
                            <div className="p-6 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm">
                                <h3 className="font-bold mb-2">My Role</h3>
                                <p className="text-muted-foreground">{project.case_study.role}</p>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            <ProjectFormModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                projectToEdit={project}
            />

            {project && (
                <DeleteProjectDialog
                    projectId={project.id}
                    projectName={project.name}
                    isOpen={isDeleteDialogOpen}
                    onClose={() => setIsDeleteDialogOpen(false)}
                    onDeleted={() => router.push("/projects")}
                />
            )}
        </div >
    )
}
