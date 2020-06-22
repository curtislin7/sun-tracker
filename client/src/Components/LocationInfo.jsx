import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    inputRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input: {
        width: '200px'
    },
    button: {
      marginRight: theme.spacing(1),
    },
}));

const LocationInfo = ({location, latLong:{lat, long}, sunTimes:{sunset, sunrise}, setActiveStep}) => {
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const classes = useStyles();

    const handleChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const setSunsetReminder = () => {
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
        }); 
    };

    const setSunriseReminder = () => {
        const data = {
            phoneNumber: phoneNumber,
            reminderTime: sunrise,
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
        }); 
    }

    return(
        <div className={classes.root}>
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
            <div className={classes.inputRow}>
                <TextField 
                    className={classes.input}
                    label="PhoneNumber" 
                    value={phoneNumber} 
                    onChange={handleChange} 
                    onKeyPress={(e) => {
                        console.log(`Pressed keyCode ${e.key}`);
                        if (e.key === 'Enter') {
                            alert('Just click a button bro.')
                            e.preventDefault();
                        };
                    }}
                />
                <Button variant="contained" onClick={() => setSunriseReminder()}>
                    Set sunrise reminder!
                </Button>
                <Button variant="contained" onClick={() => setSunsetReminder()}>
                    Set sunset reminder!
                </Button>
            </div>
        </div>
    );
}

export default LocationInfo;