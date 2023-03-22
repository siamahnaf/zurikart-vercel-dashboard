import { Theme } from "@mui/material/styles";

const styles = {
    Container: {
        width: "37%",
        m: "0 auto",
        boxShadow: "0 0 50px 0 rgb(82 63 105 / 10%)",
        border: (theme: Theme) => `1px solid ${theme.palette.primary.borderColor}`,
        borderRadius: "5px"
    },
    FormContent: {
        p: "25px"
    },
    Title: {
        fontSize: "1.5rem",
        fontWeight: 500,
        textAlign: "center",
        mb: "20px"
    },
    Subtitle: {
        fontSize: "16px",
        textAlign: "center",
        mb: "1.5em",
        fontStyle: "italic"
    },
    Subtitle2: {
        opacity: 0.6,
        mb: "20px",
        mt: "5px"
    },
    InputBase: {
        border: (theme: Theme) => `1px solid ${theme.palette.primary.borderColor}`,
        p: "4px 15px",
        fontSize: "15px",
        borderRadius: "5px",
        transition: "0.2s ease",
        "&.Mui-focused": {
            border: (theme: Theme) => `1px solid ${theme.palette.primary.main}`
        }
    },
    ChangePhoneOrEmailText: {
        fontSize: "14px",
        opacity: 0.6,
        userSelect: "none",
        cursor: "pointer",
        mt: "5px",
        textAlign: "right",
        width: "max-content",
        ml: "auto",
        "&:hover": {
            textDecoration: "underline"
        }
    },
    PhoneInput: {
        position: "relative",
        "& .phoneInput": {
            width: "100%  !important",
            height: "40.5px  !important",
            fontSize: "15px",
            border: (theme: Theme) => `1px solid ${theme.palette.primary.borderColor} !important`,
        },
        "& .flag-dropdown": {
            border: (theme: Theme) => `1px solid ${theme.palette.primary.borderColor} !important`,
        }
    },
    Agree: {
        span: {
            fontSize: "14px",
            userSelect: "none",
            svg: {
                width: "0.9em",
                height: "0.9em"
            }
        }
    },
    Remember: {
        span: {
            userSelect: "none",
            opacity: 0.6,
            fontSize: "15px"
        }
    },
    ForgetPasswordText: {
        a: {
            fontSize: "15px",
            textDecoration: "none",
            color: "text.primary",
            opacity: 0.6
        }
    },
    SubmitButton: {
        bgcolor: "primary.main",
        color: "background.default",
        py: "12px",
        width: "100%",
        fontSize: "15px",
        fontWeight: 500,
        borderRadius: "5px",
        mt: "20px"
    },
    Divider: {
        fontSize: "14px",
        span: {
            opacity: 0.6
        }
    },
    WithButton: {
        button: {
            color: "background.default",
            mx: "6px",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            svg: {
                fontSize: "19px"
            },
            "&:first-child": {
                bgcolor: "primary.facebook"
            },
            "&:last-child": {
                bgcolor: "primary.google"
            }
        }
    },
    LoginAlternate: {
        textAlign: "center",
        mt: "3em",
        "& p": {
            fontSize: "14px",
            opacity: 0.8
        },
        a: {
            fontSize: "14px",
            color: "primary.main",
            textDecoration: "none"
        }
    },
    ErrorIcon: {
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        color: "red",
        svg: {
            fontSize: "20px"
        }
    },
    BackToLogin: {
        mt: "10px",
        a: {
            textDecoration: "none",
            color: "text.primary",
            opacity: 0.6,
            fontSize: "15px",
        }
    },
    ApiError: {
        color: "primary.main",
        fontWeight: 600,
        mt: "8px",
        fontSize: "15px"
    }
}

export default styles;