import type { Metadata } from "next";
import { Ruleta } from "./Ruleta";

export const metadata: Metadata = {
  title: "Ruleta: mapa de calor por tercios | Demo",
  description: "Demo de un panel para registrar números de ruleta europea y ver la frecuencia de cada tercio en tiempo real.",
  robots: { index: false },
};

export default function Page() {
  return <Ruleta />;
}
