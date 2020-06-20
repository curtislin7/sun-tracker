import React from 'react';
import LocationDropdown from '../Components/LocationDropdown.jsx'
import { makeStyles } from '@material-ui/core/styles';
import SunsetFlowStyles from './SunsetFlowStyles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(SunsetFlowStyles);

const SunsetFlow = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h1" component="h2" gutterBottom>
            Sunset Tracker :)
            </Typography>
            <LocationDropdown/>
        </div>        
    );
}

export default SunsetFlow;