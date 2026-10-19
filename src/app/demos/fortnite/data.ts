import { cacheLife } from "next/cache";

// Datos públicos de https://fortnite-api.com (no oficial, sin clave).
const API = "https://fortnite-api.com/v2/cosmetics/br/search/all?type=outfit&language=es";

// La demo muestra solo los más recientes: alcanza para ver cómo funciona.
export const DEMO_LIMIT = 60;

export type Outfit = {
  id: string;
  name: string;
  description: string;
  rarity: { value: string; label: string };
  series: { label: string; colors: string[] } | null;
  set: string | null;
  intro: string | null;
  chapter: number | null;
  icon: string | null;
  featured: string | null;
  styles: { name: string; image: string }[];
  added: string;
};

type Raw = {
  id: string;
  name?: string;
  description?: string;
  rarity?: { value?: string; displayValue?: string };
  series?: { value?: string; colors?: string[] };
  set?: { value?: string };
  introduction?: { text?: string; chapter?: string };
  images?: { icon?: string; featured?: string; smallIcon?: string };
  variants?: { options?: { name?: string; image?: string }[] }[];
  added?: string;
};

function clean(r: Raw): Outfit {
  const styles = (r.variants ?? [])
    .flatMap((v) => v.options ?? [])
    .filter((o): o is { name: string; image: string } => Boolean(o.name && o.image))
    .slice(0, 8);
  return {
    id: r.id,
    name: r.name ?? "Sin nombre",
    description: r.description ?? "",
    rarity: { value: r.rarity?.value ?? "common", label: r.rarity?.displayValue ?? "Común" },
    series: r.series?.value ? { label: r.series.value, colors: (r.series.colors ?? []).map((c) => `#${c.slice(0, 6)}`) } : null,
    set: r.set?.value || null,
    intro: r.introduction?.text ?? null,
    chapter: r.introduction?.chapter ? Number(r.introduction.chapter) : null,
    icon: r.images?.icon ?? r.images?.smallIcon ?? null,
    featured: r.images?.featured ?? r.images?.icon ?? null,
    styles,
    added: r.added ?? "",
  };
}

export async function getOutfits(): Promise<{ items: Outfit[]; total: number } | null> {
  "use cache";
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error(String(res.status));
    const json = (await res.json()) as { data?: Raw[] };
    const all = (json.data ?? []).filter((r) => r.name && r.images?.icon);
    all.sort((a, b) => (b.added ?? "").localeCompare(a.added ?? ""));
    cacheLife("days");
    return { items: all.slice(0, DEMO_LIMIT).map(clean), total: all.length };
  } catch {
    // Si la API falla, se reintenta pronto en vez de guardar el error por días.
    cacheLife("minutes");
    return null;
  }
}
