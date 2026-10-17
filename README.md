# Portfolio de Darwin Sierra

Sitio personal de Darwin Sierra, desarrollador frontend en Buenos Aires.

Hecho con **Next.js**, **TypeScript**, **Tailwind CSS** y **Motion**. Diseño en negro, sobrio, con transiciones cuidadas:

- Presentación con el perfil escrito como código, que se tipea al cargar la página.
- Recorrido profesional cuya línea se completa a medida que bajás.
- Tarjeta de proyecto con un reflejo de luz que sigue al puntero.
- Barra de progreso de lectura y apariciones suaves al hacer scroll.

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
  components/   una sección por archivo (Hero, CodeCard, Projects, Journey, Skills, Contact)
  data/         contenido del sitio
public/         CV en PDF
```

## Deploy

Está pensado para publicarse en [Vercel](https://vercel.com): importás este repositorio y no hace falta configurar nada más.
