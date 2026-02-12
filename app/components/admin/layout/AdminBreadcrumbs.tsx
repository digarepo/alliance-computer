/**
 * Static mapping of admin routes to their breadcrumb labels.
 */
export type AdminBreadcrumb = {
  label: string;
  href: string;
};

export const adminBreadcrumbMap: Record<string, AdminBreadcrumb[]> = {
  '/admin': [{ label: 'Dashboard', href: '/admin' }],
  '/admin/hero': [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Hero Slider', href: '/admin/hero' },
  ],
  '/admin/settings': [
    { label: 'Dashboard', href: '/admin' },
    { label: 'System Settings', href: '/admin/settings' },
  ],
};
