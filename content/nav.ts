// Floating-nav items. Adding a route later = one line here.

export type NavItem = {
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Photos", href: "/photos" },
  { label: "Now", href: "/now" },
  { label: "Contact", href: "/#contact" },
];
