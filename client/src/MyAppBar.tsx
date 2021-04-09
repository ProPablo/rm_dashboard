import * as React from 'react';
import { AppBar } from 'react-admin';
import { Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        //backgroundImage: 'url(https://www.redlandmuseum.org.au/wp-content/uploads/2012/10/redland-museum-logo-wide.png) , linear-gradient(90deg, rgba(249,2,2,1) 0%, rgba(121,9,1,1) 0%, rgba(229,208,173,1) 84%)',
        //backgroundImage: 'url(https://www.redlandmuseum.org.au/wp-content/uploads/2012/10/redland-museum-logo-wide.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto 100px',
        //backgroundSize: 'auto',
        backgroundPosition: 'right',
        color: 'Black',
        textAlign: 'left',
        fontFamily: 'Lexend, sans-serif',
    },
    appBarTitle: {
        flex: 1,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        backgroundImage: 'url(https://www.redlandmuseum.org.au/wp-content/uploads/2012/10/redland-museum-logo-wide.png) , linear-gradient(90deg, rgba(249,2,2,1) 0%, rgba(121,9,1,1) 0%, rgba(229,208,173,1) 84%)',
        //backgroundImage: 'url(https://www.redlandmuseum.org.au/wp-content/uploads/2012/10/redland-museum-logo-wide.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto 50px',
        //backgroundSize: 'auto',
        backgroundPosition: '75% 75%',
        color: 'Black',
        textAlign: 'left',
        fontFamily: '',
        WebkitTextFillColor: 'White',
        WebkitTextStrokeWidth: '1.25px',
        WebkitTextStrokeColor: '#f4bd42'
    },
    tabTitle: {
        backgroundColor: '#92202b',
        //backgroundImage: 'radial-gradient(circle, rgba(122,6,0,1) 0%, rgba(243,225,199,1) 11%, rgba(243,225,199,1) 100%, rgba(122,6,0,1) 100%);',
        backgroundPosition: 'right',
        color: 'White',
        paddingTop: '10px',
        paddingBottom: '10px',
        flex: 1,
        fontFamily: 'Lexend, sans-serif',

    },

    spacer: {
        flexGrow: 1,
    },
});

const MyAppBar = (props: any) => {
    const classes = useStyles();
    return (
        <div>
            <span className={classes.spacer} />
            <AppBar {...props} className={classes.appBarTitle}>
                <Typography
                    variant="h5"
                    color="inherit"

                    className={classes.title}
                >
                    Display Information and Guidance System Management Portal

                </Typography>
            </AppBar>
            <Typography
                variant="h5"
                color="inherit"

                className={classes.tabTitle}
                id="react-admin-title"
            />

        </div>

    );
};

export default MyAppBar;