import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import Navbar from '@/components/ui/navbar';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';


const CreateProfile = () => {

    const base_url = process.env.REACT_APP_BASE_URL;

    const { user } = useUser();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const handleSubmit = () => {
        const userEmail = user?.primaryEmailAddress?.emailAddress;
  
        if (name == "" || email == "") {
          alert("You need to enter the name and email of a profile.");
        } else {
          const xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function () {
              if (xhr.readyState === 4 && xhr.status === 200) {
                  alert("Successfuly added profile!");
                  setName("");
                  setEmail("");
                  window.location.reload();
              } 
          };
      
          const url = `${base_url}/user-profiles?name=${name}&email=${email}&is_owner=false&owner_id=${userEmail}`;
          xhr.open("POST", url, true);
          xhr.send();
        }
    }

    return (
        <div className="existing-schedules" style={{ background: 'linear-gradient(to bottom, #4facfe, #ffffff)', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Navbar />
            <div style={{ margin: '20px 0' }}>
                <h2 style={{ margin: 0 }}>Create a Profile</h2>
            </div>
            <div className="full" style={{ padding: '20px', width: '100%' }}>
                <Label htmlFor="fullName">Full Name:</Label>
                <Input type="text" id="fullName" name="fullName" required style={{ marginBottom: '10px' }} onChange={(event) => setName(event.target.value)}/>
                <Label htmlFor="email">Email:</Label>
                <Input type="email" id="email" name="email" required style={{ marginBottom: '10px' }} onChange={(event) => setEmail(event.target.value)}/>
                <Button type="submit" onClick={handleSubmit} style={{ padding: '10px', backgroundColor: '#4facfe', color: 'white', border: 'none', borderRadius: '5px' }}>
                    Submit
                </Button>
            </div>
        </div>
    );
    
    

};
  
  export default CreateProfile;
  