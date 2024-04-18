import Navbar from "@/components/ui/navbar";

const About = () => {
    return (
      <div className="about-page" style={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Navbar />
        <div className="content" style={{ width: '100%', padding: '20px' }}>
          <p style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '18px', color: '#002d72', textAlign: 'center' }}>Johns Hopkins Sports Analysis Research Group - Tennis</p>
          <p style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '18px', color: '#002d72', textAlign: 'center' }}>Taylor Rohovit, Jay Xiao, Kamila Wong</p>
        </div>
      </div>
    );
};

export default About;
