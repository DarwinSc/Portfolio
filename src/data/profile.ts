// Todos los datos del portfolio viven acá.
// Para actualizar el sitio, editá este archivo: no hace falta tocar los componentes.

export const profile = {
  name: "Darwin Sierra",
  role: "Desarrollador frontend",
  intro:
    "Construyo interfaces web con React, Next.js y TypeScript. Más de tres años desarrollando para empresas de logística y del rubro financiero.",
  location: "Buenos Aires, Argentina",
  email: "darwinsierra.c@gmail.com",
  linkedin: "https://www.linkedin.com/in/darwinsierra",
  github: "https://github.com/DarwinSc",
  cv: "/CV_Darwin_Sierra_Desarrollador_Frontend.pdf",
  // Cuando tengas una foto, guardala en /public (por ejemplo /public/foto.jpg)
  // y poné acá "/foto.jpg". Se muestra en blanco y negro y toma color al pasar el mouse.
  photo: "",
  now: {
    title: "DsCash",
    text: "Una PWA de finanzas personales con Next.js 14, Supabase e inteligencia artificial.",
  },
};

export type Project = {
  name: string;
  summary: string;
  // Color de marca del proyecto: se usa en el título de la tarjeta.
  color: string;
  features: string[];
  stack: string[];
  // Dejá el string vacío si todavía no hay link: el botón no se muestra.
  demoUrl: string;
  repoUrl: string;
};

export const projects: Project[] = [
  {
    name: "DsCash",
    color: "#8b5cf6",
    summary:
      "Aplicación de finanzas personales pensada para la realidad argentina: gastos en pesos y en dólares, grupos para dividir cuentas y metas de ahorro.",
    features: [
      "Escaneo de comprobantes con inteligencia artificial para cargar gastos sin tipear.",
      "Multimoneda con la cotización del dólar blue en tiempo real.",
      "Grupos de gastos compartidos para dividir cuentas entre amigos o en pareja.",
      "Desafíos de ahorro para sostener metas en el tiempo.",
      "Instalable como app en el celular (PWA).",
    ],
    stack: ["Next.js 14", "TypeScript", "Supabase", "Vercel Edge", "IA"],
    demoUrl: "https://dscash.vercel.app/",
    repoUrl: "",
  },
];

export type Stop = {
  period: string;
  title: string;
  place: string;
  detail: string;
  kind: "work" | "break" | "current";
};

// El recorrido va del más reciente al más antiguo.
export const journey: Stop[] = [
  {
    period: "Feb 2026 – hoy",
    title: "Desarrollador frontend y fundador",
    place: "DsCash, proyecto propio",
    detail: "Diseño y desarrollo de una PWA de finanzas personales con Next.js, Supabase e IA.",
    kind: "current",
  },
  {
    period: "Ene 2024 – Dic 2025",
    title: "Pausa profesional",
    place: "Cuidado de un familiar y viajes",
    detail: "Un año y tres meses dedicado al cuidado de un familiar y nueve meses de viaje.",
    kind: "break",
  },
  {
    period: "Sep 2022 – Dic 2023",
    title: "Frontend developer",
    place: "Anclap",
    detail:
      "Nuevas funcionalidades con React, Next.js y TypeScript, refactorización de componentes y manejo de estado con Redux.",
    kind: "work",
  },
  {
    period: "Feb 2022 – Sep 2022",
    title: "Frontend developer",
    place: "Andreani Grupo Logístico",
    detail: "Nuevas funcionalidades para el sistema interno PWA del área de depósito.",
    kind: "work",
  },
  {
    period: "Ene 2021 – Feb 2022",
    title: "Frontend developer",
    place: "Vía Cargo",
    detail: "Nuevos componentes de interfaz y cambios de diseño con React, Next.js y Bootstrap.",
    kind: "work",
  },
  {
    period: "May 2020 – Dic 2020",
    title: "Frontend developer",
    place: "CarOk",
    detail: "Desarrollo de una aplicación web de e-commerce con React.",
    kind: "work",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Lenguajes", items: ["JavaScript", "TypeScript", "HTML5", "CSS3"] },
  { group: "Frameworks", items: ["React", "Next.js", "Redux"] },
  {
    group: "Interfaces",
    items: ["Sass", "Material UI", "Bootstrap", "Diseño responsive", "Mobile-first", "Figma"],
  },
  { group: "Servicios", items: ["Supabase", "Vercel", "AWS", "Azure", "APIs REST"] },
  { group: "Forma de trabajo", items: ["Git", "GitHub", "GitLab", "Jira", "Metodologías ágiles"] },
];

// Palabras de la cinta animada debajo del inicio.
export const marquee = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Supabase",
  "Redux",
  "Sass",
  "Figma",
  "Git",
  "Vercel",
];

// Color de referencia del logo de cada tecnología. Las que tienen logo
// blanco o negro (Next.js, Vercel, GitHub) quedan en blanco. Algunos tonos
// muy oscuros se aclararon un poco para que se lean sobre el fondo negro.
export const techColors: Record<string, string> = {
  React: "#61dafb",
  "Next.js": "#ffffff",
  TypeScript: "#3d8bd8",
  JavaScript: "#f7df1e",
  HTML5: "#e34f26",
  CSS3: "#2f8fd8",
  Redux: "#9a6fe0",
  Sass: "#cc6699",
  "Material UI": "#2f8fff",
  Bootstrap: "#9a73d9",
  Figma: "#f24e1e",
  Supabase: "#3ecf8e",
  Vercel: "#ffffff",
  AWS: "#ff9900",
  Azure: "#2a95ec",
  Git: "#f05032",
  GitHub: "#ffffff",
  GitLab: "#fc6d26",
  Jira: "#4c9aff",
  "Next.js 14": "#ffffff",
  "Vercel Edge": "#ffffff",
};

export const education = {
  title: "Técnico Superior Universitario en Informática",
  place: "IUT Región Los Andes, Táchira, Venezuela",
  period: "2009 – 2011",
};
