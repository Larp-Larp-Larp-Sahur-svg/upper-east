# Upper East Construction Finishing Services

Marketing website for Upper East — an interior design studio specialising in construction finishing for residential, workspace, and commercial projects in the Philippines. Every word and picture on the public site is editable from a built-in content editor at `/admin`.

## Run locally

```bash
npm install
npm run dev:site
```

Open [http://localhost:4317](http://localhost:4317) (or `127.0.0.1:4317`; both are allowed dev origins). The content editor is at [http://localhost:4317/admin](http://localhost:4317/admin) — in development the password is `upper-east`.

**Windows (PowerShell or CMD)** — use `npm run dev:site` instead of `npm run dev -- -p 4317`; PowerShell often breaks on the `--` flag.

Production check:

```bash
npm run build && npm run start:site
```

## GitHub (Windows-friendly)

This project also lives on [Cursor Origin](https://cursor.com/codebase/matthew-lance-teves3/upper-east-construction-finishing). To work from **PowerShell or CMD** with normal `git clone`, mirror it to GitHub once:

1. Open [github.com/new](https://github.com/new) while signed in as **Larp-Larp-Larp-Sahur-svg**.
2. Repository name: `upper-east-construction-finishing` (or any name you prefer).
3. Leave it **empty** — no README, no `.gitignore`, no license.
4. In **Cursor**, open this project → **Source Control** (branch icon) → **Publish Branch** → choose your GitHub account and the new repo.

Or, if the project is already open locally with Git:

```powershell
git remote add github https://github.com/Larp-Larp-Larp-Sahur-svg/upper-east-construction-finishing.git
git push -u github main
```

Then on any Windows machine:

```powershell
git clone https://github.com/Larp-Larp-Larp-Sahur-svg/upper-east-construction-finishing.git
cd upper-east-construction-finishing
npm install
npm run dev:site
```

## Stack

- Next.js 16 (App Router, Turbopack, Route Handlers)
- TypeScript, Tailwind CSS v4
- Framer Motion for scroll reveals, page fades, and the portfolio filter
- lucide-react for SVG icons (Facebook/Messenger marks live in `src/components/icons.tsx`)
- Google Fonts: Instrument Serif (display) + Manrope (labels/body)
- No database: content is one JSON file, uploads are files on disk

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Minimal hero, marquee, studio direction + stats, before/after slider, service cards, featured work, testimonials, process, design styles, CTA with quick inquiry |
| `/services` | Residential / Workspaces / Commercial detail rows, process, design styles |
| `/portfolio` | Filterable project grid |
| `/about` | Stats, story, values, quote, process |
| `/contact` | Consultation form (copies the inquiry + opens Messenger), contact details, FAQ. Accepts `?project=`, `?phone=` and `?style=` to prefill the form; `#inquiry` scrolls to it |
| `/admin` | Content editor (password protected, `noindex`) |
| any other | Styled 404 |

## Content editor

Sign in at `/admin` and edit by section: **Studio & contact**, **Hero & numbers**, **Home sections**, **Services**, **Portfolio**, **About**, **Contact & FAQ**. Lists (services, projects, testimonials, FAQs, process steps, values, …) can be added, reordered and removed; icons are picked from a curated set; images accept a URL or an upload. Save with the button or `Ctrl/Cmd + S`, reset a section to its defaults, or export/import the whole document as JSON.

How it works:

- `src/lib/content.ts` — the content model and its defaults (the copy the site ships with).
- **Locally:** saves go to `content/site.json` and `content/uploads/`.
- **Production (free):** saves go to **Supabase** (JSON row + image bucket) when `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set.
- Saving revalidates every page, so edits are live immediately.

Configuration (see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `CMS_PASSWORD` | Editor password. **Required in production** — the editor is disabled when unset. Development falls back to `upper-east`. |
| `SUPABASE_URL` | Supabase project URL — **required on Vercel** so the client’s `/admin` saves stick |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only key (Settings → API → `service_role`) — never expose in the browser |
| `CMS_CONTENT_DIR` | Optional. Local disk path when not using Supabase |

Sessions are HMAC-signed, `httpOnly` cookies that last seven days.

### Hosting (free — client can use `/admin`)

**Vercel (site) + Supabase (CMS storage)** — $0 at small scale, no paid disk.

| Service | Free tier | Role |
| --- | --- | --- |
| [Vercel](https://vercel.com) | Hobby | Hosts the Next.js site |
| [Supabase](https://supabase.com) | Free | Stores content JSON + uploaded images |

#### 1. Set up Supabase (one time, ~5 min)

1. [supabase.com](https://supabase.com) → **New project** (free).
2. **SQL Editor** → **New query** → paste everything from `supabase/setup.sql` → **Run**.
3. **Settings → API** → copy:
   - **Project URL** → `SUPABASE_URL`
   - **service_role** key (secret) → `SUPABASE_SERVICE_ROLE_KEY`

#### 2. Deploy on Vercel

1. Push this repo to GitHub.
2. [vercel.com](https://vercel.com) → **Add New Project** → import the repo → **Deploy**.
3. **Settings → Environment Variables** → add:

| Name | Value |
| --- | --- |
| `CMS_PASSWORD` | Password you give the client for `/admin` |
| `SUPABASE_URL` | From step 1 |
| `SUPABASE_SERVICE_ROLE_KEY` | From step 1 (`service_role`, not `anon`) |

4. **Redeploy** (Deployments → … → Redeploy) so env vars apply.

Live site: `https://your-project.vercel.app`  
Client CMS: `https://your-project.vercel.app/admin`

#### Paid alternatives

Render/Railway with a disk (`Dockerfile`, `render.yaml`) still work if you prefer filesystem storage — but they need a paid disk for CMS persistence.

#### Local development

Without Supabase env vars, the CMS saves to `content/` on disk (default). To test Supabase locally, copy the three production vars into `.env.local`.

## Design system

- `src/app/globals.css` — colour tokens (cream, paper, charcoal, gold), type scale (`display-xl/lg/md`, `eyebrow`), text drop shadows for copy on photography, grain and glass utilities.
- `src/components/Button.tsx` — the single button primitive (`gold`, `light`, `dark`, `ghost-light`, `ghost-dark`).
- `src/lib/icons.ts` — the icon registry the editor chooses from.
- `src/lib/images.ts` — the stock photography used by the default content.

### Placeholders to confirm with the client

- All photography is Unsplash stock. Replace it from the editor (upload or paste a URL) or in `src/lib/images.ts`.
- Testimonials, stats (design concepts per project, 24h response) and portfolio locations are illustrative sample content.
- The logo is the client's own artwork at `public/images/logo.png` and is displayed inside a light disc so its dark lettering reads over photography. It is never redrawn.
