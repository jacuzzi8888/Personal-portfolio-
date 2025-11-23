
import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col items-center md:items-start">
                        <span className="text-lg font-bold text-foreground">Omotoye Odewole</span>
                        <p className="text-sm text-muted-foreground mt-1">
                            Building digital experiences with passion and precision.
                        </p>
                    </div>

                    <div className="flex items-center space-x-4">
                        <a href="https://github.com/omotoye-odewole" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <Github className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                        </a>
                        <a href="https://linkedin.com/in/omotoye-odewole" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <Linkedin className="h-5 w-5" />
                            <span className="sr-only">LinkedIn</span>
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <Twitter className="h-5 w-5" />
                            <span className="sr-only">Twitter</span>
                        </a>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Omotoye Odewole. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
