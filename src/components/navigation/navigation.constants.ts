export const CINEMATIC_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#applications", label: "Applications" },
  { href: "/#products", label: "Products" },
  { href: "/#manufacturing", label: "Manufacturing" },
  { href: "/#case-studies", label: "Case Studies" },
  { href: "/#contact", label: "Contact" },
] as const;

export type CinematicNavLink = (typeof CINEMATIC_NAV_LINKS)[number];
