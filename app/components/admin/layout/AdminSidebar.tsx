/**
 * Main sidebar component for the Alliance Admin Dashboard.
 * Implements collapsible navigation and role-aware menu items.
 */
import { Link, useLocation } from 'react-router';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import { adminNavGroups, type AdminRole } from './admin-nav';
import { useCallback } from 'react';
import { AdminUserMenu } from './AdminUserMenu';
import type { SessionUser } from '@/modules/auth/session.server';
import { ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

type AdminSidebarProps = {
  roles: AdminRole[];
  user: SessionUser;
};

export function AdminSidebar({ roles, user }: AdminSidebarProps) {
  const location = useLocation();
  const { setOpenMobile, isMobile, state } = useSidebar();

  const handleMenuClick = useCallback(() => {
    if (isMobile) setOpenMobile(false);
  }, [isMobile, setOpenMobile]);

  return (
    <Sidebar side="left" variant="inset" collapsible="icon">
      <SidebarHeader>
        <div
          className={cn(
            'flex items-center gap-3 transition-all px-2 py-4',
            state === 'collapsed' ? 'justify-center' : 'justify-start',
          )}
        >
          <img src="/alliance6.svg" alt="logo" className="w-10 h-10" />
          {state === 'expanded' && (
            <div className="flex flex-col leading-tight overflow-hidden">
              <span className="font-bold text-base truncate">ALLIANCE</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                Infraserve Admin
              </span>
            </div>
          )}
        </div>
        <SidebarSeparator />
      </SidebarHeader>

      <SidebarContent>
        {adminNavGroups.map((group) => {
          const visibleItems = group.items.filter(
            (item) =>
              !item.roles || item.roles.some((role) => roles.includes(role)),
          );
          if (!visibleItems.length) return null;

          return (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-wider">
                {group.label}
              </SidebarGroupLabel>
              <SidebarMenu>
                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === '/admin'
                      ? location.pathname === '/admin'
                      : location.pathname.startsWith(item.href);

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.label}
                      >
                        <Link to={item.href} onClick={handleMenuClick}>
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      <SidebarFooter>
        <SidebarSeparator />
        <div className="p-2">
          <AdminUserMenu name={user.full_name} roleLabel={user.roles} />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
