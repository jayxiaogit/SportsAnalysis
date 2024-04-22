import Navbar from "@/components/ui/navbar";

const GetStarted = () => {
  return (
    <div className="home-page" style={{ background: 'linear-gradient(to bottom, #4facfe, #ffffff)', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
      <Navbar />
      <div className="content" style={{ width: '100%', padding: '20px', textAlign: 'center' }}>
        <strong style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '18px', color: '#002d72', textAlign: 'center', textDecoration: 'underline', marginBottom: '40px' }}>Johns Hopkins Sports Analysis Tennis Optimization Research Group</strong>
        <p style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '18px', color: '#002d72', textAlign: 'center' }}>If you haven’t used our model before, create a new account!
          <ul style={{ textAlign: 'center' }}>
            <li> - Create a new schedule</li>
            <li> - Save schedules</li>
            <li> - Print schedules</li>
            <li> - Look at previous schedules</li>
          </ul>
        </p>
      </div>
    </div>
  );
};

export default GetStarted;
