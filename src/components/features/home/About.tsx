
"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const skills = [
    "React", "Next.js", "TypeScript", "Node.js", "Python",
    "AWS", "Docker", "Kubernetes", "PostgreSQL", "GraphQL",
    "System Design", "Microservices", "CI/CD", "Agile Leadership"
]

export function About() {
    return (
        <section id="about" className="py-24 bg-muted/30">
            <div className="container px-4 md:px-6">
                <div className="grid gap-12 lg:grid-cols-2 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                            About Me
                        </h2>
                        <div className="space-y-4 text-lg text-muted-foreground">
                            <p>
                                With over two decades of experience in the software industry, I've witnessed the evolution of the web from static HTML pages to complex, AI-driven applications. My journey has been defined by a relentless curiosity and a drive to build systems that matter.
                            </p>
                            <p>
                                I specialize in architecting scalable full-stack solutions, leading engineering teams, and bridging the gap between technical complexity and business value. Whether it's optimizing high-traffic databases or designing intuitive user interfaces, I bring a holistic approach to every project.
                            </p>
                            <p>
                                When I'm not coding, I'm mentoring the next generation of developers, contributing to open source, or exploring the latest advancements in artificial intelligence.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-card border border-border/40 rounded-2xl p-8 shadow-sm"
                    >
                        <h3 className="text-xl font-bold mb-6">Technical Expertise</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <Badge
                                    key={skill}
                                    variant="secondary"
                                    className="text-base py-1 px-3 hover:bg-primary/20 transition-colors"
                                >
                                    {skill}
                                </Badge>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-border/40 grid grid-cols-2 gap-4 text-center">
                            <div>
                                <div className="text-4xl font-bold text-primary">20+</div>
                                <div className="text-sm text-muted-foreground mt-1">Years Experience</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-primary">50+</div>
                                <div className="text-sm text-muted-foreground mt-1">Projects Delivered</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
