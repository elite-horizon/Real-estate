---
name: interactive-maps
description: Build map and masterplan interactions for plots, villas, boundaries, nearby places, filters, and inventory selection in this real estate demo.
---

# Interactive Maps

Prefer a custom SVG masterplan when precise sales-layout composition matters; use Leaflet and GeoJSON when geographic pan/zoom and nearby context are central.

- Keep geometry and inventory metadata separate, joined by stable IDs.
- Derive fill, legend, and counters from `available | reserved | sold` status.
- Give polygons keyboard-operable selection and a non-map inventory alternative.
- Keep selected, focused, and hovered states visually distinct.
- Fit sensible initial bounds and constrain unusable zoom ranges.
- Make filters composable and keep selection valid when filters change; otherwise explain why it was cleared.
- Label coordinates, dimensions, terrain, water, approvals, and proximity data as fictional demo information.
- Avoid implying ordinary schematic geometry is survey-accurate.

Verify pan/zoom, selection, filters, counters, deep-link navigation, and mobile controls with representative inventory data.
