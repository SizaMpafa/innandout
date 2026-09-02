# INNANDOUT Plumbing – React Front-End

Production-ready front-end for INNANDOUT Plumbing (maintenance, renovations & emergency services).

Built with **Vite + React + TypeScript**. All data is stored in the browser (`localStorage` / `sessionStorage`) — no backend required.

## Features

- Responsive marketing site (Hero, About, Services, Projects, Booking)
- Dynamic Services & Projects (managed from Admin)
- Booking request form → stored locally and visible in Admin
- Admin portal with password protection (`admin123`)
  - View / confirm / delete bookings
  - CRUD for services
  - CRUD for projects (with image upload → data URL)

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:5173

Admin: http://localhost:5173/admin  
Password: **admin123**

## Scripts

| Command           | Description                |
|-------------------|----------------------------|
| `npm run dev`     | Development server         |
| `npm run build`   | Production build           |
| `npm run preview` | Preview production build   |

## Project structure

```
innandout-react/
├── public/                 # Static assets (logo, hero images)
├── src/
│   ├── components/         # Header, Hero, About, Services, Portfolio, BookingForm, Footer
│   ├── context/            # AppContext (services, projects, bookings)
│   ├── lib/                # localStorage helpers
│   ├── pages/              # HomePage, AdminPage
│   ├── types/              # TypeScript interfaces
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css           # Full site styles
├── index.html
├── package.json
└── vite.config.ts
```

## Notes

- This is a pure front-end application. Bookings and content live in the user’s browser.
- To persist data across devices you would later connect a real API; the context/storage layer is already isolated for that upgrade.
