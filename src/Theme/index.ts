import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface PaletteColor {
        borderColor: string;
        lighter: string;
        MuiGradientCart: string;
        MuiGradientWish: string;
        MuiGradientOrder: string;
        support: string;
        whiterHover: string;
        stepBorder: string;
        success: string;
        alertSuccess: string;
    }
    interface PaletteColorOptions {
        main: string;
        borderColor: string;
        lighter: string;
        MuiGradientCart: string;
        MuiGradientWish: string;
        MuiGradientOrder: string;
        support: string;
        whiterHover: string;
        stepBorder: string;
        success: string;
        alertSuccess: string;
    }
    interface BreakpointOverrides {
        xs: true;
        ds: true;
        xxs: true;
        sm: true;
        msm: true;
        lsm: true;
        smd: true;
        md: true;
        lg: true;
        xl: true;
        xxl: true;
        xxxl: true
    }
}

const theme = createTheme({
    typography: {
        fontFamily: '"Open Sans", sans-serif'
    },
    palette: {
        mode: "light",
        text: {
            primary: "#1B1B28", // Default Text Color
        },
        background: {
            default: "#ffffff"
        },
        primary: {
            main: "#eb5525", // Main Document Color
            borderColor: "#e2e5ec", // Border Color
            lighter: "#FCE6DF", // Primary main lighter
            support: "#8f97ab", //Support Gray Color
            stepBorder: "#cbd5e0", //Stepper border color
            whiterHover: "#dae0e5", // Whiter Hover color
            success: "#0abb75", //Success color
            alertSuccess: "#2E7D32", //Alert success color
            MuiGradientCart: "linear-gradient(315deg,#eb4786 0%,#b854a6 74%)",
            MuiGradientWish: "linear-gradient(315deg,#875fc0 0%,#5346ba 74%)",
            MuiGradientOrder: "linear-gradient(315deg,#47c5f4 0%,#6791d9 74%)"
        }
    },
    breakpoints: {
        values: {
            xxs: 0, // Double Extra Small Devices
            ds: 360, //Custom Dialog width
            xs: 360, // Extra Small Devices ---- Default BreakPoints
            sm: 480, // Small Devices ---- Default BreakPoints
            msm: 576, // Medium Small Medium Devices
            lsm: 640, // Large Small Medium Devices
            smd: 768, // Small Medium Devices
            md: 992, // Medium Devices ---- Default BreakPoints
            lg: 1200, // Large Devices  ---- Default BreakPoints
            xl: 1536, // Extra Large Devices ---- Default BreakPoints
            xxl: 1920, // Double Extra Large Devices
            xxxl: 2560 // Triple Extra Devices
        }
    },
    components: {
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    fontFamily: "Open Sans"
                }
            },
            defaultProps: {
                disableRipple: true
            }
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    paddingLeft: '3%',
                    paddingRight: '3%'
                }
            }
        }
    }
});

export default theme;