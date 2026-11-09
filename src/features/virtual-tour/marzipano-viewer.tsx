import { useEffect, useRef } from "react";
import Marzipano from "marzipano";
import type { TourRoom } from "@/features/virtual-tour/tour-data";

export default function MarzipanoViewer({ room }: { room: TourRoom }) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = containerRef.current;
    if (!element || !room.panorama) return;
    const viewer = new Marzipano.Viewer(element, { controls: { mouseViewMode: "drag" } });
    const source = Marzipano.ImageUrlSource.fromString(room.panorama.src);
    const geometry = new Marzipano.EquirectGeometry([{ width: 4096 }]);
    const limiter = Marzipano.RectilinearView.limit.traditional(4096, Math.PI * 0.55, Math.PI * 0.48);
    const view = new Marzipano.RectilinearView({ yaw: 0, pitch: 0, fov: Math.PI / 2 }, limiter);
    const scene = viewer.createScene({ source, geometry, view, pinFirstLevel: true });
    scene.switchTo({ transitionDuration: 0 });
    return () => viewer.destroy();
  }, [room]);
  return <div ref={containerRef} className="h-full w-full" aria-label={`360-degree panorama of ${room.name}`} />;
}
