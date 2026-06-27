# CleanerCircle

A modern, production-quality React marketplace prototype connecting Canadian customers with professional cleaners and cleaning businesses.

## Tech Stack

- React 19 + TypeScript + Vite
- Redux Toolkit for state management
- React Router DOM
- Tailwind CSS v4
- Framer Motion
- React Hook Form
- Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Demo Accounts

| Role     | Email               | Password  |
|----------|---------------------|-----------|
| Customer | customer@demo.com   | demo1234  |
| Cleaner  | cleaner@demo.com    | demo1234  |
| Admin    | admin@demo.com      | demo1234  |

## Features

- **Public site**: Home, search with filters, service details, cleaner profiles, login/register
- **Customer dashboard**: Enquiries, messages, favorites, profile
- **Cleaner dashboard**: Service management, enquiries, messages, business profile, reviews
- **Admin dashboard**: Users, services, reports

## Architecture

```
Mock Data → Redux Slice → Selector → Component
```

All UI strings use `constants/text.ts`, routes use `constants/routes.ts`, and mock data flows exclusively through Redux.

## Mock Data

Generated programmatically on startup:

- 100 cleaners, 1000 customers, 500 services
- 300 reviews, 150 enquiries, 200 conversations, 800 messages
- 20 categories across 5 service types

## Future API Integration

Placeholder services in `src/services/api.ts` are ready for Supabase integration. Replace Redux async thunk implementations — UI components remain unchanged.

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
```
