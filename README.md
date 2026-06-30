# Delsea Exports — Website

A standard React + Vite single-page application for Delsea Exports Private Limited.

This project was converted from a Lovable + TanStack Start export into a plain, framework-agnostic React + Vite app. All UI, animations, images, and functionality were preserved — only the underlying tooling changed.

## What changed in the conversion

- Removed `@tanstack/react-start`, `@tanstack/react-router`, `@tanstack/router-plugin`, `@tanstack/react-query`, `nitro`, and `@lovable.dev/vite-tanstack-config`.
- Removed SSR/server entry files (`src/server.ts`, `src/start.ts`, `src/routeTree.gen.ts`) and Lovable-specific error reporting/build tooling.
- Replaced file-based TanStack routes (`src/routes/*`) with plain React Router v7 routes in `src/App.tsx`, with page components living in `src/pages/`.
- Replaced TanStack's per-route `head()` metadata with a small dependency-free `<Seo />` component (`src/components/Seo.tsx`) that sets `document.title` and meta tags per page.
- Replaced the TanStack root shell (`src/routes/__root.tsx`) with `src/components/Layout.tsx`, which still wraps every page with the theme provider, Lenis smooth-scroll provider, navbar, and footer.
- Added a standard Vite `index.html` entry point and `src/main.tsx` bootstrap (`createRoot` + `BrowserRouter`).
- Added `vercel.json`, `netlify.toml`, and `public/_redirects` so client-side routing works correctly when deployed.

## Pages

- `/` — Home
- `/about` — About
- `/products` — Products
- `/markets` — Markets (Global Export Journey carousel)
- `/certifications` — Certifications
- `/contact` — Contact (this page also contains the enquiry/quote-request form — the original project did not have a separate enquiry route; the contact form *is* the enquiry form, complete with a "Product Interest" field)

## Getting started

```bash
npm install
npm run dev      # starts the dev server at http://localhost:5173
npm run build    # type-checks and builds a production bundle into dist/
npm run preview  # serves the production build locally for a final check
```

## Deploying

The app builds to static files in `dist/`, so it deploys directly to Vercel or Netlify:

- **Vercel**: import the repo, framework preset "Vite", build command `npm run build`, output directory `dist`. `vercel.json` already includes the SPA rewrite rule.
- **Netlify**: build command `npm run build`, publish directory `dist`. `netlify.toml` and `public/_redirects` already handle the SPA fallback.

## Notes

- The contact form sends enquiries via EmailJS, using the same service/template IDs as the original project.
- Some product images are large (several megabytes each) — this was inherited as-is from the original asset set to keep visuals pixel-identical. If you'd like, these can be compressed/converted to WebP in a follow-up pass to improve load times.
