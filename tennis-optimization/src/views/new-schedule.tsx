import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import Navbar from '../components/ui/navbar';

// Import the text file (assuming it's in the same directory as this component)

const NewSchedule = () => {

    const fileReader = new FileReader();
    let fileContent
    fileReader.onload = () => {
        fileContent = fileReader.result as string;

        console.log(fileContent);
    }

    return (
        <div className="new-schedule" style={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Navbar />
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Faustina-Bold, Helvetica', fontWeight: '400', color: '#002d72', fontSize: '20px', letterSpacing: '0', lineHeight: 'normal' }}>Selected Tournaments:</div>
                
                {/* Display the file content */}
                <div style={{ marginTop: '10px', textAlign: 'left', maxWidth: '600px', margin: 'auto' }}>
                    {fileContent}
                </div>
            </div>
            <Link to="/generate-schedule"><Button variant="secondary">Back</Button></Link>
        </div>
    );
};

export default NewSchedule;
