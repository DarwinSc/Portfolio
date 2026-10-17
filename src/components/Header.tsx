import { profile } from "@/data/profile";

const links = [
  { href: "#proyectos", label: "Proyectos" },
  { href: "#recorrido", label: "Recorrido" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
      <a href="#inicio" className="font-display text-lg font-bold tracking-tight">
        DS
        <span className="sr-only"> Darwin Sierra, volver al inicio</span>
      </a>
      <nav aria-label="Secciones">
        <ul className="flex items-center gap-4 text-sm sm:gap-6">
          {links.map((link) => (
            <li key={link.href} className="hidden sm:block">
              <a href={link.href} className="text-muted hover:text-ink">
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={profile.cv}
              download
              className="rounded-full border border-ink px-4 py-2 font-bold hover:bg-ink hover:text-paper"
            >
              Descargar CV
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
