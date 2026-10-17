# Portfolio de Darwin Sierra

Sitio personal de Darwin Sierra, desarrollador frontend en Buenos Aires.

Hecho con **Next.js**, **TypeScript**, **Tailwind CSS** y **Motion**. Estética de estudio de diseño: blanco y negro, grilla de 12 columnas visible y una sola tipografía (Bricolage Grotesque) a escalas muy distintas.

- Nombre gigante que aparece letra por letra al cargar.
- Destellos suaves de colores que recorren las líneas de la grilla.
- Cinta animada con el stack, cada tecnología con el color de su logo (o una foto en blanco y negro que toma color al pasar el mouse, si se completa `photo` en `profile.ts`).
- Botones magnéticos que siguen levemente al puntero.
- Recorrido como índice: los bordes de cada fila resplandecen con un color al azar de la paleta de tecnologías al pasar el mouse.
- Proyectos como tarjetas desplegables: se abren para ver el detalle.
- Herramientas con el color de referencia de cada logo, que se enciende al pasar el mouse.
- Títulos de sección que entran deslizándose y barra de progreso de lectura.

Todas las animaciones respetan la opción del sistema "reducir movimiento".

## Cómo correrlo

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Cómo actualizar el contenido

Todos los textos y datos están en `src/data/profile.ts`. Para sumar tu foto, guardala en `public/` y completá el campo `photo` (por ejemplo `"/foto.jpg"`). Para sumar un proyecto, agregalo al array `projects`; si tiene demo o repositorio, completá `demoUrl` y `repoUrl` y los botones aparecen solos.

El CV que se descarga está en `public/`. Si lo actualizás, reemplazá el PDF manteniendo el mismo nombre.

## Estructura

```
src/
  app/          layout, página principal y estilos globales
  components/   una sección por archivo (Hero, Projects, Journey, Skills, Contact) y piezas comunes en ui.tsx
  data/         contenido del sitio
public/         CV en PDF
```

## Deploy

Está pensado para publicarse en [Vercel](https://vercel.com): importás este repositorio y no hace falta configurar nada más.
