
import { Hero } from "@/components/features/home/Hero"
import { About } from "@/components/features/home/About"
import { Contact } from "@/components/features/home/Contact"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <About />
      <Contact />
    </div>
  );
}
