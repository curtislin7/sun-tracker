import moment from 'moment';

const validate = (phoneNumber, setHasError) => {
    console.log(phoneNumber.length)
    console.log(phoneNumber)
    if (phoneNumber.length !== 10 ||
        /\D/.test(phoneNumber)) {
        setHasError(true);
        alert('You entered an invalid number. Your phone number should have 10 numerical digits and no other characters.')
        return false;
    } else {
        return true;
    }
}

// TODO: consolidate these two functions
export const setSunsetReminder = (props) => {

    const {
        location, 
        sunTimes: {
            sunset
        },
        setChosenOption,
        phoneNumber,
        setActiveStep,
        setHasError,
    } = props;

    if (validate(phoneNumber, setHasError)) {

        setChosenOption('sunset');

        const sunsetReminder = moment.utc(sunset).subtract(1, 'hours').format();
        const actualTime = moment.utc(sunset);
        const localTime = moment.utc(sunset).local().format('hh:mm:ss A');
        const data = {
            phoneNumber: phoneNumber,
            reminderTime: sunsetReminder,
            reminderType: 'sunset',
            sunInfo: {
                actualTime: actualTime,
                localTime: localTime,
                location: location,
            },
        };

        fetch('/reminders/create', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            setActiveStep(2);
        });

    };

};

export const setSunriseReminder = (props) => {

    const {
        location, 
        sunTimes: {
            sunrise
        },
        setChosenOption,
        phoneNumber,
        setActiveStep,
        setHasError,
    } = props;

    if (validate(phoneNumber, setHasError)) {
        setChosenOption('sunrise');

        const sunriseReminder = moment.utc(sunrise).subtract(1, 'hours').format();
        const actualTime = moment.utc(sunrise);
        const localTime = moment.utc(sunrise).local().format('h:mm:ss A');

        const data = {
            phoneNumber: phoneNumber,
            reminderTime: sunriseReminder,
            reminderType: 'sunrise',
            sunInfo: {
                actualTime: actualTime,
                localTime: localTime,
                location: location.description
            },
        };

        fetch('/reminders/create', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            setActiveStep(2);
        });
    };

};


