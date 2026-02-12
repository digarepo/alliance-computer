/**
 * @file app/routes/admin/hero.preview.tsx
 * @description Pixel-perfect responsive preview of the Hero section.
 * Replicates the CSS transition logic from Home.tsx to ensure high-fidelity.
 */

import * as React from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { requireUser } from '@/modules/auth/require-user.server';

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUser(request, 'hero:manage');
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) throw new Response('Hero ID Required', { status: 400 });

  const { getHeroData } = await import('@/modules/CMS/hero/hero.model.server');
  const heroes = await getHeroData(false);
  const hero = heroes.find((h) => h.id === id);

  if (!hero) throw new Response('Hero Not Found', { status: 404 });

  return { hero };
}

export default function HeroPreview() {
  const { hero } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  // We trigger the animations by setting isActive to true after mount
  const [isActive, setIsActive] = React.useState(false);
  React.useEffect(() => {
    const timer = setTimeout(() => setIsActive(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-100 bg-slate-950 flex flex-col overflow-hidden font-sans">
      {/* --- ADMINISTRATIVE OVERLAY --- */}
      <header className="shrink-0 z-50 flex items-center justify-between px-4 md:px-8 py-3 bg-slate-900/90 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/10 h-9 px-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Exit Preview
          </Button>
          <div className="hidden sm:block h-4 w-px bg-white/20" />
          <span className="hidden sm:inline text-xs text-white/50 tracking-wider uppercase font-bold">
            Live Preview Canvas
          </span>
        </div>

        <Badge
          variant="outline"
          className="border-primary/40 text-primary uppercase text-[10px] tracking-widest px-3"
        >
          Responsive Mode
        </Badge>
      </header>

      {/* --- HERO SECTION --- */}
      <main className="flex-1 overflow-y-auto">
        <section className="relative h-[72vh] w-full overflow-hidden bg-slate-950">
          <div className="absolute inset-0 h-full w-full z-10">
            <div
              className={cn(
                'absolute inset-0 transition-transform duration-6000 ease-out',
                isActive ? 'scale-110 opacity-100' : 'scale-100 opacity-0',
              )}
            >
              <img
                src={hero.imageUrl}
                alt={hero.title}
                className="h-full w-full object-cover brightness-[0.4]"
              />
            </div>

            {/* High-Contrast Overlay */}
            <div className="absolute inset-0 bg-slate-70/60 lg:bg-linear-to-r lg:from-slate-950 lg:via-slate-950/40 lg:to-transparent" />

            {/* Content Container */}
            <div className="relative h-full container max-w-7xl mx-auto px-6 lg:px-8 flex items-center">
              <div className="max-w-3xl">
                {/* Category/Eyebrow */}
                <div className="overflow-hidden mb-4">
                  <p
                    className={cn(
                      'text-sm font-bold tracking-[0.3em] uppercase text-primary transition-all duration-700 delay-300',
                      isActive
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-full opacity-0',
                    )}
                  >
                    {hero.category}
                  </p>
                </div>

                {/* Heading */}
                <h1 className="text-white text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.9]">
                  <span
                    className={cn(
                      'block transition-all duration-1000 delay-500',
                      isActive
                        ? 'translate-x-0 opacity-100'
                        : '-translate-x-12 opacity-0',
                    )}
                  >
                    {hero.title}
                  </span>
                  <span
                    className={cn(
                      'block italic text-primary transition-all duration-1000 delay-700',
                      isActive
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-12 opacity-0',
                    )}
                  >
                    {hero.emphasis}
                  </span>
                </h1>

                {/* Description */}
                <p
                  className={cn(
                    'mt-8 text-lg text-slate-300 max-w-lg leading-relaxed transition-all duration-1000 delay-1000',
                    isActive
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-8 opacity-0',
                  )}
                >
                  {hero.description}
                </p>

                {/* CTA Button */}
                <div
                  className={cn(
                    'mt-10 transition-all duration-700 delay-[1200ms]',
                    isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-0',
                  )}
                >
                  <Button
                    size="lg"
                    className="rounded-full h-14 px-10 bg-primary text-primary-foreground hover:bg-primary/90 font-bold pointer-events-none"
                  >
                    <span className="flex items-center gap-3">
                      VIEW SPECIFICATIONS
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Break Context (End of Preview) */}
        <div className="bg-slate-950 p-20 text-center border-t border-white/5">
          <p className="text-white/10 text-[10px] tracking-[0.4em] uppercase font-bold">
            End of Component Preview
          </p>
        </div>
      </main>
    </div>
  );
}
