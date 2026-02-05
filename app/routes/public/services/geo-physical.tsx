/**
 * @file app/routes/public/services/geo-physical.tsx
 * @description Masterpiece layout for Geophysical Equipment.
 * Features alternating full-bleed sections with high-accuracy industrial imagery.
 */

import { Drill, Layers, Database, CheckCircle2, Zap } from 'lucide-react';
import { BottomCTA } from '@/components/public/bottom-cta';

const categories = [
  {
    title: 'Resistivity & Terrameter Systems',
    description:
      'The gold standard for electrical imaging. We supply systems designed for high-resolution mapping of groundwater resources and mineral bodies, ensuring durability in extreme field conditions.',
    features: [
      'ABEM Terrameter LS2 Supply',
      'Advanced Multi-electrode Imaging',
      'High-Power Signal Processing',
    ],
    image:
      'https://guidelinegeo.com/wp-content/uploads/2025/08/PowerAdapter1_web-1536x866-1.png',
    icon: Layers,
    isReverse: false,
  },
  {
    title: 'Magnetics & Gradiometers',
    description:
      'Ultra-sensitive magnetic survey instruments. Essential for mineral exploration and geological mapping where precision in detecting magnetic anomalies is paramount.',
    features: [
      'Proton Precession Sensors',
      'Overhauser Magnetometers',
      'Real-time Field Visualization',
    ],
    image:
      'https://www.geometrics.com/wp-content/uploads/2020/01/Front-Angle-1.jpg',
    icon: Drill,
    isReverse: true,
  },
  {
    title: 'Borehole Logging Systems',
    description:
      'Integrated subsurface data acquisition. We provide the full stack: from digital probes and winches to the surface control units that manage the data stream.',
    features: [
      'Slimline Digital Probes',
      'Electric & Manual Winch Systems',
      'Multi-parameter Data Collection',
    ],
    image:
      'https://iirnrwxhlkrk5q.leadongcdn.com/cloud/lnBqkKoiSRnloqmloriq/5.png',
    icon: Database,
    isReverse: false,
  },
];

export default function GeoPhysicalPage(): React.JSX.Element {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      {/* 1. HERO SECTION: High-impact Field Survey Imagery */}
      <section className="relative h-[65vh] md:h-[80vh] w-full flex items-center overflow-hidden">
        <img
          src="https://guidelinegeo.com/wp-content/uploads/2025/08/ABEM-Terrameter-LS-2-heroimage-3-morgans-terrameter-green-fields-and-forest-944x763-1.jpg?v=1764938001"
          alt="Technical survey work in industrial environment"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Architectural Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/40 to-transparent" />

        <div className="container max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-white">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 mb-6 text-primary font-bold tracking-[0.4em] text-[10px] uppercase">
              <Zap className="h-3 w-3 fill-primary" />
              <span>Technical Excellence</span>
            </nav>
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 leading-[0.95]">
              Advanced <br />
              <span className="text-primary italic underline decoration-white/20 underline-offset-8">
                Geophysical
              </span>{' '}
              Supply.
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
              From groundwater detection to deep mineral exploration, we provide
              the instrumentation that defines subsurface clarity.
            </p>
          </div>
        </div>
      </section>

      {/* 2. PORTFOLIO INTRO */}
      <section className="py-20 bg-muted/5">
        <div className="container max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Our Equipment Portfolio
            </h2>
            <div className="h-px flex-1 bg-border hidden md:block mx-12" />
            <p className="text-muted-foreground max-w-sm text-sm">
              Sourcing high-performance field instruments for engineering,
              research, and exploration.
            </p>
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC ALTERNATING SECTIONS */}
      {categories.map((cat, idx) => (
        <section key={idx} className="relative overflow-hidden group">
          <div
            className={`flex flex-col ${cat.isReverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-stretch`}
          >
            <div className="w-full lg:w-[55%] relative h-100 md:h-137.5 lg:h-175 overflow-hidden">
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]" />
            </div>

            <div
              className={`w-full lg:w-[45%] flex flex-col justify-center p-8 md:p-16 lg:p-24 ${cat.isReverse ? 'bg-muted/10' : 'bg-background'}`}
            >
              <div className="max-w-md mx-auto lg:mx-0">
                <cat.icon className="h-10 w-10 text-primary mb-8 opacity-80" />
                <h3 className="text-2xl md:text-4xl font-bold mb-6 tracking-tight leading-tight">
                  {cat.title}
                </h3>
                <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
                  {cat.description}
                </p>

                <div className="space-y-4 mb-12">
                  {cat.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-sm font-semibold tracking-wide uppercase text-foreground/80"
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* 4. REUSABLE CTA */}
      <BottomCTA
        title="Technical Procurement"
        description="Connect with our specialists for detailed equipment specifications, lead times, and comprehensive quotation packages."
      />
    </div>
  );
}
