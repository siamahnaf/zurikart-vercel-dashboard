import type { NextPage } from "next";
import { useEffect } from "react";
import { Container, Box, Stack, Typography, ButtonBase, InputBase, CircularProgress } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { Icon } from "@iconify/react";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

//Logo
import Logo from "Assets/logo.png";

//Styles
import styles from "Styles/Common/Login.styles";

//Seo
import Seo from "Utilis/Seo";

//Redux
import { wrapper } from "Redux/Store";
import { useAppDispatch, useAppSelector } from "Redux/Hook";
import { login, checkToken } from "Redux/Action/Authentication/auth.action";

//Types
type Inputs = {
    phoneOrEmail: string;
    password: string;
}

const Login: NextPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Inputs>();
    //Redux Dispatch
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<Inputs> = (data, e) => {
        const ApiData = {
            phoneOrEmail: data.phoneOrEmail.match(/^[0-9]+$/) != null ? `88${data.phoneOrEmail}` : data.phoneOrEmail,
            password: data.password
        }
        dispatch(login(ApiData))
    };
    //Redux Selector
    const router = useRouter();
    const { success, loading, message, token, expire } = useAppSelector(state => state.login);
    useEffect(() => {
        if (success) {
            Cookies.set("secretId", token, { expires: 1, path: "/" });
            router.push("/");
            reset();
        }
    }, [success, token, reset, router])
    return (
        <Container maxWidth="xxxl" disableGutters sx={{ py: "7.5em" }}>
            <Seo title="Login | Nekmart Changing experience!" />
            <Box sx={styles.Container}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={styles.FormContent}>
                    <Box sx={{ textAlign: "center", mb: "20px" }}>
                        <Image src={Logo} alt="Logo" width={200} height={50.88} />
                    </Box>
                    <Typography variant="body1" component="p" sx={styles.Subtitle}>
                        Login to admin
                    </Typography>
                    <Typography variant="body1" component="p" sx={{ mb: "5px", fontSize: "15px" }}>
                        Email
                    </Typography>
                    <Box sx={{ mb: "18px", position: "relative" }}>
                        <InputBase
                            placeholder="Email Or Phone"
                            fullWidth
                            {...register("phoneOrEmail", { required: true }
                            )}
                            sx={styles.InputBase}
                        />
                        {errors.phoneOrEmail &&
                            <Box sx={styles.ErrorIcon}>
                                <Icon icon="clarity:error-line" />
                            </Box>
                        }
                    </Box>
                    <Typography variant="body1" component="p" sx={{ mb: "5px", fontSize: "15px" }}>
                        Password
                    </Typography>
                    <Box sx={{ mb: "18px", position: "relative" }}>
                        <InputBase
                            placeholder="Password"
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
                    <Stack direction="row" alignItems="center">
                        <Box sx={{ flex: 1 }} />
                        <Box sx={styles.ForgetPasswordText}>
                            <Link href="/password/reset">
                                <a>
                                    Forget password?
                                </a>
                            </Link>
                        </Box>
                    </Stack>
                    <Box>
                        <ButtonBase type="submit" sx={styles.SubmitButton} disabled={loading ? true : false}>
                            Login
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
        </Container>
    );
};
export default Login;

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
            return { props: {} };
        }
)