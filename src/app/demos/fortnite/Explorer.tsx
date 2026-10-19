"use client";

import { useEffect, useMemo, useState } from "react";
import type { Outfit } from "./data";

const RARITY: Record<string, { color: string; rank: number }> = {
  common: { color: "#8a8f98", rank: 0 },
  uncommon: { color: "#4caf3a", rank: 1 },
  rare: { color: "#2f8fe6", rank: 2 },
  epic: { color: "#a347e8", rank: 3 },
  legendary: { color: "#e8892f", rank: 4 },
  mythic: { color: "#e6c13a", rank: 5 },
  exotic: { color: "#4fd1d9", rank: 5 },
};

function tint(o: Outfit) {
  return RARITY[o.rarity.value]?.color ?? o.series?.colors[0] ?? "#6b6b80";
}
function rank(o: Outfit) {
  return RARITY[o.rarity.value]?.rank ?? 6;
}

type Sort = "nuevos" | "az" | "rareza";

export function Explorer({ items, total }: { items: Outfit[]; total: number }) {
  const [q, setQ] = useState("");
  const [rarity, setRarity] = useState<string | null>(null);
  const [set, setSet] = useState("");
  const [sort, setSort] = useState<Sort>("nuevos");
  const [open, setOpen] = useState<Outfit | null>(null);

  const rarities = useMemo(() => {
    const m = new Map<string, { label: string; color: string; n: number; rank: number }>();
    for (const o of items) {
      const cur = m.get(o.rarity.value);
      if (cur) cur.n++;
      else m.set(o.rarity.value, { label: o.rarity.label, color: tint(o), n: 1, rank: rank(o) });
    }
    return [...m.entries()].sort((a, b) => a[1].rank - b[1].rank);
  }, [items]);

  const sets = useMemo(() => [...new Set(items.map((o) => o.set).filter(Boolean) as string[])].sort((a, b) => a.localeCompare(b, "es")), [items]);

  const shown = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = items.filter(
      (o) =>
        (!term || o.name.toLowerCase().includes(term) || o.description.toLowerCase().includes(term)) &&
        (!rarity || o.rarity.value === rarity) &&
        (!set || o.set === set),
    );
    if (sort === "az") list.sort((a, b) => a.name.localeCompare(b.name, "es"));
    else if (sort === "rareza") list.sort((a, b) => rank(b) - rank(a) || a.name.localeCompare(b.name, "es"));
    else list.sort((a, b) => b.added.localeCompare(a.added));
    return list;
  }, [items, q, rarity, set, sort]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const clear = () => {
    setQ("");
    setRarity(null);
    setSet("");
  };

  return (
    <>
      <p className="border-b border-white/10 bg-white/5 px-4 py-2 text-center text-sm text-zinc-300">
        Versión de demostración · {items.length} de {total.toLocaleString("es-AR")} personajes · Desarrollado por Darwin Sierra
      </p>

      <div className="mx-auto grid max-w-[1400px] gap-6 px-4 py-8 lg:px-8">
        <header className="grid gap-2">
          <h1 className="text-4xl font-black uppercase italic tracking-tight md:text-6xl">
            Personajes <span className="text-[#a347e8]">de Fortnite</span>
          </h1>
          <p className="max-w-2xl text-zinc-400">
            Buscá cualquier traje y mirá su ficha: rareza, conjunto, temporada en que salió y estilos disponibles.
          </p>
        </header>

        {/* Filtros */}
        <section className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px_200px]">
            <label className="sr-only" htmlFor="buscar">Buscar personaje</label>
            <input
              id="buscar"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por nombre o descripción…"
              className="min-w-0 rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-lg outline-none focus:border-white/60"
            />
            <label className="sr-only" htmlFor="conjunto">Conjunto</label>
            <select id="conjunto" value={set} onChange={(e) => setSet(e.target.value)} className="rounded-xl border border-white/15 bg-black/40 px-3 py-3 outline-none focus:border-white/60">
              <option value="">Todos los conjuntos</option>
              {sets.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <label className="sr-only" htmlFor="orden">Ordenar</label>
            <select id="orden" value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="rounded-xl border border-white/15 bg-black/40 px-3 py-3 outline-none focus:border-white/60">
              <option value="nuevos">Más nuevos</option>
              <option value="az">Nombre (A–Z)</option>
              <option value="rareza">Más raros primero</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por rareza">
            <button
              onClick={() => setRarity(null)}
              aria-pressed={rarity === null}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${rarity === null ? "border-white bg-white font-semibold text-black" : "border-white/20 hover:border-white/60"}`}
            >
              Todas
            </button>
            {rarities.map(([value, r]) => (
              <button
                key={value}
                onClick={() => setRarity(rarity === value ? null : value)}
                aria-pressed={rarity === value}
                className="flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition-colors"
                style={rarity === value ? { background: r.color, borderColor: r.color, color: "#000", fontWeight: 600 } : { borderColor: `${r.color}66` }}
              >
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: r.color }} />
                {r.label}
                <span className="opacity-60">{r.n}</span>
              </button>
            ))}
          </div>
        </section>

        <p className="text-sm text-zinc-400" aria-live="polite">
          {shown.length} {shown.length === 1 ? "personaje" : "personajes"}
          {(q || rarity || set) && (
            <button onClick={clear} className="ml-3 underline underline-offset-4 hover:text-white">Limpiar filtros</button>
          )}
        </p>

        {/* Grilla */}
        {shown.length ? (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {shown.map((o) => {
              const c = tint(o);
              return (
                <li key={o.id}>
                  <button
                    onClick={() => setOpen(o)}
                    className="group relative block w-full overflow-hidden rounded-xl border border-white/10 text-left transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                    style={{ background: `radial-gradient(circle at 50% 35%, ${c}cc, ${c}33 60%, #0b0b12 100%)` }}
                  >
                    {o.icon && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={o.icon} alt="" loading="lazy" className="aspect-square w-full object-contain transition-transform duration-300 group-hover:scale-105" />
                    )}
                    <span className="absolute inset-x-0 bottom-0 block bg-gradient-to-t from-black/90 via-black/60 to-transparent px-3 pb-2 pt-8">
                      <span className="block truncate font-bold uppercase italic">{o.name}</span>
                      <span className="block text-xs" style={{ color: c }}>{o.rarity.label}</span>
                    </span>
                    <span className="absolute inset-x-0 bottom-0 h-1" style={{ background: c }} />
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="rounded-2xl border border-white/10 p-10 text-center text-zinc-400">
            No hay personajes con esos filtros.{" "}
            <button onClick={clear} className="underline underline-offset-4 hover:text-white">Limpiar filtros</button>
          </div>
        )}

        <p className="text-xs text-zinc-500">
          Datos de fortnite-api.com. Sitio no oficial, sin relación con Epic Games.
        </p>
      </div>

      {/* Ficha */}
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4 backdrop-blur-sm" onClick={() => setOpen(null)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={open.name}
            onClick={(e) => e.stopPropagation()}
            className="grid max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/15 bg-[#12121c] md:grid-cols-2"
          >
            <div className="relative min-h-[280px]" style={{ background: `radial-gradient(circle at 50% 40%, ${tint(open)}, ${tint(open)}44 65%, #12121c)` }}>
              {open.featured && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={open.featured} alt={open.name} className="h-full max-h-[480px] w-full object-contain" />
              )}
            </div>
            <div className="grid content-start gap-4 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: tint(open) }}>{open.rarity.label}</p>
                  <h2 className="text-3xl font-black uppercase italic">{open.name}</h2>
                </div>
                <button onClick={() => setOpen(null)} autoFocus className="rounded-full border border-white/20 px-3 py-1 text-sm hover:border-white" aria-label="Cerrar">
                  ✕
                </button>
              </div>
              {open.description && <p className="text-zinc-300">{open.description}</p>}
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                <dt className="text-zinc-500">Tipo</dt>
                <dd>Traje</dd>
                {open.set && (<><dt className="text-zinc-500">Conjunto</dt><dd>{open.set}</dd></>)}
                {open.series && (<><dt className="text-zinc-500">Serie</dt><dd>{open.series.label}</dd></>)}
                {open.intro && (<><dt className="text-zinc-500">Llegó en</dt><dd>{open.intro.replace("Introducido en ", "").replace(/\.$/, "")}</dd></>)}
              </dl>
              {open.styles.length > 1 && (
                <div className="grid gap-2">
                  <h3 className="text-sm text-zinc-500">Estilos ({open.styles.length})</h3>
                  <ul className="flex flex-wrap gap-2">
                    {open.styles.map((s) => (
                      <li key={s.image} title={s.name} className="w-16 overflow-hidden rounded-lg border border-white/10 bg-black/30">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={s.image} alt={s.name} loading="lazy" className="aspect-square w-full object-contain" />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
