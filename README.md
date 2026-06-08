# Grand Ethiopia Hotel Website

A modern, fully responsive luxury hotel website built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Homepage** — Video hero, featured rooms, amenities preview, testimonials, and CTA
- **Rooms & Suites** — Categorized listings with amenities, pricing, and photo galleries
- **Online Booking** — Date pickers, guest counters, real-time availability, payment options (Telebirr, CBEbirr, Card)
- **Amenities** — Restaurant menu, leisure facilities, events & conferences
- **Testimonials** — Guest reviews with Google/TripAdvisor integration links
- **Contact** — Contact form, Google Maps embed, social media links
- **Multi-language** — English, Amharic (አማርኛ), French, Arabic (RTL)
- **Admin CMS** — Manage rooms, prices, availability, and reservations

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Admin Dashboard

Visit [http://localhost:3000/admin](http://localhost:3000/admin)

Default password: `admin123` (set `ADMIN_PASSWORD` in `.env.local` to change)

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- JSON file-based data store (upgradeable to PostgreSQL/MongoDB)
- date-fns for date handling

## Project Structure

```
src/
├── app/           # Pages and API routes
├── components/    # Reusable UI components
├── context/       # i18n locale context
└── lib/           # Data, store, types, translations
data/              # Runtime JSON data (rooms, reservations)
```

## Production Deployment

1. Copy `.env.example` to `.env.local` and set secure values
2. Run `npm run build && npm start`
3. Deploy to Vercel, Netlify, or any Node.js host

## Payment Integration

The booking flow includes UI for Telebirr, CBEbirr, and card payments. For production, integrate with:

- **Telebirr** — [Ethio Telecom API](https://www.ethiotelecom.et/)
- **CBEbirr** — Commercial Bank of Ethiopia API
- **Cards** — Stripe or Chapa payment gateway
