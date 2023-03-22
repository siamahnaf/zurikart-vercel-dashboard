import type { NextPage, GetServerSideProps } from "next";
import { useState, useMemo, useEffect } from "react";
import { Box, Typography, Divider, InputBase, Grid, ButtonBase, Switch, Snackbar, Alert, CircularProgress } from "@mui/material";
import { Icon } from "@iconify/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Select from "react-select";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Image from "next/image";

//Layout
import Layout from "Layout";

//Styles
import styles from "Styles/Common/Create.styles";
import selectStyles from "Styles/Common/Select.styles";

//Redux
import { wrapper } from "Redux/Store";
import { useAppSelector, useAppDispatch } from "Redux/Hook";
import { checkToken, getProfile } from "Redux/Action/Authentication/auth.action";
import { AddSections } from "Redux/Action/Home/home.action";
import { getAllCategory } from "Redux/Action/Categories/category.action";

//Import types
import { Values } from "Types/Input.types";

//Interface
interface Inputs {
    name: string;
    description: string;
    category1: string;
    category2: string;
    bannerUrl: string;
    publish: boolean;
}

const AddSection: NextPage = () => {
    //Selector
    const { profile } = useAppSelector(state => state.profile);
    const { categoriesData } = useAppSelector(state => state.getCategory);
    const { message, loading, success } = useAppSelector(state => state.addSection);
    const [required, setRequired] = useState<boolean>(false);
    //State
    const [options, setOptions] = useState<Values[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [images, setImages] = useState<ImageListType>([]);
    //Handler
    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages(imageList as never[]);
    };
    //Handler
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control
    } = useForm<Inputs>();
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<Inputs> = (data, e) => {
        if (images.length === 0) {
            setRequired(true)
        } else {
            dispatch(AddSections(data, images[0].file as File))
        }
    }
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    //Effect
    useMemo(() => {
        const result = categoriesData?.map((item: any) => {
            return {
                value: item.id,
                label: item.name
            }
        })
        setOptions(result)
    }, [categoriesData, setOptions])
    useEffect(() => {
        if (message && success !== null) {
            setOpen(true)
        }
    }, [success, message, setOpen])
    return (
        <Layout title="Edit Section | Changing Experience!" active="home">
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
                        Edit Section
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
                                        Section name
                                    </Typography>
                                </Grid>
                                <Grid item {...{ md: 9 }}>
                                    <Box sx={{ position: "relative" }}>
                                        <InputBase
                                            fullWidth
                                            placeholder="Section name"
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
                                        Short Description
                                    </Typography>
                                </Grid>
                                <Grid item {...{ md: 9 }}>
                                    <Box sx={{ position: "relative" }}>
                                        <InputBase
                                            fullWidth
                                            placeholder="Short Description"
                                            {...register("description", { required: true })}
                                            sx={styles.InputBase}
                                        />
                                        {errors.description &&
                                            <Box sx={styles.Error}>
                                                <Icon icon="clarity:error-line" />
                                            </Box>
                                        }
                                    </Box>
                                </Grid>
                                <Grid item {...{ md: 3 }}>
                                    <Typography variant="body1" component="p" sx={styles.Label}>
                                        Category 1
                                    </Typography>
                                </Grid>
                                <Grid item {...{ md: 9 }}>
                                    <Box sx={{ position: "relative" }}>
                                        <Controller
                                            control={control}
                                            name="category1"
                                            rules={{ required: true }}
                                            render={({ field: { onChange } }) => (
                                                <Select
                                                    onChange={(e: any) => onChange(e?.value)}
                                                    options={options}
                                                    placeholder="Select category"
                                                    styles={selectStyles}
                                                    isSearchable
                                                    isClearable
                                                    instanceId="category"
                                                />
                                            )}
                                        />
                                        {errors.category1 &&
                                            <Box sx={styles.SelectError}>
                                                <Icon icon="clarity:error-line" />
                                            </Box>
                                        }
                                    </Box>
                                </Grid>
                                <Grid item {...{ md: 3 }}>
                                    <Typography variant="body1" component="p" sx={styles.Label}>
                                        Category 2
                                    </Typography>
                                </Grid>
                                <Grid item {...{ md: 9 }}>
                                    <Box sx={{ position: "relative" }}>
                                        <Controller
                                            control={control}
                                            name="category2"
                                            rules={{ required: true }}
                                            render={({ field: { onChange } }) => (
                                                <Select
                                                    onChange={(e: any) => onChange(e?.value)}
                                                    options={options}
                                                    placeholder="Select category"
                                                    styles={selectStyles}
                                                    isSearchable
                                                    isClearable
                                                    instanceId="category"
                                                />
                                            )}
                                        />
                                        {errors.category2 &&
                                            <Box sx={styles.SelectError}>
                                                <Icon icon="clarity:error-line" />
                                            </Box>
                                        }
                                    </Box>
                                </Grid>

                                <Grid item {...{ md: 3 }}>
                                    <Typography variant="body1" component="p" sx={styles.Label}>
                                        Banner
                                    </Typography>
                                    <Typography variant="caption" component="p">
                                        (1500×530)
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
                                <Grid item {...{ md: 3 }}>
                                    <Typography variant="body1" component="p" sx={styles.Label}>
                                        Banner Url
                                    </Typography>
                                </Grid>
                                <Grid item {...{ md: 9 }}>
                                    <Box sx={{ position: "relative" }}>
                                        <InputBase
                                            fullWidth
                                            placeholder="Url for Banner"
                                            {...register("bannerUrl", { required: true })}
                                            sx={styles.InputBase}
                                        />
                                        {errors.bannerUrl &&
                                            <Box sx={styles.Error}>
                                                <Icon icon="clarity:error-line" />
                                            </Box>
                                        }
                                    </Box>
                                </Grid>
                                <Grid item {...{ md: 3 }}>
                                    <Typography variant="body1" component="p" sx={styles.Label}>
                                        Publish
                                    </Typography>
                                </Grid>
                                <Grid item {...{ md: 9 }}>
                                    <Box sx={{ position: "relative" }}>
                                        <Switch
                                            {...register("publish")}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                            <Box sx={{ textAlign: "right" }}>
                                <ButtonBase type="submit" sx={styles.UpdateButton}>
                                    Add Section
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
export default AddSection;

//Server side data fetching
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async (context) => {
            const auth = await store.dispatch(checkToken(context.req.cookies['secretId'] as string));
            await store.dispatch(getProfile(context.req.cookies['secretId'] as string));
            await store.dispatch(getAllCategory(context.req.cookies['secretId'] as string))
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