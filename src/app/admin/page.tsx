"use client"

import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
    Plus,
    FolderOpen,
    Mail,
    LogOut,
    LayoutDashboard,
    ExternalLink,
    Github,
    Pencil,
    Trash2,
    Eye,
    Clock,
    CheckCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuthStore } from "@/stores/authStore"
import { useProjectStore, Project } from "@/stores/projectStore"
import { ProjectFormModal } from "@/components/features/projects/ProjectFormModal"
import { DeleteProjectDialog } from "@/components/features/projects/DeleteProjectDialog"
import { supabase } from "@/lib/supabase"

interface ContactSubmission {
    id: number
    created_at: string
    name: string
    email: string
    subject: string
    message: string
    is_read: boolean
}

export default function AdminPage() {
    const { session, isLoading: authLoading, checkSession, signOut } = useAuthStore()
    const { projects, isLoading: projectsLoading, fetchProjects } = useProjectStore()

    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [editingProject, setEditingProject] = useState<Project | null>(null)
    const [deletingProject, setDeletingProject] = useState<Project | null>(null)

    const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
    const [submissionsLoading, setSubmissionsLoading] = useState(true)

    useEffect(() => {
        checkSession()
    }, [checkSession])

    useEffect(() => {
        if (session) {
            fetchProjects()
            fetchSubmissions()
        }
    }, [session, fetchProjects])

    const fetchSubmissions = async () => {
        setSubmissionsLoading(true)
        try {
            const { data, error } = await supabase
                .from('contact_submissions')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(20)

            if (error) throw error
            setSubmissions(data || [])
        } catch (error) {
            console.error('Failed to fetch submissions:', error)
        } finally {
            setSubmissionsLoading(false)
        }
    }

    const markAsRead = async (id: number) => {
        try {
            await supabase
                .from('contact_submissions')
                .update({ is_read: true })
                .eq('id', id)

            setSubmissions(prev =>
                prev.map(s => s.id === id ? { ...s, is_read: true } : s)
            )
        } catch (error) {
            console.error('Failed to mark as read:', error)
        }
    }

    const handleSignOut = async () => {
        await signOut()
        redirect('/login')
    }

    // Show loading state
    if (authLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <Skeleton className="h-8 w-48 mx-auto mb-4" />
                    <Skeleton className="h-4 w-32 mx-auto" />
                </div>
            </div>
        )
    }

    // Redirect if not logged in
    if (!session) {
        redirect('/login')
    }

    const unreadCount = submissions.filter(s => !s.is_read).length

    return (
        <div className="min-h-screen bg-background">
            {/* Admin Header */}
            <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <LayoutDashboard className="h-6 w-6 text-primary" />
                        <h1 className="text-xl font-bold">Admin Dashboard</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/" className="gap-2">
                                <Eye className="h-4 w-4" />
                                View Site
                            </Link>
                        </Button>
                        <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-2 text-muted-foreground">
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                                <FolderOpen className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{projects.length}</div>
                                <p className="text-xs text-muted-foreground">
                                    In your portfolio
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Contact Messages</CardTitle>
                                <Mail className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{submissions.length}</div>
                                <p className="text-xs text-muted-foreground">
                                    {unreadCount > 0 ? (
                                        <span className="text-primary font-medium">{unreadCount} unread</span>
                                    ) : (
                                        "All caught up!"
                                    )}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card className="border-primary/50 bg-primary/5">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Quick Action</CardTitle>
                                <Plus className="h-4 w-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <Button
                                    onClick={() => setIsAddModalOpen(true)}
                                    className="w-full gap-2"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add New Project
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="projects" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="projects" className="gap-2">
                            <FolderOpen className="h-4 w-4" />
                            Projects
                        </TabsTrigger>
                        <TabsTrigger value="messages" className="gap-2">
                            <Mail className="h-4 w-4" />
                            Messages
                            {unreadCount > 0 && (
                                <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 text-xs flex items-center justify-center">
                                    {unreadCount}
                                </Badge>
                            )}
                        </TabsTrigger>
                    </TabsList>

                    {/* Projects Tab */}
                    <TabsContent value="projects">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Manage Projects</CardTitle>
                                        <CardDescription>
                                            Add, edit, or remove projects from your portfolio.
                                        </CardDescription>
                                    </div>
                                    <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
                                        <Plus className="h-4 w-4" />
                                        Add Project
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {projectsLoading ? (
                                    <div className="space-y-4">
                                        {[1, 2, 3].map(i => (
                                            <Skeleton key={i} className="h-20 w-full" />
                                        ))}
                                    </div>
                                ) : projects.length === 0 ? (
                                    <div className="text-center py-12 text-muted-foreground">
                                        <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p>No projects yet. Add your first project!</p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-border">
                                        {projects.map((project) => (
                                            <div
                                                key={project.id}
                                                className="py-4 flex items-center justify-between gap-4"
                                            >
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold truncate">{project.name}</h3>
                                                    <p className="text-sm text-muted-foreground truncate">
                                                        {project.description}
                                                    </p>
                                                    <div className="flex gap-2 mt-2">
                                                        {project.tags.slice(0, 3).map(tag => (
                                                            <Badge key={tag} variant="secondary" className="text-xs">
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                        {project.tags.length > 3 && (
                                                            <Badge variant="outline" className="text-xs">
                                                                +{project.tags.length - 3}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        asChild
                                                    >
                                                        <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                                                            <Github className="h-4 w-4" />
                                                        </a>
                                                    </Button>
                                                    {project.live_url && (
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            asChild
                                                        >
                                                            <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                                                                <ExternalLink className="h-4 w-4" />
                                                            </a>
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => setEditingProject(project)}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-destructive hover:text-destructive"
                                                        onClick={() => setDeletingProject(project)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Messages Tab */}
                    <TabsContent value="messages">
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Messages</CardTitle>
                                <CardDescription>
                                    View and manage messages from your contact form.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {submissionsLoading ? (
                                    <div className="space-y-4">
                                        {[1, 2, 3].map(i => (
                                            <Skeleton key={i} className="h-24 w-full" />
                                        ))}
                                    </div>
                                ) : submissions.length === 0 ? (
                                    <div className="text-center py-12 text-muted-foreground">
                                        <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p>No messages yet.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {submissions.map((submission) => (
                                            <div
                                                key={submission.id}
                                                className={`p-4 rounded-lg border ${submission.is_read
                                                        ? 'border-border bg-card/50'
                                                        : 'border-primary/30 bg-primary/5'
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="font-semibold">{submission.name}</span>
                                                            {!submission.is_read && (
                                                                <Badge variant="default" className="text-xs">New</Badge>
                                                            )}
                                                        </div>
                                                        <a
                                                            href={`mailto:${submission.email}`}
                                                            className="text-sm text-primary hover:underline"
                                                        >
                                                            {submission.email}
                                                        </a>
                                                        <p className="text-sm font-medium mt-2">{submission.subject}</p>
                                                        <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">
                                                            {submission.message}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                                                            <Clock className="h-3 w-3" />
                                                            {new Date(submission.created_at).toLocaleString()}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        {!submission.is_read && (
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => markAsRead(submission.id)}
                                                                className="gap-1"
                                                            >
                                                                <CheckCircle className="h-3 w-3" />
                                                                Mark Read
                                                            </Button>
                                                        )}
                                                        <Button
                                                            variant="default"
                                                            size="sm"
                                                            asChild
                                                        >
                                                            <a href={`mailto:${submission.email}?subject=Re: ${submission.subject}`}>
                                                                Reply
                                                            </a>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>

            {/* Modals */}
            <ProjectFormModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />

            <ProjectFormModal
                isOpen={!!editingProject}
                onClose={() => setEditingProject(null)}
                projectToEdit={editingProject}
            />

            {deletingProject && (
                <DeleteProjectDialog
                    projectId={deletingProject.id}
                    projectName={deletingProject.name}
                    isOpen={!!deletingProject}
                    onClose={() => setDeletingProject(null)}
                    onDeleted={() => setDeletingProject(null)}
                />
            )}
        </div>
    )
}
