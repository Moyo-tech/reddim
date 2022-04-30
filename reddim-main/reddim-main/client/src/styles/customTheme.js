import { createMuiTheme } from '@material-ui/core/styles';

const customTheme = (darkMode) =>
    createMuiTheme({
        palette: {
            type: darkMode ? 'dark' : 'light',
            primary: {
                main: darkMode ? 'rgb(96, 130, 182)' : '#000080',
            },
            secondary: {
                main: darkMode ? 'rgb(25, 25, 112)' : 'rgb(8, 24, 168)'
            },
        },
        overrides: {
            MuiTypography: {
                root: {
                    wordBreak: 'break-word',
                },
            },
        },
    });

export default customTheme;