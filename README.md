<div align="center">
  <img src="./src/assets/icons/logo.svg" alt="Youssef Adly portfolio logo" width="82" />

  # Youssef Adly Portfolio

  A modern, interactive software engineering portfolio built with React, Vite, Tailwind CSS, React Router, and ReactBits-inspired visual components.

  <p>
    <a href="https://github.com/YoussefAdly14">GitHub</a>
    ·
    <a href="https://www.linkedin.com/in/youssef-adly-755261314">LinkedIn</a>
    ·
    <a href="./src/assets/resume/Youssef-Adly-CV.pdf">CV</a>
  </p>
</div>

---

## Preview

<p align="center">
  <img src="./src/assets/images/youssef-adly-profile.jpeg" alt="Youssef Adly" width="520" />
</p>

This portfolio presents my work, internships, extracurricular activities, personal story, and contact details in a polished recruiter-friendly experience.

## Highlights

- Interactive ReactBits-style Galaxy hero background
- Collapsible PillNav navigation
- Section-by-section homepage with fade-in reveals
- Projects section split into Personal and University work
- Dedicated Contact & CV page with downloadable resume
- Expandable extracurricular experiences with pagination
- Responsive layouts for desktop, tablets, and phones
- Data-driven content using JSON files in `src/data`

## Visual Sections

| Projects | Internships | Activities |
| --- | --- | --- |
| <img src="./src/assets/images/project-portfolio.svg" alt="Portfolio project preview" width="220" /> | <img src="./src/assets/logos/company-niletech.svg" alt="Internship logo preview" width="160" /> | <img src="./src/assets/images/project-architecture.svg" alt="Activities visual preview" width="220" /> |

## Tech Stack

| Area | Tools |
| --- | --- |
| Frontend | React, Vite, JavaScript |
| Styling | Tailwind CSS |
| Routing | React Router |
| Icons | React Icons |
| Motion/Visuals | Motion, GSAP, OGL |
| Components | ReactBits-inspired Galaxy, SideRays, Folder, PillNav, BorderGlow, TiltedCard |
| Deployment | Vercel-ready static frontend |

## Project Structure

```text
src/
  assets/          Images, icons, logos, and CV
  backgrounds/     Galaxy and SideRays visual backgrounds
  components/      Layout, navigation, cards, and reusable UI
  data/            JSON-driven portfolio content
  pages/           Home, About, Contact, Extracurricular, and placeholders
  styles/          Global Tailwind styles
```

## Getting Started

Clone the project and install dependencies:

```bash
npm install
```

Run the local development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run lint checks:

```bash
npm run lint
```

## Content Editing

Most portfolio content is data-driven:

- `src/data/profile.json`
- `src/data/projects.json`
- `src/data/internships.json`
- `src/data/activities.json`
- `src/data/contact.json`
- `src/data/navigation.json`

This makes it easy to update projects, internship details, activities, contact links, and profile copy without rewriting page components.

## Deployment

This is a static Vite application and is ready to deploy on Vercel.

Suggested Vercel settings:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

## Status

Currently under active development. The homepage, About page, Contact & CV page, and Extracurricular Activities page are implemented. Project and internship detail pages are planned for future expansion.

---

<div align="center">
  Built with care by <strong>Youssef Adly</strong>
</div>
