"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
    {
        quote: "An exceptional developer who consistently delivers beyond expectations. Their technical expertise and attention to detail transformed our product.",
        name: "Sarah Chen",
        title: "CTO, TechStart Inc",
        avatar: "SC"
    },
    {
        quote: "Working with them was a game-changer for our startup. They architected a system that scaled beautifully as we grew from 1K to 1M users.",
        name: "Michael Rodriguez",
        title: "Founder, ScaleUp Labs",
        avatar: "MR"
    },
    {
        quote: "Rare combination of deep technical skills and excellent communication. They explain complex concepts clearly and always meet deadlines.",
        name: "Emily Watson",
        title: "Product Manager, Enterprise Co",
        avatar: "EW"
    }
]

export function Testimonials() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                        What People Say
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Feedback from clients and colleagues I've had the pleasure of working with.
                    </p>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 hover:-translate-y-1">
                                <CardContent className="p-6">
                                    <Quote className="h-8 w-8 text-primary/20 mb-4" />

                                    <p className="text-muted-foreground mb-6 leading-relaxed">
                                        "{testimonial.quote}"
                                    </p>

                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                                            {testimonial.avatar}
                                        </div>
                                        <div>
                                            <div className="font-semibold">{testimonial.name}</div>
                                            <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
