const styles = {
    Title: {
        fontSize: "1rem",
        fontWeight: 500,
        mb: "30px"
    },
    AddSupport: {
        a: {
            bgcolor: "background.default",
            width: "max-content",
            display: "block",
            textAlign: "center",
            borderRadius: "5px",
            p: "30px 40px",
            m: "0 auto",
            cursor: "pointer",
            textDecoration: "none",
            "&:hover": {
                boxShadow: "0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)"
            },
            "& .icon": {
                width: 60,
                height: 60,
                borderRadius: "50%",
                bgcolor: "primary.support",
                m: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                svg: {
                    fontSize: "30px",
                    color: "background.default"
                }
            },
            h6: {
                fontSize: "1rem",
                color: "primary.main",
                fontWeight: 400,
                mt: "12px"
            }
        }
    }
};

export default styles;