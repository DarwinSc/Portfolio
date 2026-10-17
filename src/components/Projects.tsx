"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
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
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <motion.article
      className="border border-line-strong"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease }}
    >
      {/* Cabecera: siempre visible. Al tocarla, se despliega el detalle. */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group grid w-full gap-6 p-6 text-left transition-colors duration-300 hover:bg-fg/[0.03] md:grid-cols-12 md:items-end md:gap-5 md:p-10"
      >
        <div className="md:col-span-6">
          <p className="text-muted">Proyecto propio, en desarrollo</p>
          <h3 className="display mt-4 text-[clamp(3rem,8vw,6.5rem)]" style={{ color: project.color }}>
            {project.name}
          </h3>
        </div>
        <div className="flex items-end justify-between gap-6 md:col-span-6">
          <ul className="flex flex-wrap gap-2" aria-label="Tecnologías">
            {project.stack.map((tech) => (
              <li key={tech} className="flex items-center gap-2 rounded-full border border-line-strong px-3 py-1 text-sm text-muted">
                <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: techColors[tech] ?? "var(--muted)" }} />
                {tech}
              </li>
            ))}
          </ul>
          <span className="flex shrink-0 items-center gap-3">
            <span className="hidden text-sm text-muted sm:inline">{open ? "Cerrar" : "Ver detalle"}</span>
            {/* El "+" gira 45° y se convierte en "×" al abrir */}
            <motion.span
              aria-hidden
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ duration: 0.4, ease }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-line-strong text-2xl leading-none transition-colors group-hover:bg-accent group-hover:text-accent-fg"
            >
              +
            </motion.span>
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease }}
            className="overflow-hidden"
          >
            <div className="grid gap-10 border-t border-line-strong p-6 md:grid-cols-12 md:gap-5 md:p-10">
              <div className="md:col-span-5">
                <p className="text-xl leading-relaxed">{project.summary}</p>
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

              <ul className="space-y-0 md:col-span-6 md:col-start-7">
                {project.features.map((feature, i) => (
                  <motion.li
                    key={feature}
                    className="flex gap-4 border-b border-line py-4 text-lg leading-snug last:border-b-0"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.45, ease }}
                  >
                    <span aria-hidden className="mt-3 h-px w-6 shrink-0 bg-muted" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
