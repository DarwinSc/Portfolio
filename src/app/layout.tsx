import type { Metadata } from "next";
import "@fontsource-variable/archivo/wdth.css";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Darwin Sierra | Desarrollador frontend",
  description:
    "Portfolio de Darwin Sierra, desarrollador frontend en Buenos Aires. React, Next.js y TypeScript.",
  openGraph: {
    title: "Darwin Sierra | Desarrollador frontend",
    description: "React, Next.js y TypeScript. Proyectos, recorrido y contacto.",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
