import type { Metadata } from "next";
import "@fontsource-variable/merriweather";
import "@fontsource-variable/inter";

export const metadata: Metadata = {
  title: "Portal de noticias | Propuesta de diseño",
  description: "Maqueta de diseño para un blog de noticias en Blogger.",
  robots: { index: false },
};

// Contenido de ejemplo: muestra cómo se ve la plantilla con notas cargadas.
const SECCIONES = ["Actualidad", "Economía", "Tecnología", "Deportes", "Cultura", "Opinión"];

const COLOR: Record<string, string> = {
  Actualidad: "#c0392b",
  Economía: "#1f7a4d",
  Tecnología: "#2463b8",
  Deportes: "#d46a00",
  Cultura: "#7d3cb5",
  Opinión: "#4a4a4a",
};

function Img({ seed, className = "" }: { seed: number; className?: string }) {
  // Imagen de relleno: degradé por nota, hasta que se carguen las fotos reales.
  const hues = [200, 25, 145, 265, 0, 45, 175, 320];
  const h = hues[seed % hues.length];
  return (
    <div
      aria-hidden
      className={`relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, hsl(${h} 45% 38%), hsl(${(h + 40) % 360} 55% 62%))` }}
    >
      <span className="absolute bottom-2 right-3 text-[10px] uppercase tracking-widest text-white/70">Foto</span>
    </div>
  );
}

function Tag({ s }: { s: string }) {
  return (
    <span className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: COLOR[s] }}>
      {s}
    </span>
  );
}

const notas = [
  { s: "Actualidad", t: "Título de la nota principal del día, con espacio para dos o tres líneas de texto", b: "Bajada de la nota: un resumen de una o dos oraciones que cuenta lo más importante y engancha al lector para que siga leyendo." },
  { s: "Economía", t: "Así se verá una nota destacada de la sección Economía" },
  { s: "Tecnología", t: "Las notas secundarias muestran foto, sección y título" },
  { s: "Deportes", t: "Cada sección tiene su color para ubicarse rápido" },
  { s: "Cultura", t: "Título de ejemplo para una nota de la sección Cultura" },
  { s: "Economía", t: "Las últimas noticias aparecen en orden en la columna lateral" },
  { s: "Tecnología", t: "El diseño se adapta solo al celular, donde se lee la mayoría de las noticias" },
  { s: "Deportes", t: "Título de ejemplo para una nota de Deportes con dos líneas" },
  { s: "Opinión", t: "Columna de opinión: con foto del autor y nombre destacado" },
];

export default function Page() {
  return (
    <div
      className="min-h-screen bg-[#faf8f4] text-[#1a1a1a]"
      style={{ "--f-serif": "'Merriweather Variable', Georgia, serif", "--f-sans": "'Inter Variable', system-ui, sans-serif", fontFamily: "var(--f-sans)" } as React.CSSProperties}
    >
      <p className="bg-[#1a1a1a] px-4 py-2 text-center text-xs text-white/80">
        Propuesta de diseño para Blogger · Contenido de ejemplo · Desarrollado por Darwin Sierra
      </p>

      {/* Cabecera */}
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 text-xs text-black/60">
          <span>Lunes 19 de octubre de 2026</span>
          <span className="hidden sm:inline">Suscribite al newsletter · Seguinos en redes</span>
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-4 pt-2 text-center">
          <p className="text-4xl font-black tracking-tight sm:text-6xl" style={{ fontFamily: "var(--f-serif)" }}>
            El Diario <span className="text-[#c0392b]">Digital</span>
          </p>
          <p className="mt-1 text-sm text-black/50">Nombre y logo del medio</p>
        </div>
        <nav className="border-t border-black/10" aria-label="Secciones">
          <ul className="mx-auto flex max-w-6xl gap-6 overflow-x-auto px-4 py-3 text-sm font-semibold">
            <li className="shrink-0 text-black">Inicio</li>
            {SECCIONES.map((s) => (
              <li key={s} className="shrink-0 border-b-2 border-transparent pb-0.5 hover:border-current" style={{ color: COLOR[s] }}>
                {s}
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Último momento */}
      <div className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-3 overflow-hidden px-4 py-2 text-sm">
          <span className="shrink-0 rounded bg-[#c0392b] px-2 py-0.5 text-xs font-bold uppercase text-white">Último momento</span>
          <span className="truncate">Barra de noticias de último momento: se actualiza sola con las notas marcadas como urgentes.</span>
        </div>
      </div>

      <main className="mx-auto grid max-w-6xl gap-10 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="grid min-w-0 gap-10">
          {/* Nota principal */}
          <article className="grid gap-4">
            <Img seed={0} className="aspect-[16/9] w-full rounded-sm" />
            <Tag s={notas[0].s} />
            <h1 className="text-3xl font-black leading-tight sm:text-4xl" style={{ fontFamily: "var(--f-serif)", textWrap: "balance" }}>
              {notas[0].t}
            </h1>
            <p className="max-w-2xl text-lg text-black/70">{notas[0].b}</p>
            <p className="text-xs text-black/50">Por Redacción · hace 2 horas · 4 min de lectura</p>
          </article>

          {/* Destacadas */}
          <section className="grid gap-6 border-t border-black/10 pt-6 sm:grid-cols-3">
            {notas.slice(1, 4).map((n, i) => (
              <article key={i} className="grid content-start gap-2">
                <Img seed={i + 1} className="aspect-[4/3] w-full rounded-sm" />
                <Tag s={n.s} />
                <h2 className="text-lg font-bold leading-snug" style={{ fontFamily: "var(--f-serif)" }}>{n.t}</h2>
              </article>
            ))}
          </section>

          {/* Bloque por sección */}
          <section className="grid gap-4 border-t-4 pt-4" style={{ borderColor: COLOR.Economía }}>
            <h2 className="text-xl font-black uppercase tracking-wide" style={{ color: COLOR.Economía }}>Economía</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {[notas[1], notas[5]].map((n, i) => (
                <article key={i} className="grid grid-cols-[120px_minmax(0,1fr)] gap-3">
                  <Img seed={i + 5} className="aspect-square w-full rounded-sm" />
                  <div className="grid content-start gap-1">
                    <h3 className="font-bold leading-snug" style={{ fontFamily: "var(--f-serif)" }}>{n.t}</h3>
                    <p className="text-xs text-black/50">hace {i + 3} horas</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* Columna lateral */}
        <aside className="grid content-start gap-8">
          <section className="grid gap-3">
            <h2 className="border-b-2 border-black pb-1 text-sm font-black uppercase tracking-widest">Lo último</h2>
            <ol className="grid gap-4">
              {notas.slice(4, 8).map((n, i) => (
                <li key={i} className="grid grid-cols-[28px_minmax(0,1fr)] gap-2">
                  <span className="text-2xl font-black text-black/20" style={{ fontFamily: "var(--f-serif)" }}>{i + 1}</span>
                  <div className="grid gap-1">
                    <Tag s={n.s} />
                    <p className="font-semibold leading-snug">{n.t}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="grid gap-3 rounded-sm bg-white p-4 shadow-sm">
            <Tag s="Opinión" />
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-black/10 text-xs text-black/50">Foto</span>
              <p className="text-sm font-semibold">Nombre del columnista</p>
            </div>
            <p className="font-bold leading-snug" style={{ fontFamily: "var(--f-serif)" }}>{notas[8].t}</p>
          </section>

          <section className="grid gap-2 rounded-sm bg-[#1a1a1a] p-5 text-white">
            <p className="text-lg font-bold" style={{ fontFamily: "var(--f-serif)" }}>Recibí las noticias en tu mail</p>
            <p className="text-sm text-white/70">Formulario de suscripción de Blogger, integrado al diseño.</p>
            <div className="mt-2 rounded-sm bg-white/10 px-3 py-2 text-sm text-white/50">tu@email.com</div>
          </section>
        </aside>
      </main>

      <footer className="border-t border-black/10 bg-white">
        <div className="mx-auto grid max-w-6xl gap-2 px-4 py-6 text-sm text-black/60 sm:flex sm:justify-between">
          <span>© El Diario Digital · Nombre del medio</span>
          <span>Secciones · Contacto · Política de privacidad</span>
        </div>
      </footer>
    </div>
  );
}
