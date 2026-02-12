/**
 * Admin layout UI shell for Alliance Computer Services.
 *
 * Composes the SidebarProvider, AdminSidebar, and AdminNavbar into a
 * unified administrative interface. It handles role transformation
 * and provides the main scrollable content area.
 */

import { SidebarProvider } from '@/components/ui/sidebar';
import { AdminSidebar } from './AdminSidebar';
// import { AdminNavbar } from "./AdminNavbar";
import type { SessionUser } from '@/modules/auth/session.server';
import type { ReactNode } from 'react';
import { toAdminRoles } from './admin-nav';
import { AdminNavbar } from './AdminNavbar';

type AdminLayoutProps = {
  /** Authenticated user object retrieved from the session */
  user: SessionUser;

  /** Nested admin routes rendered via the Router Outlet */
  children: ReactNode;
};

/**
 * Shared layout component for all authenticated /admin routes.
 *
 * Provides:
 * - Sidebar state management via SidebarProvider
 * - Role-aware navigation filtering
 * - Responsive layout shell with a sticky navbar
 *
 * @param props.user The authenticated session user
 * @param props.children Nested admin route content
 */
export function AdminLayout({ user, children }: AdminLayoutProps) {
  // Filters the string roles from the session into valid AdminRole types
  const adminRoles = toAdminRoles(user.roles || []);

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full bg-background transition-colors duration-300">
        {/* Left-side navigation drawer */}
        <AdminSidebar roles={adminRoles} user={user} />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Top navigation and breadcrumbs */}
          <AdminNavbar />

          {/* Main content area.
            Uses max-w-[100vw] and overflow-x-hidden to prevent
            layout shift on mobile or during sidebar transitions.
          */}
          <main className="flex-1 p-4 md:p-6 w-full max-w-[100vw] overflow-x-hidden animate-in fade-in duration-500">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
