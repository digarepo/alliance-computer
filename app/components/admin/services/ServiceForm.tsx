import * as React from 'react';
import { Form } from 'react-router';
import {
  Type,
  AlignLeft,
  ImageIcon,
  Plus,
  Trash2,
  Loader2,
  Layers,
  Layout,
  Globe,
  Highlighter,
  Eye,
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

interface Section {
  id?: string;
  title: string;
  description: string;
  image_url: string;
  features: string[];
}

export function ServiceForm({ defaultValues, statuses, isSubmitting }: any) {
  // Fix 1: Use a lazy initializer function to ensure sections are loaded on first mount
  const [sections, setSections] = React.useState<Section[]>(() => {
    return defaultValues?.sections || [];
  });

  // Fix 2: Sync state if defaultValues change (e.g., when the edit ID changes)
  React.useEffect(() => {
    if (defaultValues?.sections) {
      setSections(defaultValues.sections);
    }
  }, [defaultValues]);

  // Fix 3: Handle the toast lifecycle
  React.useEffect(() => {
    if (isSubmitting) {
      toast.loading('Synchronizing with database...', { id: 'service-save' });
    } else {
      // This ensures the loading toast is dismissed if the action finishes
      // but the page doesn't fully reload (or takes time to redirect)
      toast.dismiss('service-save');
    }
  }, [isSubmitting]);

  const addSection = () => {
    if (sections.length >= 2) return;
    setSections([
      ...sections,
      {
        title: '',
        description: '',
        image_url: '',
        features: [],
      },
    ]);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const updateSection = (index: number, field: keyof Section, value: any) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setSections(newSections);
  };

  return (
    <Form method="post" className="space-y-6 pb-24 max-w-5xl mx-auto">
      {defaultValues?.id && (
        <input type="hidden" name="id" value={defaultValues.id} />
      )}

      {/* This is the critical hidden input.
        If sections array is empty here, the server will delete existing ones
        and add nothing back.
      */}
      <input
        type="hidden"
        name="sections_json"
        value={JSON.stringify(sections)}
      />

      {/* --- HERO CONFIGURATION --- */}
      <Card className="border-none shadow-md overflow-hidden bg-card/50 backdrop-blur-sm">
        <CardHeader className="bg-primary/5 border-b">
          <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
            <Layout className="h-4 w-4" /> 1. Page Hero Content
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-8 space-y-6 px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 font-semibold">
                <Globe className="h-3.5 w-3.5" /> Eyebrow Text
              </Label>
              <Input
                name="eyebrow"
                defaultValue={
                  defaultValues?.eyebrow || 'Operational Excellence'
                }
                placeholder="Text next to Globe icon"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 font-semibold">
                <Eye className="h-3.5 w-3.5" /> Visibility
              </Label>
              <Select
                name="status_id"
                defaultValue={defaultValues?.status_id || statuses[0]?.id}
                required
              >
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
              <Label className="flex items-center gap-2 font-semibold text-primary">
                <Type className="h-3.5 w-3.5" /> Main Title (H1)
              </Label>
              <Input
                name="name"
                defaultValue={defaultValues?.name}
                placeholder="e.g. Equipment &"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 font-semibold text-primary italic">
                <Highlighter className="h-3.5 w-3.5" /> Emphasis Text
              </Label>
              <Input
                name="emphasis"
                defaultValue={defaultValues?.emphasis}
                placeholder="e.g. Infrastructure Supply."
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 font-semibold text-sm">
              <AlignLeft className="h-3.5 w-3.5" /> Hero Description
            </Label>
            <Textarea
              name="description"
              defaultValue={defaultValues?.description}
              rows={3}
              placeholder="Intro paragraph for the top of the page..."
              className="resize-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* --- SECTOR BLOCKS --- */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" /> 2. Content Sectors
          </h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={sections.length >= 2}
            onClick={addSection}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Sector
          </Button>
        </div>

        <div className="space-y-4">
          {sections.map((section, index) => (
            <Card
              key={index}
              className="border-border/50 shadow-sm overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 bg-muted/40 border-b">
                <Badge variant="outline" className="bg-background">
                  {index === 0
                    ? 'Sector 1: Standard Layout'
                    : 'Sector 2: Reversed Layout'}
                </Badge>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSection(index)}
                  className="text-destructive h-8"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-2" /> Remove
                </Button>
              </div>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase font-bold text-muted-foreground">
                      Sector Title
                    </Label>
                    <Input
                      value={section.title}
                      onChange={(e) =>
                        updateSection(index, 'title', e.target.value)
                      }
                      placeholder="Title of the sector block"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase font-bold text-muted-foreground">
                      Image URL
                    </Label>
                    <Input
                      value={section.image_url}
                      onChange={(e) =>
                        updateSection(index, 'image_url', e.target.value)
                      }
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs uppercase font-bold text-muted-foreground">
                    Description Body
                  </Label>
                  <Textarea
                    value={section.description}
                    onChange={(e) =>
                      updateSection(index, 'description', e.target.value)
                    }
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs uppercase font-bold text-muted-foreground">
                    Features (CSV)
                  </Label>
                  <Input
                    value={section.features.join(', ')}
                    onChange={(e) =>
                      updateSection(
                        index,
                        'features',
                        e.target.value.split(',').map((s) => s.trim()),
                      )
                    }
                    placeholder="Feature 1, Feature 2..."
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 md:left-64 p-4 bg-background/80 backdrop-blur-md border-t z-50 flex justify-end px-4 md:px-12 shadow-lg">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="min-w-50 font-bold"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
          ) : (
            'Publish Service Page'
          )}
        </Button>
      </div>
    </Form>
  );
}
