
"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useProjectStore, Project } from "@/stores/projectStore"

const projectSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    github_url: z.string().url("Must be a valid URL"),
    live_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    tags: z.string().min(1, "At least one tag is required"), // Comma separated string for input
    // Case study fields
    problem: z.string().optional(),
    role: z.string().optional(),
    process: z.string().optional(),
    outcome: z.string().optional(),
    imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
})

type ProjectFormValues = z.infer<typeof projectSchema>

interface ProjectFormModalProps {
    isOpen: boolean
    onClose: () => void
    projectToEdit?: Project | null
}

export function ProjectFormModal({ isOpen, onClose, projectToEdit }: ProjectFormModalProps) {
    const { addProject, updateProject } = useProjectStore()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: "",
            description: "",
            github_url: "",
            live_url: "",
            tags: "",
            problem: "",
            role: "",
            process: "",
            outcome: "",
            imageUrl: "",
        },
    })

    useEffect(() => {
        if (projectToEdit) {
            form.reset({
                name: projectToEdit.name,
                description: projectToEdit.description,
                github_url: projectToEdit.github_url,
                live_url: projectToEdit.live_url || "",
                tags: projectToEdit.tags.join(", "),
                problem: projectToEdit.case_study?.problem || "",
                role: projectToEdit.case_study?.role || "",
                process: projectToEdit.case_study?.process || "",
                outcome: projectToEdit.case_study?.outcome || "",
                imageUrl: projectToEdit.case_study?.imageUrl || "",
            })
        } else {
            form.reset({
                name: "",
                description: "",
                github_url: "",
                live_url: "",
                tags: "",
                problem: "",
                role: "",
                process: "",
                outcome: "",
                imageUrl: "",
            })
        }
    }, [projectToEdit, form, isOpen])

    const onSubmit = async (values: ProjectFormValues) => {
        setIsSubmitting(true)
        try {
            const projectData = {
                name: values.name,
                description: values.description,
                github_url: values.github_url,
                live_url: values.live_url || undefined,
                tags: values.tags.split(",").map(t => t.trim()).filter(Boolean),
                case_study: {
                    problem: values.problem,
                    role: values.role,
                    process: values.process,
                    outcome: values.outcome,
                    imageUrl: values.imageUrl,
                }
            }

            if (projectToEdit) {
                await updateProject(projectToEdit.id, projectData)
            } else {
                await addProject(projectData)
            }
            onClose()
        } catch (error) {
            console.error("Failed to save project:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{projectToEdit ? "Edit Project" : "Add New Project"}</DialogTitle>
                    <DialogDescription>
                        Fill in the details below to {projectToEdit ? "update the" : "create a new"} project.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Portfolio Website" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tags (comma separated)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="React, TypeScript, Tailwind" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Brief overview of the project..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="github_url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>GitHub URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://github.com/..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="live_url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Live URL (Optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-4 border-t pt-4">
                            <h3 className="font-semibold">Case Study Details</h3>

                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cover Image URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Your Role</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Lead Developer" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="problem"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>The Problem</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="What challenge did this solve?" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="process"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>The Process</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="How did you build it?" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="outcome"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>The Outcome</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="What were the results?" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {projectToEdit ? "Update Project" : "Create Project"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
