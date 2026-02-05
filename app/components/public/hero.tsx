import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the SectorHero component.
 * @property {string} title - The main heading.
 * @property {string} description - The sub-heading text.
 * @property {string} imageUrl - The background or side image.
 * @property {string} [category] - A small eyebrow text above the title.
 * @property {React.ReactNode} [cta] - Optional call to action button.
 * @property {boolean} [reversed] - Flips the image and text side.
 */
interface SectorHeroProps {
  title: string;
  description: string;
  imageUrl: string;
  category?: string;
  cta?: React.ReactNode;
  reversed?: boolean;
}

/**
 * A reusable, elegant Hero section for sector-specific pages.
 * @param {SectorHeroProps} props - The properties to render the hero.
 * @returns {React.JSX.Element}
 */
export function SectorHero({
  title,
  description,
  imageUrl,
  category,
  cta,
  reversed = false,
}: SectorHeroProps): React.JSX.Element {
  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-24 lg:py-32">
      <div className="container max-w-7xl mx-auto px-6 lg:px-8">
        <div
          className={cn(
            'grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center',
            reversed && 'lg:direction-rtl',
          )}
        >
          {/* Text Content */}
          <div
            className={cn(
              'flex flex-col space-y-8',
              reversed ? 'lg:order-last' : '',
            )}
          >
            <div className="space-y-4">
              {category && (
                <span className="text-sm font-semibold tracking-widest text-primary">
                  {category}
                </span>
              )}
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:leading-[1.1]">
                {title}
              </h1>
              <p className="max-w-150 text-lg text-muted-foreground md:text-xl leading-relaxed">
                {description}
              </p>
            </div>
            {cta && <div className="flex flex-wrap gap-4">{cta}</div>}
          </div>

          {/* Image Content */}
          <div className="relative">
            <div className="aspect-4/3 overflow-hidden rounded-2xl border bg-muted shadow-2xl">
              <img
                src={imageUrl}
                alt={title}
                className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
              />
              {/* Subtle Overlay for depth */}
              <div className="absolute inset-0 ring-1 ring-inset ring-foreground/5 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div
        className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-1108/632 w-277 bg-linear-to-r from-primary/10 to-secondary/10 opacity-20"
          style={{
            clipPath:
              'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
          }}
        />
      </div>
    </section>
  );
}
