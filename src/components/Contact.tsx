"use client";

import { motion } from "motion/react";
import { profile } from "@/data/profile";
import { Container, GridLines, Magnetic } from "./ui";

export function Contact() {
  const links = [
    { href: profile.linkedin, label: "LinkedIn", external: true },
    { href: profile.github, label: "GitHub", external: true },
    { href: profile.cv, label: "Descargar CV", external: false },
  ];

  return (
    <section id="contacto" className="relative scroll-mt-24 overflow-hidden border-t border-line-strong pb-16 pt-28">
      <GridLines />
      <Container className="relative">
        <h2 className="display overflow-hidden pb-[0.06em] text-[clamp(4rem,17vw,14rem)]">
          <motion.span
            className="block"
            initial={{ y: "105%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Hablemos
          </motion.span>
        </h2>

        <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-5">
          <p className="text-lg leading-relaxed text-muted md:col-span-5 md:text-xl">
            Busco sumarme a un equipo como desarrollador frontend. La forma más rápida de
            contactarme es por mail.
          </p>
          <div className="md:col-span-7 md:text-right">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-block break-all text-[clamp(1.5rem,4vw,3rem)] font-bold tracking-tight"
            >
              {profile.email}
              <span
                aria-hidden
                className="mt-1 block h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100 md:origin-right"
              />
            </a>
            <ul className="mt-8 flex flex-wrap gap-3 md:justify-end">
              {links.map((link) => (
                <li key={link.label}>
                  <Magnetic>
                    <a
                      href={link.href}
                      {...(link.external ? { target: "_blank", rel: "noreferrer" } : { download: true })}
                      className="inline-block rounded-full border border-line-strong px-6 py-3 transition-colors hover:bg-accent hover:text-accent-fg"
                    >
                      {link.label}
                    </a>
                  </Magnetic>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-28 text-sm text-muted">{profile.name}. Hecho con Next.js, Tailwind CSS y Motion.</p>
      </Container>
    </section>
  );
}
