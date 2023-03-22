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
    }
};
export default styles;