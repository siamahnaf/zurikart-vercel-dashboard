import { Theme } from "@mui/material";

const styles = {
    Container: {
        borderTop: (theme: Theme) => `1px solid ${theme.palette.primary.borderColor}`,
        px: "15px",
        py: "18px"
    },
    Content: {
        textAlign: "center",
        h5: {
            fontSize: "1.25rem",
            fontWeight: 600,
            mb: "5px"
        },
        "& p": {
            fontSize: "0.75rem"
        }
    },
    CurrencyBox: {
        bgcolor: "primary.main",
        color: "background.default",
        width: "max-content",
        m: "0 auto",
        p: "12px 16px",
        borderRadius: "5px",
        fontSize: "1.125rem",
        fontWeight: 600,
        my: "15px"
    }
};

export default styles;