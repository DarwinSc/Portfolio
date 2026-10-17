"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { projects, type Project } from "@/data/profile";
import { Reveal } from "./Reveal";

export function Projects() {
  return (
    <section id="proyectos" className="scroll-mt-20 py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="font-wide text-4xl sm:text-6xl">Proyectos</h2>
        </Reveal>
        <div className="mt-14 space-y-10">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Posición del puntero dentro de la tarjeta: mueve el reflejo de luz,
  // como la luz sobre la pintura de un auto.
  const mx = useMotionValue(50);
  const my = useMotionValue(30);
  const rx = useSpring(0, { stiffness: 150, damping: 18 });
  const ry = useSpring(0, { stiffness: 150, damping: 18 });
  const shine = useMotionTemplate`radial-gradient(520px circle at ${mx}% ${my}%, rgba(212,178,106,0.16), transparent 60%)`;

  function onMove(e: React.PointerEvent<HTMLElement>) {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    const px = ((e.clientX - box.left) / box.width) * 100;
    const py = ((e.clientY - box.top) / box.height) * 100;
    mx.set(px);
    my.set(py);
    if (!reduce) {
      ry.set((px - 50) / 18);
      rx.set(-(py - 50) / 18);
    }
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl border border-line bg-graphite p-7 sm:p-12"
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: shine }} />

      <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="text-sm text-champagne">Proyecto propio, en desarrollo</p>
          <h3 className="font-wide mt-3 text-5xl sm:text-6xl">{project.name}</h3>
          <p className="mt-5 text-lg leading-relaxed text-muted">{project.summary}</p>
          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Tecnologías">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line px-3 py-1 text-sm font-semibold transition-colors hover:border-champagne hover:text-champagne"
              >
                {tech}
              </li>
            ))}
          </ul>
          {(project.demoUrl || project.repoUrl) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-champagne px-6 py-3 font-bold text-black transition-transform active:scale-95"
                >
                  Probar la app
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-line px-6 py-3 font-bold transition-colors hover:border-text"
                >
                  Ver código
                </a>
              )}
            </div>
          )}
        </div>

        <ul className="space-y-1">
          {project.features.map((feature, i) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
              className="flex gap-4 border-t border-line py-4 leading-relaxed"
            >
              <span aria-hidden className="mt-2.5 h-1.5 w-4 shrink-0 rounded-full bg-champagne" />
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
