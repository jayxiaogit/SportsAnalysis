import Navbar from "@/components/ui/navbar";

const Home = () => {
  
  return (
    <div className="home-page" style={{ background: 'linear-gradient(to bottom, #4facfe, #ffffff)', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
      <Navbar />
      <div className="content" style={{ width: '70%', padding: '20px', textAlign: "center" }}>
        <strong style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '25px', color: '#002d72', textAlign: 'center', textDecoration: 'underline' }}>Johns Hopkins Sports Analysis Tennis Optimization Research Group</strong>
        <p style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '18px', color: '#002d72', textAlign: 'center' }}>The purpose of this research project is to develop a model for optimizing the tournament schedule of Women's Tennis Association (WTA) players. The model will consider a multitude of factors such as player ranking, travel and accommodation costs, physical limitations, and the type of court surface. The goal is to create an efficient schedule that maximizes a player's points earned per season while managing costs effectively.</p>
      </div>
      <div className="next" style={{ display: 'flex', justifyContent: 'space-around', marginTop: '50px', width: '70%' }}>
        <div className="section" style={{ textAlign: 'center', flex: 1, marginRight: '20px'}}>
          <h2 style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '20px', color: '#002d72', textDecoration: 'underline', marginBottom: '10px' }}>Questions?</h2>
          <p style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '16px', color: '#002d72' }}>Check out the <a href="/getstarted" style={{ textDecoration: 'underline', color: '#002d72' }}>Get Started</a> page to understand more about our model and how to use it to fit your interests.</p>
        </div>
        <div className="section" style={{ textAlign: 'center', flex: 1, marginRight: '20px' }}>
          <h2 style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '20px', color: '#002d72', textDecoration: 'underline', marginBottom: '10px' }}>Learn more about us!</h2>
          <p style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '16px', color: '#002d72' }}>Discover more about our research group <a href="/about" style={{ textDecoration: 'underline', color: '#002d72' }}>here</a>.</p>
        </div>
        <div className="section" style={{ textAlign: 'center', flex: 1 }}>
          <h2 style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '20px', color: '#002d72', textDecoration: 'underline', marginBottom: '10px' }}>Interested in the WTA?</h2>
          <p style={{ fontFamily: 'Faustina-Regular, Helvetica', fontSize: '16px', color: '#002d72' }}>Explore the <a href="https://www.wtatennis.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#002d72' }}>Women's Tennis Association</a> and follow along the tournaments to support your favorite players!</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
