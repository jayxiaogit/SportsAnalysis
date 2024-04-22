"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data: Tournament[] = [
    {'id': 0, 'name': 'Adelaide International 1', 'week': '1', 'type': '500'}, 
    {'id': 1, 'name': 'Adelaide International 2', 'week': '2', 'type': '500'}, 
    {'id': 2, 'name': 'ASB Classic', 'week': '2', 'type': '250'}, 
    {'id': 3, 'name': 'Hobart International', 'week': '2', 'type': '250'}, 
    {'id': 4, 'name': 'Australian Open', 'week': '3', 'type': 'GS'}, 
    {'id': 5, 'name': 'Australian Open', 'week': '4', 'type': 'GS'}, 
    {'id': 6, 'name': 'Thailand Open', 'week': '5', 'type': '250'}, 
    {'id': 7, 'name': 'Open 6eSens-Metropole de Lyon', 'week': '5', 'type': '250'}, 
    {'id': 8, 'name': 'Mubadala Abu Dhabi Open', 'week': '6', 'type': '500'}, 
    {'id': 9, 'name': 'Upper Austria Ladies Linz', 'week': '6', 'type': '250'}, 
    {'id': 10, 'name': 'Qatar TotalEnergies Open', 'week': '7', 'type': '500'}, 
    {'id': 11, 'name': 'Dubai Duty Free Tennis Championships', 'week': '8', 'type': '1000'}, 
    {'id': 12, 'name': 'Merida Open Akron', 'week': '8', 'type': '250'}, 
    {'id': 13, 'name': 'ATX Open', 'week': '9', 'type': '250'}, 
    {'id': 14, 'name': 'BNP Paribas Open', 'week': '10', 'type': '1000'}, 
    {'id': 15, 'name': 'BNP Paribas Open', 'week': '11', 'type': '1000'}, 
    {'id': 16, 'name': 'Miami Open ', 'week': '12', 'type': '1000'}, 
    {'id': 17, 'name': 'Miami Open ', 'week': '13', 'type': '1000'}, 
    {'id': 18, 'name': 'Credit One Charleston Open', 'week': '14', 'type': '500'},
    {'id': 19, 'name': 'Copa Colsanitas', 'week': '14', 'type': '250'}, 
    {'id': 20, 'name': 'Porsche Tennis Grand Prix', 'week': '16', 'type': '500'}, 
    {'id': 21, 'name': 'Mutua Madrid Open', 'week': '17', 'type': '1000'}, 
    {'id': 22, 'name': 'Mutua Madrid Open', 'week': '18', 'type': '1000'}, 
    {'id': 23, 'name': "Internazionali BNL d'Italia", 'week': '19', 'type': '1000'}, 
    {'id': 24, 'name': "Internazionali BNL d'Italia", 'week': '20', 'type': '1000'}, 
    {'id': 25, 'name': 'Grand Prix Son Altesse Royale La Princesse Lalla Meryem', 'week': '21', 'type': '250'}, 
    {'id': 26, 'name': 'Internationaux de Strasbourg', 'week': '21', 'type': '250'}, 
    {'id': 27, 'name': 'Roland-Garros', 'week': '22', 'type': 'GS'}, 
    {'id': 28, 'name': 'Roland-Garros', 'week': '23', 'type': 'GS'}, 
    {'id': 29, 'name': 'Rothesay Open', 'week': '24', 'type': '250'}, 
    {'id': 30, 'name': 'Libema Open', 'week': '24', 'type': '250'}, 
    {'id': 31, 'name': 'bett1open', 'week': '25', 'type': '500'}, 
    {'id': 32, 'name': 'Rothesay Classic', 'week': '25', 'type': '250'}, 
    {'id': 33, 'name': 'Rothesay International', 'week': '26', 'type': '500'}, 
    {'id': 34, 'name': 'Bad Homburg Open', 'week': '26', 'type': '250'}, 
    {'id': 35, 'name': 'The Championships', 'week': '27', 'type': 'GS'}, 
    {'id': 36, 'name': 'The Championships', 'week': '28', 'type': 'GS'}, 
    {'id': 37, 'name': 'Hungarian Grand Prix', 'week': '29', 'type': '250'}, 
    {'id': 38, 'name': '34 Palermo Ladies Open', 'week': '29', 'type': '250'}, 
    {'id': 39, 'name': 'Hamburg European Open', 'week': '30', 'type': '250'}, 
    {'id': 40, 'name': 'Ladies Open Lausanne', 'week': '30', 'type': '250'}, 
    {'id': 41, 'name': 'BNP Paribas Poland Open', 'week': '30', 'type': '250'}, 
    {'id': 42, 'name': 'Mubadala Citi DC Open', 'week': '31', 'type': '500'}, 
    {'id': 43, 'name': 'Livesport Prague Open', 'week': '31', 'type': '250'}, 
    {'id': 44, 'name': 'Omnium Banque National', 'week': '32', 'type': '1000'}, 
    {'id': 45, 'name': 'Western & Southern Open', 'week': '33', 'type': '1000'}, 
    {'id': 46, 'name': 'Abierto GNP Seguros', 'week': '34', 'type': '250'}, 
    {'id': 47, 'name': 'Tennis in the Land', 'week': '34', 'type': '250'}, 
    {'id': 48, 'name': 'US Open', 'week': '35', 'type': 'GS'}, 
    {'id': 49, 'name': 'US Open', 'week': '36', 'type': 'GS'}, 
    {'id': 50, 'name': 'San Diego Open', 'week': '37', 'type': '500'}, 
    {'id': 51, 'name': 'Kinoshita Group Japan Open Tennis Championships', 'week': '37', 'type': '250'}, 
    {'id': 52, 'name': 'Guadalajara Open Akron', 'week': '38', 'type': '1000'}, 
    {'id': 53, 'name': 'Galaxy Holding Group - Guangzhou Open', 'week': '38', 'type': '250'}, 
    {'id': 54, 'name': 'Toray Pan Pacific Open Tennis', 'week': '39', 'type': '500'}, 
    {'id': 55, 'name': 'Ningbo Open', 'week': '39', 'type': '250'}, 
    {'id': 56, 'name': 'China Open', 'week': '40', 'type': '1000'}, 
    {'id': 57, 'name': 'Zhengzhou Open', 'week': '41', 'type': '500'}, 
    {'id': 58, 'name': 'Prudential Hong Kong Tennis Open', 'week': '41', 'type': '250'}, 
    {'id': 59, 'name': 'Hana Bank Korea Open', 'week': '41', 'type': '250'}, 
    {'id': 60, 'name': 'Transylvania Open', 'week': '42', 'type': '250'}, 
    {'id': 61, 'name': 'Jasmin Open Monastir', 'week': '42', 'type': '250'}, 
    {id: 62, name: 'Jiangxi Open', week: '42', type: '250'}
]

export type Tournament = {
  id: number
  name: string
  week: string
  type: string
}

export const columns: ColumnDef<Tournament>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Tournament",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "week",
    header: "Week",
    cell: ({ row }) => <div className="lowercase">{row.getValue("week")}</div>,
  },
  {
    accessorKey: "type",
    header: () => <div className="text-right">Type</div>,
    cell: ({ row }) => {

      return <div className="text-right font-medium">{row.getValue('type')}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      //const type = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              Yes tournament!
            </DropdownMenuItem>
            <DropdownMenuItem>No tournament.</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

// const [rowSelection, setRowSelection] = React.useState({})

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  console.log(rowSelection);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter tournaments..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
