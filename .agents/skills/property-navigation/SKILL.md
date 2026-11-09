---
name: property-navigation
description: Implement or revise routes, breadcrumbs, deep links, and multi-step property journeys in this real estate demo.
---

# Property Navigation

Keep every property exploration step addressable and recoverable.

- Follow the canonical route map in `docs/ARCHITECTURE.md` unless a milestone explicitly revises it.
- Use stable entity IDs in route parameters and resolve display names from the shared data layer.
- Preserve meaningful selections in the URL. Use transient state only for hover and short-lived presentation details.
- Generate breadcrumbs from route/entity context, not manually repeated labels.
- Provide intentional not-found and unavailable states with a route back to the nearest valid parent.
- Ensure browser back/forward navigation restores the visible step.
- Make calls to action advance to a concrete next route; avoid inert buttons and `#` links.

Exercise the complete affected journey and direct-load its deepest route before considering navigation complete.
