import { useState } from 'react';
import { Button } from "../components/ui/button";
// import { Link } from 'react-router-dom';
import { Slider } from "../components/ui/slider";
import { Input } from "../components/ui/input";
import Navbar from "../components/ui/navbar";

const GenerateSchedule = () => {

    const [ranking, setRanking] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [countrycode, setCountry] = useState(''); 
    const [isGenerating, setIsGenerating] = useState(false);

    let schedule

    const handleInputChange = (event, setter) => {
        setter(event.target.value);
    };

    const handleGenerateClick = () => {
        // Make the API call
        setIsGenerating(true);
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("Schedule received!");
                const scheduleData = JSON.parse(xhr.responseText);
                console.log(scheduleData);
                schedule = scheduleData;
                setIsGenerating(false);
                // Do something with the schedule data
                //console.log(scheduleData)
            }
        };
        const rest = 4;
        const url = `http://localhost:6969/schedule?zipcode=${zipcode}&countrycode=${countrycode}&rank=${ranking}&rest=${rest}`;
        xhr.open("GET", url, true);
        xhr.send();
    };

    return (
        <div className="generate-schedule" style={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Navbar />
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Faustina-Bold, Helvetica', fontWeight: '400', color: '#002d72', fontSize: '20px', letterSpacing: '0', lineHeight: 'normal' }}>Generate New Schedule</div>
                <div style={{ marginTop: '20px' }}>
                    <Input type="ranking" placeholder="Ranking" style={{ marginBottom: '10px' }} value={ranking} onChange={(event) => handleInputChange(event, setRanking)}/>
                    <Input type="zipcode" placeholder="Zipcode" style={{ marginBottom: '10px' }} value={zipcode} onChange={(event) => handleInputChange(event, setZipcode)}/>
                    <Input type="countrycode" placeholder='Country Code' style={{marginBottom: '30px'}} value={countrycode} onChange={(event) => handleInputChange(event, setCountry)}/>
                    <div>
                        <div style={{ fontFamily: 'Faustina-Bold, Helvetica', fontWeight: '400', color: '#002d72', fontSize: '13px', letterSpacing: '0', lineHeight: 'normal', marginBottom:'10px' }}>
                            How important is travel?
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom:'20px' }}>
                            <div>0</div>
                            <Slider defaultValue={[50]} max={100} step={1} style={{ flex: 1, marginLeft: '10px', marginRight: '10px' }}/>
                            <div>100</div>
                        </div>
                        <div style={{ fontFamily: 'Faustina-Bold, Helvetica', fontWeight: '400', color: '#002d72', fontSize: '13px', letterSpacing: '0', lineHeight: 'normal', marginBottom:'10px' }}>
                            How important are earnings?
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom:'20px' }}>
                            <div>0</div>
                            <Slider defaultValue={[50]} max={100} step={1} style={{ flex: 1, marginLeft: '10px', marginRight: '10px' }}/>
                            <div>100</div>
                        </div>
                        <div style={{ fontFamily: 'Faustina-Bold, Helvetica', fontWeight: '400', color: '#002d72', fontSize: '13px', letterSpacing: '0', lineHeight: 'normal', marginBottom:'10px' }}>
                            How important are rankings?
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom:'20px' }}>
                            <div>0</div>
                            <Slider defaultValue={[50]} max={100} step={1} style={{ flex: 1, marginLeft: '10px', marginRight: '10px' }}/>
                            <div>100</div>
                        </div>
                    </div>
                    {!schedule && !isGenerating && <Button variant="default" style={{ marginTop: '20px' }} onClick={handleGenerateClick}>Generate</Button>}
                    {isGenerating && <p>Generating schedule...</p>}
                    {schedule && !isGenerating && (
                        <div>
                            <p>Schedule generated:</p>
                            <pre>{JSON.stringify(schedule, null, 2)}</pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GenerateSchedule;
