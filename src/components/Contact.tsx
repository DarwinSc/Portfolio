import { profile } from "@/data/profile";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section id="contacto" className="scroll-mt-20 border-t border-line bg-graphite py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="font-wide text-5xl sm:text-7xl">Hablemos</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Busco sumarme a un equipo como desarrollador frontend. La forma más rápida de
            contactarme es por mail.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <a
            href={`mailto:${profile.email}`}
            className="group mt-12 inline-block break-all text-[clamp(1.4rem,5vw,3.5rem)] font-bold"
            style={{ fontStretch: "112%" }}
          >
            {profile.email}
            <span
              aria-hidden
              className="mt-2 block h-[3px] origin-left scale-x-[0.25] bg-champagne transition-transform duration-500 ease-out group-hover:scale-x-100"
            />
          </a>
        </Reveal>

        <ul className="mt-12 flex flex-wrap gap-3 font-bold">
          {[
            { href: profile.linkedin, label: "LinkedIn", external: true },
            { href: profile.github, label: "GitHub", external: true },
            { href: profile.cv, label: "Descargar CV", external: false },
          ].map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noreferrer" } : { download: true })}
                className="inline-block rounded-full border border-line px-6 py-3 transition-all hover:-translate-y-0.5 hover:border-champagne hover:text-champagne"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-16 text-muted">{profile.offline}</p>
      </div>
    </section>
  );
}
