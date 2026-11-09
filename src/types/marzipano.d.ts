declare module "marzipano" {
  interface ViewParams { yaw?: number; pitch?: number; fov?: number }
  interface ViewLimiter { (params: ViewParams): ViewParams }
  interface RectilinearViewInstance { readonly __marzipanoView?: true }
  interface EquirectGeometryInstance { readonly __marzipanoGeometry?: true }
  interface ImageUrlSourceInstance { readonly __marzipanoSource?: true }
  interface Scene { switchTo(options?: { transitionDuration?: number }): void }
  interface ViewerInstance { createScene(options: { source: ImageUrlSourceInstance; geometry: EquirectGeometryInstance; view: RectilinearViewInstance; pinFirstLevel?: boolean }): Scene; destroy(): void }
  const Marzipano: {
    Viewer: new (element: HTMLElement, options?: { controls?: { mouseViewMode?: string } }) => ViewerInstance;
    RectilinearView: { new (params: ViewParams, limiter?: ViewLimiter): RectilinearViewInstance; limit: { traditional(maxResolution: number, maxFov: number, maxPitch: number): ViewLimiter } };
    EquirectGeometry: new (levels: Array<{ width: number }>) => EquirectGeometryInstance;
    ImageUrlSource: { fromString(url: string): ImageUrlSourceInstance };
  };
  export default Marzipano;
}
