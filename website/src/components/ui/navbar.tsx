import { Button } from "./button";
import { Link, useLocation } from 'react-router-dom';
import { useUser, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
    const userInfo = useUser();
    const location = useLocation();
    const path = location.pathname;

    return (
        <div className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '57px', backgroundColor: '#002d72', color: '#ffffff' }}>
            <div className="navbar-buttons-left">
                <Link to="/" className="text-wrapper">
                  <Button variant={path === "/" ? "secondary" : "ghost"}>Home</Button>
                </Link>
                <Link to="/getstarted" className="text-wrapper">
                <Button variant={path === "/getstarted" ? "secondary" : "ghost"}>Get Started</Button>
                </Link>
                {userInfo.user ? (
                    <Link to="/dashboard" className="text-wrapper">
                        <Button variant={path === "/dashboard" ? "secondary" : "ghost"}>Dashboard</Button>
                    </Link>
                ) : (
                    <Link to="/about" className="text-wrapper">
                        <Button variant={path === "/about" ? "secondary" : "ghost"}>About Us</Button>
                    </Link>
                )}
            </div>
            <div className="navbar-buttons-right">
                {userInfo.user ? (
                    <UserButton afterSignOutUrl="/" />
                ) : (
                    <Link to="/sign-in/*">
                        <Button variant={"ghost"} className={location.pathname === '/sign-in/*' ? 'active' : ''}>Login</Button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
