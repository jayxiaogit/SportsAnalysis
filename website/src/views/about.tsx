import Navbar from "@/components/ui/navbar";

const About = () => {
    return (
        <div className="about-page" style={{ background: 'linear-gradient(to bottom, #4facfe, #ffffff)', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
            <Navbar />
            <div className="content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '20px' }}>
                <strong style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '18px', color: '#002d72', textAlign: 'center', marginBottom: '30px', textDecoration: 'underline' }}>Johns Hopkins Sports Analysis Tennis Optimization Research Group</strong>
                <div className="person-container" style={{ display: 'flex', textAlign: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <div className="Taylor">
                        <img src="../images/swimmer.jpeg" alt="Taylor" style={{ width: '100px', margin: '0 auto', height: '100px', borderRadius: '50%' }} />
                        <strong style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '16px', color: '#002d72', textAlign: 'center' }}>Taylor Rohovit</strong>
                        <p style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '14px', color: '#002d72', textAlign: 'center' }}>Description of Taylor Rohovit</p>
                    </div>
                    <div className="Kamila">
                        <img src="../images/tennis1.jpeg" alt="Kamila" style={{ width: '100px', height: '100px', borderRadius: '50%', margin: '0 auto'}} />
                        <strong style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '16px', color: '#002d72', textAlign: 'center' }}>Jay Xiao</strong>
                        <p style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '14px', color: '#002d72', textAlign: 'center' }}>Description of Jay Xiao</p>
                    </div>
                    <div className="Jay">
                        <img src="../images/wta.png" alt="Jay" style={{ width: '100px', height: '100px', borderRadius: '50%', margin: '0 auto' }} />
                        <strong style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '16px', color: '#002d72', textAlign: 'center' }}>Kamila Wong</strong>
                        <p style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '14px', color: '#002d72', textAlign: 'center' }}>Description of Kamila Wong</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
