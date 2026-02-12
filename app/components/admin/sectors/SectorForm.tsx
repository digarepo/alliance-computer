/**
 * @file app/components/admin/sectors/SectorForm.tsx
 */
import * as React from 'react';
import { Form, useSearchParams } from 'react-router';
import {
  Type,
  AlignLeft,
  Plus,
  Trash2,
  Loader2,
  Layers,
  Layout,
  Globe,
  Highlighter,
  Eye,
  Briefcase,
  ImageIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export function SectorForm({
  defaultValues,
  statuses,
  isSubmitting,
  actionData,
  type,
}: any) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sections, setSections] = React.useState<any[]>(
    defaultValues?.sections || [],
  );
  const [statusId, setStatusId] = React.useState(
    defaultValues?.status_id || statuses[0]?.id,
  );

  // Sync when data returns from server
  React.useEffect(() => {
    if (defaultValues) {
      setSections(defaultValues.sections || []);
      setStatusId(defaultValues.status_id);
    }
  }, [defaultValues]);

  // Unified Toast Handler
  React.useEffect(() => {
    if (isSubmitting) {
      toast.loading('Saving changes...', { id: 'sector-toast' });
      return;
    }

    if (searchParams.get('success')) {
      toast.success('Sector updated successfully!', { id: 'sector-toast' });
      // Clean URL after a slight delay to allow toast to register
      const timeout = setTimeout(() => {
        setSearchParams(
          (prev) => {
            prev.delete('success');
            return prev;
          },
          { replace: true },
        );
      }, 100);
      return () => clearTimeout(timeout);
    }

    if (actionData?.error) {
      toast.error(actionData.error, { id: 'sector-toast' });
    } else if (!isSubmitting) {
      // Small timeout to avoid dismissal during the "blink"
      const timeout = setTimeout(() => toast.dismiss('sector-toast'), 500);
      return () => clearTimeout(timeout);
    }
  }, [isSubmitting, searchParams, actionData]);

  const addSection = () =>
    setSections([
      ...sections,
      { title: '', description: '', image_url: '', features: [] },
    ]);
  const removeSection = (i: number) =>
    setSections(sections.filter((_, idx) => idx !== i));
  const updateSection = (i: number, field: string, val: any) => {
    const next = [...sections];
    next[i] = { ...next[i], [field]: val };
    setSections(next);
  };

  return (
    <Form method="post" className="space-y-8 pb-32 max-w-5xl mx-auto">
      <input
        type="hidden"
        name="sections_json"
        value={JSON.stringify(sections)}
      />
      <input type="hidden" name="status_id" value={statusId} />

      {/* 1. HERO */}
      <Card className="shadow-lg border-none">
        <CardHeader className="border-b bg-muted/20">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Layout className="h-4 w-4 text-primary" /> Hero Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase">
                Eyebrow Text *
              </Label>
              <Input
                name="hero_eyebrow"
                defaultValue={defaultValues?.hero_eyebrow}
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase">
                Visibility Status *
              </Label>
              <Select value={statusId} onValueChange={setStatusId}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((s: any) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase">
                Main Title *
              </Label>
              <Input
                name="hero_title_main"
                defaultValue={defaultValues?.hero_title_main}
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase italic">
                Italic Emphasis *
              </Label>
              <Input
                name="hero_title_italic"
                defaultValue={defaultValues?.hero_title_italic}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase">
                Hero Description
              </Label>
              <Textarea
                name="hero_description"
                defaultValue={defaultValues?.hero_description}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase">
                Hero Image URL *
              </Label>
              <Input
                name="hero_image"
                defaultValue={defaultValues?.hero_image}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. PORTFOLIO INTRO */}
      <Card className="shadow-lg border-none">
        <CardHeader className="border-b bg-muted/20">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-primary" /> Portfolio Section
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase">
              Section Title *
            </Label>
            <Input
              name="portfolio_title"
              defaultValue={defaultValues?.portfolio_title}
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase">
              Short Description
            </Label>
            <Textarea
              name="portfolio_description"
              defaultValue={defaultValues?.portfolio_description}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* 3. SECTIONS */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h2 className="font-bold text-lg flex items-center gap-2">
            <Layers className="h-5 w-5" /> Category Content
          </h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addSection}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Block
          </Button>
        </div>

        {sections.map((sec, idx) => (
          <Card key={idx} className="border-l-4 border-l-primary shadow-md">
            <div className="flex justify-between items-center p-2 bg-muted/10 border-b">
              <Badge variant="outline">Block {idx + 1}</Badge>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeSection(idx)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <CardContent className="pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Category Title"
                  value={sec.title}
                  onChange={(e) => updateSection(idx, 'title', e.target.value)}
                  required
                />
                <Input
                  placeholder="Image URL"
                  value={sec.image_url}
                  onChange={(e) =>
                    updateSection(idx, 'image_url', e.target.value)
                  }
                  required
                />
              </div>
              <Textarea
                placeholder="Description"
                value={sec.description}
                onChange={(e) =>
                  updateSection(idx, 'description', e.target.value)
                }
                rows={2}
              />
              <Input
                placeholder="Features (comma separated)"
                value={sec.features.join(', ')}
                onChange={(e) =>
                  updateSection(
                    idx,
                    'features',
                    e.target.value.split(',').map((s) => s.trim()),
                  )
                }
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Responsive Save Action */}
      <div
        className="
  /* Mobile: Floating at bottom */
  fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t z-50
  /* Desktop: Natural flow at end of form */
  md:relative md:bg-transparent md:backdrop-blur-none md:border-none md:p-0 md:z-0 md:mt-12
  flex justify-end
"
      >
        <Button
          type="submit"
          disabled={isSubmitting}
          size="sm"
          className="
      /* Mobile: Full width/Large */
      w-full h-12 text-lg shadow-lg
      /* Desktop: Small/Right-aligned */
      md:w-auto md:h-9 md:text-xs md:px-8 md:shadow-sm
      font-bold transition-all hover:scale-[1.02] active:scale-[0.98]
    "
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
              Saving...
            </>
          ) : (
            'Save'
          )}
        </Button>
      </div>

      {/* <div className="fixed bottom-6 right-6 left-6 md:left-72 z-50">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto md:min-w-[200px] shadow-2xl h-12 font-bold text-lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Publishing...
            </>
          ) : (
            'Save & Publish Changes'
          )}
        </Button>
      </div> */}
    </Form>
  );
}
