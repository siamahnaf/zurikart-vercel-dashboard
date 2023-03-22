const styles = {
    Container: {
        position: "relative",
        "&:hover": {
            button: {
                visibility: "visible",
                opacity: 1,
            }
        },
        cursor: "pointer",
        span: {
            display: "block !important"
        }
    },
    DeleteButton: {
        position: "absolute",
        top: 5,
        right: 5,
        bgcolor: "primary.main",
        p: "5px",
        borderRadius: "4px",
        color: "background.default",
        visibility: "hidden",
        opacity: 0,
        transition: "0.3s ease",
        svg: {
            fontSize: "18px"
        }
    }
};

export default styles;