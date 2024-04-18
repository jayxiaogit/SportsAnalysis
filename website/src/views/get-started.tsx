import Navbar from "@/components/ui/navbar";

const Home = () => {
  return (
    <div className="home-page" style={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Navbar />
      <div className="content" style={{ width: '100%', padding: '20px' }}>
        <p style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '18px', color: '#002d72', textAlign: 'center' }}>Johns Hopkins Sports Analysis Research Group - Tennis</p>
        <p style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '18px', color: '#002d72', textAlign: 'center' }}>If you haven’t used our model before, create a new account!
Once you create an account, you will be able to:
Create a new schedule
Save schedules
Print schedules
Look at previous schedules</p>
      </div>
    </div>
  );
};

export default Home;
