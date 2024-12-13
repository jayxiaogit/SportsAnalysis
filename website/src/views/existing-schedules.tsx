import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { DataTable } from '@/components/ui/data-table';
import autoTable from 'jspdf-autotable';

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
import { jsPDF } from "jspdf";

type Schedule = {
  id: number;
  name: string;
  schedule: string;
  username: string;
};

type Profile = {
  id: number;
  name: string;
  email: string;
  owner: boolean;
};

const ExistingSchedules = () => {
  const { user } = useUser();
  const [names, setNames] = useState<Schedule[]>([]);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [ID, setID] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [schedule, setSchedule] = useState<string>("");
  const [profiles, setProfiles] = useState<Profile[]>([]);

  const thisUser = user?.primaryEmailAddress?.emailAddress ? user?.primaryEmailAddress?.emailAddress : 'Myself';

  // Initially empty array, later this will hold the individual schedule items (weeks)
  const [scheduleItems, setScheduleItems] = useState<string[]>(schedule.split(','));

  const handleUpdate = (id: number, name: string, schedule: string, email: string) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        setNames((prevNames) =>
          prevNames.map((prev) =>
            prev.id === id ? { ...prev, name, schedule } : prev
          )
        );
        getProfiles();
      }
    };

    const url = `http://localhost:6969/save_schedule?email=${email}&id=${id}&name=${name}&schedule=${schedule}`;
    xhr.open("PUT", url, true);
    xhr.send();
  };

  const handleDelete = (id: number, email: string) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        setNames((prevNames) => prevNames.filter(schedule => schedule.id !== id));
      }
    };

    const url = `http://localhost:6969/save_schedule?email=${email}&id=${id}`;
    xhr.open("DELETE", url, true);
    xhr.send();
  };

  const handleScheduleChange = (index: number, value: string) => {
    const updatedSchedule = [...scheduleItems];
    updatedSchedule[index] = value;
    setScheduleItems(updatedSchedule);
  };

  // Combine the schedule items back into a string when saving
  const handleSave = () => {
    const updatedScheduleString = scheduleItems.join(',');
    console.log(updatedScheduleString);
    handleUpdate(ID, name, updatedScheduleString, email);
    setUpdate(false);
  };

  const downloadPDF = (name: string, schedule: string, username: string) => {
    const doc = new jsPDF();

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    const marginX = 20;
    let marginY = 30; // Starting Y position for the first line
    const lineHeight = 10; // Spacing between lines
    // const maxWidth = 180; // Maximum width of the text

    // Add the name (text)
    doc.text("Schedule Name: ", marginX, marginY);
    doc.text(name, marginX + 60, marginY); // Added offset for the name
    marginY += lineHeight; // Move down for the next text

    // Add the username
    doc.text("Player's email: ", marginX, marginY);
    doc.text(username, marginX + 60, marginY); // Added offset for the username
    marginY += lineHeight;

    // Prepare the schedule data for the table
    const scheduleRows = schedule.split(',').map(item => item.trim());
    const tableData = scheduleRows.map((row, index) => [index + 1, row]);

    // Add the table
    autoTable(doc, {
      startY: marginY, // Specify the Y position to start the table from
      head: [['Week', 'Tournament']], // Table headers
      body: tableData, // Data for the table
    });

    // Generate file name
    const fileName = `${formattedDate}-tennis-schedule-${name}.pdf`;

    // Save the PDF
    doc.save(fileName);
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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </Button>
      ),
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
          setEmail(row.original.username);
          setScheduleItems(row.original.schedule.split(',')); // Split the schedule into items
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
          </svg>
        </Button>
      ),
    },
    {
      id: "download",
      header: "",
      cell: ({ row }) => (
        <Button variant='ghost' onClick={() => {
          downloadPDF(row.original.name, row.original.schedule, row.original.username);
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
        </Button>
      ),
    },
    {
      accessorKey: "username",
      header: "Player",
      cell: ({ row }) => {
        const email = row.getValue("username");
        const profile = profiles.find(profile => profile.email === email);
        const profileName = profile ? profile.name : 'Myself';
        return (
          <div className="capitalize">
            {profileName}
          </div>
        );
      },
    },
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
        <Textarea disabled className="capitalize" value={row.getValue("schedule")} />
      ),
    },
  ];

  const getSchedules = () => {
    setNames([]);
    const allNames: Schedule[] = [];
    let requestsCompleted = 0;

    const myEmail = thisUser;
    const xhrMySchedules = new XMLHttpRequest();

    xhrMySchedules.onreadystatechange = function () {
      if (xhrMySchedules.readyState === 4) {
        requestsCompleted++;
        if (xhrMySchedules.status === 200) {
          const myScheduleData = JSON.parse(xhrMySchedules.responseText);
          if (!myScheduleData.error) {
            allNames.push(...myScheduleData.data);
          }
        } else {
          console.log("Couldn't find schedules for your account.");
        }

        if (requestsCompleted === 1 + profiles.length) {
          setNames(allNames);
        }
      }
    };

    const myUrl = `http://localhost:6969/save_schedule?email=${myEmail}`;
    xhrMySchedules.open("GET", myUrl, true);
    xhrMySchedules.send();

    profiles.forEach((profile) => {
      const xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          requestsCompleted++;
          if (xhr.status === 200) {
            const scheduleData = JSON.parse(xhr.responseText);
            if (!scheduleData.error) {
              allNames.push(...scheduleData.data);
            }
          } else {
            console.log(`Couldn't find schedules for user: ${profile.email}`);
          }

          // Check if all requests are completed
          if (requestsCompleted === 1 + profiles.length) {
            setNames(allNames);
          }
        }
      };

      const url = `http://localhost:6969/save_schedule?email=${profile.email}`;
      xhr.open("GET", url, true);
      xhr.send();
    });
  };

  const getProfiles = () => {
    const xhr = new XMLHttpRequest();
    setProfiles([]);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const userData = JSON.parse(xhr.responseText);
        setProfiles(userData.data);
      }
    };

    const url = `http://localhost:6969/user-profiles?owner_id=${thisUser}&is_owner=true`;
    xhr.open("GET", url, true);
    xhr.send();
  };

  useEffect(() => {
    getProfiles();
  }, []);

  useEffect(() => {
    getSchedules();
  }, [profiles]);

  return (
    <div className="existing-schedules" style={{ background: 'linear-gradient(to bottom, #4facfe, #ffffff)', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Navbar />
      <div style={{ marginTop: '20px', textAlign: 'center', width: '80%' }}>
        <div style={{ fontFamily: 'Faustina-Bold, Helvetica', fontWeight: '400', color: '#002d72', fontSize: '20px', letterSpacing: '0', lineHeight: 'normal' }}>Saved Schedules</div>
        <div style={{ marginTop: '20px' }}>
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
                  if (user?.primaryEmailAddress?.emailAddress) {
                    handleDelete(ID, user?.primaryEmailAddress?.emailAddress); 
                  }
                  setConfirm(false);
                }}>Yes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={update} onOpenChange={setUpdate}>
            <DialogContent style={{ maxHeight: '80vh', overflowY: 'auto' }}>
              <DialogHeader>
                <DialogTitle>Edit what you would like to change.</DialogTitle>
              </DialogHeader>
              <Input
                type="email"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div style={{ marginTop: '10px' }}>
                {scheduleItems.map((item, index) => (
                  <Input
                    key={index}
                    value={item}
                    onChange={(e) => handleScheduleChange(index, e.target.value)}
                    placeholder={`Week ${index + 1}`}
                    style={{ marginBottom: '10px' }} // Optional: Add margin for spacing
                  />
                ))}
              </div>
              <DialogFooter>
                <Button onClick={() => {
                  setUpdate(false);
                  setID(0);
                }}>Cancel</Button>
                <Button variant="default" onClick={handleSave}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ExistingSchedules;
