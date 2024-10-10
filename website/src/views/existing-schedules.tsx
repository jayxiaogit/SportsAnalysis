import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { DataTable } from '@/components/ui/data-table';

import {
    ColumnDef,
  } from "@tanstack/react-table";
import Navbar from '@/components/ui/navbar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"



type Schedule = {
 id: number,
 name: string,
 schedule: string,
};

const ExistingSchedules = () => {

    const { user } = useUser();
    const [names, setNames] = useState<Schedule[]>([]);
    const [confirm, setConfirm] = useState<boolean>(false);
    const [update, setUpdate] = useState<boolean>(false);
    const [ID, setID] = useState<number>(0);
    const [name, setName] = useState<string>("");
    const [schedule, setSchedule] = useState<string>("");

    // console.log(confirm);
    // console.log(ID);

    const handleUpdate = (id, name, schedule, username) => {
      // console.log(id);
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // Successfully deleted
          // Update the state to remove the deleted schedule
          console.log("UPDATED!")
          setNames((prevNames) => 
            prevNames.map((prev) => 
              prev.id === id ? { ...schedule, name, schedule } : prev
            )
          );        
        } 
      };
  
      const url = `http://localhost:6969/save_schedule?user_name=${username}&id=${id}&name=${name}&schedule=${schedule}`;
      xhr.open("PUT", url, true);
      xhr.send();
    };

    const handleDelete = (id, username) => {
      console.log(id);
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // Successfully deleted
          // Update the state to remove the deleted schedule
          console.log("DELETED!")
          setNames((prevNames) => prevNames.filter(schedule => schedule.id !== id));
        } 
      };
  
      const url = `http://localhost:6969/save_schedule?user_name=${username}&id=${id}`;
      xhr.open("DELETE", url, true);
      xhr.send();
    };

    const columns: ColumnDef<Schedule>[] = [
      {
        id: "delete",
        header: "",
        cell: ({ row }) => (
          <Button variant='ghost' onClick={() => {
            setConfirm(true);
            setID(row.original.id);
          }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          </Button>
        ),
        // size: 10,
      },
      {
        id: "update",
        header: "",
        cell: ({ row }) => (
          <Button variant='ghost' onClick={() => {
            setUpdate(true);
            setID(row.original.id);
            setName(row.original.name);
            setSchedule(row.original.schedule);
          }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>          </Button>
        ),
        // size: 10,
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("name")}</div>
        ),
        // size: 80,
      },
      {
        accessorKey: "schedule",
        header: "Schedule",
        cell: ({ row }) => (
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Click Here</AccordionTrigger>
              <AccordionContent>
                {row.getValue('schedule')}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          // <Textarea disabled className="capitalize">{row.getValue("schedule")}</Textarea>
        ),
      },
    ]

    useEffect(() => {
        const user_name = user?.primaryEmailAddress?.emailAddress;

        const xhr = new XMLHttpRequest();
        setNames([]);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const scheduleData = JSON.parse(xhr.responseText);
                // console.log(scheduleData);
                setNames(scheduleData.data);
                // console.log(names);
            }
        };

      const url = `http://localhost:6969/save_schedule?user_name=${user_name}`;
      xhr.open("GET", url, true);
      xhr.send();

    }, []);
    

    return (
        <div className="existing-schedules" style={{ background: 'linear-gradient(to bottom, #4facfe, #ffffff)', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Navbar />
            <div style={{ margin: '20px 0' }}>
                <h2 style={{ margin: 0 }}>Saved Schedules</h2>
            </div>
            <div className="full" style={{ padding: '20px', width: '100%' }}>
              <DataTable columns={columns} data={names} />
              <Dialog open={confirm} onOpenChange={setConfirm}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to delete this?</DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => {
                          setConfirm(false);
                          setID(0);
                        }}>Cancel</Button>
                        <Button variant="destructive" onClick={() => {
                            handleDelete(ID, user?.id);
                            setConfirm(false);
                        }}>Yes</Button>
                    </DialogFooter>
                </DialogContent>
                </Dialog>
                <Dialog open={update} onOpenChange={setUpdate}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit what you would like to change.</DialogTitle>
                    </DialogHeader>
                    <Input type="email" value={name} onChange={(e) => setName(e.target.value)}/>
                    <Textarea value={schedule} onChange={(e) => setSchedule(e.target.value)}/>
                    <DialogFooter>
                        <Button onClick={() => {
                          setUpdate(false);
                          setID(0);
                        }}>Cancel</Button>
                        <Button variant="default" onClick={() => {
                            handleUpdate(ID, name, schedule, user?.id);
                            setUpdate(false);
                        }}>Save</Button>
                    </DialogFooter>
                </DialogContent>
                </Dialog>
            </div>
        </div>

    );
    

};
  
  export default ExistingSchedules;
  