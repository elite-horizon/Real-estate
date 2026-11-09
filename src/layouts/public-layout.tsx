import { Outlet, ScrollRestoration } from "react-router-dom";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function PublicLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <div id="main-content" className="flex-1" tabIndex={-1}>
        <Outlet />
      </div>
      <SiteFooter />
      <ScrollRestoration />
    </div>
  );
}
