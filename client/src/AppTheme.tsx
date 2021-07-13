import { makeStyles } from '@material-ui/core/styles';
import { defaultTheme } from 'react-admin';

export const useAppBarStyles = makeStyles({
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
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'min(auto 50vh)',
        backgroundPosition: '75% 75%',
        color: 'Black',
        textAlign: 'left',
        fontFamily: '',
        WebkitTextFillColor: 'White',
        WebkitTextStrokeWidth: '1.25px',
        WebkitTextStrokeColor: '#f4bd42'
    },
    tabTitle: {
        backgroundColor: '#92202b',backgroundPosition: 'right',
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

export const useListStyles = makeStyles({
    content: {
        backgroundColor: '#F2F3F8',
    },
    thumbnail: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    headerCell: {
        root: {
            backgroundColor: '#F2F3F8'
        },
        backgroundColor: '#F2F3F8',
    },
    thumbnailImage: {
        height: '6vh',
        width: '6vh'
    },
    editImage: {
        width: '30vh'
    },
    mediaImage: {
        width: '40vh'
    },
    button: {
        backgroundColor: '#A20C02',
        color: '#FFFFFF',
        '&:hover': {
            background: '#710801'
        },
        marginBottom: "20px"
    },
    zoneButton: {
        backgroundColor: '#A20C02',
        color: '#FFFFFF',
        '&:hover': {
            background: '#710801'
        },
        marginTop: "20px"
    },
    tableHeadName: {
        paddingRight: "2vw"
    },
    tableHeadMedia: {
        paddingRight: "2vw"
    }
});

export const redlandTheme: any = ({
    ...defaultTheme,
    palette: {
        primary: { main: '#A20C02' },
        secondary: { main: '#fdf3bf' },
        error: { main: '#790901' }
    },
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Arial', 'sans-serif'].join(','),
    },
    overrides: {
        RaSidebar: { // override the styles of all instances of this component
            drawerPaper: { // Name of the rule
                backgroundColor: '#e5d0addd', // Some CSS
                height: "100%",
                boxShadow:
                    "2px 0px 1px -1px rgba(0,0,0,0.2), 1px 0px 3px 0px rgba(0,0,0,0.1)",
            },
        },
        // Sidemenu 
        RaMenuItemLink: {
            active: {
                borderRight: '5px solid #790901',
                color: "#790901"
            },
            root: {
                color: "Black"
            }
        },
        RaMenu: {
            root: {
                color: "#790901"
            }
        },

        // Main screen
        RaList: {
            content: {
                backgroundColor: '#F2F3F8',
            },
            headerCell: {
                backgroundColor: '#F2F3F8'
            }
        },
        RaDatagrid: {
            headerCell: {
                backgroundColor: '#F2F3F8'
            }
        },
        RaLayout: {
            content: {
                height: "auto",
                backgroundColor: '#F3E1C7',
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "100px 100px 100px 100px",
                textAlign: 'center',

            },
        },
        MuiPaper: {
            root: {
                backgroundColor: '#F2F3F8',
                textAlign: 'center',

            }
        },
        RaToolbar: {
            toolbar: {
                backgroundColor: '#F2F3F8',
            }
        },

        MuiListItemIcon: {
            root: {
                color: '#790901'
            }
        },

        MuiFormGroup: {
            root: {
                alignItems: "center",
                flexDirection: "column",
            }
        },

        MuiFormLabel: {
            root: {
                marginLeft: "auto",
                marginRight: "auto",
                color: "grey",
                fontWeight: "450",
                position: "relative"
            }
        },

        RaLabeled: {
            label: {
                position: "relative",
                marginLeft: "auto",
                marginTop: "3vh",
                fontSize: "x-large",
                paddingLeft: "5vh"

            }
        },

        RaButton: {
            label: {
                paddingLeft: 0
            }
        },

        MuiButton: {
            backgroundColor: "Black"
        },

        
        RaTabbedForm: {
            root: {
                alignItems: "center",
                justifyContent: "center",
            }
        },

        RaImageInput: {
            removeButton: {
                opacity: "100%",
                paddingLeft: "2%"
            }
        },

        MuiIconButton: {
            root: {
                padding: "5px"
            }
        }

    },
});
