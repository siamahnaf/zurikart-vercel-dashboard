import { Theme } from "@mui/material/styles";

const styles = {
    Title: {
        fontSize: "1rem",
        fontWeight: 500,
        mb: "30px"
    },
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
    Label: {
        fontSize: "14px"
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
    Select: {
        "&.MuiOutlinedInput-root": {
            fontSize: "14px",
            py: "3px",
            "& fieldset": {
                borderColor: (theme: Theme) => theme.palette.primary.borderColor
            },
            "&:hover fieldset": {
                borderColor: (theme: Theme) => theme.palette.primary.borderColor
            },
            "&.Mui-focused fieldset": {
                border: (theme: Theme) => `1px solid ${theme.palette.primary.main}`,
            },
            "&.Mui-error fieldset": {
                borderColor: (theme: Theme) => theme.palette.primary.main
            }
        }
    },
    Error: {
        position: "absolute",
        top: "50%",
        right: 10,
        transform: "translateY(-50%)",
        svg: {
            fontSize: 20,
            display: "block",
            color: "primary.main"
        }
    },
    SelectError: {
        position: "absolute",
        top: "50%",
        right: 48,
        transform: "translateY(-50%)",
        svg: {
            fontSize: 20,
            display: "block",
            color: "primary.main"
        }
    },
    Adornment: {
        borderLeft: (theme: Theme) => `1px solid ${theme.palette.primary.borderColor}`,
        pl: "10px",
        mr: "5px",
        userSelect: "none"
    },
    FileContainer: {
        border: (theme: Theme) => `1px solid ${theme.palette.primary.borderColor}`,
        width: "100%",
        justifyContent: "left",
        borderRadius: "5px"
    },
    Browse: {
        bgcolor: "primary.whiterHover",
        p: "8px 10px",
        borderRadius: "5px 0 0 5px",
        fontSize: "15px",
        opacity: 0.8
    },
    DropHere: {
        fontSize: "14px",
        ml: "10px",
        "&.dropping": {
            color: "primary.main"
        }
    },
    ImageContainer: {
        border: (theme: Theme) => `1px solid ${theme.palette.primary.borderColor}`,
        borderRadius: "5px",
        position: "relative",
        mt: "10px",
        width: "18%",
        img: {
            objectFit: "cover",
            objectPostion: "top",
            borderRadius: "5px 5px 0 0"
        }
    },
    DeleteIcon: {
        position: "absolute",
        top: -8,
        right: -6,
        bgcolor: "primary.whiterHover",
        zIndex: 5,
        width: 27,
        height: 27,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "centert",
        svg: {
            fontSize: "16px",
            color: "primary.main"
        }
    },
    ImageTitle: {
        display: "flex",
        mt: "3px",
        span: {
            fontWeight: 500,
            fontSize: "13px",
            "&:first-child": {
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
            }
        }
    },
    AddCount: {
        bgcolor: "text.primary",
        color: "background.default",
        fontSize: "14px",
        py: "12px",
        px: "25px",
        borderRadius: "5px",
        pointerEvents: "none",
        opacity: 0.6,
        "&.active": {
            opacity: 1,
            pointerEvents: "auto"
        }
    },
    Remove: {
        color: "primary.main",
        fontSize: "14px",
        mt: "30px",
        pointerEvents: "none",
        opacity: 0.6,
        "&.active": {
            opacity: 1,
            pointerEvents: "auto"
        }
    },
    FileSize: {
        fontSize: "10px",
        opacity: 0.6
    },
    UpdateButton: {
        bgcolor: "primary.main",
        color: "background.default",
        fontSize: "14px",
        fontWeight: 600,
        p: "12px 20px",
        borderRadius: "5px",
        mt: "2em"
    },
    AttributeButton: {
        bgcolor: "primary.main",
        color: "background.default",
        fontSize: "14px",
        fontWeight: 600,
        p: "12px 20px",
        borderRadius: "5px",
        mt: "2em",
        "&.disable": {
            opacity: 0.6,
            pointerEvents: "none"
        }
    },
    VariantName: {
        mt: "4px",
        textTransform: "capitalize",
        fontSize: "14px"
    },
    Editor: {
        height: "300px",
        "& .ql-toolbar.ql-snow": {
            borderColor: (theme: Theme) => theme.palette.primary.borderColor,
            borderRadius: "5px 5px 0 0"
        },
        "& .ql-container.ql-snow": {
            borderColor: (theme: Theme) => theme.palette.primary.borderColor,
            borderRadius: "0 0 5px 5px"
        }
    },
    Disclaimer: {
        my: "20px",
        fontSize: "13px",
        span: {
            color: "primary.main",
            fontWeight: 700,
            fontSize: "13px",
        }
    },
    PreviewImage: {
        mt: "15px",
        border: (theme: Theme) => `1px solid ${theme.palette.primary.borderColor}`,
        width: "max-content",
        borderRadius: "4px",
        span: {
            display: "block !important"
        },
        img: {
            objectFit: "cover",
            objectPosition: "top"
        }
    },
    SelectOverflow: {
        position: "absolute",
        width: "60%",
        bgcolor: "background.default",
        fontSize: "14px",
        left: "14px",
        top: "50%",
        transform: "translateY(-50%)",
        pointerEvents: "none"
    },
    SiteTags: {
        "& .rti--container": {
            border: (theme: Theme) => `1px solid ${theme.palette.primary.borderColor}`,
            cursor: "text",
            py: "10px",
            "&:focus-visible, &:focus-within": {
                border: (theme: Theme) => `1px solid ${theme.palette.primary.main}`,
                outline: "none",
                boxShadow: "none"
            },
            input: {
                fontSize: "14px",
                borderRadius: "5px",
                "&::placeholder": {
                    color: "#5e5e5e"
                },
                "&::-ms-input-placeholder": {
                    color: "#5e5e5e"
                },
            }
        }
    },
    TagInput: {
        "& .react-tagsinput": {
            borderRadius: "4px",
            cursor: "text",
            input: {
                color: "#444242",
                fontSize: "14px",
                py: "6px"
            },
            "&.react-tagsinput--focused": {
                borderColor: (theme: Theme) => theme.palette.primary.main
            },
            "& .react-tagsinput-tag": {
                border: (theme: Theme) => `1px solid ${theme.palette.primary.main}`,
                bgcolor: "primary.lighter",
                color: "text.primary",
                borderRadius: "4px"
            }
        }
    },
    BankUpdateButton: {
        border: (theme: Theme) => `1px solid ${theme.palette.primary.main}`,
        color: "primary.main",
        fontSize: "14px",
        fontWeight: 600,
        p: "7px 20px",
        borderRadius: "5px",
        mt: "2em"
    }
};

export default styles;