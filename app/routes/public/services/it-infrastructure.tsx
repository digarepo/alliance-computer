/**
 * @file app/routes/public/services/it-infrastructure.tsx
 * @description Masterpiece layout for IT Infrastructure Supply.
 * Focuses on Enterprise Computing, Networking, and Datacenter Hardware.
 */

import { Server, Network, Database, ShieldCheck, Cpu, Zap } from 'lucide-react';
import { BottomCTA } from '@/components/public/bottom-cta';

const categories = [
  {
    title: 'Enterprise Server Systems',
    description:
      'Mission-critical computing power. We supply high-performance Rack, Tower, and Blade servers from industry leaders like Dell EMC and HPE, optimized for virtualization and enterprise workloads.',
    features: [
      'Dell PowerEdge & HPE ProLiant Supply',
      'High-Density Computing Nodes',
      'Scalable Storage-Rich Servers',
    ],
    image:
      'https://www.cisco.com/content/dam/cisco-cdc/site/images/photography/product-photography/learn/what-is-in-a-data-center-body-1920x1080.jpg',
    icon: Server,
    isReverse: false,
  },
  {
    title: 'Networking & Connectivity',
    description:
      'The backbone of digital communication. Our portfolio includes enterprise-grade managed switches, core routers, and secure wireless hardware for institutional-scale connectivity.',
    features: [
      'Layer 3 Managed Switching',
      'High-Capacity Core Routers',
      'Enterprise Firewall Appliances',
    ],
    image:
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=2000',
    icon: Network,
    isReverse: true,
  },
  {
    title: 'Datacenter & Storage',
    description:
      'Scalable storage and rack infrastructure. From SAN/NAS solutions to professional cabinets and structured cabling hardware, we provide the foundations for modern data hubs.',
    features: [
      'All-Flash Storage Arrays',
      'Structured Cabling Systems',
      'Rack & Power Infrastructure',
    ],
    image:
      'https://www.cisco.com/content/dam/cisco-cdc/site/images/photography/lifestyle-photography/learn/modern-data-center-body-1920x1080.jpg',
    icon: Database,
    isReverse: false,
  },
];

export default function ITInfrastructurePage(): React.JSX.Element {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      {/* 1. HERO SECTION: High-impact Datacenter Imagery */}
      <section className="relative h-[65vh] md:h-[80vh] w-full flex items-center overflow-hidden">
        <img
          src="https://www.tglobalcorp.com/upload/news_solutions_b/enL_news_solutions_24B01_uf64JrbpW0.webp"
          alt="Modern enterprise datacenter infrastructure"
          className="absolute inset-0 w-full h-full object-cover grayscale-[0.2]"
        />
        {/* Architectural Gradient Overlay - Dark Blue/Slate Tint for IT feel */}
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-900/40 to-transparent" />

        <div className="container max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-white">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 mb-6 text-primary font-bold tracking-[0.4em] text-[10px] uppercase">
              <Cpu className="h-3 w-3 fill-primary" />
              <span>Digital Architecture</span>
            </nav>
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 leading-[0.95]">
              Enterprise <br />
              <span className="text-primary italic underline decoration-white/20 underline-offset-8">
                Infrastructure
              </span>{' '}
              Supply.
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
              Equipping organizations with high-performance servers, networking,
              and storage hardware required for mission-critical operations.
            </p>
          </div>
        </div>
      </section>

      {/* 2. PORTFOLIO INTRO */}
      <section className="py-20 bg-muted/5">
        <div className="container max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Hardware Solutions
            </h2>
            <div className="h-px flex-1 bg-border hidden md:block mx-12" />
            <p className="text-muted-foreground max-w-sm text-sm italic">
              "Authentic hardware from globally trusted vendors including Dell,
              HPE, and Cisco."
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
            {/* Image Column */}
            <div className="w-full lg:w-[55%] relative h-100 md:h-137.5 lg:h-175 overflow-hidden">
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover duration-1000 group-hover:scale-105 transition-all grayscale-[0.4] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-700" />
            </div>

            {/* Content Column */}
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
                      <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
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
        title="Infrastructure Quotation"
        description="Ready to scale your digital architecture? Contact our IT procurement team for server configurations, networking specs, and volume pricing."
      />
    </div>
  );
}
