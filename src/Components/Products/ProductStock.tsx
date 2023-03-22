import { Box, Typography, Divider, Grid, Switch } from "@mui/material";
import { UseFormRegister } from "react-hook-form";

//Styles
import styles from "Styles/Common/Create.styles";

//Types Import
import { Inputs } from "Types/Input.types";

//Types
interface Props {
    register: UseFormRegister<Inputs>
}

const ProductStock = ({ register }: Props) => {
    return (
        <Box sx={styles.Container}>
            <Typography variant="h6" component="h6" sx={styles.SubTitle}>
                Product Settings
            </Typography>
            <Divider />
            <Box sx={{ p: "15px 20px" }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item {...{ md: 8 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Visibility
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 4 }}>
                        <Box sx={{ mb: "-4px" }}>
                            <Switch
                                defaultChecked
                                {...register("visibility")}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};
export default ProductStock;