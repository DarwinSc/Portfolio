import { profile } from "@/data/profile";

export function Hero() {
  const [first, last] = profile.name.split(" ");

  return (
    <section
      id="inicio"
      className="mx-auto grid w-full max-w-5xl gap-10 px-4 pb-20 pt-12 sm:px-6 md:grid-cols-[1.4fr_1fr] md:items-end md:pt-20"
    >
      <div>
        <h1 className="font-display text-[clamp(3.5rem,13vw,8.5rem)] font-bold leading-[0.88] tracking-[-0.04em]">
          {first}
          <br />
          {last}
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
          <strong className="font-bold text-ink">{profile.role}.</strong> {profile.intro}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-ink px-6 py-3 font-bold text-paper hover:opacity-90"
          >
            Escribime
          </a>
          <a
            href="#proyectos"
            className="rounded-full border border-line px-6 py-3 font-bold hover:border-ink"
          >
            Ver proyectos
          </a>
        </div>
      </div>

      <aside
        aria-label="En qué estoy trabajando"
        className="border-l-4 border-signal bg-surface p-6 shadow-[6px_6px_0_var(--line)]"
      >
        <p className="text-sm text-muted">En qué estoy trabajando</p>
        <p className="mt-2 font-display text-3xl font-bold">{profile.now.title}</p>
        <p className="mt-3 leading-relaxed">{profile.now.text}</p>
        <p className="mt-5 text-sm text-muted">{profile.location}</p>
      </aside>
    </section>
  );
}
