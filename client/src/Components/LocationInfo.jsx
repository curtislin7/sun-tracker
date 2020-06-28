import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    text: {
        maxWidth: '50vh',
        // TODO: Refactor styling
        marginBottom: '20px'
    },
    inputRow: {
        display: 'flex',
        justifyContent: 'center'
    },
    input: {
        width: '200px'
    },
    button: {
      marginRight: theme.spacing(1),
    },
}));


const LocationInfo = (props) => {

    const {
        location,
        latLong:{
            lat,
            long
        }, 
        sunTimes:{
            sunset,
            sunrise
        }, 
        isDisabled,
        setIsDisabled,
        phoneNumber,
        setPhoneNumber
    } = props

    const classes = useStyles();
    React.useEffect(() => {
        if(!phoneNumber) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [phoneNumber])

    const handleChange = (event) => {
        setPhoneNumber(event.target.value);
    };
    
    // const StyledPhoneInput = withStyles({
    //     root: {
    //         color: '#000000'
    //     }
    // })(TextField)

    return(
        <div className={classes.root}>
            {/* <Typography variant="h6" gutterBottom>
                {
                `You chose ${location.description}`
                }
            </Typography> */}
            {/* <Typography variant="h6" gutterBottom>
                {`Boulder is located at ${lat}, ${long}`}
            </Typography> */}
            <div className={classes.text}>
                <Typography variant="h6" gutterBottom >
                    {
                    `On ${moment.utc(sunrise).local().format('MMM Do, YYYY')}, the sun in ${location.description} 
                    is going to rise at ${moment.utc(sunrise).local().format('h:mm:ss A')}, and set at ${moment.utc(sunset).local().format('h:mm:ss A')}.`}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    {'Enter your phone number and press an option below for a text reminder!'}
                </Typography>
            </div>
           
            <div className={classes.inputRow}>
                <TextField
                    // error
                    variant="filled"
                    // className={classes.input}
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