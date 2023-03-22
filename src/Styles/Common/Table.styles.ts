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
    SearchTitle: {
        fontSize: "1rem",
        fontWeight: 500,
    },
    ProductTitle: {
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        WebkitLineClamp: "1"
    },
    InputBase: {
        border: (theme: Theme) => `1px solid ${theme.palette.primary.borderColor}`,
        fontSize: "14px",
        borderRadius: "5px",
        p: "6px 10px"
    },
    Buttons: {
        display: "flex",
        alignItems: "center",
        justifyContent: "right",
        button: {
            a: {
                textDecoration: "none",
                color: "text.primary"
            },
            mr: "20px",
            "&:first-child": {
                color: "primary.main",
                fontSize: "22px"
            },
            "&:last-child": {
                mr: "0px",
                fontSize: "20px",
                mb: "-4px",
                a: {
                    textDecoration: "none",
                    color: "text.primary"
                }
            }
        }
    },
    NothingCell: {
        border: "none",
        svg: {
            color: "text.primary",
            fontSize: "70px",
            opacity: 0.5
        },
        h4: {
            fontSize: "20px"
        }
    },
    IconButton: {
        p: "2px",
        svg: {
            fontSize: "27px",
            transition: "0.3s ease",
            "&.active": {
                transform: "rotate(180deg)"
            }
        }
    },
    StatusColor: {
        fontWeight: 600,
        "&.pending": {
            color: "#e67451",
        },
        "&.confirmed": {
            color: "#b2c248",
        },
        "&.pickedup": {
            color: "#6495ed",
        },
        "&.ontheway": {
            color: "#ffd801",
        },
        "&.delivered": {
            color: "primary.success",
        },
        "&.cancelled": {
            color: "#FF0000",
        }
    },
    RefundStatus: {
        fontWeight: 600,
        "&.pending": {
            color: "#e67451",
        },
        "&.approved": {
            color: "primary.success",
        },
        "&.cancelled": {
            color: "#FF0000",
        }
    },
    UserRole: {
        fontWeight: 600,
        "&.user": {
            color: "#e67451",
        },
        "&.admin": {
            color: "primary.success",
        },
        "&.moderator": {
            color: "#6495ed",
        },
        "&.editor": {
            color: "#ffd801",
        },
    },
    SectionStatus: {
        fontWeight: 600,
        "&.publish": {
            color: "primary.success",
        },
        "&.unpublished": {
            color: "primary.main",
        }
    }
};

export default styles;