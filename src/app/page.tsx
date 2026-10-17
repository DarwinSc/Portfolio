import { Contact } from "@/components/Contact";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { GridLines } from "@/components/ui";

export default function Home() {
  return (
    <>
      <GridLines />
      <Header />
      <main className="relative z-[1] flex-1">
        <Hero />
        <Projects />
        <Journey />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
