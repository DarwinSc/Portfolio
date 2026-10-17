"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { profile } from "@/data/profile";

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
        scrolled ? "border-b border-line bg-black/75 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <a href="#inicio" className="font-display text-lg">
          DS<span className="text-champagne">.</span>
          <span className="sr-only"> Darwin Sierra, volver al inicio</span>
        </a>
        <nav aria-label="Secciones">
          <ul className="flex items-center gap-5 text-sm sm:gap-7">
            {links.map((link) => (
              <li key={link.href} className="hidden sm:block">
                <a href={link.href} className="group relative py-1 text-muted transition-colors hover:text-text">
                  {link.label}
                  <span
                    aria-hidden
                    className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-300 group-hover:scale-x-100"
                  />
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.cv}
                download
                className="rounded-full border border-line px-4 py-2 font-bold transition-colors hover:border-champagne hover:text-champagne"
              >
                Descargar CV
              </a>
            </li>
          </ul>
        </nav>
      </div>
      {/* Barra de progreso de lectura */}
      <motion.div
        aria-hidden
        className="h-[2px] origin-left bg-champagne"
        style={{ scaleX: scrollYProgress }}
      />
    </header>
  );
}
