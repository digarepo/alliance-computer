/**
 * @file app/routes/public/about.tsx
 * @description About page for Alliance Computer.
 * Focuses on company mission, technical reliability, and core pillars.
 */

import { ShieldCheck, Target, Users, Zap, Globe } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { BottomCTA } from '@/components/public/bottom-cta';

const pillars = [
  {
    title: 'Authentic Procurement',
    description:
      'We source directly from globally recognized manufacturers, ensuring every piece of hardware is genuine and certified.',
    icon: ShieldCheck,
  },
  {
    title: 'Technical Expertise',
    description:
      'Our team understands the specifications required for deep-earth exploration and high-density digital architecture.',
    icon: Zap,
  },
  {
    title: 'Regional Commitment',
    description:
      'Based in Addis Ababa, we bridge the gap between global technology and local operational requirements.',
    icon: Target,
  },
];

export default function AboutPage(): React.JSX.Element {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      {/* 1. ARCHITECTURAL HERO */}
      <section className="relative pt-24 pb-16 md:pt-40 md:pb-32 bg-muted/20">
        <div className="container max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-end">
            <div className="flex-1">
              <nav className="flex items-center gap-2 mb-6 text-primary font-bold tracking-[0.4em] text-[10px] uppercase">
                <Users className="h-3 w-3" />
                <span>Our Identity</span>
              </nav>
              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.85] mb-8">
                The bridge <br />
                between <span className="text-primary italic">vision</span>{' '}
                <br />& hardware.
              </h1>
            </div>
            <div className="flex-1 pb-4">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-md">
                <code>Alliance</code>  is a specialized supplier of enterprise-grade
                technology, focused on the intersection of geophysical
                exploration and digital infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE MISSION (IMAGE + TEXT) */}
      <section className="py-20 md:py-32">
        <div className="container max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative aspect-square md:aspect-video lg:aspect-square overflow-hidden rounded-[2.5rem]">
              <img
                src="https://new.abb.com/images/librariesprovider143/default-album/data-center_news.jpg?sfvrsn=99d3070d_0"
                alt="Modern architectural lines"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Reliability by Design.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Founded on the principle of technical integrity, we provide the
                specialized tools that engineers and IT architects depend on.
                Whether it's mapping subsurface water resources or deploying
                mission-critical server nodes, we ensure the hardware never
                becomes the bottleneck.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div>
                  <p className="text-4xl font-bold text-primary">100%</p>
                  <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground mt-2">
                    Authentic Supply
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator className="opacity-50" />

      {/* 3. TECHNICAL PILLARS */}
      <section className="py-20 md:py-32 bg-muted/10">
        <div className="container max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Our Core Pillars
            </h2>
            <p className="text-muted-foreground italic">
              How we maintain excellence in technology procurement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {pillars.map((pillar, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center space-y-6"
              >
                <div className="p-5 bg-background rounded-full shadow-sm border border-primary/10">
                  <pillar.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{pillar.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WORLD MAP FOOTER BREAK */}
      <section className="h-125 w-full bg-slate-950 relative flex items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
          alt="Global Network"
          className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale transition-transform duration-[10s] hover:scale-110"
        />
        <div className="container max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-white">
          <div className="max-w-2xl">
            <Globe className="h-10 w-10 text-primary mb-8" />
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              Built for a <br /> connected future.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              <code>Alliance</code> continues to expand its reach,
              ensuring that cutting-edge hardware is accessible to every
              project, regardless of geographical complexity.
            </p>
          </div>
        </div>
      </section>

      {/* 5. REUSABLE CTA */}
      <BottomCTA />
    </div>
  );
}
