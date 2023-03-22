import type { NextPage, GetServerSideProps } from "next";
import { ChangeEvent, useEffect } from "react";
import { Container, Box, Typography, InputBase, ButtonBase, CircularProgress } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

//Styles
import styles from "Styles/Common/Login.styles";

//Seo
import Seo from "Utilis/Seo";

//Redux
import { wrapper } from "Redux/Store";
import { useAppDispatch, useAppSelector } from "Redux/Hook";
import { checkToken, passwordAction } from "Redux/Action/Authentication/auth.action";

//Types
type Inputs = {
    code: string;
    password: string;
    new_password: string;
}

const Password: NextPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm<Inputs>();
    //Use app dispatch data
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<Inputs> = (data, e) => {
        const phone = Cookies.get("phone")
        dispatch(passwordAction(data, phone as string))
    };
    //Use App selector data
    const router = useRouter();
    const { success, loading, message } = useAppSelector(state => state.password);
    useEffect(() => {
        if (success) {
            Cookies.remove("phone")
            router.push("/login-to-dashboard");
            reset();
        }
    }, [success, reset, router])
    return (
        <Container maxWidth="xxxl" disableGutters sx={{ py: "6em" }}>
            <Seo title="Login | Nekmart Changing experience!" />
            <Box sx={styles.Container}>
                <Box sx={styles.FormContent}>
                    <Typography variant="h5" component="h5" sx={{ ...styles.Title, textAlign: "left", mb: "0px" }}>
                        Reset Password
                    </Typography>
                    <Typography variant="body2" component="p" sx={styles.Subtitle2}>
                        Enter your code, new password and confirm password.
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ mb: "18px", position: "relative" }}>
                            <InputBase
                                placeholder="Code"
                                fullWidth
                                {...register("code", { required: true })}
                                onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '')
                                }}
                                sx={styles.InputBase}
                            />
                            {errors.code &&
                                <Box sx={styles.ErrorIcon}>
                                    <Icon icon="clarity:error-line" />
                                </Box>
                            }
                        </Box>
                        <Box sx={{ mb: "18px", position: "relative" }}>
                            <InputBase
                                placeholder="New Password"
                                fullWidth
                                type="password"
                                {...register("password", { required: true })}
                                sx={styles.InputBase}
                            />
                            {errors.password &&
                                <Box sx={styles.ErrorIcon}>
                                    <Icon icon="clarity:error-line" />
                                </Box>
                            }
                        </Box>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                placeholder="Confirm New Password"
                                fullWidth
                                type="password"
                                {...register("new_password", {
                                    required: true,
                                    validate: (val: string) => {
                                        if (watch('password') != val) {
                                            return "Your passwords do no match";
                                        }
                                    }
                                })}
                                sx={styles.InputBase}
                            />
                            {errors.new_password &&
                                <Box sx={styles.ErrorIcon}>
                                    <Icon icon="clarity:error-line" />
                                </Box>
                            }
                        </Box>
                        <Box>
                            <ButtonBase type="submit" sx={styles.SubmitButton} disabled={loading ? true : false}>
                                Reset Password
                                {loading &&
                                    <CircularProgress size={18} sx={{ color: "background.default", ml: "10px", mb: "-2px" }} />
                                }
                            </ButtonBase>
                            {message && !success &&
                                <Typography variant="body1" component="p" sx={styles.ApiError}>
                                    {message}
                                </Typography>
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};
export default Password;

//Server side data fetching
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async (context) => {
            const auth = await store.dispatch(checkToken(context.req.cookies['secretId'] as string));
            if (auth) {
                return {
                    redirect: {
                        destination: "/",
                        permanent: false
                    }
                }
            }
            if (!context.req.cookies['phone']) {
                return {
                    redirect: {
                        destination: "/login-to-dashboard",
                        permanent: false
                    }
                }
            }
            return { props: {} };
        }
)