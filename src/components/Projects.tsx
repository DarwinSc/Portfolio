"use client";

import { motion } from "motion/react";
import { projects, techColors, type Project } from "@/data/profile";
import { Container, SectionTitle } from "./ui";

export function Projects() {
  return (
    <section id="proyectos" className="scroll-mt-24 py-28">
      <Container>
        <SectionTitle>Proyectos</SectionTitle>
        <div className="mt-16 space-y-24">
          {projects.map((project) => (
            <ProjectBlock key={project.name} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProjectBlock({ project }: { project: Project }) {
  return (
    <article className="border-t border-line-strong pt-10">
      <div className="grid gap-8 md:grid-cols-12 md:gap-5">
        <div className="md:col-span-6">
          <p className="text-muted">Proyecto propio, en desarrollo</p>
          <h3 className="display mt-4 text-[clamp(3rem,8vw,6.5rem)]">{project.name}</h3>
        </div>
        <div className="md:col-span-6 lg:col-start-8 lg:col-span-5">
          <p className="text-xl leading-relaxed">{project.summary}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tecnologías">
            {project.stack.map((tech) => (
              <li key={tech} className="flex items-center gap-2 rounded-full border border-line-strong px-3 py-1 text-sm text-muted">
                <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: techColors[tech] ?? "var(--muted)" }} />
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
                  className="rounded-full bg-accent px-6 py-3 font-bold text-accent-fg transition-transform active:scale-95"
                >
                  Probar la app
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-line-strong px-6 py-3 transition-colors hover:bg-accent hover:text-accent-fg"
                >
                  Ver código
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <ul className="mt-16 grid border-l border-t border-line-strong sm:grid-cols-2 lg:grid-cols-3">
        {project.features.map((feature, i) => (
          <motion.li
            key={feature}
            className="group border-b border-r border-line-strong p-6 transition-colors duration-300 hover:bg-accent hover:text-accent-fg md:p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span aria-hidden className="mb-10 block h-px w-10 bg-accent transition-all duration-300 group-hover:w-20 group-hover:bg-accent-fg" />
            <p className="text-lg leading-snug">{feature}</p>
          </motion.li>
        ))}
      </ul>
    </article>
  );
}
