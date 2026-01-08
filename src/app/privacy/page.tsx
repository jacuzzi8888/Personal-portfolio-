import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Privacy policy for Omotoye Odewole's portfolio website.",
}

export default function PrivacyPage() {
    return (
        <div className="container max-w-3xl py-16 px-4">
            <Button variant="ghost" asChild className="mb-8 gap-2">
                <Link href="/">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>
            </Button>

            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

            <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
                <p className="text-muted-foreground">
                    Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Information Collection</h2>
                    <p className="text-muted-foreground">
                        When you use the contact form on this website, I collect the following information:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Name</li>
                        <li>Email address</li>
                        <li>Message content</li>
                    </ul>
                    <p className="text-muted-foreground">
                        This information is used solely to respond to your inquiry and is not shared with third parties.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Cookies & Analytics</h2>
                    <p className="text-muted-foreground">
                        This website may use essential cookies to enable basic functionality.
                        No tracking cookies or third-party analytics are currently in use.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Data Security</h2>
                    <p className="text-muted-foreground">
                        I take reasonable precautions to protect your information. All data transmission
                        is encrypted via HTTPS, and contact form submissions are stored securely.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Your Rights</h2>
                    <p className="text-muted-foreground">
                        You may request deletion of any data you've submitted via the contact form
                        by emailing <a href="mailto:omotoyeodewole@gmail.com" className="text-primary hover:underline">omotoyeodewole@gmail.com</a>.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Contact</h2>
                    <p className="text-muted-foreground">
                        If you have any questions about this privacy policy, please contact me at{" "}
                        <a href="mailto:omotoyeodewole@gmail.com" className="text-primary hover:underline">omotoyeodewole@gmail.com</a>.
                    </p>
                </section>
            </div>
        </div>
    )
}
