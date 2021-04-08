import { defaultTheme } from 'react-admin';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import { SymbolDisplayPartKind } from 'typescript';
import { createMuiTheme } from '@material-ui/core/styles';



export const redlandTheme: any = ({
    ...defaultTheme,
    palette: {
        primary: { main: '#A20C02' },
        secondary: { main: '#790901' },
        error: { main: '#790901' }
    },
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Arial', 'sans-serif'].join(','),
    },
    overrides: {
        RaSidebar: { // override the styles of all instances of this component
            drawerPaper: { // Name of the rule
                backgroundColor: '#E2CAA2dd', // Some CSS
                textColor: "#ff",
                color: '#E2CAA2dd',
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
                backgroundColor: '#f3e1c7',
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

        
    },
});