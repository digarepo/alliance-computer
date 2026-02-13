/**
 * Navigation configuration for the Alliance Admin Portal.
 * Maps route labels to icons and defines role-based access.
 */
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Layout,
  Settings,
  ShieldCheck,
  Layers,
  Drill,      // For Services
  Briefcase,  // For Portfolio
  Mail        // For Contacts/Inquiries
} from "lucide-react";

export type AdminRole = "admin" | "staff";

export type AdminNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  roles?: AdminRole[];
};

export type AdminNavGroup = {
  label: string;
  items: AdminNavItem[];
};

export const adminNavGroups: AdminNavGroup[] = [
  {
    label: "Management",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
      {
        label: "Hero Slider",
        href: "/admin/hero",
        icon: Layout,
      },
      {
        label: "Sectors & Services",
        href: "/admin/services",
        icon: Drill,
      },
      {
        label: "Sector Details",
        href: "/admin/sectors",
        icon: Layers,
      },
    //   {
    //     label: "Project Portfolio",
    //     href: "/admin/portfolio",
    //     icon: Briefcase,
    //   },
    ],
  },
//   {
//     label: "Communications",
//     items: [
//       {
//         label: "Inquiries",
//         href: "/admin/contacts",
//         icon: Mail,
//       },
//     ],
//   },
  {
    label: "Administration",
    items: [
      {
        label: "System Settings",
        href: "/admin/settings",
        icon: Settings,
        roles: ["admin"],
      },
    ],
  },
];

const ALLOWED_ROLES: readonly AdminRole[] = ["admin", "staff"];

/**
 * Validates and filters user roles against the known AdminRole set.
 */
export function toAdminRoles(roles: string[]): AdminRole[] {
  return roles.filter((r): r is AdminRole =>
    ALLOWED_ROLES.includes(r as AdminRole)
  );
}
