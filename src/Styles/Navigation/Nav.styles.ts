const styles = {
    Container: {
        my: "15px",
        px: "8px"
    },
    List: {
        li: {
            my: "3px",
            a: {
                width: "100%",
                display: "block",
                py: "10px",
                px: "10px",
                borderRadius: "4px",
                textDecoration: "none",
                color: "text.primary",
                fontSize: ".8125rem",
                fontWeight: 500,
                opacity: 0.8,
                transition: "all .3s ease",
                svg: {
                    fontSize: "16px",
                    mr: "8px",
                    mb: "-3px",
                    transition: "all .3s ease",
                },
                "&.active, &:hover": {
                    bgcolor: "primary.lighter",
                    svg: {
                        color: "primary.main"
                    }
                }
            }
        }
    },
    Logout: {
        justifyContent: "left",
        button: {
            width: "100%",
            display: "block",
            py: "10px",
            px: "10px",
            borderRadius: "4px",
            justifyContent: "left",
            textAlign: "left",
            fontSize: ".8125rem",
            fontWeight: 500,
            opacity: 0.8,
            transition: "all .3s ease",
            svg: {
                fontSize: "16px",
                mr: "8px",
                mb: "-3px",
                transition: "all .3s ease",
            },
            "&:hover": {
                bgcolor: "primary.lighter",
                svg: {
                    color: "primary.main"
                }
            }
        }
    }
};

export default styles;