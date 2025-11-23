
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: {
    default: "Omotoye Odewole | Senior Full-Stack Developer",
    template: "%s | Omotoye Odewole",
  },
  description: "Senior Full-Stack Developer with 20+ years of experience building scalable, high-performance web applications and leading engineering teams.",
  keywords: ["Full-Stack Developer", "React", "Next.js", "TypeScript", "Software Architect", "Engineering Lead"],
  authors: [{ name: "Omotoye Odewole" }],
  creator: "Omotoye Odewole",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://omotoye.dev",
    title: "Omotoye Odewole | Senior Full-Stack Developer",
    description: "Senior Full-Stack Developer with 20+ years of experience building scalable, high-performance web applications.",
    siteName: "Omotoye Odewole Portfolio",
    images: [
      {
        url: "https://omotoye.dev/og-image.jpg", // TODO: Add actual OG image
        width: 1200,
        height: 630,
        alt: "Omotoye Odewole Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Omotoye Odewole | Senior Full-Stack Developer",
    description: "Senior Full-Stack Developer with 20+ years of experience.",
    creator: "@omotoye", // Replace with actual handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Omotoye Odewole",
  url: "https://omotoye.dev",
  jobTitle: "Senior Full-Stack Developer",
  sameAs: [
    "https://github.com/omotoye-odewole",
    "https://linkedin.com/in/omotoye-odewole",
    "https://twitter.com/omotoye"
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
