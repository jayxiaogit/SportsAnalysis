// import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
// import { DataTable } from '@/components/ui/data-table';

// import {
//     ColumnDef,
//   } from "@tanstack/react-table";
import Navbar from '@/components/ui/navbar';
import { Button } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
import { Label } from '@radix-ui/react-label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion"


const CreateProfile = () => {

    const { user } = useUser();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    return (
        <div className="existing-schedules" style={{ background: 'linear-gradient(to bottom, #4facfe, #ffffff)', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Navbar />
            <div style={{ margin: '20px 0' }}>
                <h2 style={{ margin: 0 }}>{user?.fullName}'s Saved Schedules</h2>
            </div>
            <div className="full" style={{ padding: '20px', width: '100%' }}>
                <Label htmlFor="fullName">Full Name:</Label>
                <Input type="text" id="fullName" name="fullName" required style={{ marginBottom: '10px' }} onChange={(event) => setName(event.target.value)}/>
                <Label htmlFor="email">Email:</Label>
                <Input type="email" id="email" name="email" required style={{ marginBottom: '10px' }} onChange={(event) => setEmail(event.target.value)}/>
                <Button type="submit" style={{ padding: '10px', backgroundColor: '#4facfe', color: 'white', border: 'none', borderRadius: '5px' }}>
                    Submit
                </Button>
            </div>
        </div>
    );
    
    

};
  
  export default CreateProfile;
  