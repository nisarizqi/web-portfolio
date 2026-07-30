# Putri Rizqi Khairunnisa — Portfolio

## Setup
```bash
npm install
npm run dev
```

## Build for production
```bash
npm run build
```

## Structure
Single-page flow: Hero → About → Skills → Featured Projects → Experience → Certifications → Contact,
plus a dedicated deep-dive route at `/solohris` for the SoloHRIS case study.

## Completed
- ✅ Vite + React + Tailwind + Framer Motion + Lucide + React Router scaffold
- ✅ "Techy Feminine" color system (light + dark) in `tailwind.config.js`
- ✅ Theme system with localStorage persistence (`src/context/ThemeContext.jsx`)
- ✅ Navbar (smooth-scroll + theme toggle + mobile menu) & Footer
- ✅ Hero — headline, sub-headline, resume download CTA
- ✅ About — bio + 3 pillar cards
- ✅ Skills — 4 grouped categories with animated tag badges
- ✅ Featured Projects — SoloHRIS, Bersih.Kan, White Blood Cell Segmentation, Plant Recommendation
  (STAR/impact-framed copy, tech tags, GitHub/case-study links)
- ✅ Experience — animated vertical timeline + education card
- ✅ Certifications — 3 badge cards
- ✅ Contact — form (mailto-based submit) + social link cards
- ✅ SoloHRIS Deep Dive page (`/solohris`) — Problem / Solution / Architecture / Contribution + impact

## Notes
- Replace the "PK" placeholder avatar in `Hero.jsx` with a real photo (`src/assets/images/`) when ready.
- Contact form currently opens the visitor's email client via `mailto:` — swap in a form backend
  (e.g. Formspree, EmailJS) later if you want submissions without leaving the page.
- Resume/CV download is wired to `public/assets/CV_Putri_Rizqi_Khairunnisa.pdf`.
