import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { setSunriseReminder, setSunsetReminder } from './Actions'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '33vw',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginBottom: theme.spacing(1),
  },
}));

const StyledStepper = withStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
})(Stepper);

const getSteps = () => {
    return ['Location', 'Phone number', 'Reminder'];
};

const getStepContent = (step) => {
    switch (step) {
        case 0:
            return '';
        case 1:
            return '';
        case 2:
            return '';
        default:
            return 'Unknown step';
    };
};


const SunsetStepper = (props) => {
    const {
        activeStep,
        setActiveStep,
        isDisabled,
    } = props;

    const classes = useStyles();
    const steps = getSteps();

    const getSunButtons = () => {
        return(
            <>
                <Button
                    className={classes.button}
                    variant="contained"
                    onClick={() => setSunriseReminder(props)}
                    disabled={isDisabled}
                >
                    Set sunrise reminder!
                </Button>
                <Button
                    className={classes.button}
                    variant="contained"
                    onClick={() => setSunsetReminder(props)}
                    disabled={isDisabled}
                >
                    Set sunset reminder!
                </Button>
            </>
        )                  
    };
    
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
        <StyledStepper activeStep={activeStep}>
            {steps.map((label, index) => {
            return (
                <Step key={label}>
                <StepLabel>{label}</StepLabel>
                </Step>
            );
            })}
        </StyledStepper>
        <div>
            {activeStep === steps.length ? (
            <div>
                <Typography className={classes.instructions} classes={{ root: ''}}>
                All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={handleReset} className={classes.button}>
                Reset
                </Button>
            </div>
            ) : (
            <div>
                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                <div className={classes.buttons}>
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                    >
                        Back
                    </Button>
                    {
                        activeStep === 1 ?
                        getSunButtons() :
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                            disabled={isDisabled}
                        >
                            {'Next'}
                        </Button>
                    }
                    
                </div>
            </div>
            )}
        </div>
        </div>
    );
}

export default SunsetStepper;