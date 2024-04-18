import Navbar from "@/components/ui/navbar";
//import { SignedIn, ClerkProvider } from '@clerk/clerk-react'

//const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const LoggedOut = () => {
  return (
    <div className="home-page" style={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <Navbar />
          <div className="content" style={{ width: '100%', padding: '20px' }}>
            <p style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '18px', color: '#002d72', textAlign: 'center' }}>Johns Hopkins Sports Analysis Research Group - Tennis</p>
            <p style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '18px', color: '#002d72', textAlign: 'center' }}>The purpose of this research project is to develop a model for optimizing the tournament schedule of Women's Tennis Association (WTA) players. The model will consider a multitude of factors such as player ranking, travel and accommodation costs, physical limitations, and the type of court surface. The goal is to create an efficient schedule that maximizes a player's points earned per season while managing costs effectively.</p>
          </div>
        </div>
  );
};

export default LoggedOut;
