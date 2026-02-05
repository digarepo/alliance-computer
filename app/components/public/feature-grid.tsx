/**
 * @file components/public/feature-grid.tsx
 * @description Swapped layout to prioritize Field Reliability (Geo-Physical) at the top.
 */

import { ShieldCheck, Cpu } from 'lucide-react';

export function FeatureGrid() {
  return (
    <section className="py-24 md:py-40">
      <div className="container max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          {/* Left Column: Mission & Stats */}
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-8">
              Technical Excellence <br />
              <span className="text-primary italic">
                Beyond Conventional
              </span>{' '}
              Supply.
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-md">
              Alliance bridges the gap between complex hardware requirements and
              seamless operational deployment across East Africa.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <p className="text-3xl font-bold">100%</p>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Authentic Source
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold">Logistics</p>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Region-Wide Delivery
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Feature Cards (Swapped) */}
          <div className="grid gap-6">
            {/* Geo-Physical Card - Now at Top with Offset Styling */}
            <div className="p-10 bg-primary text-primary-foreground rounded-[2.5rem] translate-x-4 lg:translate-x-12 shadow-xl shadow-primary/20">
              <ShieldCheck className="h-10 w-10 mb-6" />
              <h3 className="text-2xl font-bold mb-4 tracking-tight">
                Field Reliability
              </h3>
              <p className="opacity-90 leading-relaxed font-medium">
                Supplying geophysical instruments that withstand the most
                extreme environmental conditions on the continent. Precision
                engineering for critical subsurface data.
              </p>
            </div>

            {/* IT Infrastructure Card - Now at Bottom */}
            <div className="p-10 bg-muted/50 rounded-[2.5rem] hover:bg-muted transition-colors group border border-transparent hover:border-primary/10">
              <Cpu className="h-10 w-10 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4 tracking-tight">
                Enterprise Scaling
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Specialized in configuring high-density data centers with the
                latest generation of Dell and HPE server architecture for
                uninterrupted business connectivity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
