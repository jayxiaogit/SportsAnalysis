import { useState } from 'react';
// import { Link } from 'react-router-dom';
import { Slider } from "../components/ui/slider";
import Navbar from "../components/ui/navbar";
import { Link } from 'react-router-dom';

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

import {data} from "../data/tournaments"

type Tournament = {
  id: number
  name: string
  week: string
  type: string
}

const GenerateSchedule = () => {

    const [ranking, setRanking] = useState('');
    const [rest, setRest] = useState('');
    const [travel, setTravel] = useState([5]);
    const [earnings, setEarnings] = useState([5]);
    const [points, setPoints] = useState([5]);
    const [zipcode, setZipcode] = useState('');
    const [countrycode, setCountry] = useState(''); 
    const [schedule, setSchedule] = useState(''); 
    const [isGenerating, setIsGenerating] = useState(false);
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    // const [includeSelected, setIncludeSelected] = useState(false); // State for including selected items
    // const [excludeSelected, setExcludeSelected] = useState(false); // State for excluding selected items

    const columns: ColumnDef<Tournament>[] = [
        {
            id: "include",
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
        //   {
        //     id: "exclude",
        //     header: ({ table }) => (
        //       <Checkbox
        //         checked={
        //           table.getIsAllPageRowsSelected() ||
        //           (table.getIsSomePageRowsSelected() && "indeterminate")
        //         }
        //         onCheckedChange={(value) => {
        //           if (value) {
        //             // Uncheck the include checkbox when exclude is checked
        //             setExcludeSelected(true);
        //           }
        //           table.toggleAllPageRowsSelected(excludeSelected);
        //         }}
        //         aria-label="Select all"
        //       />
        //     ),
        //     cell: ({ row }) => (
        //       <Checkbox
        //         checked={row.getIsSelected()}
        //         onCheckedChange={(value) => {
        //           if (value) {
        //             // Uncheck the include checkbox when exclude is checked
        //             setExcludeSelected(true);
        //           }
        //           row.toggleSelected(excludeSelected);
        //         }}
        //         aria-label="Select row"
        //       />
        //     ),
        //     enableSorting: false,
        //     enableHiding: false,
        //   },
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

    // console.log(rowSelection);

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

    const handleGenerateClick = () => {
        // Make the API call
        setIsGenerating(true);

        // Collect selected tournament names
        //const includedTournaments: string[] = [];
        const excludedTournaments: string[] = [];
        table.getRowModel().rows.forEach((row) => {
        if (row.getIsSelected()) {
            excludedTournaments.push(row.original.name);
        }
        });
        
        // Convert the array of selected tournament names into a comma-separated string
        excludedTournaments.join(',');
        //includedTournaments.join(',');
        // console.log(travel[0]);
        // console.log(earnings[0]);
        // console.log(points[0]);
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("Schedule received!");
                const scheduleData = xhr.responseText;
                setSchedule(scheduleData);
                setIsGenerating(false);
                // Do something with the schedule data
                console.log(scheduleData);
            }
        };
        //const trav = travel[0];
        //console.log(trav)

        console.log(excludedTournaments);
        const url = `http://localhost:6969/schedule?zipcode=${zipcode}&countrycode=${countrycode}&rank=${ranking}&rest=${rest}&travel=${travel[0]}&earnings=${earnings[0]}&points=${points[0]}&excluded=${excludedTournaments}`;
        xhr.open("GET", url, true);
        xhr.send();
    };

    return (
        <div className="generate-schedule" style={{ background: 'linear-gradient(to bottom, #4facfe, #ffffff)', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <Navbar />
          {schedule == '' && !isGenerating && (
            <div style={{ marginTop: '20px', textAlign: 'center', width: '80%' }}>
              <div style={{ fontFamily: 'Faustina-Bold, Helvetica', fontWeight: '400', color: '#002d72', fontSize: '20px', letterSpacing: '0', lineHeight: 'normal' }}>Generate New Schedule</div>
              <div style={{ marginTop: '20px' }}>
                <Input type="ranking" placeholder="Ranking" style={{ marginBottom: '10px', width: '40%', marginLeft: '30%', textAlign: 'center', }} value={ranking} onChange={(event) => setRanking(event.target.value)}/>
                <Input type="zipcode" placeholder="Zipcode" style={{ marginBottom: '10px', width: '40%', marginLeft: '30%', textAlign:'center' }} value={zipcode} onChange={(event) => setZipcode(event.target.value)}/>
                <Input type="countrycode" placeholder='Country Code' style={{marginBottom: '10px', width: '40%', marginLeft: '30%', textAlign:'center'}} value={countrycode} onChange={(event) => setCountry(event.target.value)}/>
                <Input type="rest" placeholder='How often do you want rest?' style={{marginBottom: '30px', width:'40%', marginLeft:'30%', textAlign:'center'}} value={rest} onChange={(event) => setRest(event.target.value)}/>
                <div>
                  <div style={{ fontFamily: 'Faustina-Bold, Helvetica', fontWeight: '400', color: '#002d72', fontSize: '13px', letterSpacing: '0', lineHeight: 'normal', marginBottom:'10px' }}>
                    How important is travel?
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom:'20px' }}>
                    <div>0</div>
                    <Slider defaultValue={[5]} max={10} step={.1} style={{ flex: 1, marginLeft: '20px', marginRight: '20px', width: '500px'}} onValueChange={(value) => setTravel([Math.round(value[0])])}/>
                    <div>10</div>
                  </div>
                  <div style={{ fontFamily: 'Faustina-Bold, Helvetica', fontWeight: '400', color: '#002d72', fontSize: '13px', letterSpacing: '0', lineHeight: 'normal', marginBottom:'10px' }}>
                    How important are earnings?
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom:'20px' }}>
                    <div>0</div>
                    <Slider defaultValue={[5]} max={10} step={.1} style={{ flex: 1, marginLeft: '10px', marginRight: '10px' }} onValueChange={(value) => setEarnings([Math.round(value[0])])}/>
                    <div>10</div>
                  </div>
                  <div style={{ fontFamily: 'Faustina-Bold, Helvetica', fontWeight: '400', color: '#002d72', fontSize: '13px', letterSpacing: '0', lineHeight: 'normal', marginBottom:'10px' }}>
                    How important are rankings?
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom:'20px' }}>
                    <div>0</div>
                    <Slider defaultValue={[5]} max={10} step={.1} style={{ flex: 1, marginLeft: '10px', marginRight: '10px' }} onValueChange={(value) => setPoints([Math.round(value[0])])}/>
                    <div>10</div>
                  </div>
                </div>
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
                <Button variant="default" style={{ marginTop: '20px' }} onClick={handleGenerateClick}>Generate</Button>
              </div>
            </div>
          )}
          {isGenerating && <p>Generating schedule...</p>}
          {schedule !== '' && !isGenerating && (
            <div>
              <pre style={{ fontSize: '10px'}}>{schedule}</pre>
              <Link to="/generate-schedule"><Button variant={'secondary'} onClick={ () => setSchedule('')}>Regenerate</Button></Link>
            </div>
          )}
        </div>
      );
};

export default GenerateSchedule;
