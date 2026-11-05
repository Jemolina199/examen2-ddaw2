# Product Reporting Dashboard

Academic dashboard that queries MySQL through Next.js route handlers and visualizes grouped product data using React and Chart.js.

## Features
- Average positive product value grouped by category, displayed as a line chart.
- Product count grouped by brand, displayed as a pie chart.
- Report navigation, loading, error, and empty states.
- Database configuration through server-side environment variables.

## Stack
Next.js App Router, React, TypeScript, MySQL (`mysql2`), Chart.js and Tailwind CSS.

## Run locally
Requirements: Node.js 20.9+, npm, and MySQL.
```bash
npm ci
cp .env.example .env.local
# Edit .env.local with your local database connection details.
mysql -u root -p < schema.sql
npm run dev
```
Use a fresh database for the sample SQL; it inserts synthetic demo records and should be run once. Open http://localhost:3000 and choose a report. For an existing database, supply a `product` table with `brand.code`, `category.code`, and `value` columns instead.

## API
- `GET /api/cantidad-marca`: grouped brand counts.
- `GET /api/promedio-categoria`: average positive value by category.

## Checks
```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Scope
This is a local learning project with two read-only reports. It does not provide authentication, access control, or production database deployment. Use synthetic data for demonstrations.
