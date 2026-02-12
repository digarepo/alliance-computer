// import * as React from 'react';
// import { Form, useNavigation } from 'react-router';
// import {
//   ImageIcon,
//   LinkIcon,
//   Type,
//   AlignLeft,
//   Layers,
//   Eye,
//   Loader2,
// } from 'lucide-react';

// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardFooter } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { cn } from '@/lib/utils';

// interface HeroFormProps {
//   defaultValues?: {
//     id?: string;
//     category?: string;
//     title?: string;
//     emphasis?: string;
//     description?: string;
//     imageUrl?: string;
//     link?: string;
//     status_id?: string;
//   } | null;
//   statuses: { id: string; name: string }[];
//   isSubmitting: boolean;
// }

// /**
//  * HeroForm Component
//  * A responsive form for creating or editing Hero slider content.
//  * Aligned with HeroRow model schema.
//  */
// export function HeroForm({
//   defaultValues,
//   statuses,
//   isSubmitting,
// }: HeroFormProps) {
//   return (
//     <Card className="border-none md:border shadow-sm md:shadow overflow-hidden">
//       <Form method="post" className="space-y-6">
//         <CardContent className="space-y-6 pt-6 px-4 md:px-6">
//           {/* Hidden ID for Updates */}
//           {defaultValues?.id && (
//             <input type="hidden" name="id" value={defaultValues.id} />
//           )}

//           {/* 1. Categorization Row */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="category" className="flex items-center gap-2">
//                 <Layers className="h-3.5 w-3.5 text-muted-foreground" />
//                 Category (Eyebrow Text)
//               </Label>
//               <Input
//                 id="category"
//                 name="category"
//                 defaultValue={defaultValues?.category}
//                 placeholder="e.g. ICT INFRASTRUCTURE"
//                 required
//                 className="focus-visible:ring-primary"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="status_id" className="flex items-center gap-2">
//                 <Eye className="h-3.5 w-3.5 text-muted-foreground" />
//                 Visibility Status
//               </Label>
//               <Select
//                 name="status_id"
//                 defaultValue={defaultValues?.status_id || statuses[0]?.id}
//               >
//                 <SelectTrigger id="status_id" className="w-full">
//                   <SelectValue placeholder="Select status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {statuses.map((s) => (
//                     <SelectItem key={s.id} value={s.id}>
//                       {s.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           {/* 2. Headline Content */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="title" className="flex items-center gap-2">
//                 <Type className="h-3.5 w-3.5 text-muted-foreground" />
//                 Main Title
//               </Label>
//               <Input
//                 id="title"
//                 name="title"
//                 defaultValue={defaultValues?.title}
//                 placeholder="Enterprise Servers &"
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="emphasis" className="flex items-center gap-2">
//                 <span className="italic font-serif h-3.5 w-3.5 text-center leading-none text-muted-foreground">
//                   I
//                 </span>
//                 Emphasis (Italic)
//               </Label>
//               <Input
//                 id="emphasis"
//                 name="emphasis"
//                 defaultValue={defaultValues?.emphasis}
//                 placeholder="Network Infrastructure"
//                 required
//               />
//             </div>
//           </div>

//           {/* 3. Detailed Description */}
//           <div className="space-y-2">
//             <Label htmlFor="description" className="flex items-center gap-2">
//               <AlignLeft className="h-3.5 w-3.5 text-muted-foreground" />
//               Description Paragraph
//             </Label>
//             <Textarea
//               id="description"
//               name="description"
//               defaultValue={defaultValues?.description}
//               placeholder="Provide a brief overview of this sector..."
//               rows={4}
//               className="resize-none"
//             />
//           </div>

//           {/* 4. Assets & Navigation */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="imageUrl" className="flex items-center gap-2">
//                 <ImageIcon className="h-3.5 w-3.5 text-muted-foreground" />
//                 Background Image URL
//               </Label>
//               <Input
//                 id="imageUrl"
//                 name="imageUrl"
//                 defaultValue={defaultValues?.imageUrl}
//                 placeholder="https://images.unsplash.com/..."
//                 type="url"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="link" className="flex items-center gap-2">
//                 <LinkIcon className="h-3.5 w-3.5 text-muted-foreground" />
//                 Redirect Link (CTA)
//               </Label>
//               <Input
//                 id="link"
//                 name="link"
//                 defaultValue={defaultValues?.link}
//                 placeholder="/services/it-infrastructure"
//               />
//             </div>
//           </div>
//         </CardContent>

//         <CardFooter className="bg-muted/30 md:border-t px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
//           <p className="text-[11px] text-muted-foreground order-2 md:order-1">
//             * All changes are live immediately upon saving.
//           </p>
//           <Button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full md:w-auto font-bold px-10 order-1 md:order-2"
//           >
//             {isSubmitting ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Saving...
//               </>
//             ) : (
//               'Save Changes'
//             )}
//           </Button>
//         </CardFooter>
//       </Form>
//     </Card>
//   );
// }

import * as React from 'react';
import { Form } from 'react-router';
import {
  ImageIcon,
  LinkIcon,
  Type,
  AlignLeft,
  Layers,
  Eye,
  Loader2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
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

interface HeroFormProps {
  defaultValues?: {
    id?: string;
    category?: string;
    title?: string;
    emphasis?: string;
    description?: string;
    imageUrl?: string;
    link?: string;
    status_id?: string;
  } | null;
  statuses: { id: string; name: string }[];
  isSubmitting: boolean;
}

/**
 * HeroForm Component
 * Standardized focus rings and fixed Select interaction.
 */
export function HeroForm({
  defaultValues,
  statuses,
  isSubmitting,
}: HeroFormProps) {
  const inputClasses =
    'focus-visible:ring-primary focus-visible:ring-2 transition-all border-input';

  return (
    <Card className="border-none md:border shadow-sm md:shadow overflow-hidden">
      <Form method="post" className="space-y-6">
        <CardContent className="space-y-6 pt-6 px-4 md:px-6">
          {defaultValues?.id && (
            <input type="hidden" name="id" value={defaultValues.id} />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="flex items-center gap-2">
                <Layers className="h-3.5 w-3.5 text-muted-foreground" />
                Category (Eyebrow Text)
              </Label>
              <Input
                id="category"
                name="category"
                defaultValue={defaultValues?.category}
                placeholder="e.g. ICT INFRASTRUCTURE"
                className={inputClasses}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status_id" className="flex items-center gap-2">
                <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                Visibility Status <span className="text-destructive">*</span>
              </Label>
              <Select
                name="status_id"
                defaultValue={defaultValues?.status_id || statuses[0]?.id}
                required
              >
                <SelectTrigger id="status_id" className={inputClasses}>
                  <SelectValue
                    placeholder={
                      statuses.length > 0
                        ? 'Select status'
                        : 'No statuses found'
                    }
                  />
                </SelectTrigger>
                <SelectContent position="popper">
                  {statuses.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name.charAt(0).toUpperCase() + s.name.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-2">
                <Type className="h-3.5 w-3.5 text-muted-foreground" />
                Main Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                defaultValue={defaultValues?.title}
                required
                className={inputClasses}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emphasis" className="flex items-center gap-2">
                <span className="italic font-serif h-3.5 w-3.5 text-center leading-none text-muted-foreground">
                  I
                </span>
                Emphasis (Italic)
              </Label>
              <Input
                id="emphasis"
                name="emphasis"
                defaultValue={defaultValues?.emphasis}
                className={inputClasses}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-2">
              <AlignLeft className="h-3.5 w-3.5 text-muted-foreground" />
              Description Paragraph
            </Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={defaultValues?.description}
              rows={4}
              className={`resize-none ${inputClasses}`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="flex items-center gap-2">
                <ImageIcon className="h-3.5 w-3.5 text-muted-foreground" />
                Background Image URL
              </Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                defaultValue={defaultValues?.imageUrl}
                type="url"
                className={inputClasses}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link" className="flex items-center gap-2">
                <LinkIcon className="h-3.5 w-3.5 text-muted-foreground" />
                Redirect Link (CTA)
              </Label>
              <Input
                id="link"
                name="link"
                defaultValue={defaultValues?.link}
                className={inputClasses}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-muted/30 border-t px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-muted-foreground">
            <span className="text-destructive">*</span> Mandatory for database
            integrity.
          </p>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto font-bold px-10"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              'Save Slide'
            )}
          </Button>
        </CardFooter>
      </Form>
    </Card>
  );
}
