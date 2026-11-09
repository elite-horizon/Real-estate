---
name: virtual-tours
description: Build room-based 360-degree tour experiences and honest gallery fallbacks for this real estate demo using Marzipano-compatible panoramas.
---

# Virtual Tours

Only label imagery as 360-degree content when it is a real equirectangular panorama with appropriate usage rights.

- Load Marzipano only on tour routes and isolate its imperative lifecycle in a feature adapter.
- Model rooms, scenes, initial views, and hotspots as data rather than hardcoding them into the viewer.
- Provide room switching, hotspot labels, orientation reset, fullscreen where supported, and clear loading/error states.
- Keep navigation controls operable without relying only on the panorama canvas.
- Clean up viewers, listeners, and object URLs when scenes or routes change.
- If suitable panoramas are absent, display a polished, explicitly labeled demonstration gallery instead of simulating a false 360 experience.
- Include source/license metadata for every panorama asset before it enters the repository.

Verify every room transition, hotspot destination, resize/fullscreen behavior, cleanup, and the gallery fallback.
