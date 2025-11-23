"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectGrid } from "@/components/features/projects/ProjectGrid"
import { ProjectFormModal } from "@/components/features/projects/ProjectFormModal"

export default function ProjectsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    // TODO: Replace with actual auth check
    const isAdmin = true

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
            <ProjectGrid />
            <ProjectFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    )
}
