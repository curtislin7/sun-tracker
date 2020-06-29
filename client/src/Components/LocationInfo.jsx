import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    text: {
        width: '40vw',
        // TODO: Read and understand viewport
        marginBottom: '5vh'
    },
    inputRow: {
        display: 'flex',
        justifyContent: 'center'
    },
    input: {
        width: '33vw'
    },
    button: {
      marginRight: theme.spacing(1),
    },
}));

const LocationInfo = (props) => {

    const {
        location,
        sunTimes:{
            sunset,
            sunrise
        }, 
        setIsDisabled,
        phoneNumber,
        setPhoneNumber,
        hasError,
        setHasError,
    } = props;

    React.useEffect(() => {
        if (!phoneNumber) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
        setHasError(false);
    }, [phoneNumber])

    const classes = useStyles();

    const handleChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    return(
        <div className={classes.root}>
            <div className={classes.text}>
                <Typography variant="h6" gutterBottom >
                    {`On ${moment.utc(sunrise).local().format('MMM Do, YYYY')}, the sun in ${location.description} 
                    is going to rise at ${moment.utc(sunrise).local().format('h:mm:ss A')}, and set at ${moment.utc(sunset).local().format('h:mm:ss A')}.
                    Enter your phone number and press an option below to set a text reminder!`}
                </Typography>
            </div>
           
            <div className={classes.inputRow}>
                <TextField
                    error={hasError}
                    variant="filled"
                    className={classes.input}
                    label='PhoneNumber'
                    value={phoneNumber} 
                    onChange={handleChange}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            alert("If you've typed in your number, click one of the buttons.")
                            e.preventDefault();
                        };
                    }}
                />
            </div>
        </div>
    );
}

export default LocationInfo;