/**
 * @file AdminNavbar.tsx
 * @description Focused Admin Navigation.
 * Provides sidebar control and current module context only.
 */

import { useLocation } from 'react-router';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

export function AdminNavbar() {
  const location = useLocation();

  // Extract the current module from the URL path
  const pathParts = location.pathname.split('/').filter(Boolean);
  // Default to 'Dashboard' if at /admin, otherwise take the last segment
  const rawModule =
    pathParts.length <= 1 ? 'Dashboard' : pathParts[pathParts.length - 1];

  // Clean up common naming conventions (e.g., hero -> Hero)
  const displayTitle = rawModule.charAt(0).toUpperCase() + rawModule.slice(1);

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center border-b bg-background/95 backdrop-blur-md px-4 md:px-6">
      <div className="flex items-center gap-4">
        {/* The Essential Sidebar Toggle */}
        <SidebarTrigger className="h-9 w-9 border shadow-sm bg-background hover:bg-accent transition-all active:scale-95" />

        <Separator orientation="vertical" className="h-6 opacity-50" />

        <div className="flex flex-col justify-center">
          <h1 className="text-lg font-semibold leading-none tracking-tight text-foreground capitalize">
            {displayTitle}
          </h1>
        </div>
      </div>

      {/* Right side spacer to maintain layout balance */}
      <div className="ml-auto" />
    </header>
  );
}
