import * as React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

/**
 * Navigation items shared between mobile and desktop views.
 */
const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  {
    name: 'Services',
    href: '/services',
    subItems: [
      { name: 'IT Infrastructure', href: '/services/it-infrastructure' },
      { name: 'Geo-Physical', href: '/services/geophysical' },
    ],
  },
  { name: 'Contact', href: '/contact' },
];

/**
 * Elegant Navbar component.
 * - Desktop: Minimalist top bar with a 7xl container constraint.
 * - Mobile: Floating circular menu button, opens a top-to-bottom drawer.
 * * @returns {React.JSX.Element} The responsive navigation component.
 */
export function Navbar(): React.JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Shared class logic for the underline style
  const getNavItemClasses = (isActive: boolean) =>
    cn(
      'text-sm font-medium transition-all hover:text-primary relative py-1',
      isActive
        ? 'text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary'
        : 'text-muted-foreground',
    );

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex items-center gap-2">
            <img
              src="/alliance7.svg"
              alt="Alliance Logo"
              className="h-8 w-auto dark:invert"
            />
          </NavLink>

          <NavigationMenu>
            <NavigationMenuList className="gap-8">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  {item.subItems ? (
                    <>
                      <NavigationMenuTrigger
                        onClick={() => navigate(item.href)}
                        className={cn(
                          'h-auto p-0 bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent',
                          getNavItemClasses(
                            location.pathname.startsWith(item.href),
                          ),
                        )}
                      >
                        {item.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-64 gap-2 p-4 bg-card">
                          {item.subItems.map((sub) => (
                            <li key={sub.href}>
                              <NavigationMenuLink asChild>
                                <NavLink
                                  to={sub.href}
                                  className={({ isActive }) =>
                                    cn(
                                      'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground',
                                      isActive
                                        ? 'bg-accent/50 text-primary font-medium'
                                        : 'text-muted-foreground',
                                    )
                                  }
                                >
                                  {sub.name}
                                </NavLink>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavLink
                      to={item.href}
                      className={({ isActive }) => getNavItemClasses(isActive)}
                    >
                      {item.name}
                    </NavLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>

      {/* Mobile Floating Menu */}
      <div className="md:hidden">
        <NavLink
          to="/"
          className="fixed top-6 left-6 h-14 w-14 rounded-full shadow-2xl z-50 border-2 border-primary/20 bg-primary/95 backdrop-blur flex items-center justify-center overflow-hidden active:scale-95 transition-transform"
        >
          <img
            src="/alliance6.svg"
            alt="Alliance Logo"
            className="h-8 w-8 object-contain dark:invert"
          />
        </NavLink>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="fixed top-6 right-6 h-14 w-14 rounded-full shadow-2xl z-50 border-2 border-primary/20 bg-primary text-primary-foreground"
            >
              <Menu className="h-8 w-8" />
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="w-full rounded-b-xl px-6 pt-20">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <div key={item.href} className="w-full">
                  {item.subItems ? (
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full border-none"
                    >
                      <AccordionItem value={item.name} className="border-none">
                        <div className="flex items-center justify-between w-full">
                          <NavLink
                            to={item.href}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                              cn(
                                'flex-1 py-2 text-lg font-medium transition-colors',
                                isActive
                                  ? 'text-primary'
                                  : 'text-muted-foreground',
                              )
                            }
                          >
                            {item.name}
                          </NavLink>
                          <AccordionTrigger className="w-12 h-10 py-0 hover:no-underline" />
                        </div>
                        <AccordionContent className="pb-2 pl-4 flex flex-col gap-2 border-l-2 border-primary/20 ml-2">
                          {item.subItems.map((sub) => (
                            <NavLink
                              key={sub.href}
                              to={sub.href}
                              onClick={() => setIsOpen(false)}
                              className={({ isActive }) =>
                                cn(
                                  'py-2 text-md transition-colors',
                                  isActive
                                    ? 'text-primary'
                                    : 'text-muted-foreground',
                                )
                              }
                            >
                              {sub.name}
                            </NavLink>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <NavLink
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'block py-3 text-lg font-medium transition-colors border-b border-transparent',
                          isActive ? 'text-primary' : 'text-muted-foreground',
                        )
                      }
                    >
                      {item.name}
                    </NavLink>
                  )}
                </div>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
