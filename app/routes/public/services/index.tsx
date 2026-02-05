/**
 * @file app/routes/public/services/index.tsx
 * @description Refined master services directory.
 * Features softer separators, increased whitespace for desktop,
 * and a reusable CTA footer bridge.
 * @returns {React.JSX.Element} The Services landing page.
 */

import { Link } from 'react-router';
import { ArrowRight, Drill, Server, Globe, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BottomCTA } from '@/components/public/bottom-cta';

export default function ServicesPage(): React.JSX.Element {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="container max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <nav className="flex items-center gap-2 mb-4 text-primary font-bold tracking-[0.2em] text-[10px] uppercase">
              <Globe className="h-3 w-3" />
              <span>Operational Excellence</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-[1.1]">
              Equipment & <br />
              <span className="text-primary italic">
                Infrastructure Supply.
              </span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Alliance provides enterprise-grade technology solutions for
              geophysical exploration and digital architecture.
            </p>
          </div>
        </div>
      </section>

      <Separator className="opacity-50" />

      {/* SECTOR 1: GEO-PHYSICAL */}
      <section className="">
        <div className="flex flex-col lg:flex-row items-stretch">
          {/* Image Column */}
          <div className="w-full lg:w-[60%] relative h-75 md:h-125 lg:h-150">
            <img
              src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=2000"
              alt="Geophysical survey instrumentation"
              className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-700"
            />
          </div>

          {/* Content Column */}
          <div className="w-full lg:w-[40%] flex flex-col justify-center p-8 md:p-16 lg:p-20 bg-background relative py-12 md:py-24 overflow-hidden">
            <div className="max-w-md">
              <div className="h-1 w-12 bg-primary mb-8" />
              <Drill className="h-8 w-8 text-primary mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
                Geophysical <br /> Instrumentation
              </h2>
              <p className="text-muted-foreground text-sm md:text-base mb-6 leading-relaxed">
                Specialized supply of resistivity meters, seismic sensors, and
                borehole logging systems for subsurface exploration.
              </p>
              <ul className="grid grid-cols-1 gap-3 mb-10 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 bg-primary" />
                  Resistivity Systems
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 bg-primary" />
                  Borehole Logging
                </li>
              </ul>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-colors h-12 px-8 text-xs uppercase tracking-[0.2em] font-bold"
              >
                <Link
                  to="/services/geophysical"
                  className="flex items-center gap-2"
                >
                  Explore Sector <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Separator className="opacity-50" />

      {/* SECTOR 2: IT INFRASTRUCTURE */}
      <section className="">
        <div className="flex flex-col lg:flex-row-reverse items-stretch">
          {/* Image Column */}
          <div className="w-full lg:w-[60%] relative h-75 md:h-125 lg:h-150">
            <img
              src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=2000"
              alt="Modern enterprise datacenter"
              className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-700"
            />
          </div>

          {/* Content Column */}
          <div className="w-full lg:w-[40%] flex flex-col justify-center p-8 md:p-16 lg:p-20 bg-muted/20 relative py-12 md:py-24 overflow-hidden">
            <div className="max-w-md">
              <div className="h-1 w-12 bg-primary mb-8" />
              <Server className="h-8 w-8 text-primary mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
                Enterprise IT <br /> Infrastructure
              </h2>
              <p className="text-muted-foreground text-sm md:text-base mb-6 leading-relaxed">
                Hardware supply for modern digital cores. Datacenter server
                nodes, storage, and networking appliances.
              </p>
              <ul className="grid grid-cols-1 gap-3 mb-10 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 bg-primary" />
                  Server Nodes
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 bg-primary" />
                  Network Security
                </li>
              </ul>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-colors h-12 px-8 text-xs uppercase tracking-[0.2em] font-bold"
              >
                <Link
                  to="/services/it-infrastructure"
                  className="flex items-center gap-2"
                >
                  Explore Sector <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* REUSABLE CTA SECTION */}
      <BottomCTA />
    </div>
  );
}
