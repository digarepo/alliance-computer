import * as React from 'react';
import {
  type ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table';
import { Link, useFetcher } from 'react-router';
import {
  Edit,
  Trash2,
  Globe,
  MoreHorizontal,
  Layers,
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
import { DeleteConfirmDialog } from '@/components/ui/confirmDelete';
import { cn } from '@/lib/utils';

export type ServiceRow = {
  id: string;
  name: string;
  eyebrow: string;
  emphasis?: string;
  hero_image: string;
  created_at?: string;
};

export const serviceColumns: ColumnDef<ServiceRow>[] = [
  {
    accessorKey: 'name',
    header: 'Service / Sector',
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-bold text-sm text-foreground">
          {row.getValue('name')}
        </span>
        <span className="text-[10px] text-muted-foreground font-mono uppercase">
          /{row.original.eyebrow}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'status_label',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue<string>('status_label');
      const isPublished = status.toLowerCase() === 'published';
      return (
        <Badge
          variant={isPublished ? 'default' : 'secondary'}
          className="gap-1.5 py-0.5"
        >
          {isPublished ? (
            <CheckCircle className="h-3 w-3" />
          ) : (
            <EyeOff className="h-3 w-3" />
          )}
          {status}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row, table }) => {
      const meta = table.options.meta as {
        onDelete: (row: ServiceRow) => void;
      };
      const service = row.original;
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem asChild>
                <Link to={`/admin/services?id=${service.id}`}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/admin/services/preview?id=${service.id}`}>
                  <Eye className="mr-2 h-4 w-4" /> Preview
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onSelect={() => meta?.onDelete(service)}
              >
                <Trash2 className="mr-2 h-4 w-4 text-destructive" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export function ServiceTable({ data }: { data: ServiceRow[] }) {
  const fetcher = useFetcher();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [deletingItem, setDeletingItem] = React.useState<ServiceRow | null>(
    null,
  );

  const table = useReactTable({
    data,
    columns: serviceColumns,
    state: { sorting },
    meta: { onDelete: (item: ServiceRow) => setDeletingItem(item) },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  return (
    <>
      <DataTable.Root table={table}>
        <DataTable.Toolbar searchColumn="name" />
        <DataTable.View
          mobileConfig={{
            primaryColumnId: 'name',
            secondaryColumnIds: ['status_label'],
            actionColumnId: 'actions',
          }}
        />
      </DataTable.Root>
      <DeleteConfirmDialog
        isOpen={!!deletingItem}
        onClose={() => setDeletingItem(null)}
        onConfirm={() => {
          fetcher.submit(
            { id: deletingItem!.id, intent: 'delete' },
            { method: 'post' },
          );
          setDeletingItem(null);
        }}
        itemName={deletingItem?.name}
      />
    </>
  );
}
