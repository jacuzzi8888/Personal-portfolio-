
"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Code2, Database, Layout } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background pt-16">
            {/* Background Elements */}
            <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

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
                        Senior Full-Stack Developer with 20+ years of experience crafting robust, scalable, and user-centric web solutions.
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
