import React from 'react';
import Typography from '@material-ui/core/Typography';
const LocationInfo = ({location, latLong}) => {
    const [sunTimes, setSunTimes] = React.useState({
        sunset: undefined,
        sunrise: undefined
    });

    const fetchSunInfo = () => {
        const queryString = `https://api.sunrise-sunset.org/json?lat=${latLong.lat}&lng=${latLong.long}&date=today`
        fetch(queryString)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'OK') {
                    setSunTimes({
                        sunset:data.results.sunset,
                        sunrise:data.results.sunrise
                    });
                }
            });
    };

    React.useEffect(() => {
        fetchSunInfo();
    }, [])

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
                {`The sun in ${location.description} is going to rise at ${sunTimes.sunset}`}
            </Typography>
            <Typography variant="h6" gutterBottom>
                {`The sun is in ${location.description} is going to set at ${sunTimes.sunrise}`}
            </Typography>
        </div>
    );
}

export default LocationInfo;