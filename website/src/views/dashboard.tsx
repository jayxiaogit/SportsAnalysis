import { Button } from "../components/ui/button";
import { Link } from 'react-router-dom';
import Navbar from "@/components/ui/navbar";

const Dashboard = () => {

    
    return (
        <div className="dashboard" style={{ background: 'linear-gradient(to bottom, #4facfe, #ffffff)', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%', textAlign: 'center' }}>
        <Navbar />
        <div className="existing-profiles" style={{ width: '100%', padding: '20px' }}>
            <Link to={"/existing-profiles"}><Button variant={"ghost"}>Manage profiles</Button></Link>
        </div>
        <div className="existing-schedules" style={{ width: '100%', padding: '20px' }}>
            <Link to={"/existing-schedules"}><Button variant={"ghost"}>View existing schedules</Button></Link>
        </div>
        <div className="generate-schedule" style={{ width: '100%', padding: '20px' }}>
            <Link to={"/generate-schedule"}><Button>Generate new schedule</Button></Link>
        </div>
      </div>
    );
    

};
  
  export default Dashboard;
  