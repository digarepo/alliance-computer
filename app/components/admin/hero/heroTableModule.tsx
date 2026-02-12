import * as React from 'react';
import {
  type ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table';
import { Link, Form, useFetcher } from 'react-router';
import {
  Edit,
  Trash2,
  ImageIcon,
  MoreHorizontal,
  ExternalLink,
  CheckCircle,
  EyeOff,
  Eye,
} from 'lucide-react';

import { DataTable } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { DeleteConfirmDialog } from '@/components/ui/confirmDelete';

// --- Types ---
export type HeroRow = {
  id: string;
  title: string;
  emphasis: string;
  category: string;
  statusKey: string;
  image_url: string;
  link: string;
  updated_at: string;
};

// --- Sub-Component: Status Badge ---
export function HeroStatusBadge({ status }: { status: string }) {
  const isActive =
    status.toLowerCase() === 'active' || status.toLowerCase() === 'published';
  return (
    <Badge
      variant={isActive ? 'default' : 'secondary'}
      className={cn(
        'gap-1.5',
        isActive
          ? 'bg-green-500/10 text-green-700 border-green-200 hover:bg-green-500/20'
          : 'bg-slate-500/5 text-slate-500 border-slate-200',
      )}
    >
      {isActive ? (
        <CheckCircle className="h-3 w-3" />
      ) : (
        <EyeOff className="h-3 w-3" />
      )}
      {status}
    </Badge>
  );
}

// --- Sub-Component: Row Actions ---
export function HeroActions({
  hero,
  onDelete,
}: {
  hero: HeroRow;
  onDelete: (hero: HeroRow) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem asChild>
          <Link to={`/admin/hero?id=${hero.id}`} className="flex items-center">
            <Edit className="mr-2 h-4 w-4" /> Edit Slide
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            to={`/admin/hero/preview?id=${hero.id}`}
            className="flex items-center"
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:bg-destructive/10"
          onSelect={() => onDelete(hero)}
        >
          <Trash2 className="mr-2 h-4 w-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// --- Column Definitions ---
export const heroColumns: ColumnDef<HeroRow>[] = [
  {
    accessorKey: 'image_url',
    header: 'Preview',
    cell: ({ row }) => (
      <div className="h-10 w-16 overflow-hidden rounded border bg-muted shrink-0">
        {row.getValue('image_url') ? (
          <img
            src={row.getValue('image_url')}
            className="h-full w-full object-cover"
            alt=""
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground/40">
            <ImageIcon size={16} />
          </div>
        )}
      </div>
    ),
  },
  {
    accessorKey: 'title',
    header: 'Content',
    cell: ({ row }) => (
      <div className="flex flex-col min-w-0">
        <span className="font-medium text-sm truncate max-w-50 md:max-w-none">
          {row.getValue<string>('title')}{' '}
          <span className="italic opacity-70 font-normal">
            {row.original.emphasis}
          </span>
        </span>
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
          {row.original.category}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'statusKey',
    header: 'Status',
    cell: ({ row }) => (
      <HeroStatusBadge status={row.getValue<string>('statusKey')} />
    ),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row, table }) => {
      const meta = table.options.meta as { onDelete: (hero: HeroRow) => void };
      return (
        <div className="flex justify-end">
          <HeroActions hero={row.original} onDelete={meta?.onDelete} />
        </div>
      );
    },
  },
];

// --- Main Hero Table Export ---
export function HeroTable({
  data,
  onRowClick,
}: {
  data: HeroRow[];
  onRowClick?: (row: HeroRow) => void;
}) {
  const fetcher = useFetcher();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const [deletingHero, setDeletingHero] = React.useState<HeroRow | null>(null);
  const confirmDelete = () => {
    if (deletingHero) {
      fetcher.submit(
        { id: deletingHero.id, intent: 'delete' },
        { method: 'post' },
      );
      setDeletingHero(null);
    }
  };

  const table = useReactTable({
    data,
    columns: heroColumns,
    state: { sorting, columnFilters },
    meta: { onDelete: (hero: HeroRow) => setDeletingHero(hero) },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
  });

  return (
    <>
      <DataTable.Root table={table}>
        <DataTable.Toolbar searchColumn="title" />
        <DataTable.View
          onRowClick={onRowClick}
          mobileConfig={{
            primaryColumnId: 'title',
            secondaryColumnIds: ['statusKey'],
            actionColumnId: 'actions',
          }}
        />
        <DataTable.Pagination />
      </DataTable.Root>
      <DeleteConfirmDialog
        isOpen={!!deletingHero}
        onClose={() => setDeletingHero(null)}
        onConfirm={confirmDelete}
        itemName={deletingHero?.title}
        isSubmitting={fetcher.state === 'submitting'}
      />
    </>
  );
}
