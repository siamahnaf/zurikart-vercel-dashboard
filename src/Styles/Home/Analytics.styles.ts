import { Theme } from "@mui/material/styles";

const styles = {
    Title: {
        fontSize: "1rem",
        fontWeight: 500,
        mb: "30px"
    },
    CardOne: {
        background: (theme: Theme) => theme.palette.primary.MuiGradientCart,
        borderRadius: "5px"
    },
    CardTwo: {
        background: (theme: Theme) => theme.palette.primary.MuiGradientWish,
        borderRadius: "5px"
    },
    CardThree: {
        background: (theme: Theme) => theme.palette.primary.MuiGradientOrder,
        borderRadius: "5px"
    },
    Content: {
        color: "background.default",
        p: "14px 16px 8px",
        h6: {
            fontSize: "1.75rem",
            fontWeight: 700
        },
        "& p": {
            fontSize: "14px",
            opacity: 0.5
        }
    },
    SvgVector: {
        display: "block",
        width: "100%"
    }
};
export default styles;