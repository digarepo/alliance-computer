import { Monitor, Moon, Sun, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from './theme-provider';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={cn(
        // The "group" class is essential for child opacity triggers
        'group relative inline-flex items-center rounded-full border border-border/50 bg-background/95 p-1',
        'backdrop-blur-md shadow-sm transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
        // Desktop: Grow from icon-width to full-width
        'md:w-10.5 md:hover:w-31 md:hover:gap-1 overflow-hidden',
        // Mobile: Always visible and expanded
        'w-31 gap-1 shrink-0',
      )}
    >
      <ThemeButton
        isActive={theme === 'light'}
        onClick={() => setTheme('light')}
        icon={Sun}
        label="Light"
      />

      <ThemeButton
        isActive={theme === 'system'}
        onClick={() => setTheme('system')}
        icon={Monitor}
        label="Auto"
      />

      <ThemeButton
        isActive={theme === 'dark'}
        onClick={() => setTheme('dark')}
        icon={Moon}
        label="Dark"
      />
    </div>
  );
}

function ThemeButton({
  isActive,
  onClick,
  icon: Icon,
  label,
}: {
  isActive: boolean;
  onClick: () => void;
  icon: LucideIcon;
  label: string;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        onClick();
      }}
      className={cn(
        'relative h-8 w-8 rounded-full transition-all duration-300 shrink-0',
        isActive
          ? 'bg-primary text-primary-foreground shadow-md z-20 opacity-100'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        !isActive &&
          'md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 md:absolute md:left-1 md:group-hover:relative md:group-hover:left-0',
        isActive && 'relative opacity-100',
      )}
    >
      <Icon className="h-3.5 w-3.5 relative z-10" />
      <span className="sr-only">{label}</span>

      {isActive && (
        <div className="absolute inset-0 rounded-full bg-linear-to-b from-white/20 to-transparent pointer-events-none" />
      )}
    </Button>
  );
}
