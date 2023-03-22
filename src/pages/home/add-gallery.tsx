import type { NextPage, GetServerSideProps } from "next";
import { useEffect, useState } from "react";
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
import { createGallery } from "Redux/Action/Home/home.action";

//Interface
interface Inputs {
    name: string;
    url: string;
}

const Gallery: NextPage = () => {
    //Selector
    const { profile } = useAppSelector(state => state.profile);
    const { message, loading, success } = useAppSelector(state => state.createGallery);
    //State
    const [images, setImages] = useState<ImageListType>([]);
    const [required, setRequired] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const maxNumber = 69;
    //Handler
    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages(imageList as never[]);
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Inputs>();
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<Inputs> = (data, e) => {
        if (images.length === 0) {
            setRequired(true)
        } else {
            dispatch(createGallery(data, images[0]?.file as File))
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
        if (images.length > 0) setRequired(false)
    }, [images, setRequired])
    useEffect(() => {
        if (message && success !== null) {
            setOpen(true)
        }
        if (success) {
            reset()
            setImages([])
        }
    }, [success, message, reset, setImages, setOpen])
    return (
        <Layout title="Add banner | Changing Experience!" active="home">
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
                        Add Gallery
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
                                        Name
                                    </Typography>
                                </Grid>
                                <Grid item {...{ md: 9 }}>
                                    <Box sx={{ position: "relative" }}>
                                        <InputBase
                                            fullWidth
                                            placeholder="Alt text"
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
                                        Url
                                    </Typography>
                                </Grid>
                                <Grid item {...{ md: 9 }}>
                                    <Box sx={{ position: "relative" }}>
                                        <InputBase
                                            fullWidth
                                            placeholder="url"
                                            {...register("url", { required: true })}
                                            sx={styles.InputBase}
                                        />
                                        {errors.url &&
                                            <Box sx={styles.Error}>
                                                <Icon icon="clarity:error-line" />
                                            </Box>
                                        }
                                    </Box>
                                </Grid>
                                <Grid item {...{ md: 3 }}>
                                    <Typography variant="body1" component="p" sx={styles.Label}>
                                        Gallery
                                    </Typography>
                                    <Typography variant="caption" component="p">
                                        (400×420)
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
                                            </Box>
                                        )}
                                    </ImageUploading>
                                    {required &&
                                        <Typography variant="body2" component="p" sx={{ color: "primary.main", mt: "3px" }}>
                                            Please add image!
                                        </Typography>
                                    }
                                </Grid>
                            </Grid>
                            <Box sx={{ textAlign: "right" }}>
                                <ButtonBase type="submit" sx={styles.UpdateButton} disabled={loading}>
                                    Add Gallery
                                    {loading &&
                                        <CircularProgress size={16} sx={{ color: "background.default", ml: "10px", mb: "-2px" }} />
                                    }
                                </ButtonBase>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}

        </Layout>
    );
};
export default Gallery;

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