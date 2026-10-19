import type { Metadata } from "next";
import { Suspense } from "react";
import { getOutfits } from "./data";
import { Explorer } from "./Explorer";

export const metadata: Metadata = {
  title: "Personajes de Fortnite | Demo",
  description: "Demo de una base de personajes de Fortnite con búsqueda, filtros y fichas detalladas.",
  robots: { index: false },
};

async function Content() {
  const data = await getOutfits();
  if (!data) {
    return (
      <p className="mx-auto max-w-xl px-4 py-24 text-center text-zinc-400">
        No se pudieron cargar los personajes en este momento. Recargá la página en un rato.
      </p>
    );
  }
  return <Explorer items={data.items} total={data.total} />;
}

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0b0b12] text-zinc-100">
      <Suspense fallback={<p className="px-4 py-24 text-center text-zinc-400">Cargando personajes…</p>}>
        <Content />
      </Suspense>
    </div>
  );
}
