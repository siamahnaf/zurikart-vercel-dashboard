import type { NextPage, GetServerSideProps } from "next";
import { ChangeEvent, useEffect } from "react";
import { Container, Box, Typography, InputBase, ButtonBase, CircularProgress } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import Cookies from "js-cookie";

//Styles
import styles from "Styles/Common/Login.styles";

//Seo
import Seo from "Utilis/Seo";

//Redux
import { wrapper } from "Redux/Store";
import { useAppDispatch, useAppSelector } from "Redux/Hook";
import { checkToken, resetAction } from "Redux/Action/Authentication/auth.action";

//Types
type Inputs = {
    phone: string
}

const Reset: NextPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Inputs>();
    //Dispatch
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<Inputs> = (data, e) => {
        dispatch(resetAction(data))
    };
    const router = useRouter();
    const { success, loading, message, phone } = useAppSelector(state => state.reset);
    useEffect(() => {
        if (success) {
            Cookies.set("phone", phone, { expires: (1 / 1440) * 5, path: "/" });
            router.push("/password/reset/password");
            reset();
        }
    }, [success, phone, reset, router])
    return (
        <Container maxWidth="xxxl" disableGutters sx={{ py: "10em" }}>
            <Seo title="Password reset | Nekmart Changing experience!" />
            <Box sx={styles.Container}>
                <Box sx={styles.FormContent}>
                    <Typography variant="h5" component="h5" sx={{ ...styles.Title, textAlign: "left", mb: "0px" }}>
                        Forgot Password?
                    </Typography>
                    <Typography variant="body2" component="p" sx={styles.Subtitle2}>
                        Enter your phone number to recover your password.
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                placeholder="Phone number"
                                fullWidth
                                {...register("phone", { required: true })}
                                onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '')
                                }}
                                sx={styles.InputBase}
                            />
                            {errors.phone &&
                                <Box sx={styles.ErrorIcon}>
                                    <Icon icon="clarity:error-line" />
                                </Box>
                            }
                        </Box>
                        <Box>
                            <ButtonBase type="submit" sx={styles.SubmitButton} disabled={loading ? true : false}>
                                Send Password Reset Code
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
                        <Box sx={styles.BackToLogin}>
                            <Link href="/login-to-dashboard">
                                <a>Back to Login</a>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};
export default Reset;

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
            if (context.req.cookies['phone']) {
                return {
                    redirect: {
                        destination: "/password/reset/password",
                        permanent: false
                    }
                }
            }
            return { props: {} };
        }
)