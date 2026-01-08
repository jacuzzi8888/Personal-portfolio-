"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MessageSquare, Send, Loader2, CheckCircle, Github, Linkedin, Twitter } from "lucide-react"
import { toast } from "sonner"

export function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
        honeypot: "" // Spam protection - hidden field
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            if (!response.ok) throw new Error("Failed to send message")

            setIsSubmitted(true)
            setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" })
            toast.success("Message sent successfully! I'll get back to you soon.")
        } catch (error) {
            toast.error("Failed to send message. Please try again or email me directly.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>

            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                        Let's Work Together
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-[600px]">
                        Have a project in mind or just want to say hello? I'm always open to discussing new opportunities.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="h-full border-border/40 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                                <CardDescription>
                                    Feel free to reach out through any of these channels.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="font-medium">Email</div>
                                        <a href="mailto:omotoyeodewole@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                                            omotoyeodewole@gmail.com
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <MessageSquare className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="font-medium">Socials</div>
                                        <div className="flex items-center gap-3 mt-1">
                                            <a href="https://linkedin.com/in/omotoye-odewole" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn Profile">
                                                <Linkedin className="h-5 w-5" />
                                            </a>
                                            <a href="https://github.com/omotoye-odewole" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub Profile">
                                                <Github className="h-5 w-5" />
                                            </a>
                                            <a href="https://twitter.com/omotoye" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter Profile">
                                                <Twitter className="h-5 w-5" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle>Send a Message</CardTitle>
                                <CardDescription>
                                    I'll get back to you as soon as possible.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isSubmitted ? (
                                    <div className="flex flex-col items-center justify-center py-8 text-center">
                                        <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                                        <h3 className="text-lg font-semibold mb-2">Message Sent!</h3>
                                        <p className="text-muted-foreground mb-4">Thank you for reaching out. I'll respond within 24-48 hours.</p>
                                        <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                                            Send Another Message
                                        </Button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {/* Honeypot field - hidden from users, catches bots */}
                                        <input
                                            type="text"
                                            name="honeypot"
                                            value={formData.honeypot}
                                            onChange={handleChange}
                                            className="absolute opacity-0 pointer-events-none h-0 w-0"
                                            tabIndex={-1}
                                            autoComplete="off"
                                            aria-hidden="true"
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label htmlFor="contact-name" className="text-sm font-medium">
                                                    Name
                                                </label>
                                                <Input
                                                    id="contact-name"
                                                    name="name"
                                                    placeholder="Your name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    disabled={isSubmitting}
                                                    aria-required="true"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="contact-email" className="text-sm font-medium">
                                                    Email
                                                </label>
                                                <Input
                                                    id="contact-email"
                                                    name="email"
                                                    placeholder="you@example.com"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    disabled={isSubmitting}
                                                    aria-required="true"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="contact-subject" className="text-sm font-medium">
                                                Subject
                                            </label>
                                            <Input
                                                id="contact-subject"
                                                name="subject"
                                                placeholder="What's this about?"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                disabled={isSubmitting}
                                                aria-required="true"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="contact-message" className="text-sm font-medium">
                                                Message
                                            </label>
                                            <Textarea
                                                id="contact-message"
                                                name="message"
                                                placeholder="Tell me about your project or idea..."
                                                className="min-h-[120px]"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                disabled={isSubmitting}
                                                aria-required="true"
                                            />
                                        </div>
                                        <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Send Message <Send className="h-4 w-4" />
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
