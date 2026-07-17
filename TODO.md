# Portfolio Platform / TODO

## Phase 0 / Foundation
- [x] Initialize Next.js 16 project (App Router, TypeScript)
- [x] Install and configure Tailwind CSS v4
- [x] Set up `next/font/google` for Bricolage Grotesque + Geist Mono
- [x] Create design tokens CSS (light + dark themes)
- [x] Implement `<ThemeToggle />` with `data-theme` attribute + localStorage
- [x] Port hero section (cycling words, fluid type scale)
- [x] Port marquee section (infinite scroll animation)
- [x] Port work section (empty state, no projects yet)
- [x] Port about section
- [x] Port capabilities grid
- [x] Port contact section
- [x] Port `mix-blend-mode: difference` top bar
- [x] Port `body.inspect` grid overlay easter egg
- [x] Add `prefers-reduced-motion` handling to all animations
- [x] Wire up Framer Motion for word cycle animation
- [x] Custom glass cursor with lerp smoothing
- [x] Lenis smooth scrolling
- [x] Custom scrollbar styling
- [ ] Fix LinkedIn link (currently `#`)
- [ ] Visual parity check against original `Portfolio.html`
- [ ] Deploy to Vercel

## Phase 1 / Database
- [ ] Create Supabase project
- [ ] Install Prisma, write schema (users, projects, tasks, posts, tags, capabilities, site_settings)
- [ ] Run initial migration
- [ ] Seed database with current hardcoded capabilities/marquee content
- [ ] Replace hardcoded arrays with server-fetched data (server components)
- [ ] Verify public pages render from DB

## Phase 2 / Admin Shell + Auth
- [ ] Install NextAuth.js v5
- [ ] Set up Credentials provider (single admin user, hashed password)
- [ ] Create `/admin/login` page
- [ ] Add middleware to protect `/admin/*` routes
- [ ] Build `/admin` dashboard home (draft counts, in-progress counts)
- [ ] Build `/admin/settings` for hero kicker, cycling words, marquee, availability, socials
- [ ] Test: copy changes reflect on public site without redeploy

## Phase 3 / Project Management
- [ ] Build `/admin/projects` list view
- [ ] Build kanban view (status columns: planning, in_progress, done, archived)
- [ ] Decide: simple reorder or drag-and-drop kanban
- [ ] Build `/admin/projects/[id]` edit form
- [ ] Integrate Tiptap as case-study body editor
- [ ] Implement public/private split (visibility, client, private_notes never leak)
- [ ] Build `/admin/projects/[id]/tasks` for project tasks
- [ ] Build public `/work` archive page (filterable by year/stack)
- [ ] Build public `/work/[slug]` case-study detail page

## Phase 4 / Blog + CMS
- [ ] Build `/admin/posts` list view
- [ ] Build `/admin/posts/[id]` with Tiptap editor
- [ ] Compute and store `reading_time` on save
- [ ] Build tag management (create/assign tags)
- [ ] Support draft, scheduled, published workflow
- [ ] Build public `/blog` index (paginated)
- [ ] Build public `/blog/[slug]` detail page
- [ ] Add RSS feed (`/feed.xml`)
- [ ] Per-post SEO metadata

## Phase 5 / Polish
- [ ] Lighthouse audit (performance, accessibility, best practices, SEO)
- [ ] Accessibility: contrast check on `--accent` vs `--paper` for small text
- [ ] Accessibility: visible focus states on all interactive elements
- [ ] Dynamic OG image generation (`@vercel/og`)
- [ ] `sitemap.xml` generation
- [ ] `robots.txt`
- [ ] Structured data: `Person` schema on homepage
- [ ] Structured data: `BlogPosting` on post pages
- [ ] Styled 404 page

## Phase 6 / Iteration
- [ ] Contact form with Resend email notifications
- [ ] Optional newsletter signup
- [ ] Testimonials section
- [ ] Database backup strategy

## Open Decisions
- [ ] Prisma vs Drizzle?
- [ ] Same `projects` table for portfolio + PM, or separate tables?
- [ ] Simple reorder vs drag-and-drop kanban from day one?

## Content Tasks
- [ ] Write case studies for each project (before building `/work/[slug]`)
- [ ] Decide blog cadence
