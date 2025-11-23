
import { ProjectGrid } from "@/components/features/projects/ProjectGrid"

export default function ProjectsPage() {
    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 mb-8">
                <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    A collection of my work, ranging from full-stack web applications to complex system architectures.
                </p>
            </div>
            <ProjectGrid />
        </div>
    )
}
