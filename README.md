# Index by Evgenii Astapov

**Live Website:** https://astapable.github.io

## About

This landing page was created as my final Index Project for the Typography & Interaction course at Parsons School of Design in 2026.

For two semesters, I worked on hand-coded projects that made me sit for hours, test ideas, break layouts, fix bugs, and slowly understand what the browser can do when you stop treating code as something purely technical.

The Index collects all of these projects in one place. It works as a single-page portfolio and a small “business card” — introducing me as a designer who codes, while giving every project its own space, cover image, short context, and direct link.

Everything here is hand-coded with HTML, CSS, and JavaScript, without frameworks. The course started with basic HTML and CSS experiments and eventually moved into more complex interactive systems, including a browser extension.

The final page includes smooth scrolling, scroll-based skew animation on the project cards, light and dark mode, responsive layout, and metadata for the open web.

## Projects

| Project | URL |
|---|---|
| What Designer Can Do | [/manuscript/](https://astapable.github.io/manuscript/) |
| Evgenii × Zara | [/Evgenii-X-Zarah/](https://astapable.github.io/Evgenii-X-Zarah/) |
| F/ckts | [/binding/](https://astapable.github.io/binding/) |
| Links | [/links/](https://astapable.github.io/links/) |
| Functions | [/functions/](https://astapable.github.io/functions/) |

## Learnings

Key learnings from this project:
1. Building a fixed nav and footer using `position: fixed` without a wrapper element
2. CSS Cascade Layers — using `@layer` to separate reset and project styles cleanly
3. CSS Nesting with `&` for scoping component styles
4. Integrating Lenis smooth scroll with GSAP ScrollTrigger
5. Implementing a scroll-based skew effect using `gsap.quickSetter`
6. Working with CSS custom properties as a design token system — spacing, color, typography all in one place
7. Responsive design using modern `@media (width > Npx)` syntax inside `:root` for fluid tokens

## Sources

Key resources that helped bring this project to life:
- GSAP ScrollTrigger (skew on scroll) — https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- GSAP quickSetter (performance) — https://gsap.com/docs/v3/GSAP/gsap.quickSetter()
- Lenis smooth scroll — https://lenis.darkroom.engineering

## Typography License

Copyright 2024 The Geist Project Authors (https://github.com/vercel/geist-font.git)
This Font Software is licensed under the SIL Open Font License, Version 1.1.
https://openfontlicense.org
