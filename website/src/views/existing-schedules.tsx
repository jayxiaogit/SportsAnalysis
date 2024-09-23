// import { Button } from "../components/ui/button";
// import { Link } from 'react-router-dom';
// import Navbar from "@/components/ui/navbar";
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
// import { ChevronDownIcon } from '@radix-ui/react-icons';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';

// import {
//     ColumnDef,
//     ColumnFiltersState,
//     SortingState,
//     VisibilityState,
//     flexRender,
//     getCoreRowModel,
//     getFilteredRowModel,
//     getPaginationRowModel,
//     getSortedRowModel,
//     useReactTable,
//   } from "@tanstack/react-table";

type Schedule = {
  id: number
  schedule: string
}

const ExistingSchedules = () => {

    const { user } = useUser();
    const [schedules, setSchedules] = useState<Record<number, string[]>>({});

    // const [sorting, setSorting] = useState<SortingState>([])
    // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    //     []
    // )
    // const [columnVisibility, setColumnVisibility] =
    //     useState<VisibilityState>({})
    // const [expectedPoints, setExpectedPoints] = useState('');
    // const [expectedEarnings, setExpectedEarnings] = useState('');


    const parseSchedule = (scheduleText: string) => {
        const lines = scheduleText.split(',');
        const data = lines.map(line => {
          return line.split(':')[1];
        });
        // const expectedP = parseFloat(data[data.length - 3]?.replace('[', '').replace(']', '')).toLocaleString(undefined, {maximumFractionDigits:2});
        // const expectedE = parseFloat(data[data.length - 2]?.replace('[', '').replace(']', '')).toFixed(2).toLocaleString();
        // setExpectedPoints(expectedP);
        // setExpectedEarnings("$" + expectedE);
        const result = data.slice(0, -3);
        return result;
      };

    useEffect(() => {
        const userProfile = user?.id;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const scheduleData = JSON.parse(xhr.responseText);
                scheduleData.forEach((id: number, sched: string) => {
                    const schedArray = parseSchedule(sched);
                    schedules[id].push(schedArray);
                  });
                console.log(schedules);
            }
        };

      const url = `http://localhost:6969/save_schedule?user_name=${userProfile}`;
      xhr.open("GET", url, true);
      xhr.send();

    }, []);

    // Convert schedules object to an array for the table
    // const scheduleRows = schedules.map(id => ({
    //     id: Number(id),
    //     schedule: schedules[Number(id)],
    // }));

    // const columns: ColumnDef<Schedule>[] = [
        // {
        //     id: "included",
        //     header: "Include",
        //     cell: ({ row }) => (
        //         <Checkbox
        //             checked={included.includes(row.original.name)}
        //             onCheckedChange={(value) => {
        //                 if (value) {
        //                     handleInclude(row.original.name);
        //                 } else {
        //                     // If already included, remove from included array
        //                     if (included.includes(row.original.name)) {
        //                         setIncluded((prevIncluded) => prevIncluded.filter(name => name !== row.original.name));
        //                     }
        //                 }
        //             }}
        //             aria-label="Include"
        //         />
        //     ),
        // },
        // {
        //     id: "excluded",
        //     header: "Exclude",
        //     cell: ({ row }) => (
        //         <Checkbox
        //             checked={excluded.includes(row.original.name)}
        //             onCheckedChange={(value) => {
        //                 if (value) {
        //                     handleExclude(row.original.name);
        //                 } else {
        //                     // If already included, remove from included array
        //                     if (excluded.includes(row.original.name)) {
        //                         setExcluded((prevExcluded) => prevExcluded.filter(name => name !== row.original.name));
        //                     }
        //                 }
        //             }}
        //             aria-label="Exclude"
        //         />
        //     ),
        // },
    //     {
    //         accessorKey: "schedule",
    //         header: "Schedule",
    //         cell: ({ row }) => (
    //             <div className="capitalize">{row.getValue("schedule")}</div>
    //         ),
    //     },
    //     {
    //         accessorKey: "id",
    //         header: "ID",
    //         cell: ({ row }) => <div className="lowercase">{row.getValue("id")}</div>,
    //     },
    //     // {
    //     //     accessorKey: "type",
    //     //     header: () => <div className="text-right">Type</div>,
    //     //     cell: ({ row }) => (
    //     //         <div className="text-right font-medium">{row.getValue('type')}</div>
    //     //     ),
    //     // },

    // ];

    // const table = useReactTable({
    //     schedules,
    //     columns,
    //     onSortingChange: setSorting,
    //     onColumnFiltersChange: setColumnFilters,
    //     getCoreRowModel: getCoreRowModel(),
    //     getPaginationRowModel: getPaginationRowModel(),
    //     getSortedRowModel: getSortedRowModel(),
    //     getFilteredRowModel: getFilteredRowModel(),
    //     onColumnVisibilityChange: setColumnVisibility,
    //     // onRowSelectionChange: setRowSelection,
    //     state: {
    //     sorting,
    //     columnFilters,
    //     columnVisibility,
    //     // rowSelection,
    //     },
    // })
    

    return (
        <div>
        {/* <div className="flex items-center py-4">
            <Input
                placeholder="Filter schedules..."
                value={(table.getColumn('schedule')?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn('schedule')?.setFilterValue(event.target.value)
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
                        .map((column) => (
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
                        ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.length ? (
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
        </div> */}
        </div>

    );
    

};
  
  export default ExistingSchedules;
  