import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "Terms of service for Omotoye Odewole's portfolio website.",
}

export default function TermsPage() {
    return (
        <div className="container max-w-3xl py-16 px-4">
            <Button variant="ghost" asChild className="mb-8 gap-2">
                <Link href="/">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>
            </Button>

            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

            <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
                <p className="text-muted-foreground">
                    Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Use of Website</h2>
                    <p className="text-muted-foreground">
                        This website is provided for informational purposes and to showcase my portfolio and services.
                        By accessing this website, you agree to use it in accordance with these terms.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Intellectual Property</h2>
                    <p className="text-muted-foreground">
                        All content on this website, including but not limited to text, graphics, logos, and code samples,
                        is the property of Omotoye Odewole unless otherwise stated. Project showcases may include
                        work created for clients under separate agreements.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Contact Form</h2>
                    <p className="text-muted-foreground">
                        When using the contact form, you agree to provide accurate information and not to submit
                        spam, malicious content, or automated requests. Abuse of the contact form may result in
                        your IP being blocked.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Disclaimer</h2>
                    <p className="text-muted-foreground">
                        This website is provided "as is" without warranties of any kind. I am not liable for any
                        damages arising from the use of this website. External links are provided for convenience
                        and do not imply endorsement.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Changes to Terms</h2>
                    <p className="text-muted-foreground">
                        These terms may be updated from time to time. Continued use of the website after changes
                        constitutes acceptance of the new terms.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Contact</h2>
                    <p className="text-muted-foreground">
                        If you have any questions about these terms, please contact me at{" "}
                        <a href="mailto:omotoyeodewole@gmail.com" className="text-primary hover:underline">omotoyeodewole@gmail.com</a>.
                    </p>
                </section>
            </div>
        </div>
    )
}
