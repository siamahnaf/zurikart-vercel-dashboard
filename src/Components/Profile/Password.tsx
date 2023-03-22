import { useState, useEffect } from "react";
import { Box, Typography, Divider, InputBase, Grid, ButtonBase, Snackbar, Alert, CircularProgress } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { Icon } from "@iconify/react";
import PasswordStrengthBar from "react-password-strength-bar";

//Styles
import styles from "Styles/Common/Create.styles";

//Redux
import { useAppDispatch, useAppSelector } from "Redux/Hook";
import { updatePassword } from "Redux/Action/Profile/profile.action";

//Types
interface Inputs {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const Password = () => {
    //Selector
    const { message, loading, success } = useAppSelector(state => state.updatePassword);
    //State
    const [score, setScore] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);
    //Handler
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setError,
        reset
    } = useForm<Inputs>();
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<Inputs> = (data, e) => {
        if (score < 2) {
            setError("newPassword", { type: 'custom', message: 'custom message' })
        } else {
            dispatch(updatePassword(data))
        }
    }
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    //Effect
    useEffect(() => {
        if (message && success !== null) {
            setOpen(true)
        }
        if (success) {
            reset()
        }
    }, [success, message, reset, setOpen])
    return (
        <Box sx={styles.Container}>
            {message &&
                <Snackbar
                    open={open}
                    message="Successfully added"
                    autoHideDuration={5000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity={success === true ? "success" : "error"} sx={{ width: "100%" }} variant="filled">
                        {message}
                    </Alert>
                </Snackbar>
            }
            <Typography variant="h6" component="h6" sx={styles.SubTitle}>
                Password
            </Typography>
            <Divider />
            <Box sx={{ p: "15px 20px" }} component="form" onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item {...{ md: 3 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Old Password
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="Old password"
                                sx={styles.InputBase}
                                {...register("oldPassword", { required: true })}
                            />
                            {errors.oldPassword &&
                                <Box sx={styles.Error}>
                                    <Icon icon="clarity:error-line" />
                                </Box>
                            }
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 3 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            New Password
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="New password"
                                sx={styles.InputBase}
                                {...register("newPassword", {
                                    required: true
                                })}
                            />
                            {errors.newPassword &&
                                <Box sx={styles.Error}>
                                    <Icon icon="clarity:error-line" />
                                </Box>
                            }
                        </Box>
                        <PasswordStrengthBar
                            password={watch("newPassword") as string}
                            scoreWordStyle={{ textTransform: "capitalize" }}
                            minLength={8}
                            onChangeScore={(value, feedback) => setScore(value)}
                        />
                    </Grid>
                    <Grid item {...{ md: 3 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Confirm Password
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="Confirm password"
                                sx={styles.InputBase}
                                {...register("confirmPassword", {
                                    validate: (value) => {
                                        return watch("newPassword") === value || "Passwords should match!";
                                    }
                                })}
                            />
                            {errors.confirmPassword &&
                                <Box sx={styles.Error}>
                                    <Icon icon="clarity:error-line" />
                                </Box>
                            }
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ textAlign: "right" }}>
                    <ButtonBase type="submit" sx={styles.UpdateButton} disabled={loading}>
                        Update Password
                        {loading &&
                            <CircularProgress size={16} sx={{ color: "background.default", ml: "10px", mb: "-2px" }} />
                        }
                    </ButtonBase>
                </Box>
            </Box>
        </Box>
    );
};
export default Password;