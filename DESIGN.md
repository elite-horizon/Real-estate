# Sovereign Estate Design System

This local specification adapts the existing Stitch “Sovereign Estate” design system for the Aurelis Estates demo. It is intentionally local-only and has not been uploaded or bound to a Stitch project.

## Materiality

The interface should feel like an architectural monograph: warm alabaster paper, royal navy ink, burnished-gold rules, and crisp editorial photography. Depth comes from tonal surfaces and fine keylines rather than generic floating cards or heavy black shadows.

## Color tokens

- Royal navy: `#0A192F` — structural headers, primary actions, and deep surfaces.
- Burnished gold: `#C5A059` — active indicators, fine dividers, focus, and pricing emphasis.
- Imperial emerald: `#059669` — available inventory and demo verification states.
- Charcoal slate: `#1E293B` — primary body copy.
- Warm alabaster: `#FAF9F5` — light canvas.
- Chalk white: `#FFFFFF` — elevated light surfaces.
- Raw ivory: `#F4F1EA` — recessed light surfaces.
- Reserved amber: `#B7791F`; sold crimson: `#B42318`; selected blue: `#2563EB`.

Dark mode uses navy and charcoal surfaces with alabaster copy while retaining restrained gold accents.

## Typography

- Display and headings: Playfair Display, with Georgia as the local fallback.
- Body, labels, navigation, and financial data: Plus Jakarta Sans, with Inter/system sans fallbacks.
- Display: `56/64`, weight 600; mobile `38/44`.
- Heading large: `40/48`, weight 500; mobile `28/36`.
- Heading medium: `28/36`; heading small: `22/30`.
- Body large: `16/26`; body medium: `14/22`; body small: `12/18`.
- Labels use uppercase tracking between `0.06em` and `0.08em`.
- Monetary and area values use tabular figures.

## Layout

- Desktop: 12-column rhythm inside a `1440px` maximum shell, `64px` margins and `24px` gutters.
- Tablet: 8-column rhythm, `32px` margins and `20px` gutters.
- Mobile: 4-column rhythm, `20px` margins and `16px` gutters.
- Base spacing unit: `4px`; common steps: `8`, `16`, `24`, `40`, `64`, `96`.

## Shape and elevation

Use `4px` controls, `8px` cards, and `12px` major media frames. Avoid excessive pills; reserve fully rounded shapes for compact statuses or icon controls. Level-one surfaces use a subtle navy-tinted ambient shadow; hover surfaces gain a gold keyline and slightly deeper ambient shadow.

## Interaction

Focus is always visible with a gold ring. Motion should clarify state or continuity and must respect reduced-motion preferences. Status is never communicated by color alone. Invented inventory, pricing, approvals, and confirmations must remain visibly marked as demo content.
