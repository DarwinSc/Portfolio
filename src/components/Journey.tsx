import { journey, type Stop } from "@/data/profile";

const markerStyle: Record<Stop["kind"], string> = {
  current: "bg-signal border-signal",
  work: "bg-paper border-ink",
  break: "bg-paper border-muted border-dashed",
};

export function Journey() {
  return (
    <section id="recorrido" className="mx-auto w-full max-w-5xl px-4 py-20 sm:px-6">
      <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Recorrido</h2>
      <p className="mt-4 max-w-xl text-lg text-muted">
        De lo más reciente a mis comienzos como desarrollador.
      </p>

      <ol className="relative mt-12">
        {/* La ruta: una franja de asfalto con línea central */}
        <div aria-hidden className="road absolute bottom-0 left-[11px] top-0 w-6 rounded-full md:left-[calc(10.5rem+11px)]" />

        {journey.map((stop) => (
          <li
            key={stop.period + stop.place}
            className="relative grid gap-1 pb-12 pl-14 last:pb-0 md:grid-cols-[10.5rem_1fr] md:gap-0 md:pl-0"
          >
            <p className="whitespace-nowrap text-sm font-bold text-muted md:pr-6 md:pt-1 md:text-right">{stop.period}</p>

            <span
              aria-hidden
              className={`absolute left-[5px] top-0 h-9 w-9 rounded-full border-4 md:left-[calc(10.5rem+5px)] ${markerStyle[stop.kind]}`}
            />

            <div className="md:pl-20">
              <h3 className="font-display text-2xl font-bold">{stop.title}</h3>
              <p className="font-bold text-teal">{stop.place}</p>
              <p className="mt-2 max-w-xl leading-relaxed text-muted">{stop.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
