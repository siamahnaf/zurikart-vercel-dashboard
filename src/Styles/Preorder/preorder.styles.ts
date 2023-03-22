import { Theme } from "@mui/material/styles";

const styles = {
    Container: {
        border: (theme: Theme) => `1px solid ${theme.palette.primary.borderColor}`,
        mt: "30px",
        borderRadius: "5px"
    },
    SubTitle: {
        fontSize: "1rem",
        fontWeight: 500,
    },
    Details: {
        fontWeight: 500,
        span: {
            opacity: 0.6,
            mr: "5px"
        }
    },
    DeleteButton: {
        bgcolor: "primary.main",
        color: "background.default",
        fontSize: "20px",
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    Nothing: {
        p: "10px 15px",
        textAlign: "center",
        svg: {
            color: "text.primary",
            fontSize: "70px",
            opacity: 0.5
        },
        h4: {
            fontSize: "20px"
        }
    }
};
export default styles;