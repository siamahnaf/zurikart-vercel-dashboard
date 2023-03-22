import { useState, useEffect } from "react";
import { Box, Typography, Divider, InputBase, Grid, ButtonBase, Snackbar, Alert, CircularProgress } from "@mui/material";
import { Icon } from "@iconify/react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";

//Styles
import styles from "Styles/Common/Create.styles";

//Redux
import { useAppSelector, useAppDispatch } from "Redux/Hook";
import { updateProfile } from "Redux/Action/Profile/profile.action";

//Types
interface Inputs {
    name: string;
    email: string;
}
interface ProfileData {
    id: string;
    name: string;
    phone: string;
    email: string;
    avatar: string;
    role: string;
}

const Manage = () => {
    //Selector
    const { profile } = useAppSelector(state => state.profile);
    const { message, loading, success } = useAppSelector(state => state.updateProfile);
    //State
    const [images, setImages] = useState<ImageListType>([]);
    const [profileData, setProfileData] = useState<ProfileData>(profile);
    const [open, setOpen] = useState<boolean>(false);
    //Handler
    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages(imageList as never[]);
    };
    const {
        register,
        handleSubmit
    } = useForm<Inputs>({
        defaultValues: {
            name: profileData?.name,
            email: profileData?.email
        }
    });
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<Inputs> = (data, e) => {
        dispatch(updateProfile(data, images[0]?.file as File, profileData?.avatar))
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
                Basic Info
            </Typography>
            <Divider />
            <Box sx={{ p: "15px 20px" }} component="form" onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item {...{ md: 3 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Your Name
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="Your Name"
                                sx={styles.InputBase}
                                {...register("name")}
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
                            maxNumber={1}
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
                                            <Typography variant="body1" component="p" sx={styles.DropHere} className={isDragging ? "dropping" : ""}>
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
                                        <Box sx={styles.ImageContainer} key={i}>
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
                                    {imageList.length === 0 && profileData?.avatar &&
                                        <Box sx={styles.PreviewImage}>
                                            <Image src={process.env.NEXT_PUBLIC_IMAGE_PATH + profileData.avatar} alt="logo" width={120} height={80} />
                                        </Box>
                                    }
                                </Box>
                            )}
                        </ImageUploading>
                    </Grid>
                    <Grid item {...{ md: 3 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Your Email
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="Your email"
                                sx={styles.InputBase}
                                {...register("email")}
                            />
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 3 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Phone
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="Your phone"
                                sx={styles.InputBase}
                                defaultValue={"+" + profileData?.phone}
                                readOnly
                            />
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 3 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Your Role
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="Your email"
                                defaultValue={profileData?.role}
                                readOnly
                                sx={styles.InputBase}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ textAlign: "right" }}>
                    <ButtonBase type="submit" sx={styles.UpdateButton} disabled={loading}>
                        Update Profile
                        {loading &&
                            <CircularProgress size={16} sx={{ color: "background.default", ml: "10px", mb: "-2px" }} />
                        }
                    </ButtonBase>
                </Box>
            </Box>
        </Box>
    );
};

export default Manage;