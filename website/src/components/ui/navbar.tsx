import { Button } from "./button";
import { Link, useLocation } from 'react-router-dom';
import { UserButton, useUser } from "@clerk/clerk-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { DialogHeader } from "./dialog";
import { Label } from "@radix-ui/react-label";
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react";

const Navbar = () => {
    const userInfo = useUser();
    const user = userInfo?.user;
    const isSignedIn = userInfo.isSignedIn;
    const location = useLocation();
    const path = location.pathname;

    const [userOwner, setUserOwner] = useState<boolean>(false);

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
    if (userInfo?.isSignedIn && userInfo?.user && userInfo?.user.fullName && userInfo?.user.primaryEmailAddress?.emailAddress) {
        getUserFromDb(userInfo?.user.id, userInfo?.user.fullName, userInfo?.user.primaryEmailAddress?.emailAddress);
    }
    }, [isSignedIn, userInfo]);

    const handleSwitchChange = () => {
        const newOwnerStatus = !userOwner;
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            setUserOwner(newOwnerStatus);
          } 
        };
    
        const username = user?.id;
        const name = user?.fullName;
        const email = user?.primaryEmailAddress?.emailAddress;
    
        const url = `http://localhost:6969/user?user_name=${username}&name=${name}&email=${email}&is_owner=${newOwnerStatus}`;
        xhr.open("PUT", url, true);
        xhr.send();
    }

    return (
        <div className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '57px', backgroundColor: '#002d72', color: '#ffffff' }}>
            <div className="navbar-buttons-left">
                <Link to="/" className="text-wrapper">
                    <Button variant={path === "/" ? "secondary" : "ghost"}>Home</Button>
                </Link>
                <Link to="/about" className="text-wrapper">
                    <Button variant={path === "/about" ? "secondary" : "ghost"}>About Us</Button>
                </Link>
                <Link to="/getstarted" className="text-wrapper">
                    <Button variant={path === "/getstarted" ? "secondary" : "ghost"}>Get Started</Button>
                </Link>
                {userInfo.user && (
                    <Link to="/dashboard" className="text-wrapper">
                        <Button variant={path === "/dashboard" ? "secondary" : "ghost"}>Dashboard</Button>
                    </Link>
                )}
            </div>
            <div className="navbar-buttons-right" style={{ display: 'flex', alignItems: 'center' }}>
                {userInfo.user ? (
                    <>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>Owner Settings</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'fixed',
                                    top: '8%',
                                    left: '1%',
                                    right: '1%',
                                    bottom: '1',
                                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                                    zIndex: '1000',
                                    padding: '20px',
                                    borderRadius: '8px',
                                }}>
                                    <div className="flex flex-col gap-4 py-4 w-full center" style={{ alignItems: 'center' }}>
                                        <DialogHeader>
                                            <DialogTitle style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>Profile Settings</DialogTitle>
                                            <DialogDescription style={{textAlign: 'center', width: '60%', alignItems: 'center', justifyContent: 'center', margin: '0 auto'}}>
                                                If you are a group owner, you can create player profiles and add schedules for those accounts. Once you become a group owner, you can't switch back in order to prevent you from losing your profile accounts and schedules. 
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="flex items-left gap-4">
                                            <Label htmlFor="username" className="text-left">
                                                Are you a group owner? 
                                            </Label>
                                            <Switch checked={userOwner} onCheckedChange={handleSwitchChange} disabled={userOwner}/>
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                        <UserButton afterSignOutUrl="/"/>
                    </>
                ) : (
                    <div>
                        <Link to="/sign-in/*">
                            <Button variant={"ghost"} className={location.pathname === '/sign-in/*' ? 'active' : ''}>Login</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};


export default Navbar;
