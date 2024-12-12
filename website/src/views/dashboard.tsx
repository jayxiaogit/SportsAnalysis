import { Button } from "../components/ui/button";
import { Link } from 'react-router-dom';
import Navbar from "@/components/ui/navbar";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

const Dashboard = () => {

    const userInfo = useUser();
    const [userOwner, setUserOwner] = useState<boolean>(false);
    const isSignedIn = userInfo.isSignedIn;

    const getUserFromDb = (id: string, name: string, email: string) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            const gotUserData = JSON.parse(xhr.responseText);
            setUserOwner(gotUserData.data.owner);
          } 
        };
    
        const url = `http://localhost:6969/user?user_name=${id}&name=${name}&email=${email}`;
        xhr.open("GET", url, true);
        xhr.send();
      };
    
      useEffect(() => {
        if (userInfo?.isSignedIn && userInfo?.user?.id && userInfo?.user?.fullName && userInfo?.user?.primaryEmailAddress?.emailAddress) {
          getUserFromDb(userInfo.user.id, userInfo.user.fullName, userInfo.user.primaryEmailAddress.emailAddress);
        }
      }, [isSignedIn, userInfo]);

    
    return (
        <div className="dashboard" style={{ background: 'linear-gradient(to bottom, #4facfe, #ffffff)', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%', textAlign: 'center' }}>
        <Navbar />
        {userOwner && (
            <>
                <div className="create-profiles" style={{ width: '100%', padding: '20px' }}>
                    <Link to={"/create-profile"}><Button variant={"ghost"}>Create profiles</Button></Link>
                </div>
                <div className="existing-profiles" style={{ width: '100%', padding: '20px' }}>
                    <Link to={"/existing-profiles"}><Button variant={"ghost"}>Manage profiles</Button></Link>
                </div>
            </>
        )}
        <div className="existing-schedules" style={{ width: '100%', padding: '20px' }}>
            <Link to={"/existing-schedules"}><Button variant={"ghost"}>Manage schedules</Button></Link>
        </div>
        <div className="generate-schedule" style={{ width: '100%', padding: '20px' }}>
            <Link to={"/generate-schedule"}><Button>Generate new schedule</Button></Link>
        </div>
      </div>
    );
    

};
  
  export default Dashboard;
  