import type { NextPage, GetServerSideProps } from "next";
import { useState, ChangeEvent, useEffect } from "react";
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
import { getSingleAttribute, updateAttribute } from "Redux/Action/Attributes/attribute.action";

//Interface
interface Inputs {
    name: string;
    description: string;
}
interface Values {
    value: string;
    meta: string;
}

const EditAttributes: NextPage = () => {
    //Selector
    const { profile } = useAppSelector(state => state.profile);
    const { attributes, messageErr } = useAppSelector(state => state.getSingleAttr);
    const { message, success, loading } = useAppSelector(state => state.updateAttribute);
    //State
    const [values, setValues] = useState<Values[]>(attributes ? attributes.values : []);
    const [open, setOpen] = useState<boolean>(false);
    //Handler
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Inputs>({ defaultValues: { name: attributes?.name } });
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<Inputs> = (data, e) => {
        const ApiData = {
            name: data.name,
            values: values
        }
        dispatch(updateAttribute(ApiData, attributes.id))
    }
    const addHandler = () => {
        setValues((value) => [...value, { value: "", meta: "" }])
    }
    const removeHandler = (i: number) => {
        const result = [...values];
        result.splice(i, 1)
        setValues(result);
    }
    const handleValueChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, i: number) => {
        const { value } = e.target;
        const list = [...values];
        list[i].value = value
        setValues(list);
    };

    const handleMetaChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, i: number) => {
        const { value } = e.target;
        const list = [...values];
        list[i].meta = value
        setValues(list);
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
        <Layout title="Edit attribute | Changing Experience!" active="attribute">
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
                                Edit attribute
                            </Typography>
                            <Box sx={styles.Container}>
                                <Typography variant="h6" component="h6" sx={styles.SubTitle}>
                                    Fill the form
                                </Typography>
                                <Divider />
                                <Box component="form" sx={{ p: "15px 20px" }} onSubmit={handleSubmit(onSubmit)}>
                                    <Grid container spacing={3}>
                                        <Grid item {...{ md: 2.5 }}>
                                            <Typography variant="body1" component="p" sx={styles.Label}>
                                                Attribute Name
                                            </Typography>
                                        </Grid>
                                        <Grid item {...{ md: 9.5 }}>
                                            <Box sx={{ position: "relative" }}>
                                                <InputBase
                                                    fullWidth
                                                    placeholder="Attribute Name"
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
                                        <Grid item {...{ md: 2.5 }}>
                                            <Typography variant="body1" component="p" sx={styles.Label}>
                                                Attribute values
                                            </Typography>
                                        </Grid>
                                        <Grid item {...{ md: 9.5 }}>
                                            <Box>
                                                {values.map((el, i) => (
                                                    <Box sx={{ mb: "40px" }} key={i}>
                                                        <Grid container spacing={2} alignItems="center">
                                                            <Grid item {...{ md: 5 }}>
                                                                <Box>
                                                                    <Typography variant="body1" component="p" sx={{ ...styles.Label, mb: "10px" }}>
                                                                        Value
                                                                    </Typography>
                                                                    <InputBase
                                                                        placeholder="value"
                                                                        sx={styles.InputBase}
                                                                        fullWidth
                                                                        value={el.value}
                                                                        onChange={(e) => handleValueChange(e, i)}
                                                                    />
                                                                </Box>
                                                            </Grid>
                                                            <Grid item {...{ md: 5 }}>
                                                                <Box>
                                                                    <Typography variant="body1" component="p" sx={{ ...styles.Label, mb: "10px" }}>
                                                                        Meta
                                                                    </Typography>
                                                                    <InputBase
                                                                        placeholder="meta"
                                                                        sx={styles.InputBase}
                                                                        fullWidth
                                                                        value={el.meta}
                                                                        onChange={(e) => handleMetaChange(e, i)}
                                                                    />
                                                                </Box>
                                                            </Grid>
                                                            <Grid item {...{ md: 2 }}>
                                                                <Box>
                                                                    <ButtonBase sx={styles.Remove} onClick={() => removeHandler(i)} className={values.length > 1 ? "active" : ""}>
                                                                        Remove
                                                                    </ButtonBase>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                ))}
                                                <Box>
                                                    <ButtonBase sx={styles.AddCount} onClick={addHandler} className={(values.length > 0 && values[values.length - 1].value && values[values.length - 1].meta) ? "active" : ""}>
                                                        Add Value
                                                    </ButtonBase>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Box sx={{ textAlign: "right" }}>
                                        <ButtonBase type="submit" sx={styles.UpdateButton} disabled={loading}>
                                            Update Attribute
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
        </Layout >
    );
};
export default EditAttributes;

//Server side data fetching
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async (context) => {
            const auth = await store.dispatch(checkToken(context.req.cookies['secretId'] as string));
            await store.dispatch(getProfile(context.req.cookies['secretId'] as string));
            await store.dispatch(getSingleAttribute(context.req.cookies['secretId'] as string, context.query.slug as string));
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