
import { Hero } from "@/components/features/home/Hero"
import { About } from "@/components/features/home/About"
import { FeaturedProjects } from "@/components/features/home/FeaturedProjects"
import { Experience } from "@/components/features/home/Experience"
import { Testimonials } from "@/components/features/home/Testimonials"
import { Contact } from "@/components/features/home/Contact"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <About />
      <FeaturedProjects />
      <Experience />
      <Testimonials />
      <Contact />
    </div>
  );
}
