import { forwardRef, ReactElement, Ref } from "react";
import { Dialog, Box, Typography, Grid, ButtonBase, Grow } from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';
import { Icon } from "@iconify/react";

//Styles
import styles from "Styles/Common/Confirm.styles";

//Interface
interface Props {
    open: boolean;
    handleClose: (id?: number) => void;
    id: number
}
//Transition Component
const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
) {
    return <Grow ref={ref} {...props} />;
});


const Confirm = ({ open, handleClose, id }: Props) => {
    return (
        <Dialog
            open={open}
            onClose={() => handleClose()}
            maxWidth="ds"
            fullWidth
            TransitionComponent={Transition}
        >
            <Box sx={styles.Container}>
                <Icon icon="mi:delete" />
                <Typography variant="h6" component="h6">
                    Delete
                </Typography>
                <Typography variant="body2" component="p" sx={{ mb: "3em" }}>
                    Are you sure, you want to delete?
                </Typography>
                <Grid container spacing={2}>
                    <Grid item {...{ md: 6 }}>
                        <ButtonBase onClick={() => handleClose()} sx={styles.CancelButton}>
                            Cancel
                        </ButtonBase>
                    </Grid>
                    <Grid item {...{ md: 6 }}>
                        <ButtonBase onClick={() => handleClose(id)} sx={styles.DeleteButton}>
                            Delete
                        </ButtonBase>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    );
};
export default Confirm;