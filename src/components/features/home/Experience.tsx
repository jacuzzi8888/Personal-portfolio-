"use client"

import { motion } from "framer-motion"
import { Briefcase, Calendar } from "lucide-react"

const experiences = [
    {
        title: "Senior Fullstack Vibecoder",
        company: "Freelance / Independent",
        period: "2020 - Present",
        description: "Building cutting-edge web applications for clients worldwide. Specializing in React, Next.js, and cloud-native architectures.",
        highlights: ["Led 20+ successful product launches", "Mentored junior developers", "Open source contributions"]
    },
    {
        title: "Lead Software Engineer",
        company: "Tech Innovation Labs",
        period: "2016 - 2020",
        description: "Architected and led development of enterprise-scale SaaS platforms serving millions of users.",
        highlights: ["Scaled systems to handle 10M+ daily requests", "Reduced infrastructure costs by 40%", "Built high-performing team of 8 engineers"]
    },
    {
        title: "Senior Software Developer",
        company: "Digital Solutions Inc",
        period: "2012 - 2016",
        description: "Developed full-stack applications using modern JavaScript frameworks and RESTful APIs.",
        highlights: ["Modernized legacy codebase", "Implemented CI/CD pipelines", "Achieved 99.9% uptime SLA"]
    },
    {
        title: "Software Developer",
        company: "StartUp Ventures",
        period: "2008 - 2012",
        description: "Built and maintained web applications from the ground up in fast-paced startup environments.",
        highlights: ["Shipped MVP in 3 months", "Integrated payment systems", "Worked directly with founders"]
    }
]

export function Experience() {
    return (
        <section id="experience" className="py-24 bg-muted/30">
            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                        Professional Experience
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        A track record of delivering impactful solutions across diverse industries.
                    </p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Timeline line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative flex flex-col md:flex-row gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                }`}
                        >
                            {/* Timeline dot */}
                            <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1 md:-translate-x-1.5 mt-2 ring-4 ring-background" />

                            {/* Content */}
                            <div className={`flex-1 ml-6 md:ml-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                                <div className="p-6 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-colors">
                                    <div className={`flex items-center gap-2 text-primary mb-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                                        <Calendar className="h-4 w-4" />
                                        <span className="text-sm font-medium">{exp.period}</span>
                                    </div>

                                    <h3 className="text-xl font-bold mb-1">{exp.title}</h3>

                                    <div className={`flex items-center gap-2 text-muted-foreground mb-3 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                                        <Briefcase className="h-4 w-4" />
                                        <span>{exp.company}</span>
                                    </div>

                                    <p className="text-muted-foreground mb-4">{exp.description}</p>

                                    <ul className={`space-y-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                                        {exp.highlights.map((highlight, i) => (
                                            <li key={i} className="text-sm text-muted-foreground">
                                                <span className="text-primary">•</span> {highlight}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Spacer for alternating layout */}
                            <div className="hidden md:block flex-1" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
