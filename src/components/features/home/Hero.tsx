
"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Code2, Database, Layout, FileDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
            {/* Banner Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="/banner.jpg"
                    alt="Hero Banner"
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
            </div>

            <div className="container px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center text-center space-y-8">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                        Available for new projects
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 max-w-4xl"
                    >
                        Building Digital Experiences with <span className="text-primary">Precision</span> & <span className="text-secondary-foreground">Passion</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl text-muted-foreground max-w-[600px] md:text-2xl"
                    >
                        Senior Fullstack Vibecoder with extensive experience crafting robust, scalable, and user-centric web solutions.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                    >
                        {/* Von Restorff Effect: High contrast primary action */}
                        <Button size="lg" className="h-12 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.5)] hover:shadow-[0_0_30px_rgba(var(--primary),0.6)] transition-all duration-300 transform hover:-translate-y-1" asChild>
                            <Link href="/projects">
                                View My Work <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>

                        <Button size="lg" variant="outline" className="h-12 px-8 text-lg border-primary/20 hover:bg-primary/5" asChild>
                            <Link href="/#contact">
                                Contact Me
                            </Link>
                        </Button>

                        <Button size="lg" variant="ghost" className="h-12 px-8 text-lg hover:bg-primary/10" asChild>
                            <a href="/resume.pdf" download="Omotoye_Odewole_Resume.pdf">
                                <FileDown className="mr-2 h-5 w-5" />
                                Resume
                            </a>
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="grid grid-cols-3 gap-8 md:gap-16 pt-12 text-muted-foreground/50"
                    >
                        <div className="flex flex-col items-center gap-2">
                            <Code2 className="h-8 w-8" />
                            <span className="text-sm font-medium">Clean Code</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Database className="h-8 w-8" />
                            <span className="text-sm font-medium">Scalable Arch</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Layout className="h-8 w-8" />
                            <span className="text-sm font-medium">Modern UI/UX</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
