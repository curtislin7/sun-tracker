import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

const LocationInfo = ({location, latLong:{lat, long}, sunTimes:{sunset, sunrise}, setActiveStep}) => {
    console.log(sunset);
    const [phoneNumber, setPhoneNumber] = React.useState('');

    const handleChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const createNotification = () => {
        const data = {
            phoneNumber: phoneNumber,
            reminderTime: sunset,
        };
        fetch('/reminders/create', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            // mode: 'cors',
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            setActiveStep(2);
            console.log('We made it to the end of the chain with no errors')
        });  
    };

    return(
        <div>
             <Typography variant="h6" gutterBottom>
                {
                `You chose ${location.description}`
                }
            </Typography>
            <Typography variant="h6" gutterBottom>
                {`Boulder is located at ${lat}, ${long}`}
            </Typography>
            <Typography variant="h6" gutterBottom>
                {`The sun in ${location.description} is going to rise at ${moment.utc(sunrise).local().format('YYYY-MM-DD hh:mm:ss')} AM.`}
            </Typography>
            <Typography variant="h6" gutterBottom>
                {`The sun in ${location.description} is going to set at ${moment.utc(sunset).local().format('YYYY-MM-DD hh:mm:ss')} PM.`}
            </Typography>
            <div>
                <TextField 
                    label="PhoneNumber" 
                    value={phoneNumber} 
                    onChange={handleChange} 
                    onKeyPress={(e) => {
                        console.log(`Pressed keyCode ${e.key}`);
                        if (e.key === 'Enter') {
                            createNotification();
                            e.preventDefault();
                        };
                    }}
                />
                <Button></Button>
            </div>
        </div>
    );
}

export default LocationInfo;