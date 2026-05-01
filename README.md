# Cvolt

Cvolt es un generador de CV open source, gratuito y pensado para que cualquier persona pueda crear un CV profesional en minutos.

Incluye editor visual, vista previa en tiempo real, plantillas modernas, selección de paletas y tipografías, exportación a PDF y soporte multilenguaje.

## Características

- Editor visual por secciones (datos personales, experiencia, educación, skills, proyectos, idiomas y certificaciones).
- Vista previa en vivo con zoom y ajuste de diseño.
- Múltiples plantillas profesionales y creativas.
- Personalización de colores y fuentes.
- Reordenamiento de secciones.
- Exportación de CV a PDF.
- Interfaz en español e inglés.
- Contador global opcional vía función serverless (`/api/counter`) para métricas públicas de uso.

## Stack técnico

- React 19 + TypeScript
- Vite 7
- TanStack Router
- Zustand
- Tailwind CSS 4
- Radix UI
- html2canvas + jsPDF
- Netlify Functions (contador opcional)

## Requisitos

- Node.js 20+
- npm 10+ (recomendado para despliegue en Netlify)

Opcional:

- Bun (si prefieres trabajar localmente con `bun.lockb`)

## Instalación

```bash
npm install
```

## Desarrollo local

```bash
npm run dev
```

La app quedará disponible en `http://localhost:5173`.

## Build de producción

```bash
npm run build
```

## Preview local de build

```bash
npm run preview
```

## Build para Netlify (SPA)

```bash
npm run build:netlify
```

Esto genera la carpeta `dist-netlify/`.

## Estructura del proyecto

```text
src/
  components/
  data/
  hooks/
  i18n/
  lib/
  routes/
  store/
netlify/functions/
public/
```

## Configuración de despliegue

### Netlify

Este repositorio ya incluye `netlify.toml` y una función en `netlify/functions/counter.ts`.

Para deploy automático en cada push a `main`, incluye el workflow en `.github/workflows/deploy-netlify.yml`.
Solo debes configurar los secretos del repo en GitHub:

- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`

Valores relevantes:

- Build command: `npm run build:netlify`
- Publish directory: `dist-netlify`
- Functions directory: `netlify/functions`

### Cloudflare/Vite Start

También existe configuración para flujo con Vite/TanStack Start (`vite.config.ts`, `wrangler.jsonc`) en caso de usar Workers.

## Scripts disponibles

- `npm run dev`: desarrollo local.
- `npm run build`: build principal.
- `npm run build:dev`: build en modo desarrollo.
- `npm run preview`: servir build local.
- `npm run build:netlify`: build SPA para Netlify.
- `npm run lint`: lint del proyecto.
- `npm run format`: formateo con Prettier.

## Contribuir

Si quieres contribuir, revisa la guía en [CONTRIBUTING.md](CONTRIBUTING.md).

## Comunidad y propósito

La idea de Cvolt es ser una herramienta abierta, útil y gratuita para que más personas puedan construir un CV con buena presentación sin fricción técnica.

Si te sirve, dale una estrella al repo y comparte feedback.

## Licencia

MIT. Ver [LICENSE](LICENSE).
