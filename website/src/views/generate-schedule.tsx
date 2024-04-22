import { useState } from 'react';
import { Button } from "../components/ui/button";
// import { Link } from 'react-router-dom';
import { Slider } from "../components/ui/slider";
import { Input } from "../components/ui/input";
import Navbar from "../components/ui/navbar";
import { Link } from 'react-router-dom';
import { DataTableDemo } from "../components/ui/data-table";

const GenerateSchedule = () => {

    const [ranking, setRanking] = useState('');
    const [rest, setRest] = useState('');
    const [travel, setTravel] = useState([5]);
    const [earnings, setEarnings] = useState([5]);
    const [points, setPoints] = useState([5]);
    const [zipcode, setZipcode] = useState('');
    const [countrycode, setCountry] = useState(''); 
    const [schedule, setSchedule] = useState(''); 
    const [isGenerating, setIsGenerating] = useState(false);


    const handleGenerateClick = () => {
        // Make the API call
        setIsGenerating(true);
        console.log(ranking);
        console.log(rest);
        console.log(travel[0]);
        console.log(earnings[0]);
        console.log(points[0]);
        console.log(zipcode);
        console.log(countrycode);
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("Schedule received!");
                const scheduleData = xhr.responseText;
                setSchedule(scheduleData);
                setIsGenerating(false);
                // Do something with the schedule data
                console.log(scheduleData);
            }
        };
        //const trav = travel[0];
        //console.log(trav)
        const url = `http://localhost:6969/schedule?zipcode=${zipcode}&countrycode=${countrycode}&rank=${ranking}&rest=${rest}&travel=${travel[0]}&earnings=${earnings[0]}&points=${points[0]}`;
        xhr.open("GET", url, true);
        xhr.send();
    };

    return (
        <div className="generate-schedule" style={{ background: 'linear-gradient(to bottom, #4facfe, #ffffff)', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Navbar />
        {schedule == '' && !isGenerating && <div style={{ marginTop: '20px', textAlign: 'center', width: '80%' }}>
            <div style={{ fontFamily: 'Faustina-Bold, Helvetica', fontWeight: '400', color: '#002d72', fontSize: '20px', letterSpacing: '0', lineHeight: 'normal' }}>Generate New Schedule</div>
            <div style={{ marginTop: '20px' }}>
                <Input type="ranking" placeholder="Ranking" style={{ marginBottom: '10px', width: '40%', marginLeft: '30%', textAlign: 'center', }} value={ranking} onChange={(event) => setRanking(event.target.value)}/>
                <Input type="zipcode" placeholder="Zipcode" style={{ marginBottom: '10px', width: '40%', marginLeft: '30%', textAlign:'center' }} value={zipcode} onChange={(event) => setZipcode(event.target.value)}/>
                <Input type="countrycode" placeholder='Country Code' style={{marginBottom: '10px', width: '40%', marginLeft: '30%', textAlign:'center'}} value={countrycode} onChange={(event) => setCountry(event.target.value)}/>
                <Input type="rest" placeholder='How often do you want rest?' style={{marginBottom: '30px', width:'40%', marginLeft:'30%', textAlign:'center'}} value={rest} onChange={(event) => setRest(event.target.value)}/>
                <div>
                    <div style={{ fontFamily: 'Faustina-Bold, Helvetica', fontWeight: '400', color: '#002d72', fontSize: '13px', letterSpacing: '0', lineHeight: 'normal', marginBottom:'10px' }}>
                        How important is travel?
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom:'20px' }}>
                        <div>0</div>
                        <Slider defaultValue={[5]} max={10} step={.1} style={{ flex: 1, marginLeft: '20px', marginRight: '20px', width: '500px'}} onValueChange={(value) => setTravel(value,)}/>
                        <div>10</div>
                    </div>
                    <div style={{ fontFamily: 'Faustina-Bold, Helvetica', fontWeight: '400', color: '#002d72', fontSize: '13px', letterSpacing: '0', lineHeight: 'normal', marginBottom:'10px' }}>
                        How important are earnings?
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom:'20px' }}>
                        <div>0</div>
                        <Slider defaultValue={[5]} max={10} step={.1} style={{ flex: 1, marginLeft: '10px', marginRight: '10px' }} onValueChange={(value) => setEarnings(value)}/>
                        <div>10</div>
                    </div>
                    <div style={{ fontFamily: 'Faustina-Bold, Helvetica', fontWeight: '400', color: '#002d72', fontSize: '13px', letterSpacing: '0', lineHeight: 'normal', marginBottom:'10px' }}>
                        How important are rankings?
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom:'20px' }}>
                        <div>0</div>
                        <Slider defaultValue={[5]} max={10} step={.1} style={{ flex: 1, marginLeft: '10px', marginRight: '10px' }} onValueChange={(value) => setPoints(value)}/>
                        <div>10</div>
                    </div>
                </div>
                <DataTableDemo />
                {schedule === '' && !isGenerating && (
                    <Button variant="default" style={{ marginTop: '20px' }} onClick={handleGenerateClick}>Generate</Button>
                )}
            </div>
        </div>}
        {isGenerating && <p>Generating schedule...</p>}
        {schedule !== '' && !isGenerating && (
            <div>
                <pre style={{ fontSize: '10px'}}>{schedule}</pre>
                <Link to="/generate-schedule"><Button variant={'secondary'} onClick={ () => setSchedule('')}>Regenerate</Button></Link>
            </div>
        )}
    </div>
    
    );
};

export default GenerateSchedule;
