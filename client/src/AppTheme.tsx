import { makeStyles } from '@material-ui/core/styles';
import { defaultTheme } from 'react-admin';

export const useListStyles = makeStyles({
    content: {
        backgroundColor: '#F2F3F8',
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
        height: '30vh',
        width: '30vh'
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
                paddingLeft: "7vh"

            }
        },

        RaButton: {
            label: {
                paddingLeft: 0
            }
        },
        
        RaTabbedForm: {
            root: {
                alignItems: "center",
                justifyContent: "center",
            }
        }
    },
});
