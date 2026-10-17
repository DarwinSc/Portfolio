# Portfolio de Darwin Sierra

Sitio personal de Darwin Sierra, desarrollador frontend en Buenos Aires.

Hecho con **Next.js**, **TypeScript**, **Tailwind CSS** y **Motion**. El diseño toma como referencia el tablero de un auto deportivo de noche:

- Un tacómetro en SVG que hace el chequeo de encendido al cargar la página.
- Un botón **Arrancar motor** que acelera la aguja y genera un sonido de motor con la Web Audio API, sin archivos de audio.
- Un recorrido profesional cuya línea se enciende a medida que bajás.
- Una tarjeta de proyecto con reflejo de luz que sigue al puntero.
- Un ecualizador animado en la sección de habilidades.

Todas las animaciones respetan la opción del sistema "reducir movimiento".

## Cómo correrlo

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Cómo actualizar el contenido

Todos los textos y datos están en `src/data/profile.ts`. Para sumar un proyecto, agregalo al array `projects`; si tiene demo o repositorio, completá `demoUrl` y `repoUrl` y los botones aparecen solos.

El CV que se descarga está en `public/`. Si lo actualizás, reemplazá el PDF manteniendo el mismo nombre.

## Estructura

```
src/
  app/          layout, página principal y estilos globales
  components/   una sección por archivo (Hero, Tachometer, Projects, Journey, Skills, Contact)
  lib/          sonido de arranque (engine.ts)
  data/         contenido del sitio
public/         CV en PDF
```

## Deploy

Está pensado para publicarse en [Vercel](https://vercel.com): importás este repositorio y no hace falta configurar nada más.
