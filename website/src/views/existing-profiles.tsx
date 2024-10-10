import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { DataTable } from '@/components/ui/data-table';

import {
    ColumnDef,
  } from "@tanstack/react-table";
import Navbar from '@/components/ui/navbar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';


type Profile = {
 id: number,
 name: string,
 username: string,
 email: string,
 owner: boolean,
};

const ExistingProfiles = () => {

    const { user } = useUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    const [profiles, setProfiles] = useState<Profile[]>([]);

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [confirm, setConfirm] = useState<boolean>(false);
    const [update, setUpdate] = useState<boolean>(false);


    const handleUpdate = (name, email) => {
      // console.log(id);
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // Successfully deleted
          // Update the state to remove the deleted schedule
          console.log("UPDATED!");
        //   setProfiles((prevNames) => 
        //     prevNames.map((prev) => 
        //       prev.id === id ? { ...schedule, name, schedule } : prev
        //     )
        //   );        
        } 
      };
  
      const url = `http://localhost:6969/user-profiles?email=${email}&owner_id=${userEmail}&name=${name}`;
      xhr.open("PUT", url, true);
      xhr.send();
    };

    const handleDelete = (email) => {
    //   console.log(id);
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // Successfully deleted
          // Update the state to remove the deleted schedule
          console.log("DELETED!");
          setProfiles((prevProfiles) => prevProfiles.filter(profile => profile.email !== email));
        } 
      };
  
      const url = `http://localhost:6969/user-profiles?owner_id=${userEmail}&email=${email}`;
      xhr.open("DELETE", url, true);
      xhr.send();
    };

    const columns: ColumnDef<Profile>[] = [
      {
        id: "delete",
        header: "",
        cell: ({ row }) => (
          <Button variant='ghost' onClick={() => {
            setConfirm(true);
            setEmail(row.original.email);
          }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          </Button>
        ),
      },
      {
        id: "update",
        header: "",
        cell: ({ row }) => (
          <Button variant='ghost' onClick={() => {
            setUpdate(true);
            setName(row.original.name);
            setEmail(row.original.email);
          }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>          </Button>
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("name")}</div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("email")}</div>
        ),
      },
    ]

    const handleCreateSubmit = () => {
      const userEmail = user?.primaryEmailAddress?.emailAddress;
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // Successfully deleted
          // Update the state to remove the deleted schedule
          console.log("ADDED PROFILE!")
        //   setProfiles((prevProfiles) => prevProfiles.filter(schedule => schedule.id !== id));
        } 
        console.log(xhr.response);
      };
  
      const url = `http://localhost:6969/user-profiles?name=${name}&email=${email}&is_owner=false&owner_id=${userEmail}`;
      xhr.open("POST", url, true);
      xhr.send();
      getProfiles();
    }

    const getProfiles = () => {
        // console.log(userEmail);
        const xhr = new XMLHttpRequest();
        setProfiles([]);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const userData = JSON.parse(xhr.responseText);
                setProfiles(userData.data);
            }
            // console.log(xhr.response);
        };

        const url = `http://localhost:6969/user-profiles?owner_id=${userEmail}&is_owner=true`;
        xhr.open("GET", url, true);
        xhr.send();
    }

    useEffect(() => {
        getProfiles();
    }, []);
    

    return (
        <div className="existing-profiles" style={{ background: 'linear-gradient(to bottom, #4facfe, #ffffff)', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Navbar />
            <div style={{ margin: '20px 0' }}>
                <h2 style={{ margin: 0 }}>Create A New Profile</h2>
            </div>
            <div className="full" style={{ padding: '20px', width: '100%' }}>
                <Label htmlFor="fullName" required style={{ marginTop: '10px', marginBottom: '10px' }}>Full Name:</Label>
                <Input type="text" id="fullName" name="fullName" required style={{ marginBottom: '10px' }} onChange={(event) => setName(event.target.value)}/>
                <Label htmlFor="email" required style={{ marginTop: '10px', marginBottom: '10px' }}>Email:</Label>
                <Input type="email" id="email" name="email" required style={{ marginBottom: '10px' }} onChange={(event) => setEmail(event.target.value)}/>
                <Button type="submit" onClick={handleCreateSubmit} style={{ padding: '10px', backgroundColor: '#4facfe', color: 'white', border: 'none', borderRadius: '5px' }}>
                    Submit
                </Button>
            </div>
            <div style={{ margin: '20px 0' }}>
                <h2 style={{ margin: 0 }}>Saved Profiles</h2>
            </div>
            <div className="full" style={{ padding: '20px', width: '100%' }}>
              <DataTable columns={columns} data={profiles} />
              <Dialog open={confirm} onOpenChange={setConfirm}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to delete this?</DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => {
                          setConfirm(false);
                        }}>Cancel</Button>
                        <Button variant="destructive" onClick={() => {
                            handleDelete(email);
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
                    <Input value={name} onChange={(e) => setName(e.target.value)}/>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <DialogFooter>
                        <Button onClick={() => {
                          setUpdate(false);
                        }}>Cancel</Button>
                        <Button variant="default" onClick={() => {
                            handleUpdate(name, email);
                            setUpdate(false);
                        }}>Save</Button>
                    </DialogFooter>
                </DialogContent>
                </Dialog>
            </div>
        </div>

    );
    

};
  
  export default ExistingProfiles;
  