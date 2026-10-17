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
      <footer className="border-t border-line bg-graphite">
        <p className="mx-auto w-full max-w-6xl px-4 py-8 text-sm text-muted sm:px-6">
          {profile.name}. Hecho con Next.js, Tailwind CSS y Motion.
        </p>
      </footer>
    </>
  );
}
