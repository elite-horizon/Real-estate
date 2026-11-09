# Frontend Architecture

## Goal

The application is a multi-route sales prototype, not a single scrolling landing page. Its architecture supports four coherent visitor journeys while keeping all content local and replaceable by a future API.

## Application layers

```text
src/app          app bootstrap, providers, router, route-level loading
src/layouts      public shell and focused explorer/detail shells
src/pages        route composition; minimal domain logic
src/features     domain interactions and feature-owned components
src/components   cross-domain UI and composed shared sections
src/data         normalized mock entities and query functions
src/hooks        cross-feature browser and UI hooks
src/types        shared domain and utility types
src/assets       source-controlled visual assets
```

`public/` holds files that must retain their original URL or are too large to import through the module graph.

## Route map

Routes use kebab-case paths and stable entity IDs.

```text
/
/properties
/map
/compare
/favorites

/lands
/lands/:projectId
/lands/:projectId/masterplan
/lands/:projectId/plots/:plotId
/lands/:projectId/plots/:plotId/geography
/lands/:projectId/plots/:plotId/dimensions
/lands/:projectId/approvals
/lands/:projectId/nearby
/lands/:projectId/pricing

/apartments
/apartments/:projectId
/apartments/:projectId/towers
/apartments/:projectId/towers/:towerId
/apartments/:projectId/towers/:towerId/floors
/apartments/:projectId/towers/:towerId/floors/:floorId
/apartments/:projectId/flats/:flatId
/apartments/:projectId/flats/:flatId/floor-plan
/apartments/:projectId/flats/:flatId/tour
/apartments/:projectId/interiors
/apartments/:projectId/materials
/apartments/:projectId/amenities
/apartments/:projectId/parking
/apartments/:projectId/security
/apartments/:projectId/maintenance
/apartments/:projectId/pricing

/houses
/houses/:houseId
/houses/:houseId/floors
/houses/:houseId/tour

/villas
/villas/:communityId
/villas/:communityId/masterplan
/villas/:communityId/villas/:villaId
/villas/:communityId/villas/:villaId/floor-plan
/villas/:communityId/villas/:villaId/tour
/villas/:communityId/amenities

/enquire/:propertyType/:propertyId
/schedule-visit
/emi-calculator
/saved
```

Small informational views may share feature components, but each listed purpose retains a distinct URL and route boundary.

## Domain model

Core entities are `Project`, `LandProject`, `Plot`, `ApartmentProject`, `Tower`, `Floor`, `Flat`, `House`, `VillaCommunity`, `Villa`, `Amenity`, `LocationPoint`, and `MediaAsset`. Relationships use IDs rather than nested duplicate objects.

Availability is the shared union `available | reserved | sold`. UI color is derived from status through design tokens; status data never stores presentation colors.

Money is represented as integer INR amounts. Areas store a numeric value plus an explicit unit. Any display conversion happens in formatting helpers.

## State ownership

- URL state: selected project, tower, floor, plot, flat, villa, filters worth sharing, and current explorer view.
- Feature state: hover, temporary selection, camera controls, panel expansion, and loading state.
- Persisted demo state: favorites, comparison list, and explicitly simulated inventory changes.
- Derived state: counts, price ranges, filter options, and availability summaries.

Persisted state is versioned and accessed through adapters so schema changes can be migrated or discarded safely.

## Rendering and performance

- Lazy-load each domain route group.
- Load Leaflet, React Three Fiber, Drei, and Marzipano only inside their feature routes.
- Render useful skeletons while route chunks and media load.
- Use responsive images with explicit dimensions and graceful fallbacks.
- Keep simplified 3D geometry deterministic and cap device pixel ratio on constrained devices.
- Respect `prefers-reduced-motion` and provide non-3D or static fallbacks.

## Design direction

The visual system pairs deep navy and charcoal surfaces with warm ivory and restrained gold accents. Typography should combine an editorial display face with a highly legible sans-serif UI face. Use strong architectural composition, generous negative space, and varied content rhythms instead of repeating grids of identical cards.

The homepage narrative should progress from brand promise, to category discovery, to a tangible interactive preview, to featured inventory, and finally to a clear visit/enquiry action. All factual-looking content must remain visibly identifiable as illustrative demo content.

## Testing strategy

- Unit tests for selectors, formatters, storage adapters, filter logic, and inventory derivation.
- Component tests for navigation, filters, selection panels, and form validation.
- Journey tests for the four client-demo paths.
- Visual browser checks at representative mobile, tablet, laptop, and wide desktop sizes.
- Interaction smoke tests for map selection, 3D controls/fallbacks, and panorama room switching.

## Milestone 2 acceptance criteria

The next milestone creates the Vite/React/TypeScript application, Tailwind theme foundation, shadcn-compatible primitives, router with lazy route placeholders, test runner, and baseline lint/type/build scripts. It should not yet implement the final homepage or domain explorers.
