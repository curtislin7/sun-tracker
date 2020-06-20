import React from 'react';
import LocationDropdown from '../Components/LocationDropdown.jsx';
import LocationInfo from '../Components/LocationInfo.jsx'
import Stepper from '../Components/Stepper.jsx'
import { makeStyles } from '@material-ui/core/styles';
import SunsetFlowStyles from './SunsetFlowStyles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(SunsetFlowStyles);

const SunsetFlow = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [latLong, setLatLong] = React.useState(undefined);
    const [location, setLocation] = React.useState(null);
    const [isDisabled, setIsDisabled] = React.useState(true);
    const classes = useStyles();
    React.useEffect(() => {
        if(!location) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [location]);
    // only allow next step if they've chosen someplace

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
                    />
                </div>
            )
        } else if (activeStep === 2) {
            return (
                <div>
                    this also hasn't been implemented yet :(
                </div>
            );
        }
    }

    return (
        <div className={classes.root}>
            <div styles={{height: '20px'}}/>
            <Typography variant="h2" component="h2" gutterBottom>
                Sunset-llio
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