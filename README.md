# 🛒 বাজার দর — BazarDor

A responsive Bengali market-price dashboard built with Next.js App Router. It consumes the BazarDor API to show current prices, movers, category listings and protected product details.

## ✨ Features

- Bengali responsive navbar, category navigation and infinite price ticker
- Hero banner with same-page “সব পণ্য” CTA
- Top 6 price risers and fallers
- API-powered product cards with Bengali numerals and price-change badges
- Protected product detail pages with market-wise price comparison
- Category pages with loading skeletons and numeric price sorting
- Better Auth email/password + Google/GitHub OAuth configuration
- Toast feedback for authentication, validation and protected-route redirects
- Profile page + name update flow using Better Auth `updateUser`
- Friendly global 404 and dynamic routes compatible with Vercel

## 🧰 Technologies

- Next.js App Router
- React + TypeScript
- Tailwind CSS v4
- Better Auth
- PostgreSQL via `pg`
- react-hot-toast
- Lucide React

## 🚀 Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

For real Better Auth persistence, provide `DATABASE_URL`, `BETTER_AUTH_SECRET`, and OAuth credentials in `.env.local`. Then generate/migrate the Better Auth schema:

```bash
npx auth@latest migrate
```

## API

Base URL: `https://api.api-store.workers.dev/api/bazardor`

- `/products`
- `/products?category=chal`
- `/products/:id`
- `/categories`
- `/categories/:slug`

## Git commit plan

1. `feat: initialize BazarDor Next.js project`
2. `feat: add responsive navbar and price ticker`
3. `feat: add API-powered home product sections`
4. `feat: add category pages and numeric sorting`
5. `feat: add protected product detail pages`
6. `feat: add BetterAuth sign in and sign up flows`
7. `feat: add profile and update information flow`
8. `feat: add loading skeletons toasts and 404 page`
9. `docs: add BazarDor README and environment setup`

## Recent UI/API fixes
- Added the supplied BazarDor basket image as the hero artwork.
- Removed the secondary “বাজারের বিস্তারিত দেখুন” CTA.
- Changed the primary CTA to green.
- Hardened API normalization so percentage/change fields from different BazarDor API response shapes are displayed as Bengali `▲/▼ %` badges.
# Assignment-07
