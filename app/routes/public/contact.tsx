/**
 * @file app/routes/public/contact.tsx
 * @description Contact and Inquiry page for Alliance Computer.
 * Features Shadcn Select, rounded-full styling, and localized contact data.
 */

import { Mail, Phone, MapPin, Clock, Send, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export default function ContactPage(): React.JSX.Element {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      {/* 1. HERO HEADLINE */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-20 border-b">
        <div className="container max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 mb-6 text-primary font-bold tracking-[0.4em] text-[10px] uppercase">
              <Globe className="h-3 w-3" />
              <span>Global Reach</span>
            </nav>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 leading-tight">
              Connect with our <br />
              <span className="text-primary italic font-serif">
                technical team.
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              From equipment specifications to enterprise-scale procurement, we
              are here to facilitate your technical requirements.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CONTACT GRID */}
      <section className="py-12 md:py-24">
        <div className="container max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* LEFT COLUMN: OFFICE INFO */}
            <div className="lg:col-span-4 space-y-12">
              <div>
                <h3 className="text-sm font-bold tracking-tight text-primary mb-6">
                  Direct Channels
                </h3>
                <div className="space-y-6">
                  <a
                    href="mailto:info@alliancecomputer.co"
                    className="group flex items-start gap-4 hover:text-primary transition-colors"
                  >
                    <div className="p-3 bg-muted rounded-full group-hover:bg-primary/10 transition-colors">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground mb-1">
                        Email
                      </p>
                      <p className="font-semibold lowercase">
                        info@alliancecomputer.co
                      </p>
                    </div>
                  </a>

                  <a
                    href="tel:+251913111511"
                    className="group flex items-start gap-4 hover:text-primary transition-colors"
                  >
                    <div className="p-3 bg-muted rounded-full group-hover:bg-primary/10 transition-colors">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground mb-1">
                        Phone
                      </p>
                      <p className="font-semibold">+251 91 311 1511</p>
                    </div>
                  </a>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-bold tracking-tight text-primary mb-6">
                  Location
                </h3>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Alliance+Computer+Addis+Ababa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 hover:text-primary transition-colors"
                >
                  <div className="p-3 bg-muted rounded-full group-hover:bg-primary/10 transition-colors">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold leading-relaxed">
                      Addis Ababa, Ethiopia
                    </p>
                    <p className="text-sm text-primary underline underline-offset-4 mt-2">
                      Tefera Business Center <br />
                      Arada Sub-City Addis Ababa
                    </p>
                  </div>
                </a>
              </div>

              <div className="p-8 bg-muted/30 border border-dashed rounded-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-5 w-5 text-primary" />
                  <h4 className="font-bold text-sm">Business Hours</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Monday — Friday <br />
                  08:30 AM — 05:30 PM (EAT)
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: INQUIRY FORM */}
            <div className="lg:col-span-8">
              <div className="bg-background border p-8 md:p-12 rounded-[2rem] shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />

                <h2 className="text-2xl md:text-3xl font-bold mb-8 tracking-tight">
                  Technical Inquiry
                </h2>

                <form
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4">
                      Full Name
                    </Label>
                    <Input
                      placeholder="your full name"
                      className="rounded-full border-muted-foreground/20 focus-visible:ring-primary px-6"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4">
                      Work Email
                    </Label>
                    <Input
                      type="email"
                      placeholder="your email"
                      className="rounded-full border-muted-foreground/20 focus-visible:ring-primary px-6"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4">
                      Subject
                    </Label>
                    <Select>
                      <SelectTrigger className="rounded-full border-muted-foreground/20 focus:ring-primary px-6">
                        <SelectValue placeholder="Select interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="geophysical">
                          Geophysical Equipment Supply
                        </SelectItem>
                        <SelectItem value="it">
                          IT Infrastructure & Servers
                        </SelectItem>
                        <SelectItem value="consultation">
                          Project Consultation
                        </SelectItem>
                        <SelectItem value="other">Other Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4">
                      Your Requirements
                    </Label>
                    <Textarea
                      placeholder="Please describe your specific project needs..."
                      className="min-h-37.5 rounded-[1.5rem] border-muted-foreground/20 focus-visible:ring-primary resize-none p-6"
                    />
                  </div>

                  <div className="md:col-span-2 pt-4">
                    <Button className="w-full md:w-auto px-20 h-10 rounded-full flex items-center gap-3 group">
                      Submit Requst
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WORLD FOOTPRINT MAP */}
      <section className="h-100 w-full bg-muted relative flex items-center justify-center grayscale">
        <img
          src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000"
          alt="World map network"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative text-center px-6">
          <p className="text-xs font-bold uppercase tracking-[0.5em] text-muted-foreground mb-4">
            Operational Footprint
          </p>
          <h3 className="text-2xl font-bold tracking-tighter">
            Expanding to Enterprise Clients Globally.
          </h3>
        </div>
      </section>
    </div>
  );
}
