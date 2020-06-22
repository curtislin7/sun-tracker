import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

const LocationInfo = ({location, latLong}) => {
    const [sunTimes, setSunTimes] = React.useState({
        sunset: undefined,
        sunrise: undefined
    });
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const fetchSunInfo = () => {
        const queryString = `https://api.sunrise-sunset.org/json?lat=${latLong.lat}&lng=${latLong.long}&date=today&formatted=0`
        fetch(queryString)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'OK') {
                    console.log(data)
                    setSunTimes({
                        sunset: data.results.sunset.slice(0,-6),
                        sunrise: data.results.sunrise.slice(0,-6)
                    });
                }
            });
    };
    React.useEffect(() => {fetchSunInfo()}, []);
    React.useEffect(() => {
        // console.log(sunTimes.sunset)
        // const dateObj = new Date(sunTimes.sunset);
        // console.log('date in js', dateObj)
        if(sunTimes.sunset) {
            // const formattedString = sunTimes.sunset.slice(0,-6);
            console.log('the current time for utc is', moment.utc().format());
            // const utcSunset = moment.utc(sunTimes.sunset);
            // const localSunset = moment(utcSunset).local().format('YYYY-MM-DD hh:mm:ss');
            // // 'MMMM Do YYYY, h:mm:ss a'
            // console.log('utcSunset time', utcSunset.format('YYYY-MM-DD hh:mm:ss'));
            // console.log('local', localSunset)
        }
        
    }, [sunTimes])

    const handleChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const createNotification = () => {
        
        // const data = {
        //     phoneNumber: phoneNumber,
        //     reminderTime: sunTimes.sunset,
        // };
        const data = {
            phoneNumber: '3032292859',
            reminderTime: moment.utc().format(),
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
            console.log('We made it to the end of the chain with no errors')
        });
        
    }

    //TODO: fetch will need to be post request;
    return(
        <div>
             <Typography variant="h6" gutterBottom>
                {
                `You chose ${location.description}`
                }
            </Typography>
            <Typography variant="h6" gutterBottom>
                {
                `Boulder is located at ${latLong.lat}, ${latLong.long}`
                }
            </Typography>
            <Typography variant="h6" gutterBottom>
                {`The sun in ${location.description} is going to rise at ${moment.utc(sunTimes.sunrise).local().format('YYYY-MM-DD hh:mm:ss')}`}
            </Typography>
            <Typography variant="h6" gutterBottom>
                {`The sun in ${location.description} is going to set at ${moment.utc(sunTimes.sunset).local().format('YYYY-MM-DD hh:mm:ss')}`}
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