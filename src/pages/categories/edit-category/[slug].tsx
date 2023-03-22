import type { NextPage, GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { Box, Typography, Divider, InputBase, Grid, ButtonBase, Snackbar, Alert, CircularProgress } from "@mui/material";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Image from "next/image";
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
import { getSingleCategory, updateCategory } from "Redux/Action/Categories/category.action";

//Interface
interface Inputs {
    name: string;
    description: string;
}

const EditCategory: NextPage = () => {
    //Use app selector
    const { profile } = useAppSelector(state => state.profile);
    const { category, messageErr } = useAppSelector(state => state.getSingleCate);
    const { success, message, loading } = useAppSelector(state => state.updateCategory);
    //State
    const [images, setImages] = useState<ImageListType>([]);
    const [open, setOpen] = useState<boolean>(false);
    //Handler
    const maxNumber = 69;
    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages(imageList as never[]);
    };
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>({ defaultValues: { name: category?.name, description: category?.description } });
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<Inputs> = (data, e) => {
        const prams = {
            id: category.id,
            imageUrl: category.image
        }
        dispatch(updateCategory(data, images[0]?.file as File, prams))
    }
    //Effect
    useEffect(() => {
        if (message && success !== null) {
            setOpen(true)
        }
    }, [success, message, setOpen])
    return (
        <Layout title="Edit Category | Changing Experience!" active="category">
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
                                Edit Category
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
                                                Category Name
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
                                        <Grid item {...{ md: 3 }}>
                                            <Typography variant="body1" component="p" sx={styles.Label}>
                                                Photo
                                            </Typography>
                                        </Grid>
                                        <Grid item {...{ md: 9 }}>
                                            <ImageUploading
                                                value={images}
                                                onChange={onChange}
                                                maxNumber={maxNumber}
                                            >
                                                {({
                                                    imageList,
                                                    onImageUpload,
                                                    onImageRemove,
                                                    isDragging,
                                                    dragProps
                                                }) => (
                                                    <Box>
                                                        <ButtonBase
                                                            onClick={onImageUpload}
                                                            {...dragProps}
                                                            sx={styles.FileContainer}
                                                        >
                                                            <Typography variant="body1" component="p" sx={styles.Browse}>
                                                                Browser
                                                            </Typography>
                                                            {isDragging &&
                                                                <Typography variant="body1" component="p" className={isDragging ? "dropping" : ""} sx={styles.DropHere}>
                                                                    Drop Here
                                                                </Typography>
                                                            }
                                                            {!isDragging &&
                                                                <Typography variant="body1" component="p" sx={styles.DropHere}>
                                                                    {imageList.length > 0 ? `${imageList.length} Files selected` : "Choose File"}
                                                                </Typography>
                                                            }
                                                        </ButtonBase>
                                                        {imageList.map((image, i) => (
                                                            <Box key={i} sx={styles.ImageContainer}>
                                                                <ButtonBase onClick={() => onImageRemove(i)} sx={styles.DeleteIcon}>
                                                                    <Icon icon="clarity:window-close-line" />
                                                                </ButtonBase>
                                                                <Image src={image.dataURL as string} alt="Image" width={130} height={60} />
                                                                <Box sx={{ p: "2px 8px" }}>
                                                                    <Typography variant="body1" component="p" sx={styles.ImageTitle}>
                                                                        <span>
                                                                            {image?.file?.name.split(".")[0]}
                                                                        </span>
                                                                        <span>
                                                                            .{image?.file?.name.split(".")[1]}
                                                                        </span>
                                                                    </Typography>
                                                                    <Typography variant="body2" component="p" sx={styles.FileSize}>
                                                                        {(image?.file?.size as number / (1024 * 1024)).toFixed(2)}MB
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        ))}
                                                        {imageList.length === 0 && category?.image &&
                                                            <Box sx={styles.PreviewImage}>
                                                                <Image src={process.env.NEXT_PUBLIC_IMAGE_PATH + category.image} alt={category.name} width={120} height={80} />
                                                            </Box>
                                                        }
                                                    </Box>
                                                )}
                                            </ImageUploading>
                                        </Grid>
                                    </Grid>
                                    <Box sx={{ textAlign: "right" }}>
                                        <ButtonBase type="submit" sx={styles.UpdateButton} disabled={loading}>
                                            Update Category
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
export default EditCategory;

//Server side data fetching
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async (context) => {
            const auth = await store.dispatch(checkToken(context.req.cookies['secretId'] as string));
            await store.dispatch(getProfile(context.req.cookies['secretId'] as string));
            await store.dispatch(getSingleCategory(context.query.slug as string, context.req.cookies['secretId'] as string))
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