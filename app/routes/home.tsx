/**
 * @file app/routes/public/home.tsx
 * @description Masterpiece Home Page for Alliance Computer.
 * Integrates dynamic Hero Slider data from MariaDB with hardcoded fallbacks.
 */

import * as React from 'react';
import { useLoaderData, Link } from 'react-router';
import type { Route } from './+types/home';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, Cpu, ShieldCheck, Globe } from 'lucide-react';
import {
  ClientCarousel,
  LogoCarousel,
} from '@/components/public/logo-carousel';
import { FeatureGrid } from '@/components/public/feature-grid';
import { BottomCTA } from '@/components/public/bottom-cta';

/**
 * Fallback data used if the database is empty or content is unpublished.
 */
type SectorType = {
  id?: string;
  category: string;
  title: string;
  emphasis: string;
  description: string;
  imageUrl: string;
  link: string;
};
const FALLBACK_SECTORS: SectorType[] = [
  {
    category: 'Geo-Physical Equipments',
    title: 'Precision Instruments for',
    emphasis: 'Subsurface Exploration',
    description:
      'Industry-leading magnetic and electromagnetic surveying tools. Engineered for reliability in the most challenging field conditions.',
    imageUrl:
      'https://guidelinegeo.com/wp-content/uploads/2025/08/Active-Guidance-image.png',
    link: '/services/geophysical',
  },
  {
    category: 'ICT INFRASTRUCTURE',
    title: 'Enterprise Servers &',
    emphasis: 'Network Infrastructure',
    description:
      'Enterprise-grade networking and secure infrastructure. We build the backbone that powers modern business connectivity.',
    imageUrl:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2500&auto=format&fit=crop',
    link: '/services/it-infrastructure',
  },
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Alliance | Geo-Physical & IT Infrastructure' },
    {
      name: 'description',
      content:
        'Specialized geo-physical surveying equipment and enterprise IT solutions.',
    },
  ];
}

/**
 * Server Loader: Fetches dynamic hero content from MariaDB.
 */
export async function loader() {
  try {
    const { getHeroData } =
      await import('@/modules/CMS/hero/hero.model.server');

    // Pass 'true' to ensure we ONLY get published slides
    const dbHeroes = await getHeroData(true);

    return { dbHeroes };
  } catch (error) {
    console.error('Failed to load hero data:', error);
    // Return empty array so the component triggers the FALLBACK_SECTORS
    return { dbHeroes: [] };
  }
}

export default function Home() {
  const { dbHeroes } = useLoaderData<typeof loader>();

  /**
   * Merge logic: Use DB records if they exist, otherwise fallback.
   */
  const displaySectors = dbHeroes.length > 0 ? dbHeroes : FALLBACK_SECTORS;

  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Auto-slide effect
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === displaySectors.length - 1 ? 0 : prev + 1,
      );
    }, 8000);
    return () => clearInterval(timer);
  }, [displaySectors.length]);

  return (
    <main className="flex flex-col min-h-screen">
      {/* 1. HERO SLIDER SECTION */}
      <section className="relative h-[72vh] w-full overflow-hidden bg-slate-950">
        {displaySectors.map((sector, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={sector.id || `fallback-${index}`}
              className={cn(
                'absolute inset-0 h-full w-full',
                isActive ? 'z-10' : 'z-0',
              )}
            >
              <div
                className={cn(
                  'absolute inset-0 transition-transform duration-6000 ease-out',
                  isActive ? 'scale-110 opacity-100' : 'scale-100 opacity-0',
                )}
              >
                <img
                  src={sector.imageUrl}
                  alt={sector.title}
                  className="h-full w-full object-cover brightness-[0.4]"
                />
              </div>

              {/* High-Contrast Overlay for Text Readability */}
              <div className="absolute inset-0 bg-slate-700/60 lg:bg-linear-to-r lg:from-slate-700 lg:via-slate-950/40 lg:to-transparent" />

              <div className="relative h-full container max-w-7xl mx-auto px-6 lg:px-8 flex items-center">
                <div className="max-w-3xl">
                  <div className="overflow-hidden mb-4">
                    <p
                      className={cn(
                        'text-sm font-bold tracking-[0.3em] uppercase text-primary transition-all duration-700 delay-300',
                        isActive
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-full opacity-0',
                      )}
                    >
                      {sector.category}
                    </p>
                  </div>

                  <h1 className="text-white text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.9]">
                    <span
                      className={cn(
                        'block transition-all duration-1000 delay-500',
                        isActive
                          ? 'translate-x-0 opacity-100'
                          : '-translate-x-12 opacity-0',
                      )}
                    >
                      {sector.title}
                    </span>
                    <span
                      className={cn(
                        'block italic text-primary transition-all duration-1000 delay-700',
                        isActive
                          ? 'translate-x-0 opacity-100'
                          : 'translate-x-12 opacity-0',
                      )}
                    >
                      {sector.emphasis}
                    </span>
                  </h1>

                  <p
                    className={cn(
                      'mt-8 text-lg text-slate-300 max-w-lg leading-relaxed transition-all duration-1000 delay-1000',
                      isActive
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-8 opacity-0',
                    )}
                  >
                    {sector.description}
                  </p>

                  <div
                    className={cn(
                      'mt-10 transition-all duration-700 delay-[1200ms]',
                      isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-0',
                    )}
                  >
                    <Button
                      asChild
                      size="lg"
                      className="rounded-full h-14 px-10 bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
                    >
                      <Link
                        to={sector.link}
                        className="flex items-center gap-3"
                      >
                        VIEW SPECIFICATIONS
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Slide Navigation Bars */}
        <div className="absolute bottom-12 right-6 lg:right-12 z-20 flex flex-col gap-4">
          {displaySectors.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="group flex items-center gap-4 text-left"
            >
              <span
                className={cn(
                  'text-[10px] font-bold tracking-widest transition-colors',
                  index === currentIndex
                    ? 'text-white'
                    : 'text-white/40 group-hover:text-white',
                )}
              >
                0{index + 1}
              </span>
              <div
                className={cn(
                  'h-0.5 transition-all duration-500',
                  index === currentIndex
                    ? 'w-12 bg-primary'
                    : 'w-6 bg-white/20 group-hover:w-8 group-hover:bg-white/40',
                )}
              />
            </button>
          ))}
        </div>
      </section>

      {/* 2. TECHNICAL ADVANTAGE FEATURE GRID */}
      <FeatureGrid />

      <ClientCarousel />

      {/* 3. ARCHITECTURAL VISUAL BREAK */}
      <section className="h-[50vh] md:h-[60vh] relative overflow-hidden flex items-center justify-center bg-slate-950">
        <img
          src="https://i.dell.com/is/image/DellContent/content/dam/ss2/page-specific/franchise-page/server-franchise/bulkshoot-datacenter-02-0173-la9450t-poweredge-xe9680-1499x700.png?fmt=png-alpha&wid=1499&hei=700"
          alt="High-density data center corridor"
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-30"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-slate-950" />

        <div className="relative text-center z-10 px-6">
          <nav className="flex items-center justify-center gap-2 mb-6 text-primary font-bold tracking-[0.4em] text-[10px] uppercase">
            <span className="h-px w-8 bg-primary" />
            <span>Operational Integrity</span>
            <span className="h-px w-8 bg-primary" />
          </nav>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white">
            Architecture of <br />{' '}
            <span className="text-primary italic">Performance.</span>
          </h2>
        </div>
      </section>

      {/* 4. DIRECT SECTOR LINKS */}
      <section className="py-24 md:py-40 bg-background overflow-hidden">
        <div className="container max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-32 md:gap-48">
            {/* Sector 01: Geo-Physical */}
            <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
              <span className="absolute -top-20 -left-10 text-[15rem] font-bold text-muted/20 select-none z-0">
                01
              </span>
              <div className="lg:col-span-5 z-10 space-y-6 lg:-mr-24">
                <nav className="flex items-center gap-2 text-primary font-bold tracking-[0.4em] text-[10px] uppercase">
                  <span className="h-px w-8 bg-primary" />
                  <span>Primary Sector</span>
                </nav>
                <h3 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[0.85]">
                  Geo-Physical <br />
                  <span className="text-primary italic">Instruments.</span>
                </h3>
                <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                  Precision-engineered magnetic and electromagnetic surveying
                  tools for high-stakes subsurface exploration.
                </p>
                <Button
                  asChild
                  className="rounded-full px-10 font-bold group shadow-xl"
                >
                  <Link
                    to="/services/geophysical"
                    className="flex items-center gap-3"
                  >
                    EXPLORE SPECIFICATIONS
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
              <div className="lg:col-span-7 relative group">
                <div className="relative aspect-16/10 overflow-hidden rounded-[3rem] shadow-2xl border">
                  <img
                    src={FALLBACK_SECTORS[0].imageUrl}
                    alt="Geophysical equipment"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-primary p-6 rounded-3xl shadow-xl hidden md:block">
                  <ShieldCheck className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>

            {/* Sector 02: IT Infrastructure */}
            <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:direction-rtl">
              <span className="absolute -top-20 -right-10 text-[15rem] font-bold text-muted/20 select-none z-0">
                02
              </span>
              <div className="lg:col-span-5 z-10 space-y-6 lg:-ml-24 text-left lg:text-right flex flex-col lg:items-end">
                <nav className="flex items-center gap-2 text-primary font-bold tracking-[0.4em] text-[10px] uppercase">
                  <span className="h-px w-8 bg-primary" />
                  <span>Infrastructure</span>
                </nav>
                <h3 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[0.85]">
                  Enterprise <br />
                  <span className="text-primary italic">Computing.</span>
                </h3>
                <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                  Building the digital backbone for modern business with
                  scalable server architecture and secure networking.
                </p>
                <Button
                  asChild
                  size={'lg'}
                  className="rounded-full px-10 font-bold group shadow-xl"
                >
                  <Link
                    to="/services/it-infrastructure"
                    className="flex items-center gap-3"
                  >
                    VIEW INFRASTRUCTURE
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
              <div className="lg:col-span-7 relative group lg:direction-ltr">
                <div className="relative aspect-16/10 overflow-hidden rounded-[3rem] shadow-2xl border">
                  <img
                    src={FALLBACK_SECTORS[1].imageUrl}
                    alt="IT infrastructure"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-slate-950 p-6 rounded-3xl shadow-xl hidden md:block border border-white/10">
                  <Cpu className="h-8 w-8 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LogoCarousel />

      <section className="py-24 border-t bg-muted/10">
        <div className="container max-w-5xl mx-auto px-6 text-center">
          <Globe className="h-10 w-10 text-primary mx-auto mb-8 opacity-70" />
          <h2 className="text-3xl md:text-6xl font-bold tracking-tight mb-8">
            Ready to equip <br className="md:hidden" /> your next milestone?
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Alliance facilitates specialized hardware logistics across the
            region, ensuring your projects are supported by the most reliable
            technology available today.
          </p>
        </div>
      </section>

      <BottomCTA />
    </main>
  );
}
