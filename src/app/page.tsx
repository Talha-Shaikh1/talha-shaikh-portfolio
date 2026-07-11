import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <About />
      <Projects />
    </main>
  );
}
