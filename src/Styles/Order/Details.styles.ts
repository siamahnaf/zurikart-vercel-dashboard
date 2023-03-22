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
        py: "15px",
        px: "20px"
    },
    Stepper: {
        width: "75%",
        m: "0 auto",
        mb: "60px",
        mt: "30px"
    },
    StepLabel: {
        "& .MuiStepLabel-label": {
            fontSize: ".6875rem",
            fontWeight: 600
        }
    },
    Buttons: {
        bgcolor: "primary.main",
        color: "background.default",
        ml: "15px",
        borderRadius: "5px",
        px: "15px",
        fontSize: "14px",
        fontWeight: 600
    },
    SummeryTitle: {
        fontSize: "1.0625rem",
        fontWeight: 600,
        mb: "15px"
    },
    Addresses: {
        flex: 1,
        "& p": {
            fontWeight: 500,
            span: {
                opacity: 0.6,
                mr: "5px"
            }
        }
    },
    TableHead: {
        borderTop: (theme: Theme) => `1px solid ${theme.palette.primary.borderColor}`,
        th: {
            fontWeight: 700
        }
    },
    ProductTitle: {
        a: {
            textDecoration: "none",
            color: "text.primary"
        }
    },
    Heading: {
        fontWeight: 700
    },
    InputBase: {
        border: (theme: Theme) => `1px solid ${theme.palette.primary.borderColor}`,
        fontSize: "14px",
        borderRadius: "5px",
        p: "6px 10px",
        "&.Mui-focused": {
            border: (theme: Theme) => `1px solid ${theme.palette.primary.main}`,
        }
    },
    SubmitButton: {
        bgcolor: "primary.main",
        color: "background.default",
        fontSize: "14px",
        py: "10px",
        px: "25px",
        borderRadius: "5px"
    },
    Error: {
        position: "absolute",
        top: "7%",
        right: 10,
        svg: {
            fontSize: 20,
            display: "block",
            color: "primary.main"
        }
    },
    ButtonGroup: {
        py: "10px",
        px: "20px",
        textAlign: "right",
        button: {
            "&:first-child": {
                bgcolor: "primary.main",
                color: "background.default",
                py: "10px",
                px: "20px",
                fontWeight: 600,
                borderRadius: "4px",
                fontSize: "13px"
            },
            "&:last-child": {
                bgcolor: "primary.light",
                ml: "15px",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                color: "background.default",
                a: {
                    textDecoration: "none",
                    color: "background.default"
                },
                svg: {
                    fontSize: "17px"
                }
            }
        }
    }
}

export default styles;