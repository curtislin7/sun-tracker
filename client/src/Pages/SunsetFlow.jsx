import React from 'react';
import LocationDropdown from '../Components/LocationDropdown.jsx';
import LocationInfo from '../Components/LocationInfo.jsx'
import Stepper from '../Components/Stepper.jsx'
import { makeStyles } from '@material-ui/core/styles';
import SunsetFlowStyles from './SunsetFlowStyles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const useStyles = makeStyles(SunsetFlowStyles);

const SunsetFlow = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [latLong, setLatLong] = React.useState(undefined);
    const [location, setLocation] = React.useState(null);
    const [isDisabled, setIsDisabled] = React.useState(true);
    const [sunTimes, setSunTimes] = React.useState({
        sunset: undefined,
        sunrise: undefined
    });
    const [chosenOption, setChosenOption] = React.useState('sunset');

    const classes = useStyles();

    React.useEffect(() => {
        if(!location) {
            setIsDisabled(true);
        } else {
            fetchSunInfo();
            setIsDisabled(false);
        }
    }, [latLong]);

    const fetchSunInfo = () => {
        const queryString = `https://api.sunrise-sunset.org/json?lat=${latLong.lat}&lng=${latLong.long}&date=today&formatted=0`
        fetch(queryString)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'OK') {
                    setSunTimes({
                        sunset: data.results.sunset.slice(0,-6),
                        sunrise: data.results.sunrise.slice(0,-6)
                    });
                }
            });
    };

    const currentStep = () => {
        if (activeStep === 0) {
            return (
                <div className={classes.stepContent}>
                    <LocationDropdown 
                        latLong={latLong} 
                        setLatLong={setLatLong}
                        value={location}
                        setValue={setLocation}
                    />
                </div>
            );
        } else if (activeStep === 1) {
            return ( 
                <div className={classes.stepContent}>
                    <LocationInfo 
                        location={location}
                        latLong={latLong}
                        sunTimes={sunTimes}
                        setActiveStep={setActiveStep}
                        setIsDisabled={setIsDisabled}
                        isDisabled={isDisabled}
                        setChosenOption={setChosenOption}
                    />
                </div>
            )
        } else if (activeStep === 2) {
            let reminderTime;
            if (chosenOption == 'sunrise') {
                reminderTime = moment.utc(sunTimes.sunrise).subtract(1, 'hours').local().format('hh:mm A');
            } else {
                reminderTime = moment.utc(sunTimes.sunset).subtract(1, 'hours').local().format('hh:mm A');
            };
            return (
                <Typography variant="h6" gutterBottom>
                    {`You've set a reminder! We will text at ${reminderTime}, an hour before the ${chosenOption} in ${location.description}.`}
                </Typography>
            );
        } else {
            return (
                <Typography variant="h6" gutterBottom>
                    🎉
                </Typography>
            )
        };
    }

    return (
        <div className={classes.root}>
            <div styles={{height: '20px'}}/>
            <Typography variant="h2" component="h2" gutterBottom>
                SunTracker
            </Typography>
           <div className={classes.stepContentContainer}>
               {currentStep()}
           </div>
           <Stepper activeStep={activeStep} setActiveStep={setActiveStep} isDisabled={isDisabled}/>
           <div styles={{height: '20px'}}/>
        </div>        
    );
}

export default SunsetFlow;