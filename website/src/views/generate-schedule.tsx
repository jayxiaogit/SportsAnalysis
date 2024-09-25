import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { Slider } from "../components/ui/slider";
import Navbar from "../components/ui/navbar";
import { Link } from 'react-router-dom';

"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  // ExclamationTriangleIcon,
//   DotsHorizontalIcon,
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
import { useUser } from '@clerk/clerk-react';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription, DialogTrigger } from '@radix-ui/react-dialog';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


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
    const [schedule, setSchedule] = useState<string[]>([]); 
    const [isGenerating, setIsGenerating] = useState(false);
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [included, setIncluded] = React.useState<string[]>([]);
    const [excluded, setExcluded] = React.useState<string[]>([]);
    const [expectedPoints, setExpectedPoints] = React.useState('');
    const [expectedEarnings, setExpectedEarnings] = React.useState('');
    const [scheduleName, setScheduleName] = React.useState('');
    const [isOpen, setIsOpen] = React.useState(false);
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');

    const { user } = useUser();

    useEffect(() => {
      setRanking(localStorage.getItem('ranking') ?? '');
      setZipcode(localStorage.getItem('zipcode') ?? '');
      setCountry(localStorage.getItem('countrycode') ?? '');
      setRest(localStorage.getItem('rest') ?? '');
      setTravel([parseFloat(localStorage.getItem('travel') ?? '5.0')]);
      setEarnings([parseFloat(localStorage.getItem('earnings') ?? '5.0')]);
      setPoints([parseFloat(localStorage.getItem('points') ?? '5.0')]);
    }, []);

    const columns: ColumnDef<Tournament>[] = [
        {
            id: "included",
            header: "Include",
            cell: ({ row }) => (
                <Checkbox
                    checked={included.includes(row.original.name)}
                    onCheckedChange={(value) => {
                        if (value) {
                            handleInclude(row.original.name);
                        } else {
                            // If already included, remove from included array
                            if (included.includes(row.original.name)) {
                                setIncluded((prevIncluded) => prevIncluded.filter(name => name !== row.original.name));
                            }
                        }
                    }}
                    aria-label="Include"
                />
            ),
        },
        {
            id: "excluded",
            header: "Exclude",
            cell: ({ row }) => (
                <Checkbox
                    checked={excluded.includes(row.original.name)}
                    onCheckedChange={(value) => {
                        if (value) {
                            handleExclude(row.original.name);
                        } else {
                            // If already included, remove from included array
                            if (excluded.includes(row.original.name)) {
                                setExcluded((prevExcluded) => prevExcluded.filter(name => name !== row.original.name));
                            }
                        }
                    }}
                    aria-label="Exclude"
                />
            ),
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
            cell: ({ row }) => (
                <div className="text-right font-medium">{row.getValue('type')}</div>
            ),
        },

    ];

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
        if (isNaN(parseInt(ranking)) || isNaN(parseInt(zipcode)) || isNaN(parseInt(rest))) {
            // Show alert dialog
            setError("Please enter valid numbers for ranking, zipcode, or rest.");
            return; // Exit function
        }
        // Make the API call
        setIsGenerating(true);
        localStorage.setItem('ranking', ranking);
        localStorage.setItem('zipcode', zipcode);
        localStorage.setItem('countrycode', countrycode);
        localStorage.setItem('rest', rest);
        localStorage.setItem('travel', travel.toString());
        localStorage.setItem('earnings', earnings.toString());
        localStorage.setItem('points', points.toString());

        // Collect selected tournament names
        const includedTournaments = included;
        const excludedTournaments = excluded;

        // Convert the array of selected tournament names into a comma-separated string
        excludedTournaments.join(',');
        includedTournaments.join(',');

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const scheduleData = xhr.responseText;
                const scheduleArray = parseSchedule(scheduleData);
                setSchedule(scheduleArray);
                setIsGenerating(false);
            } else {
              setError("Failed to generate schedule. Please try again.");
              setIsGenerating(false);
              setSchedule([]);
            }
        };

        const url = `http://localhost:6969/schedule?zipcode=${zipcode}&countrycode=${countrycode}&rank=${ranking}&rest=${rest}&travel=${travel[0]}&earnings=${earnings[0]}&points=${points[0]}&excluded=${excludedTournaments}&included=${includedTournaments}`;
        xhr.open("GET", url, true);
        xhr.send();
    };

    const handleSaveClick = (schedule: string[], name: string) => {
      const userProfile = user?.id;
      const sendScheduleString = schedule.join(',');

      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            setSuccess("Saved!");
          } else {
            setError('Error saving this schedule.');
          }
      };

      const url = `http://localhost:6969/save_schedule?user_name=${userProfile}&schedule=${sendScheduleString}&name=${name}`;
      xhr.open("POST", url, true);
      xhr.send();
  };

    const handleInclude = (name: string) => {
        setIncluded((prevIncluded) => [...prevIncluded, name]);
        setExcluded((prevExcluded) => prevExcluded.filter((excludedName) => excludedName !== name));
    };

    const handleExclude = (name: string) => {
        setExcluded((prevExcluded) => [...prevExcluded, name]);
        setIncluded((prevIncluded) => prevIncluded.filter((includedName) => includedName !== name));
    };

    const parseSchedule = (scheduleText: string) => {
      const lines = scheduleText.split(',');
      const data = lines.map(line => {
        return line.split(':')[1];
      });
      const expectedP = parseFloat(data[data.length - 3]?.replace('[', '').replace(']', '')).toLocaleString(undefined, {maximumFractionDigits:2});
      const expectedE = parseFloat(data[data.length - 2]?.replace('[', '').replace(']', '')).toFixed(2).toLocaleString();
      console.log(expectedE);
      setExpectedPoints(expectedP);
      setExpectedEarnings("$" + expectedE);
      const result = data.slice(0, -3);
      return result;
    };

    return (
        <div className="generate-schedule" style={{ background: 'linear-gradient(to bottom, #4facfe, #ffffff)', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <Navbar />
          {error != '' && (
            <Dialog open={error != ''} onOpenChange={() => setError('')}>
              <DialogContent style={{ backgroundColor: 'f68c8c', color: 'c30909' }}>
                <DialogHeader>
                  <DialogTitle>Error!</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  {error}
                </DialogDescription>
              </DialogContent>
            </Dialog>
          )}
          {success != '' && (
            <Dialog open={success != ''} onOpenChange={() => setSuccess('')}>
            <DialogContent style={{ backgroundColor: '91ec89', color: '18c609' }}>
              <DialogHeader>
                <DialogTitle>Success!</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                {success}
              </DialogDescription>
            </DialogContent>
          </Dialog>
          )}
          {schedule.length == 0 && !isGenerating && (
            <div style={{ marginTop: '20px', textAlign: 'center', width: '80%' }}>
              <div style={{ fontFamily: 'Faustina-Bold, Helvetica', fontWeight: '400', color: '#002d72', fontSize: '20px', letterSpacing: '0', lineHeight: 'normal' }}>Generate New Schedule</div>
              <div style={{ marginTop: '20px' }}>
                <Input type="ranking" placeholder="Ranking" style={{ marginBottom: '10px', width: '40%', marginLeft: '30%', textAlign: 'center', }} value={ranking} onChange={(event) => setRanking(event.target.value)}/>
                <Input type="zipcode" placeholder="Zipcode" style={{ marginBottom: '10px', width: '40%', marginLeft: '30%', textAlign:'center' }} value={zipcode} onChange={(event) => setZipcode(event.target.value)}/>
                <Input type="countrycode" placeholder='Country Code' style={{marginBottom: '10px', width: '40%', marginLeft: '30%', textAlign:'center'}} value={countrycode} onChange={(event) => setCountry(event.target.value)}/>
                <Input type="rest" placeholder='How often do you want rest?' style={{marginBottom: '30px', width:'40%', marginLeft:'30%', textAlign:'center'}} value={rest} onChange={(event) => setRest(event.target.value)}/>
                <div>
                  <div style={{ fontFamily: 'Faustina-Bold, Helvetica', fontWeight: '400', color: '#002d72', fontSize: '13px', letterSpacing: '0', lineHeight: 'normal', marginBottom:'10px' }}>
                    How far do you want to travel?
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom:'20px' }}>
                    <div>0</div>
                    <Slider value={travel} max={10} step={.1} style={{ flex: 1, marginLeft: '20px', marginRight: '20px', width: '500px'}} onValueChange={(value) => setTravel([Math.round(value[0])])}/>
                    <div>10</div>
                  </div>
                  <div style={{ fontFamily: 'Faustina-Bold, Helvetica', fontWeight: '400', color: '#002d72', fontSize: '13px', letterSpacing: '0', lineHeight: 'normal', marginBottom:'10px' }}>
                    How important are earnings?
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom:'20px' }}>
                    <div>0</div>
                    <Slider value={earnings} max={10} step={.1} style={{ flex: 1, marginLeft: '10px', marginRight: '10px' }} onValueChange={(value) => setEarnings([Math.round(value[0])])}/>
                    <div>10</div>
                  </div>
                  <div style={{ fontFamily: 'Faustina-Bold, Helvetica', fontWeight: '400', color: '#002d72', fontSize: '13px', letterSpacing: '0', lineHeight: 'normal', marginBottom:'10px' }}>
                    How important are rankings?
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom:'20px' }}>
                    <div>0</div>
                    <Slider value={points} max={10} step={.1} style={{ flex: 1, marginLeft: '10px', marginRight: '10px' }} onValueChange={(value) => setPoints([Math.round(value[0])])}/>
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
                <Button variant="default" style={{ marginTop: '20px', marginBottom: '20px' }} onClick={handleGenerateClick}>Generate</Button>
              </div>
            </div>
          )}
          {isGenerating && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <p style={{ fontSize: '24px' }}>Generating schedule...</p>
            </div>
          )}
          {schedule.length !== 0 && !isGenerating && (
            <div>
              <Table>
                <TableHeader>
                    <TableHead key={1}>
                      {"Week"}
                    </TableHead>
                    <TableHead key={2}>
                      {"Tournament"}
                    </TableHead>
                </TableHeader>
                <TableBody>
                  {schedule.map((row, index) => (
                      <TableRow
                        key={index}
                      >
                        <TableCell key={index}>
                          {index+1}
                        </TableCell>
                        <TableCell key={row}>
                          {row}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <div>
                <p style={{color: 'black', textAlign: 'center'}}>Expected points: {expectedPoints}</p>
                <p>Expected earnings: {expectedEarnings}</p>
                <Link to="/generate-schedule">
                  <Button variant={'default'} onClick={() => setSchedule([])}>Regenerate</Button>
                </Link>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger>
                    <Button onClick={() => setIsOpen(true)}>Save Schedule</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>What do you want to name this schedule?</DialogTitle>
                    </DialogHeader>
                    <Input type="email" placeholder="Name" onChange={(e) => setScheduleName(e.target.value)}/>
                    <DialogFooter>
                      <Button type="submit" onClick={() => {
                        handleSaveClick(schedule, scheduleName);
                        setIsOpen(false);
                      }}>Save</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}
        </div>
      );
};

export default GenerateSchedule;
