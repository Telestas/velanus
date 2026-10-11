# Repository Guidelines

## Project Structure & Module Organization

This is a React 19, TypeScript, Vite, and Tailwind site. Application code lives in `src/`: `components/` contains screens and shared UI, `content/` holds bilingual page copy, `i18n/` handles language selection, `data/` contains Firebase access, and `router.ts` maps URLs to screens. Static images, fonts, and the custom-domain `CNAME` live in `public/`. Node tests are in `tests/`; maintenance scripts are in `scripts/`. Firebase rules and indexes are at the repository root. `dist/` is generated output.

## Build, Test, and Development Commands

Use Node.js 22+ and `npm ci` to install the lockfile dependencies.

- `npm run dev` starts Vite at `http://localhost:3000`.
- `npm run lint` runs TypeScript checking with `tsc --noEmit`; there is no ESLint setup.
- `npm test` runs the Node test suite through `tsx`.
- `npm run build` creates the production site in `dist/`; `npm run preview` serves that build locally.
- `npm run backup` exports Firestore collections to the ignored `backups/` directory and requires Firebase login.

Run lint, tests, and build before opening a pull request; CI runs the same checks.

## Coding Style & Naming Conventions

Follow the surrounding TypeScript and TSX style: two-space indentation, semicolons, single-quoted strings, and PascalCase React component files such as `PanelConsultas.tsx`. Use camelCase for functions and variables. Keep visitor-facing copy in `src/content/` or `src/i18n/`, with Spanish and English entries together. Reuse shared brand pieces and palette definitions under `src/components/marca/`; avoid constructing Tailwind class names dynamically because its source scan cannot discover them.

## Testing Guidelines

Tests use `node:test` and `node:assert/strict`, with files named `tests/*.test.ts`. Add focused tests for routing, data transformations, and other logic that can run without live Firebase writes. There is no coverage threshold. Run `npm test` for changes to those contracts.

## Commits & Pull Requests

Recent commits use short Spanish imperative subjects, for example `Mejora navegación, copias y pruebas`; follow that pattern and keep each commit focused. In pull requests, describe the user-visible change, link any relevant issue, list verification commands, and include screenshots for visual changes. Note Firebase rule or configuration changes explicitly. Deployment runs from `v*` tags on `main`, not from every push.

## Security & Configuration

Do not commit credentials, `.env` files, or Firestore backups. Review `firestore.rules` when changing data access, and update `docs/cabeceras-seguridad.md` when adding external resources that need Cloudflare CSP allowances.
