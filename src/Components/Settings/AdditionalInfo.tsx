import { Box, Typography, Divider, InputBase, Grid } from "@mui/material";
import { UseFormRegister } from "react-hook-form";

//Styles
import styles from "Styles/Common/Create.styles";

//Types import
import { Inputs } from "Types/SiteInput.types";

//Types
interface Props {
    register: UseFormRegister<Inputs>
}

const AdditionalInfo = ({ register }: Props) => {
    return (
        <Box sx={styles.Container}>
            <Typography variant="h6" component="h6" sx={styles.SubTitle}>
                Additional Information
            </Typography>
            <Divider />
            <Box sx={{ p: "15px 20px" }}>
                <Grid container spacing={2}>
                    <Grid item {...{ md: 3 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Email
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="Email"
                                sx={styles.InputBase}
                                {...register("email")}
                            />
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 3 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Phone
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="+880"
                                sx={styles.InputBase}
                                {...register("phone")}
                            />
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 3 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Corporate Office
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="Address"
                                multiline
                                rows={3}
                                sx={styles.InputBase}
                                {...register("corporateAddress")}
                            />
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 3 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Head Office
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="Address"
                                multiline
                                rows={3}
                                sx={styles.InputBase}
                                {...register("headAddress")}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default AdditionalInfo;