import { Hero } from "@/components/hero/Hero";
import { ProjectList } from "@/components/projects/ProjectList";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative z-[2]">
      <Hero />
      <ProjectList />
      <Footer />
    </main>
  );
}
