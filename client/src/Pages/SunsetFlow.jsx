import React from 'react';
import Locater from '../Components/Locater.jsx'
import LocationInfo from '../Components/LocationInfo.jsx'
import Stepper from '../Components/Stepper.jsx'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import SunsetFlowStyles from './SunsetFlowStyles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';


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
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [chosenOption, setChosenOption] = React.useState('sunset');
    const [hasError, setHasError] = React.useState(false);
    const classes = useStyles();

    const resetFields = () => {
        setActiveStep(0);
        setLatLong(undefined);
        setLocation(null);
        setIsDisabled(true);
        setSunTimes({
            sunset: undefined,
            sunrise: undefined,
        })
        setPhoneNumber('');
        setHasError(false);
    }

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
                    <Locater 
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
                        sunTimes={sunTimes}
                        setActiveStep={setActiveStep}
                        setIsDisabled={setIsDisabled}
                        isDisabled={isDisabled}
                        setChosenOption={setChosenOption}
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                        hasError={hasError}
                        setHasError={setHasError}
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
                <div style={{width: '40vw'}}>
                    <Typography variant="h6" gutterBottom>
                        {`You've set a ${chosenOption} reminder! We will text at ${reminderTime}, an hour before the ${chosenOption} in ${location.description}.`}
                    </Typography>
                </div>
            );
        } else {
            return (
                <div style={{width: '40vw'}}>
                    <div>
                        <Typography variant="h6" gutterBottom>
                            Sun Tracker uses free APIs provided by https://sunrise-sunset.org/ and Google Maps, as well as Twilio's Programmable SMS functionality to send you texts! 🎉
                        </Typography>
                    </div>
                    {/* <Typography variant="h6" gutterBottom>
                        Sun Tracker also uses Twilio's Programmable SMS functionality to send you texts!
                    </Typography> */}
                </div>
            )
        };
    }

    const StyledPaper = withStyles({
        root: {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            width:'50vw',
            padding: '10px',
            display: 'flex',
            justifyContent: 'center'
        },
    })(Paper);

    return (
        <div className={classes.root}>
            <div style={{height: '40px'}}/>
            <StyledPaper>
                <Typography variant="h2" component="h2">
                    SunTracker
                </Typography>
            </StyledPaper>
            <div className={classes.stepContentContainer}>
                {currentStep()}
            </div>
            <Stepper
                location={location}
                activeStep={activeStep} 
                setActiveStep={setActiveStep} 
                isDisabled={isDisabled}
                sunTimes={sunTimes}
                setChosenOption={setChosenOption}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                setHasError={setHasError}
                resetFields={resetFields}
            />
            <div style={{height: '40px'}}/>
        </div>        
    );
}

export default SunsetFlow;