"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// Orden real de los números en una ruleta europea (sentido horario desde el 0).
const WHEEL = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14,
  31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];
const RED = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);
const POCKET = 360 / WHEEL.length;

type Mode = "rueda" | "docenas";
type Heat = "hot" | "warm" | "cold" | "idle";

const HEAT: Record<Heat, { color: string; label: string }> = {
  hot: { color: "#ef4444", label: "Caliente" },
  warm: { color: "#facc15", label: "Media" },
  cold: { color: "#8b5a2b", label: "Fría" },
  idle: { color: "#3f3f46", label: "Sin datos" },
};

const SECTOR_NAMES = ["Tercio 1", "Tercio 2", "Tercio 3"];

// Versión de demostración: alcanza para ver cómo funciona, no para usarla en serio.
const DEMO_LIMIT = 15;

// Tercios geométricos: la rueda se corta en 3 arcos de ~120°, siguiendo el borde
// de las casillas (37 no se divide en 3, así que quedan 12, 13 y 12 casillas).
const SECTOR_START = [0, 12, 25, 37];
function wheelSector(n: number) {
  const i = WHEEL.indexOf(n);
  return i < 12 ? 0 : i < 25 ? 1 : 2;
}
// Alternativa por docenas del paño (1-12, 13-24, 25-36). El 0 no suma a ninguna.
function dozenSector(n: number) {
  return n === 0 ? -1 : Math.floor((n - 1) / 12);
}

function heatOf(counts: number[]): Heat[] {
  const max = Math.max(...counts);
  const min = Math.min(...counts);
  if (max === 0) return ["idle", "idle", "idle"];
  if (max === min) return ["warm", "warm", "warm"];
  return counts.map((c) => (c === max ? "hot" : c === min ? "cold" : "warm"));
}

function polar(cx: number, cy: number, r: number, deg: number) {
  const a = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}
function arc(cx: number, cy: number, r1: number, r2: number, a1: number, a2: number) {
  const [x1, y1] = polar(cx, cy, r2, a1);
  const [x2, y2] = polar(cx, cy, r2, a2);
  const [x3, y3] = polar(cx, cy, r1, a2);
  const [x4, y4] = polar(cx, cy, r1, a1);
  const large = a2 - a1 > 180 ? 1 : 0;
  return `M${x1} ${y1} A${r2} ${r2} 0 ${large} 1 ${x2} ${y2} L${x3} ${y3} A${r1} ${r1} 0 ${large} 0 ${x4} ${y4}Z`;
}

const pocketColor = (n: number) => (n === 0 ? "#15803d" : RED.has(n) ? "#b91c1c" : "#18181b");

export function Ruleta() {
  const [spins, setSpins] = useState<number[]>([]);
  const [mode, setMode] = useState<Mode>("rueda");
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const sectorOf = mode === "rueda" ? wheelSector : dozenSector;

  const counts = useMemo(() => {
    const c = [0, 0, 0];
    for (const n of spins) {
      const s = sectorOf(n);
      if (s >= 0) c[s]++;
    }
    return c;
  }, [spins, sectorOf]);
  const heats = heatOf(counts);
  const counted = counts[0] + counts[1] + counts[2];
  const zeros = spins.filter((n) => n === 0).length;
  const last = spins.at(-1);

  function add(n: number) {
    if (spins.length >= DEMO_LIMIT) {
      setError(`La demo permite hasta ${DEMO_LIMIT} números. Reiniciá la sesión para seguir probando.`);
      return;
    }
    setSpins((s) => [...s, n]);
    setError("");
    setConfirmReset(false);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (draft.trim() === "") return;
    const n = Number(draft);
    if (!Number.isInteger(n) || n < 0 || n > 36) {
      setError("Ingresá un número del 0 al 36.");
      return;
    }
    add(n);
    setDraft("");
  }

  // Carga rápida: con dos dígitos válidos se registra solo, sin Enter.
  function onDraft(v: string) {
    const clean = v.replace(/\D/g, "").slice(0, 2);
    setError("");
    if (clean.length === 2) {
      const n = Number(clean);
      if (n <= 36) {
        add(n);
        setDraft("");
        return;
      }
      setError("Ingresá un número del 0 al 36.");
    }
    setDraft(clean);
  }

  function undo() {
    setSpins((s) => s.slice(0, -1));
    setConfirmReset(false);
  }

  function reset() {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    setSpins([]);
    setConfirmReset(false);
    inputRef.current?.focus();
  }

  useEffect(() => {
    if (!confirmReset) return;
    const t = setTimeout(() => setConfirmReset(false), 3000);
    return () => clearTimeout(t);
  }, [confirmReset]);

  const C = 200;
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      <p className="border-b border-zinc-800 bg-zinc-900 px-4 py-2 text-center text-sm text-zinc-300">
        Versión de demostración · hasta {DEMO_LIMIT} números por sesión · Desarrollado por Darwin Sierra
      </p>
      <div className="mx-auto grid max-w-[1400px] gap-6 px-4 py-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:px-8">
        {/* Columna izquierda: ruleta */}
        <section className="flex min-w-0 flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
          <header className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Ruleta europea</h1>
              <p className="text-sm text-zinc-400">Mapa de calor por tercio, en vivo</p>
            </div>
            <div className="flex rounded-full border border-zinc-700 p-1 text-sm" role="group" aria-label="Cómo se arman los tercios">
              {(["rueda", "docenas"] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  aria-pressed={mode === m}
                  className={`rounded-full px-4 py-1.5 transition-colors ${mode === m ? "bg-zinc-100 font-semibold text-zinc-900" : "text-zinc-300 hover:text-white"}`}
                >
                  {m === "rueda" ? "Tercios de la rueda" : "Docenas"}
                </button>
              ))}
            </div>
          </header>

          <svg viewBox={`0 0 ${C * 2} ${C * 2}`} className="mx-auto w-full max-w-[560px]" role="img" aria-label="Ruleta con los tercios coloreados según su frecuencia">
            {/* Anillo exterior: un arco por tercio con su color de calor */}
            {mode === "rueda" &&
              [0, 1, 2].map((s) => (
                <path
                  key={s}
                  d={arc(C, C, 168, 196, SECTOR_START[s] * POCKET + 0.6, SECTOR_START[s + 1] * POCKET - 0.6)}
                  fill={HEAT[heats[s]].color}
                  style={{ transition: "fill .35s" }}
                />
              ))}
            {/* Casillas */}
            {WHEEL.map((n, i) => {
              const a1 = i * POCKET;
              const a2 = a1 + POCKET;
              const s = sectorOf(n);
              const [tx, ty] = polar(C, C, 150, a1 + POCKET / 2);
              const isLast = n === last;
              return (
                <g key={n}>
                  <path d={arc(C, C, 128, 166, a1, a2)} fill={pocketColor(n)} stroke="#09090b" strokeWidth={1} />
                  {mode === "docenas" && s >= 0 && (
                    <path d={arc(C, C, 168, 196, a1 + 0.3, a2 - 0.3)} fill={HEAT[heats[s]].color} style={{ transition: "fill .35s" }} />
                  )}
                  {isLast && <path d={arc(C, C, 128, 166, a1, a2)} fill="none" stroke="#fafafa" strokeWidth={3} />}
                  <text
                    x={tx}
                    y={ty}
                    fill="#fafafa"
                    fontSize={11}
                    fontWeight={700}
                    textAnchor="middle"
                    dominantBaseline="central"
                    transform={`rotate(${a1 + POCKET / 2} ${tx} ${ty})`}
                  >
                    {n}
                  </text>
                </g>
              );
            })}
            {/* Divisiones de los tercios de la rueda */}
            {mode === "rueda" &&
              SECTOR_START.slice(0, 3).map((i) => {
                const a = i * POCKET;
                const [x1, y1] = polar(C, C, 128, a);
                const [x2, y2] = polar(C, C, 198, a);
                return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fafafa" strokeWidth={2} />;
              })}
            {/* Centro */}
            <circle cx={C} cy={C} r={124} fill="#0c0c0e" stroke="#27272a" />
            <text x={C} y={C - 62} textAnchor="middle" fill="#a1a1aa" fontSize={13}>
              Último número
            </text>
            <text
              x={C}
              y={C + 14}
              textAnchor="middle"
              fill={last === undefined ? "#52525b" : last === 0 ? "#22c55e" : RED.has(last) ? "#f87171" : "#fafafa"}
              fontSize={76}
              fontWeight={800}
            >
              {last ?? "–"}
            </text>
            <text x={C} y={C + 56} textAnchor="middle" fill="#a1a1aa" fontSize={13}>
              {spins.length} {spins.length === 1 ? "tirada" : "tiradas"}
            </text>
          </svg>

          <ul className="flex flex-wrap justify-center gap-4 text-sm text-zinc-300">
            {(["hot", "warm", "cold"] as Heat[]).map((h) => (
              <li key={h} className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ background: HEAT[h].color }} />
                {HEAT[h].label}
              </li>
            ))}
          </ul>
        </section>

        {/* Columna derecha: panel de control */}
        <section className="flex min-w-0 flex-col gap-5">
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((s) => {
              const pct = counted ? Math.round((counts[s] / counted) * 1000) / 10 : 0;
              const range = mode === "docenas" ? `${s * 12 + 1}–${s * 12 + 12}` : `${WHEEL.filter((n) => wheelSector(n) === s).length} casillas`;
              return (
                <div key={s} className="min-w-0 rounded-2xl border border-zinc-800 bg-zinc-950 p-3 sm:p-4" style={{ boxShadow: `inset 0 3px 0 ${HEAT[heats[s]].color}` }}>
                  <p className="text-sm text-zinc-400">{SECTOR_NAMES[s]}</p>
                  <p className="text-xs text-zinc-500">{range}</p>
                  <p className="mt-2 text-2xl font-extrabold tabular-nums sm:text-3xl">{pct.toFixed(1)}%</p>
                  <p className="text-sm tabular-nums text-zinc-400">
                    {counts[s]} {counts[s] === 1 ? "salida" : "salidas"} · <span style={{ color: HEAT[heats[s]].color }}>{HEAT[heats[s]].label}</span>
                  </p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-800">
                    <div className="h-full rounded-full transition-[width] duration-300" style={{ width: `${pct}%`, background: HEAT[heats[s]].color }} />
                  </div>
                </div>
              );
            })}
          </div>
          {mode === "docenas" && zeros > 0 && (
            <p className="-mt-2 text-sm text-zinc-400">El 0 salió {zeros} {zeros === 1 ? "vez" : "veces"} y no suma a ninguna docena.</p>
          )}

          <form onSubmit={submit} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            <label htmlFor="numero" className="text-sm text-zinc-400">
              Número que salió (con 2 dígitos se carga solo; para 0 al 9, Enter)
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="numero"
                ref={inputRef}
                autoFocus
                inputMode="numeric"
                autoComplete="off"
                value={draft}
                onChange={(e) => onDraft(e.target.value)}
                className="min-w-0 flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-2xl font-bold tabular-nums outline-none focus:border-zinc-300"
                placeholder="0–36"
              />
              <button className="rounded-xl bg-zinc-100 px-6 font-bold text-zinc-900 active:scale-95">Cargar</button>
            </div>
            {error && <p className="mt-2 text-sm text-red-400">{error}</p>}

            <div className="mt-4 grid grid-cols-[repeat(13,minmax(0,1fr))] gap-1">
              <button
                type="button"
                onClick={() => add(0)}
                className="row-span-3 rounded-lg bg-green-700 py-2 text-sm font-bold hover:brightness-125 active:scale-95"
              >
                0
              </button>
              {[3, 2, 1].map((row) =>
                Array.from({ length: 12 }, (_, c) => c * 3 + row).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => add(n)}
                    className={`rounded-lg py-2 text-sm font-bold tabular-nums hover:brightness-150 active:scale-95 ${RED.has(n) ? "bg-red-700" : "bg-zinc-800"}`}
                  >
                    {n}
                  </button>
                )),
              )}
            </div>
          </form>

          <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-semibold">Historial</h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={undo}
                  disabled={!spins.length}
                  className="rounded-full border border-zinc-700 px-4 py-1.5 text-sm hover:border-zinc-300 disabled:opacity-40"
                >
                  Deshacer último
                </button>
                <button
                  type="button"
                  onClick={reset}
                  disabled={!spins.length}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold disabled:opacity-40 ${confirmReset ? "bg-red-600 text-white" : "border border-zinc-700 hover:border-zinc-300"}`}
                >
                  {confirmReset ? "¿Seguro? Tocá de nuevo" : "Reiniciar sesión"}
                </button>
              </div>
            </div>
            {spins.length ? (
              <ol className="mt-3 flex max-h-48 flex-wrap content-start gap-1.5 overflow-y-auto">
                {[...spins].reverse().map((n, i) => {
                  const s = sectorOf(n);
                  return (
                    <li
                      key={spins.length - i}
                      title={s >= 0 ? SECTOR_NAMES[s] : "Cero"}
                      className="grid h-9 w-9 place-items-center rounded-lg text-sm font-bold tabular-nums"
                      style={{ background: pocketColor(n), boxShadow: s >= 0 ? `inset 0 -3px 0 ${HEAT[heats[s]].color}` : undefined, opacity: i === 0 ? 1 : 0.85 }}
                    >
                      {n}
                    </li>
                  );
                })}
              </ol>
            ) : (
              <p className="mt-3 text-sm text-zinc-500">Cargá el primer número con el teclado o tocando el paño.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
