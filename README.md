# Acme

A small project-tracking app: an overview, a list of projects with a page for each, and settings. Built with [Vite](https://vite.dev), [React](https://react.dev), [Tailwind CSS](https://tailwindcss.com) and [shadcn/ui](https://ui.shadcn.com). Its data is sample data in `src/data/projects.ts`.

```sh
pnpm install
pnpm dev
```

- `src/pages/` holds one file per page, and `src/App.tsx` maps each to its route: `/`, `/projects`, `/projects/:id`, `/settings`.
- `src/components/ui/` holds the shadcn/ui components the pages use. Add more with `pnpm dlx shadcn@latest add <component>`.

MIT licensed.
