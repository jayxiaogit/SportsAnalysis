import Navbar from "@/components/ui/navbar";

const About = () => {
    return (
        <div className="about-page" style={{ background: 'linear-gradient(to bottom, #4facfe, #ffffff)', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
            <Navbar />
            <div className="content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '20px' }}>
                <strong style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '18px', color: '#002d72', textAlign: 'center', marginBottom: '30px', textDecoration: 'underline' }}>Johns Hopkins Sports Analysis Tennis Optimization Research Group</strong>
                <div className="person-container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '20px' }}>
                    <div className="Taylor" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <strong style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '16px', color: '#002d72', textAlign: 'center' }}>Taylor Rohovit</strong>
                        <p style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '14px', color: '#002d72', textAlign: 'center' }}>Taylor is a current Senior at John’s Hopkins University studying Computer Science. She is on the women's varsity swim team at Hopkins. Taylor is a NCAA All-American and Scholar-Athlete.</p>
                    </div>
                    <div className="Kamila" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <strong style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '16px', color: '#002d72', textAlign: 'center' }}>Jay Xiao</strong>
                        <p style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '14px', color: '#002d72', textAlign: 'center' }}>Jay is a current Junior at John’s Hopkins University studying Computer Science. Having played tennis for over a decade, they have experience playing at both the collegiate and junior level. Jay is a ITA All-American and Scholar-Athlete on the Johns Hopkins Women’s tennis team.</p>
                    </div>
                    <div className="Jay" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <strong style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '16px', color: '#002d72', textAlign: 'center' }}>Kamila Wong</strong>
                        <p style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '14px', color: '#002d72', textAlign: 'center' }}>Kamila is currently a Junior on the Johns Hopkins Varsity Women’s Tennis Team studying Computer Science, with a minor in Entrepreneurship and Management. Together with Jay Xiao, she started the WTA Scheduling Optimization research project in Fall of 2023. With the enlistment of Taylor Rohovit in Spring of 2024, they have successfully created a model that connects to this website.</p>
                    </div>
                </div>
                <div className="timeline" style={{ width: '100%', marginTop: '40px', padding: '20px 0', textAlign: 'center' }}>
                    <strong style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '18px', color: '#002d72', textAlign: 'center', marginBottom: '20px' }}>Project Timeline</strong>
                    <div className="timeline-container" style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', padding: '0 10%' }}>
                        <div className="timeline-item" style={{ textAlign: 'center', position: 'relative' }}>
                            <div className="timeline-marker" style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#002d72', margin: '0 auto', marginBottom: '10px' }}></div>
                            <p style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '14px', color: '#002d72' }}>Fall 2023</p>
                            <p style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '14px', color: '#002d72', maxWidth: '200px', margin: '0 auto' }}>Kamila and Jay started the group.</p>
                            <div className="timeline-line" style={{
                                position: 'absolute',
                                top: '50%',
                                left: '100%',
                                width: '100%',
                                height: '2px',
                                backgroundColor: '#002d72',
                                transform: 'translateX(10px)',
                            }}></div>
                        </div>
                        <div className="timeline-item" style={{ textAlign: 'center', position: 'relative' }}>
                            <div className="timeline-marker" style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#002d72', margin: '0 auto', marginBottom: '10px' }}></div>
                            <p style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '14px', color: '#002d72' }}>Spring 2024</p>
                            <p style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '14px', color: '#002d72', maxWidth: '200px', margin: '0 auto' }}>Taylor joined the project.</p>
                            <div className="timeline-line" style={{
                                position: 'absolute',
                                top: '50%',
                                left: '100%',
                                width: '100%',
                                height: '2px',
                                backgroundColor: '#002d72',
                                transform: 'translateX(10px)',
                            }}></div>
                        </div>
                        <div className="timeline-item" style={{ textAlign: 'center', position: 'relative' }}>
                            <div className="timeline-marker" style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#002d72', margin: '0 auto', marginBottom: '10px' }}></div>
                            <p style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '14px', color: '#002d72' }}>Fall 2024</p>
                            <p style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '14px', color: '#002d72', maxWidth: '200px', margin: '0 auto' }}>Successfully completed the project.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
