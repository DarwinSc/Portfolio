"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { profile } from "@/data/profile";
import { Container } from "./ui";

const links = [
  { href: "#proyectos", label: "Proyectos" },
  { href: "#recorrido", label: "Recorrido" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-bg/80 backdrop-blur-md" : ""
      }`}
    >
      <Container className="flex items-center justify-between gap-4 py-5">
        <a href="#inicio" className="text-lg font-extrabold tracking-tight">
          DS
          <span className="sr-only"> Darwin Sierra, volver al inicio</span>
        </a>
        <nav aria-label="Secciones">
          <ul className="flex items-center gap-6 text-[15px]">
            {links.map((link) => (
              <li key={link.href} className="hidden sm:block">
                <a href={link.href} className="group relative block overflow-hidden text-muted hover:text-fg">
                  {/* El texto se reemplaza por una copia que sube al pasar el mouse */}
                  <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                    {link.label}
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-0 translate-y-full text-fg transition-transform duration-300 group-hover:translate-y-0"
                  >
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.cv}
                download
                className="rounded-full border border-line-strong px-4 py-2 font-semibold transition-colors hover:bg-fg hover:text-bg"
              >
                Descargar CV
              </a>
            </li>
          </ul>
        </nav>
      </Container>
      <motion.div aria-hidden className="h-px origin-left bg-fg" style={{ scaleX: scrollYProgress }} />
    </header>
  );
}
