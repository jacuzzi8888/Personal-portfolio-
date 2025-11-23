
"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MessageSquare, Send } from "lucide-react"

export function Contact() {
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
                                        <div className="text-muted-foreground">
                                            LinkedIn, GitHub, Twitter
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
                                <form className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Input placeholder="Name" />
                                        </div>
                                        <div className="space-y-2">
                                            <Input placeholder="Email" type="email" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Input placeholder="Subject" />
                                    </div>
                                    <div className="space-y-2">
                                        <Textarea placeholder="Your message..." className="min-h-[120px]" />
                                    </div>
                                    <Button className="w-full gap-2">
                                        Send Message <Send className="h-4 w-4" />
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
