import { Theme } from "@mui/material/styles";

const styles = {
    Container: {
        border: (theme: Theme) => `1px solid ${theme.palette.primary.borderColor}`,
        mt: "30px",
        borderRadius: "5px"
    },
    Title: {
        fontSize: "1rem",
        fontWeight: 500,
        py: "15px",
        px: "20px"
    },
    Number: {
        bgcolor: "primary.main",
        width: "max-content",
        m: "0 auto",
        color: "background.default",
        fontSize: "2.5rem",
        fontWeight: 700,
        py: "15px",
        px: "18px",
        borderRadius: "4px"
    },
    Subtitle: {
        textAlign: "center",
        fontSize: "1rem",
        fontWeight: 600,
        mt: "23px"
    }
};
export default styles;