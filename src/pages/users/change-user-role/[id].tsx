import type { NextPage, GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { Box, Typography, Divider, Stack, ButtonBase, Snackbar, Alert, CircularProgress, Grid } from "@mui/material";
import Select, { ActionMeta } from "react-select";
import { useRouter } from "next/router";

//Layout
import Layout from "Layout";

//Styles
import styles from "Styles/Common/Create.styles";
import selectStyles from "Styles/Common/SingleSelect.styles";

//Import Types
import { Values } from "Types/Input.types";

//Redux
import { wrapper } from "Redux/Store";
import { useAppSelector, useAppDispatch } from "Redux/Hook";
import { checkToken, getProfile } from "Redux/Action/Authentication/auth.action";
import { changeUserRole } from "Redux/Action/User/user.action";


const ChangeUserRole: NextPage = () => {
    //Selector
    const { profile } = useAppSelector(state => state.profile);
    const { message, loading, success } = useAppSelector(state => state.changeRole);
    //State
    const [role, setRole] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    //Handler
    const AttributeOnChange = (value: Values | null, actionMeta: ActionMeta<Values>) => {
        if (value) {
            setRole(value.value);
        } else {
            setRole("")
        }
    }
    const dispatch = useAppDispatch();
    const router = useRouter();
    const onRoleChange = () => {
        if (role) {
            dispatch(changeUserRole(router.query.id as string, role))
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
    }, [success, message, setOpen])
    return (
        <Layout title="Edit User | Changing Experience!" active="user">
            {profile.role === "editor" || profile.role === "moderator" ? (
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
                    <Typography variant="h6" component="h6" sx={styles.Title}>
                        Edit User
                    </Typography>
                    <Box sx={styles.Container}>
                        <Grid container spacing={2}>
                            <Grid item {...{ md: 6 }}>
                                <Typography variant="h6" component="h6" sx={styles.SubTitle}>
                                    Change user role
                                </Typography>
                            </Grid>
                            <Grid item {...{ md: 6 }}>
                                <Typography variant="h6" component="h6" sx={{ ...styles.SubTitle, textAlign: "right" }}>
                                    Current role: {router.query.role &&
                                        router.query.role[0].toUpperCase() + router.query.role.toString().substring(1)
                                    }
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Box sx={{ p: "15px 20px" }}>
                            <Stack direction="row">
                                <Box sx={{ flex: 1 }}>
                                    <Select
                                        options={[
                                            { value: "user", label: "User" },
                                            { value: "editor", label: "Editor" },
                                            { value: "moderator", label: "Moderator" },
                                            { value: "admin", label: "Admin" }
                                        ]}
                                        onChange={AttributeOnChange}
                                        placeholder="Select user role"
                                        styles={selectStyles}
                                        isSearchable
                                        isClearable
                                        instanceId="attribute"
                                    />
                                </Box>
                                <Box sx={{ ml: "20px" }}>
                                    <ButtonBase sx={{ ...styles.UpdateButton, mt: 0 }} disabled={loading} onClick={onRoleChange}>
                                        Change Role
                                        {loading &&
                                            <CircularProgress size={16} sx={{ color: "background.default", ml: "10px", mb: "-2px" }} />
                                        }
                                    </ButtonBase>
                                </Box>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            )
            }
        </Layout >
    );
};
export default ChangeUserRole;

//Server side data fetching
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async (context) => {
            const auth = await store.dispatch(checkToken(context.req.cookies['secretId'] as string));
            await store.dispatch(getProfile(context.req.cookies['secretId'] as string));
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