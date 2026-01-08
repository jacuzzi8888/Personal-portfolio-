import Link from "next/link"
import { Home, FolderOpen, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="text-center max-w-md">
                <div className="mb-8">
                    <span className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
                        404
                    </span>
                </div>

                <h1 className="text-3xl font-bold tracking-tight mb-4">
                    Page Not Found
                </h1>

                <p className="text-muted-foreground mb-8 text-lg">
                    The page you're looking for doesn't exist or has been moved. Let's get you back on track.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg">
                        <Link href="/" className="gap-2">
                            <Home className="h-4 w-4" />
                            Go Home
                        </Link>
                    </Button>

                    <Button variant="outline" asChild size="lg">
                        <Link href="/projects" className="gap-2">
                            <FolderOpen className="h-4 w-4" />
                            View Projects
                        </Link>
                    </Button>

                    <Button variant="ghost" asChild size="lg">
                        <Link href="/#contact" className="gap-2">
                            <Mail className="h-4 w-4" />
                            Contact
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
