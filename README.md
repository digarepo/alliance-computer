# Alliance Computer — Company Profile Website

Corporate website for **Alliance Computer**, a technology supply company specializing in:

* Geophysical exploration equipment
* IT infrastructure & networking hardware

This site serves as the company’s official profile and product showcase.

---

## Tech Stack

* **React Router v7** — routing & app structure
* **React + TypeScript** — frontend development
* **shadcn/ui** — UI components
* **Tailwind CSS** — styling
* **Vite** — build tool

---

## Project Structure

```
app/
├── components/
│   ├── public/        → navbar, footer, hero, shared sections
│   └── ui/            → shadcn UI components
│
├── routes/
│   ├── home.tsx
│   └── public/
│       ├── about.tsx
│       ├── contact.tsx
│       └── services/
│           ├── index.tsx
│           ├── geophysical.tsx
│           └── it-infrastructure.tsx
│
├── root.tsx
└── routes.ts
```

---

## Main Pages

* **Home** — sector overview and company introduction
* **About** — company profile
* **Services** — overview of sectors
* **Geophysical Equipment** — geophysical instruments supplied
* **IT Infrastructure** — servers, networking & datacenter equipment
* **Contact** — contact information

---

## Development

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

---

## Purpose

This website is designed as a clean, professional company profile to present Alliance Computer as a trusted supplier of:

* Geophysical survey and exploration equipment
* Enterprise IT and networking infrastructure hardware

---

## Notes

* Built with scalable structure for future expansion
* Can later support product catalog or admin panel if required
* Optimized for modern, responsive corporate presentation
