/**
 * User profile and actions menu for the Admin Sidebar footer.
 * Features theme toggling and secure session termination.
 */
import { Form } from 'react-router';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { LogOut, User, MoreVertical, ShieldCheck } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

type AdminUserMenuProps = {
  name: string;
  roleLabel?: string[];
};

/**
 * Renders an interactive user menu with account actions.
 * Collapses to a simple icon/avatar when the sidebar is minimized.
 */
export function AdminUserMenu({ name, roleLabel }: AdminUserMenuProps) {
  const { state } = useSidebar();
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={state === 'collapsed' ? 'icon' : 'default'}
          className={`flex items-center gap-2 p-2 ${
            state === 'collapsed'
              ? 'rounded-full h-10 w-10 border bg-muted/20'
              : 'w-full justify-between border bg-muted/10 hover:bg-muted/20'
          }`}
          aria-label="User menu"
        >
          <div className="flex items-center gap-2 min-w-0">
            <Avatar className="h-7 w-7 border">
              <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>

            {state === 'expanded' && (
              <div className="flex flex-col items-start text-sm leading-tight min-w-0 overflow-hidden">
                <span className="font-semibold truncate w-full text-left">
                  {name}
                </span>
                {roleLabel && roleLabel.length > 0 && (
                  <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                    {roleLabel[0]}
                  </span>
                )}
              </div>
            )}
          </div>
          {state === 'expanded' && (
            <MoreVertical className="h-4 w-4 text-muted-foreground shrink-0" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        side="right"
        className="w-56"
        sideOffset={12}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              Alliance Management
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Account Profile</span>
        </DropdownMenuItem>

        <div className="flex items-center justify-between px-2 py-1.5 text-sm">
          <div className="flex items-center">
            <ShieldCheck className="mr-2 h-4 w-4" />
            <span>Theme</span>
          </div>
          <ThemeToggle />
        </div>

        <DropdownMenuSeparator />

        <Form method="post" action="/admin/signout" className="w-full">
          <DropdownMenuItem
            asChild
            className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
          >
            <button type="submit" className="flex w-full items-center">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </button>
          </DropdownMenuItem>
        </Form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
