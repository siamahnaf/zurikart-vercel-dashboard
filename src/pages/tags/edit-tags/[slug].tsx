import { useState, useEffect } from "react";
import type { NextPage, GetServerSideProps } from "next";
import { Box, Typography, Divider, InputBase, Grid, ButtonBase, Snackbar, Alert, CircularProgress } from "@mui/material";
import { Icon } from "@iconify/react";
import { useForm, SubmitHandler } from "react-hook-form";

//Layout
import Layout from "Layout";

//Styles
import styles from "Styles/Common/Create.styles";

//Redux
import { wrapper } from "Redux/Store";
import { useAppSelector, useAppDispatch } from "Redux/Hook";
import { checkToken, getProfile } from "Redux/Action/Authentication/auth.action";
import { getSingleTag, updateTag } from "Redux/Action/Tags/tag.action";

//Interface
interface Inputs {
    name: string;
    description: string;
}

//Default
const defaultData = {
    name: "Samsung",
    description: "This is description"
}

const EditTags: NextPage = () => {
    //Selector
    const { profile } = useAppSelector(state => state.profile);
    const { tags, messageErr } = useAppSelector(state => state.getSingleTags);
    const { message, loading, success } = useAppSelector(state => state.updateTag);
    //State
    const [open, setOpen] = useState<boolean>(false);
    //Handler
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Inputs>({ defaultValues: { name: tags?.name, description: tags?.description } });
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<Inputs> = (data, e) => {
        dispatch(updateTag(data, tags.id))
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
    }, [success, message, setOpen])
    return (
        <Layout title="Edit Tag | Changing Experience!" active="tag">
            {profile.role === "editor" ? (
                <Typography variant="body1" component="p" sx={{ mt: "10px", color: "primary.main", fontWeight: 600 }}>
                    You haven&apos;t access this page!
                </Typography>
            ) : (
                <Box sx={{ my: "10px" }}>
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
                    {messageErr ? (
                        <Typography variant="body1" component="p" sx={{ textAlign: "center", mt: "10px", color: "primary.main" }}>
                            {messageErr}
                        </Typography>
                    ) : (
                        <>
                            <Typography variant="h6" component="h6" sx={styles.Title}>
                                Edit Tag
                            </Typography>
                            <Box sx={styles.Container}>
                                <Typography variant="h6" component="h6" sx={styles.SubTitle}>
                                    Fill the form
                                </Typography>
                                <Divider />
                                <Box component="form" sx={{ p: "15px 20px" }} onSubmit={handleSubmit(onSubmit)}>
                                    <Grid container spacing={3}>
                                        <Grid item {...{ md: 3 }}>
                                            <Typography variant="body1" component="p" sx={styles.Label}>
                                                Tag Name
                                            </Typography>
                                        </Grid>
                                        <Grid item {...{ md: 9 }}>
                                            <Box>
                                                <InputBase
                                                    fullWidth
                                                    placeholder="Category Name"
                                                    {...register("name", { required: true })}
                                                    sx={styles.InputBase}
                                                />
                                                {errors.name &&
                                                    <Box sx={styles.Error}>
                                                        <Icon icon="clarity:error-line" />
                                                    </Box>
                                                }
                                            </Box>
                                        </Grid>
                                        <Grid item {...{ md: 3 }}>
                                            <Typography variant="body1" component="p" sx={styles.Label}>
                                                Description
                                            </Typography>
                                        </Grid>
                                        <Grid item {...{ md: 9 }}>
                                            <Box>
                                                <InputBase
                                                    fullWidth
                                                    placeholder="Description"
                                                    multiline
                                                    maxRows={5}
                                                    minRows={5}
                                                    {...register("description")}
                                                    sx={styles.InputBase}
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Box sx={{ textAlign: "right" }}>
                                        <ButtonBase type="submit" sx={styles.UpdateButton} disabled={loading}>
                                            Update Tag
                                            {loading &&
                                                <CircularProgress size={16} sx={{ color: "background.default", ml: "10px", mb: "-2px" }} />
                                            }
                                        </ButtonBase>
                                    </Box>
                                </Box>
                            </Box>
                        </>
                    )}
                </Box>
            )}
        </Layout>
    );
};
export default EditTags;

//Server side data fetching
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async (context) => {
            const auth = await store.dispatch(checkToken(context.req.cookies['secretId'] as string));
            await store.dispatch(getProfile(context.req.cookies['secretId'] as string));
            await store.dispatch(getSingleTag(context.query.slug as string))
            if (!auth) {
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