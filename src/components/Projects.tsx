import { projects } from "@/data/profile";

export function Projects() {
  return (
    <section id="proyectos" className="bg-surface py-20">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Proyectos</h2>

        <div className="mt-12 space-y-16">
          {projects.map((project) => (
            <article key={project.name} className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
              <div>
                <h3 className="font-display text-3xl font-bold">{project.name}</h3>
                <p className="mt-4 text-lg leading-relaxed text-muted">{project.summary}</p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tecnologías">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full bg-paper px-3 py-1 text-sm font-bold text-teal"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
                {(project.demoUrl || project.repoUrl) && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-ink px-5 py-2 font-bold text-paper hover:opacity-90"
                      >
                        Probar la app
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-line px-5 py-2 font-bold hover:border-ink"
                      >
                        Ver código
                      </a>
                    )}
                  </div>
                )}
              </div>

              <ul className="space-y-4">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-4 border-t border-line pt-4 leading-relaxed">
                    <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-signal" />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
