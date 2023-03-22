import type { NextPage, GetServerSideProps } from "next";
import { useState, useMemo, useEffect } from "react";
import { Box, Typography, Divider, InputBase, Grid, ButtonBase, Snackbar, Alert, CircularProgress } from "@mui/material";
import Select from "react-select";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

//Layout
import Layout from "Layout";

//Styles
import styles from "Styles/Common/Create.styles";
import selectStyles from "Styles/Common/Select.styles";

//Redux
import { wrapper } from "Redux/Store";
import { useAppSelector, useAppDispatch } from "Redux/Hook";
import { checkToken, getProfile } from "Redux/Action/Authentication/auth.action";
import { getAllCategory } from "Redux/Action/Categories/category.action";
import { getSingleSubCate, updateSubCategory } from "Redux/Action/SubCategories/sub.action";

//Import types
import { Values } from "Types/Input.types";

//Interface
interface Inputs {
    name: string;
    category: string;
}
interface CategoriesData {
    id: string;
    name: string;
}

const EditSubCategory: NextPage = () => {
    //Selector
    const { categoriesData } = useAppSelector(state => state.getCategory);
    const { subcategory, messageErr } = useAppSelector(state => state.getSub);
    const { message, success, loading } = useAppSelector(state => state.updateSub)
    //State
    const { profile } = useAppSelector(state => state.profile);
    const [images, setImages] = useState<ImageListType>([]);
    const [options, setOptions] = useState<Values[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const maxNumber = 69;
    //Handler
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
        formState: { errors },
        reset,
        control
    } = useForm<Inputs>({ defaultValues: { name: subcategory?.name, category: subcategory?.category.id } });
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<Inputs> = (data, e) => {
        const prams = {
            id: subcategory.id,
            imageUrl: subcategory.image
        }
        dispatch(updateSubCategory(data, images[0]?.file as File, prams))
    }
    //Effect
    useMemo(() => {
        const result = categoriesData?.map((item: CategoriesData) => {
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
        <Layout title="Edit Sub-category | Changing Experience!" active="category">
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
                                Edit sub-category
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
                                                Sub-category Name
                                            </Typography>
                                        </Grid>
                                        <Grid item {...{ md: 9 }}>
                                            <Box sx={{ position: "relative" }}>
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
                                                Category
                                            </Typography>
                                        </Grid>
                                        <Grid item {...{ md: 9 }}>
                                            <Box sx={{ position: "relative" }}>
                                                <Controller
                                                    control={control}
                                                    name="category"
                                                    rules={{ required: true }}
                                                    render={({ field: { onChange } }) => (
                                                        <Select
                                                            onChange={(e: any) => onChange(e?.value)}
                                                            options={options}
                                                            defaultValue={{ label: subcategory?.category.name, value: subcategory?.category.id }}
                                                            placeholder="Select category"
                                                            styles={selectStyles}
                                                            isSearchable
                                                            isClearable
                                                            instanceId="category"
                                                        />
                                                    )}
                                                />
                                                {errors.category &&
                                                    <Box sx={styles.SelectError}>
                                                        <Icon icon="clarity:error-line" />
                                                    </Box>
                                                }
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
                                                        {imageList.length === 0 && subcategory?.image &&
                                                            <Box sx={styles.PreviewImage}>
                                                                <Image src={process.env.NEXT_PUBLIC_IMAGE_PATH + subcategory.image} alt={subcategory.name} width={120} height={80} />
                                                            </Box>
                                                        }
                                                    </Box>
                                                )}
                                            </ImageUploading>
                                        </Grid>
                                    </Grid>
                                    <Box sx={{ textAlign: "right" }}>
                                        <ButtonBase type="submit" sx={styles.UpdateButton} disabled={loading}>
                                            Update Sub-category
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
export default EditSubCategory;

//Server side data fetching
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async (context) => {
            const auth = await store.dispatch(checkToken(context.req.cookies['secretId'] as string));
            await store.dispatch(getProfile(context.req.cookies['secretId'] as string));
            await store.dispatch(getAllCategory(context.req.cookies['secretId'] as string));
            await store.dispatch(getSingleSubCate(context.query.slug as string))
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