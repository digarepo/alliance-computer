import * as React from 'react';
import type { Route } from './+types/home';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { cn } from '@/lib/utils';

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

const SECTORS = [
  {
    category: 'Geo-Physical Equipments',
    title: 'Precision Instruments for',
    emphasis: 'Subsurface Exploration',
    description:
      'Industry-leading magnetic and electromagnetic surveying tools. Engineered for reliability in the most challenging field conditions.',
    imageUrl:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2500&auto=format&fit=crop',
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
    // 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2500&auto=format&fit=crop',
    link: '/services/it-infrastructure',
  },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === 0 ? 1 : 0));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-black">
      {SECTORS.map((sector, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={sector.category}
            className={cn(
              'absolute inset-0 h-full w-full',
              isActive ? 'z-10' : 'z-0',
            )}
          >
            {/* Background Image with Ken Burns Effect */}
            <div
              className={cn(
                'absolute inset-0 transition-transform duration-6000 ease-out',
                isActive ? 'scale-110 opacity-100' : 'scale-100 opacity-0',
              )}
            >
              <img
                src={sector.imageUrl}
                alt={sector.title}
                className="h-full w-full object-cover brightness-[0.6]"
              />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-foreground/90 via-foreground/40 to-transparent" />

            <div className="relative h-full container max-w-7xl mx-auto px-6 lg:px-8 flex items-center">
              <div className="max-w-3xl">
                {/* Sector Category Eyebrow */}
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

                {/* Main Heading */}
                <h1 className="text-primary-foreground text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.9]">
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
                      'block italic text-primary/90 transition-all duration-1000 delay-700',
                      isActive
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-12 opacity-0',
                    )}
                  >
                    {sector.emphasis}
                  </span>
                </h1>

                {/* Description Text */}
                <p
                  className={cn(
                    'mt-8 text-lg text-gray-300 max-w-lg leading-relaxed transition-all duration-1000 delay-1000',
                    isActive
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-8 opacity-0',
                  )}
                >
                  {sector.description}
                </p>

                {/* CTA Button */}
                <div
                  className={cn(
                    'mt-10 transition-all duration-700 delay-[1200ms]',
                    isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-0',
                  )}
                >
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full h-14 px-10 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Link to={sector.link} className="flex items-center gap-3">
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
        {SECTORS.map((_, index) => (
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
  );
}
