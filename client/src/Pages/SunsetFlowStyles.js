const SunsetFlowStyles = (theme) => ({
    root: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column',
        // backgroundColor: '#ffffff',
    },
    stepContentContainer: {
        height: '30vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepContent: {
        paddingBottom: '20px'
    },
    links: {
        '& > *': {
          margin: theme.spacing(0.4),
        },
        paddingTop:'0',
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'center',
    },

});

export default SunsetFlowStyles;