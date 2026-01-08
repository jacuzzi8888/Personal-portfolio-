"use client"

import Link from "next/link"
import { Github, Linkedin, Twitter, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

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

                    <div className="flex items-center gap-4">
                        <div className="flex items-center space-x-4">
                            <a
                                href="https://github.com/omotoye-odewole"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                aria-label="GitHub Profile"
                            >
                                <Github className="h-5 w-5" />
                            </a>
                            <a
                                href="https://linkedin.com/in/omotoye-odewole"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                aria-label="LinkedIn Profile"
                            >
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a
                                href="https://twitter.com/omotoye"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                aria-label="Twitter Profile"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>

                        {/* Back to Top Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={scrollToTop}
                            className="rounded-full hover:bg-primary/10"
                            aria-label="Scroll to top"
                        >
                            <ArrowUp className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Omotoye Odewole. All rights reserved.</p>
                    <div className="flex gap-4 flex-wrap justify-center">
                        <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
                        <Link href="/projects" className="hover:text-foreground transition-colors">Projects</Link>
                        <Link href="/#contact" className="hover:text-foreground transition-colors">Contact</Link>
                        <span className="text-border">|</span>
                        <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
