import { Theme } from "@mui/material/styles";

const styles = {
    Container: {
        border: (theme: Theme) => `1px solid ${theme.palette.primary.borderColor}`,
        borderRadius: "5px"
    }
};
export default styles;