import { GitCompareArrows, Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { useFavorites } from "@/hooks/use-favorites";

const navItems = [
  { label: "Properties", to: "/properties" },
  { label: "Lands", to: "/lands" },
  { label: "Apartments", to: "/apartments" },
  { label: "Houses", to: "/houses" },
  { label: "Villas", to: "/villas" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { favorites } = useFavorites();
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/92 backdrop-blur-xl">
      <div className="container-page flex h-20 items-center justify-between gap-5">
        <BrandMark />
        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "rounded px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                  isActive && "bg-surface-subtle text-foreground",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button variant="ghost" size="icon" asChild>
            <NavLink to="/compare" aria-label="Compare properties">
              <GitCompareArrows aria-hidden="true" size={19} />
            </NavLink>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <NavLink
              className="relative"
              to="/favorites"
              aria-label={`View favorite properties${favorites.length ? `, ${favorites.length} saved` : ""}`}
            >
              <Heart aria-hidden="true" size={19} />
              {favorites.length > 0 && (
                <span className="absolute right-0.5 top-0.5 grid size-4 place-items-center rounded-full bg-gold text-[0.58rem] font-bold text-navy-950">
                  {favorites.length}
                </span>
              )}
            </NavLink>
          </Button>
          <Button className="hidden sm:inline-flex" asChild>
            <NavLink to="/schedule-visit">Schedule a visit</NavLink>
          </Button>
          <Button
            className="lg:hidden"
            variant="ghost"
            size="icon"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X aria-hidden="true" size={21} />
            ) : (
              <Menu aria-hidden="true" size={21} />
            )}
          </Button>
        </div>
      </div>
      {menuOpen && (
        <nav
          id="mobile-navigation"
          className="container-page grid gap-1 border-t border-border py-3 lg:hidden"
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  "rounded px-3 py-3 text-sm font-semibold text-muted hover:bg-surface-subtle hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                  isActive && "bg-surface-subtle text-foreground",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/schedule-visit"
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded bg-primary px-3 py-3 text-center text-sm font-semibold text-primary-foreground"
          >
            Schedule a visit
          </NavLink>
        </nav>
      )}
    </header>
  );
}
