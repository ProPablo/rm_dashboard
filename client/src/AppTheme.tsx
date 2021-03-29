import { defaultTheme } from 'react-admin';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import { SymbolDisplayPartKind } from 'typescript';
import { createMuiTheme } from '@material-ui/core/styles';



export const redlandTheme: any = ({
    ...defaultTheme,
    palette: {
        primary: {main: '#A20C02'},
        secondary: {main: '#790901'},

    },
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Arial', 'sans-serif'].join(','),
    },
    overrides: {
        MuiButton: { // override the styles of all instances of this component
            root: { // Name of the rule
                color: 'white', // Some CSS
            },
        },
        RaSidebar: {
            drawerPaper: {
              backgroundColor: '#D9B981dd',
              color: '#790901dd',
              height: "100%",
              boxShadow:
                "2px 0px 1px -1px rgba(0,0,0,0.2), 1px 0px 3px 0px rgba(0,0,0,0.1)",
            },
        },
        RaMenuItemLink: {
            active: {
                borderRight: '5px solid #790901',
            },
        },
        RaList: {
            content: {
                backgroundColor: '#D9B981dd',
                color: '#D9B981dd',
            }
            
        },
    },
});