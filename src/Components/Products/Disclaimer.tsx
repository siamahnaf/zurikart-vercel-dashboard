import { useState, ChangeEvent } from "react";
import { Box, Typography, Divider, Grid, InputBase, Switch } from "@mui/material";
import { UseFormRegister } from "react-hook-form";

//Styles
import styles from "Styles/Common/Create.styles";

//Import types
import { Inputs } from "Types/Input.types";

//Types
interface Props {
    register: UseFormRegister<Inputs>
}

const Disclaimer = ({ register }: Props) => {
    const [checked, setChecked] = useState<boolean>(false);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
    return (
        <Box sx={styles.Container}>
            <Typography variant="h6" component="h6" sx={styles.SubTitle}>
                Disclaimer
            </Typography>
            <Divider />
            <Box sx={{ p: "15px 20px" }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item {...{ md: 8 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Use Your Own
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 4 }}>
                        <Box sx={{ mb: "-4px" }}>
                            <Switch onChange={handleChange} />
                        </Box>
                    </Grid>
                </Grid>
                <Typography variant="body2" component="p" sx={styles.Disclaimer}>
                    <Typography variant="body2" component="span">
                        Default Disclaimer:
                    </Typography> The actual color of the physical product may slightly vary due to the deviation of lighting sources, photography or your device display settings. Delivery charges may vary as per the location, Product Size and Weight; we will notify before proceeding the delivery.
                </Typography>
                <Box>
                    {checked &&
                        <>
                            <Typography variant="body1" component="p" sx={{ ...styles.Label, mb: "15px" }}>
                                Write your own
                            </Typography>
                            <InputBase
                                fullWidth
                                placeholder="Write your own"
                                multiline
                                rows={7}
                                sx={styles.InputBase}
                                {...register("disclaimer")}
                            />
                        </>
                    }
                </Box>
            </Box>
        </Box>
    );
};
export default Disclaimer;