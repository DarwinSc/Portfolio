import { Contact } from "@/components/Contact";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Projects />
        <Journey />
        <Skills />
        <Contact />
      </main>
      <footer className="mx-auto w-full max-w-5xl px-4 pb-10 text-sm text-muted sm:px-6">
        {profile.name}. Hecho con Next.js y Tailwind CSS.
      </footer>
    </>
  );
}
