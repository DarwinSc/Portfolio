import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section id="contacto" className="mx-auto w-full max-w-5xl px-4 py-24 sm:px-6">
      <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Hablemos</h2>
      <p className="mt-4 max-w-xl text-lg text-muted">
        Estoy buscando sumarme a un equipo como desarrollador frontend. La forma más rápida de
        contactarme es por mail.
      </p>

      <a
        href={`mailto:${profile.email}`}
        className="mt-10 inline-block break-all font-display text-[clamp(1.5rem,5vw,3.25rem)] font-bold underline decoration-signal decoration-4 underline-offset-8 hover:decoration-ink"
      >
        {profile.email}
      </a>

      <ul className="mt-10 flex flex-wrap gap-6 font-bold">
        <li>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-teal">
            LinkedIn
          </a>
        </li>
        <li>
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-teal">
            GitHub
          </a>
        </li>
        <li>
          <a href={profile.cv} download className="hover:text-teal">
            Descargar CV
          </a>
        </li>
      </ul>
    </section>
  );
}
