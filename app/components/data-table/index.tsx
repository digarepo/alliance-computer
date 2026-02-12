/**
 * Alliance Master Data Table Module
 * A modular, compound-component suite built on TanStack Table.
 */

import * as React from 'react';
import {
  flexRender,
  type Table as TanStackTable,
  type Row,
  type Cell,
  type HeaderGroup,
  type Header,
  type Column,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Settings2,
  Search,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Context for Compound Components ---
interface DataTableContextType<TData = any> {
  table: TanStackTable<TData>;
}

const DataTableContext = React.createContext<DataTableContextType | null>(null);

function useDataTableContext<TData>() {
  const context = React.useContext(
    DataTableContext,
  ) as DataTableContextType<TData> | null;
  if (!context)
    throw new Error(
      'DataTable components must be used within a DataTable.Root',
    );
  return context;
}

// --- Root Component ---
export function DataTableRoot<TData>({
  table,
  children,
  className,
}: {
  table: TanStackTable<TData>;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <DataTableContext.Provider value={{ table }}>
      <div className={cn('space-y-4 w-full', className)}>{children}</div>
    </DataTableContext.Provider>
  );
}

// --- Toolbar Component ---
export function DataTableToolbar<TData>({
  searchColumn,
  actions,
}: {
  searchColumn?: string;
  actions?: React.ReactNode;
}) {
  const { table } = useDataTableContext<TData>();
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-1 items-center gap-2">
        {searchColumn && (
          <div className="relative w-full max-sm md:max-w-sm">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Filter..."
              value={
                (table.getColumn(searchColumn)?.getFilterValue() as string) ??
                ''
              }
              onChange={(event) =>
                table
                  .getColumn(searchColumn)
                  ?.setFilterValue(event.target.value)
              }
              className="h-9 pl-8"
            />
          </div>
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-9 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        {actions}
        <DataTableViewOptions />
      </div>
    </div>
  );
}

// --- Main View Component (Responsive) ---
export interface DataTableMobileConfig {
  primaryColumnId: string;
  secondaryColumnIds: string[];
  actionColumnId?: string;
}

export function DataTableView<TData>({
  mobileConfig,
  onRowClick,
}: {
  mobileConfig?: DataTableMobileConfig;
  onRowClick?: (row: TData) => void;
}) {
  const { table } = useDataTableContext<TData>();
  const rows = table.getRowModel().rows;
  const columns = table.getAllColumns();

  return (
    <div className="rounded-md border bg-card">
      {/* Mobile Stacked View */}
      <div className="flex flex-col md:hidden">
        {rows.length ? (
          rows.map((row: Row<TData>) => {
            const cells = row.getVisibleCells();
            const primaryCell =
              cells.find(
                (c) => c.column.id === mobileConfig?.primaryColumnId,
              ) || cells[0];
            const secondaryCells = cells.filter((c) =>
              mobileConfig?.secondaryColumnIds.includes(c.column.id),
            );
            const actionCell = cells.find(
              (c) =>
                c.column.id === (mobileConfig?.actionColumnId || 'actions'),
            );

            return (
              <div
                key={row.id}
                className="flex items-center justify-between p-4 border-b last:border-0"
              >
                <div
                  className="min-w-0 flex-1"
                  onClick={() => onRowClick?.(row.original)}
                >
                  <div className="text-sm font-bold truncate">
                    {flexRender(
                      primaryCell.column.columnDef.cell,
                      primaryCell.getContext(),
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-1">
                    {secondaryCells.map((cell: Cell<TData, unknown>) => (
                      <div key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                {actionCell && (
                  <div className="pl-4 shrink-0">
                    {flexRender(
                      actionCell.column.columnDef.cell,
                      actionCell.getContext(),
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center text-sm text-muted-foreground">
            No results.
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup: HeaderGroup<TData>) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header: Header<TData, unknown>) => (
                  <TableHead
                    key={header.id}
                    className="text-xs font-bold uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.length ? (
              rows.map((row: Row<TData>) => (
                <TableRow
                  key={row.id}
                  onClick={() => onRowClick?.(row.original)}
                  className="cursor-pointer"
                >
                  {row.getVisibleCells().map((cell: Cell<TData, unknown>) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// --- Pagination Component ---
export function DataTablePagination<TData>() {
  const { table } = useDataTableContext<TData>();
  return (
    <div className="flex items-center justify-between px-2 py-1">
      <div className="flex-1 text-xs text-muted-foreground">
        {table.getFilteredRowModel().rows.length} total rows
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-xs font-medium tabular-nums px-2">
          {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// --- Internal Helper: View Options ---
function DataTableViewOptions<TData>() {
  const { table } = useDataTableContext<TData>();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-9 lg:flex"
        >
          <Settings2 className="mr-2 h-4 w-4" /> View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter((column: Column<TData, unknown>) => column.getCanHide())
          .map((column: Column<TData, unknown>) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// --- Namespace Export ---
export const DataTable = {
  Root: DataTableRoot,
  Toolbar: DataTableToolbar,
  View: DataTableView,
  Pagination: DataTablePagination,
};
