# Real Estate Demo Agent Guide

## Product intent

Build a presentation-grade, frontend-only real estate experience for land, apartments, houses, and villas. Treat all inventory, pricing, approvals, geography, and availability as fictional demo data unless the repository explicitly says otherwise.

## Delivery model

Work in small, reviewable milestones. Do not implement the entire roadmap in one change.

1. Architecture and project guidance
2. React/Vite foundation, routing, Tailwind, and UI primitives
3. Design system, shared shell, and mock-data contracts
4. Home and listing pages
5. Land exploration journey
6. Apartment selection journey
7. 3D floor plan and virtual tour
8. House and villa journeys
9. Comparison, enquiry, visit, favorites, and EMI flows
10. Responsive, accessibility, performance, and visual QA

## Engineering constraints

- Use React, Vite, and TypeScript with strict typing.
- Keep route components thin; place domain behavior in `src/features` and reusable presentation in `src/components`.
- Store shared demo entities in `src/data`; never duplicate an entity just to serve a different page.
- Use stable IDs in URLs and relationships. Derive inventory counters from current data/state.
- Keep browser persistence behind hooks or storage adapters so a FastAPI-backed implementation can replace it later.
- Lazy-load route groups and heavy map, Three.js, and panorama code.
- Every interactive control must be keyboard accessible and have a meaningful visible or accessible label.
- Clearly label unverified project facts and simulated confirmations as demo content.
- Preserve responsive behavior from mobile through large desktop layouts.

## Project skills

Load the relevant local skill before working in its domain:

- `.agents/skills/premium-ui/SKILL.md`
- `.agents/skills/property-navigation/SKILL.md`
- `.agents/skills/stitch/SKILL.md` for generating, capturing, uploading, or reviewing UI designs with Google Stitch
- `.agents/skills/interactive-maps/SKILL.md`
- `.agents/skills/threejs-experience/SKILL.md`
- `.agents/skills/virtual-tours/SKILL.md`

## Verification

Run the checks introduced by the current milestone. For UI changes, verify at mobile, tablet, and desktop widths. Exercise the affected journey end to end, including empty/loading/error fallbacks where applicable.
