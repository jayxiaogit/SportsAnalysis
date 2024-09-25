import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { DataTable } from '@/components/ui/data-table';

import {
    ColumnDef,
  } from "@tanstack/react-table";
import Navbar from '@/components/ui/navbar';

type Schedule = {
 name: string,
 schedule: string,
};

const ExistingSchedules = () => {

    const { user } = useUser();
    const [names, setNames] = useState<Schedule[]>([]);

    const columns: ColumnDef<Schedule>[] = [
        {
          accessorKey: "name",
          header: "Name",
          cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
          ),
        },
        {
          accessorKey: "schedule",
          header: "Schedule",
          cell: ({ row }) => (
            <div className="capitalize">{row.getValue("schedule")}</div>
          ),
        },
      ]

    useEffect(() => {
        const userProfile = user?.id;

        const xhr = new XMLHttpRequest();
        setNames([]);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const scheduleData = JSON.parse(xhr.responseText);
                // console.log(scheduleData);
                // const names = scheduleData.map((sched: Schedule) => sched.name);
                setNames(scheduleData);
                // console.log(names);
            }
        };

      const url = `http://localhost:6969/save_schedule?user_name=${userProfile}`;
      xhr.open("GET", url, true);
      xhr.send();

    }, []);
    

    return (
        <div className="existing-schedules" style={{ background: 'linear-gradient(to bottom, #4facfe, #ffffff)', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Navbar />
            <div style={{ margin: '20px 0' }}>
                <h2 style={{ margin: 0 }}>{user?.fullName}'s Saved Schedules</h2>
            </div>
            <div className="full" style={{ padding: '20px', width: '100%' }}>
                <DataTable columns={columns} data={names} />
            </div>
        </div>

    );
    

};
  
  export default ExistingSchedules;
  