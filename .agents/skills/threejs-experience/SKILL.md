---
name: threejs-experience
description: Create performant React Three Fiber property selectors and floor-plan scenes for this real estate demo, including controls, selection, labels, and fallbacks.
---

# Three.js Experience

Use simplified, polished geometry to communicate the property-selection concept clearly.

- Lazy-load the entire 3D feature and show a useful skeleton while it initializes.
- Keep domain selection state outside the scene graph; scene objects receive IDs and callbacks.
- Reuse materials and geometry, limit shadows, and cap device pixel ratio when appropriate.
- Provide bounded orbit/zoom controls and a reset-view action.
- Make selectable objects discoverable through labels, hover/focus feedback, and an accessible HTML alternative.
- Keep room and unit colors token-driven and consistent with availability semantics.
- Dispose feature-owned resources and avoid per-frame React state updates.
- Offer a 2D or static fallback for reduced capability, loading failure, and users who prefer it.

Verify selection, camera controls, resizing, fallback behavior, and route transitions on both pointer and touch layouts.
