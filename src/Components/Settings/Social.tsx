import { Box, Typography, Divider, InputBase, Grid } from "@mui/material";
import { UseFormRegister } from "react-hook-form";

//Styles
import styles from "Styles/Common/Create.styles";

//Types import
import { Inputs } from "Types/SiteInput.types";

//Types
interface Props {
    register: UseFormRegister<Inputs>;
}

const Social = ({ register }: Props) => {
    return (
        <Box sx={styles.Container}>
            <Typography variant="h6" component="h6" sx={styles.SubTitle}>
                Social Information
            </Typography>
            <Divider />
            <Box sx={{ p: "15px 20px" }}>
                <Grid container spacing={2}>
                    <Grid item {...{ md: 3 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Facebook url
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="Facebook url"
                                sx={styles.InputBase}
                                {...register("facebookUrl")}
                            />
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 3 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Instagram url
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="Instagram url"
                                sx={styles.InputBase}
                                {...register("instagramUrl")}
                            />
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 3 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Youtube url
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="Youtube url"
                                sx={styles.InputBase}
                                {...register("youtubeUrl")}
                            />
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 3 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Twitter url
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="Twitter url"
                                sx={styles.InputBase}
                                {...register("twitterUrl")}
                            />
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 3 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            LinkedIn url
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="LinkedIn url"
                                sx={styles.InputBase}
                                {...register("linkedinUrl")}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};
export default Social;