"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useProjectStore } from "@/stores/projectStore"
import { toast } from "sonner"

interface DeleteProjectDialogProps {
    projectId: number
    projectName: string
    isOpen: boolean
    onClose: () => void
    onDeleted?: () => void
}

export function DeleteProjectDialog({
    projectId,
    projectName,
    isOpen,
    onClose,
    onDeleted,
}: DeleteProjectDialogProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const { deleteProject } = useProjectStore()
    const router = useRouter()

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            await deleteProject(projectId)
            toast.success("Project deleted successfully", {
                description: `"${projectName}" has been removed from your portfolio.`,
            })
            onClose()
            if (onDeleted) {
                onDeleted()
            } else {
                // Default behavior: redirect to projects page
                router.push("/projects")
            }
        } catch (error) {
            console.error("Failed to delete project:", error)
            toast.error("Failed to delete project", {
                description: "Please try again later.",
            })
            setIsDeleting(false)
        }
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the project{" "}
                        <span className="font-semibold text-foreground">"{projectName}"</span> from your
                        portfolio.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isDeleting ? "Deleting..." : "Delete Project"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
