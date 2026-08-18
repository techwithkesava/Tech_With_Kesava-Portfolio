# TechWithKesava

Personal portfolio, blog, and tech-education website for **Kesava Kantipudi** — AI Engineer, LLM Developer, and Tech Educator.

Built with Next.js (App Router) + TypeScript + Tailwind CSS, backed by Supabase for all dynamic content (blogs, videos, AI tools) and an admin CMS to manage it.

---

## Tech Stack

- **[Next.js 15](https://nextjs.org)** (App Router, server components, middleware)
- **[React 18](https://react.dev)** + **[TypeScript](https://www.typescriptlang.org)**
- **[Tailwind CSS 3](https://tailwindcss.com)** for styling
- **[Framer Motion](https://www.framer.com/motion)** for animations
- **[lucide-react](https://lucide.dev)** for icons
- **[Supabase](https://supabase.com)** (Postgres + PostgREST) for the content CMS

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command          | Description                            |
| ---------------- | -------------------------------------- |
| `npm run dev`    | Start the development server            |
| `npm run build`  | Production build (also type-checks)     |
| `npm run start`  | Serve the production build              |
| `npm run lint`   | Run ESLint                             |

---

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

| Variable                           | Required | Description                                              |
| ---------------------------------- | -------- | -------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`         | Yes      | Supabase project URL (`https://<ref>.supabase.co`)       |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`    | Yes      | Public anon key (safe for the browser)                   |
| `SUPABASE_SERVICE_ROLE_KEY`        | Yes      | Server-only key for admin CRUD. Never expose this.       |
| `CONTACT_DISCORD_WEBHOOK_URL`      | No       | Discord webhook to receive contact form submissions      |
| `RESEND_API_KEY` / `CONTACT_TO_EMAIL` | No    | Alternative: email contact submissions via Resend         |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD`| No       | Admin login credentials (defaults: `admin` / `admin123`) |
| `ADMIN_SESSION_SECRET`             | No       | Secret signing admin session cookies. Use a long random string in production |

`.env` is gitignored — never commit real keys.

---

## Supabase Setup

### 1. Create the schema

Run [`supabase/migrations/001_init.sql`](supabase/migrations/001_init.sql) in the **Supabase SQL Editor** (or via `supabase db push`). It creates:

- `ai_tools` — AI tool directory shown on the homepage
- `videos` — embeddable YouTube videos
- `blogs` — blog posts (7 posts migrated from the original hardcoded data)
- Storage buckets: `ai-tools`, `blogs`, `videos`
- Row Level Security — public (anon) users can only `SELECT` published rows; admin writes use the service-role key which bypasses RLS.

### 2. Seed content

```bash
node scripts/seed.mjs
```

Seeds the original blog posts (by slug, skipping existing) and 6 sample AI tools (only if `ai_tools` is empty). Requires `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env`.

---

## Admin CMS

The admin dashboard lives at `/main-admin-kesava`.

- Login with `ADMIN_USERNAME` / `ADMIN_PASSWORD` (defaults `admin` / `admin123`).
- Manage **AI Tools**, **Videos**, and **Blogs** (create / edit / delete / publish / feature).
- Dashboard shows live publish stats per content type.
- Protected by middleware + signed session cookies (see `middleware.ts`, `lib/admin/`).

After adding content, the homepage reflects it automatically (homepage revalidates every 5 minutes).

---

## Project Structure

```
app/
  page.tsx                    # Homepage (server component, fetches from Supabase)
  components/                 # Shared + home/blog client components
  blog/                       # Blog listing + individual post (reads from Supabase)
  main-admin-kesava/          # Admin CMS (login, dashboard, CRUD managers)
  api/contact/route.ts        # Contact form endpoint (Discord webhook / Resend)
lib/
  supabase/                   # Client factories + typed Database schema
  data/                       # Server-side data access (blogs, videos, ai-tools)
  admin/                      # Admin session & auth helpers
  youtube.ts                  # YouTube URL/thumbnail helpers
scripts/
  seed.mjs                    # One-time seeding of blogs + AI tools
supabase/migrations/          # SQL schema migrations
```

---

## Contact Form

`app/api/contact/route.ts` handles contact submissions:

1. **Discord** — if `CONTACT_DISCORD_WEBHOOK_URL` is set, submissions are posted to that channel as an embed.
2. **Email** — if `RESEND_API_KEY` is set, an email is sent to `CONTACT_TO_EMAIL` (defaults to `techwithkesava@gmail.com`).

Both are optional; the endpoint succeeds as long as the payload validates.

---

## License

Private project — all content © TechWithKesava.
