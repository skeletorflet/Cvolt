# Guía de contribución

Gracias por tu interés en contribuir a Cvolt.

Esta guía es simple y práctica para que puedas aportar rápido.

## 1. Antes de empezar

- Revisa issues abiertos o crea uno nuevo para discutir cambios grandes.
- Mantén los PR enfocados en una sola mejora o fix.

## 2. Flujo recomendado

1. Haz fork del repositorio.
2. Crea una rama desde `main`:

```bash
git checkout -b feat/nombre-cambio
```

3. Instala dependencias:

```bash
npm install
```

4. Ejecuta el proyecto:

```bash
npm run dev
```

5. Asegúrate de que compile:

```bash
npm run build
```

6. Si corresponde, ejecuta lint:

```bash
npm run lint
```

7. Crea el commit y abre Pull Request.

## 3. Estándares mínimos

- TypeScript sin errores.
- Build exitoso.
- Cambios sin romper experiencia en móvil y desktop.
- No subir artefactos generados (`dist`, `dist-netlify`, `test-results`, etc.).

## 4. Convención sugerida de commits

Se recomienda Conventional Commits:

- `feat: ...` nueva funcionalidad
- `fix: ...` corrección
- `docs: ...` documentación
- `refactor: ...` refactor sin cambio funcional
- `chore: ...` tareas de mantenimiento

## 5. Pull Requests

Incluye en el PR:

- Qué problema resuelve.
- Qué cambiaste.
- Capturas o video si hubo cambios de UI.
- Riesgos conocidos o puntos a revisar.

## 6. Alcance de contribuciones útiles

- Mejoras de accesibilidad.
- Ajustes de UX en móvil.
- Mejoras de i18n (ES/EN).
- Nuevas plantillas o refinamiento de plantillas actuales.
- Optimización de exportación PDF.
- Correcciones en documentación.

## 7. Código de conducta

- Respeto, claridad y colaboración.
- Feedback técnico, directo y constructivo.

Gracias por aportar a un proyecto open source gratuito para la comunidad.
