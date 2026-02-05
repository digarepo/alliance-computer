/**
 * @file app/components/public/bottom-cta.tsx
 * @description A premium, reusable call-to-action section with a minimalist
 * industrial design. Features a centered card layout with a subtle icon anchor.
 */

import { Link } from 'react-router';
import { Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BottomCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export function BottomCTA({
  title = 'Procurement & Supply Inquiries',
  description = 'Our team is ready to provide technical specifications, lead times, and competitive quotes for your specific project requirements.',
  buttonText = 'Get in Touch',
  buttonLink = '/contact',
}: BottomCTAProps): React.JSX.Element {
  return (
    <section className="bg-muted/50 py-20 md:py-32">
      <div>
        <div className="bg-background border p-8 md:p-16 text-center mx-auto shadow-sm relative overflow-hidden">
          {/* Subtle Background Accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-primary" />

          <div className="flex justify-center mb-8">
            <div className="bg-primary/10 p-4 rounded-full">
              <Mail className="h-8 w-8 text-primary" />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            {title}
          </h2>

          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>

          <Button
            asChild
            size="lg"
            className="rounded-full px-12 h-14 uppercase tracking-[0.2em] font-bold group"
          >
            <Link to={buttonLink} className="flex items-center gap-2">
              {buttonText}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
