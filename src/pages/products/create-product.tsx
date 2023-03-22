import type { NextPage, GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { Box, Typography, Grid, ButtonBase, Snackbar, Alert, CircularProgress } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { ImageListType } from "react-images-uploading";

//Layout
import Layout from "Layout";

//Styles
import styles from "Styles/Common/Create.styles";

//Component
import ProductInformation from "Components/Products/ProductInformation";
import ProductMedia from "Components/Products/ProductMedia";
import ProductVariation, { Attributes } from "Components/Products/ProductVariation";
import ProductPrice, { Combine } from "Components/Products/ProductPrice";
import ProductDescription from "Components/Products/ProductDescription";
import ProductSpecification from "Components/Products/ProductSpecification";
import ProductMeta from "Components/Products/ProductMeta";
import ProductStock from "Components/Products/ProductStock";
import Disclaimer from "Components/Products/Disclaimer";
import ProductVat from "Components/Products/ProductVat";

//Redux
import { wrapper } from "Redux/Store";
import { useAppDispatch, useAppSelector } from "Redux/Hook";
import { checkToken, getProfile } from "Redux/Action/Authentication/auth.action";
import { createProducts } from "Redux/Action/Products/product.action";
import { getAllCategory } from "Redux/Action/Categories/category.action";
import { getSubCategory } from "Redux/Action/SubCategories/sub.action";
import { getBrand } from "Redux/Action/Brands/brand.action";
import { getTags } from "Redux/Action/Tags/tag.action";
import { getAttributes } from "Redux/Action/Attributes/attribute.action";

//Import Types
import { Inputs } from "Types/Input.types";

const CreateProduct: NextPage = () => {
    //Selector
    const { message, loading, success } = useAppSelector(state => state.createProduct);
    //State
    const [attributes, setAttribute] = useState<Attributes[]>([]);
    const [combines, setCombine] = useState<Combine[]>([]);
    const [description, setDescription] = useState<string>("");
    const [images, setImages] = useState<ImageListType>([]);
    const [metaImages, setMetaImages] = useState<ImageListType>([]);
    const [open, setOpen] = useState<boolean>(false);
    //Handler
    const onImageChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages(imageList as never[]);
    };
    const onMetaImageChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setMetaImages(imageList as never[]);
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        control,
        setValue
    } = useForm<Inputs>({ defaultValues: { specification: [{ title: "", value: "" }] } });
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<Inputs> = (data, e) => {
        const moreData = {
            images: images,
            description: description,
            attributes: combines,
            metaImages: metaImages[0]?.file as File
        }
        dispatch(createProducts(data, moreData))
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
        if (success) {
            reset()
            setImages([])
            setCombine([])
            setMetaImages([])
            setDescription("")
        }
    }, [success, message, reset, setOpen, setImages, setDescription])
    return (
        <Layout title="Create products | Changing Experience!" active="product">
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
            <Box sx={{ my: "10px" }}>
                <Typography variant="h6" component="h6" sx={styles.Title}>
                    Add new product
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item {...{ md: 9 }}>
                            <ProductInformation
                                register={register}
                                control={control}
                                errors={errors}
                            />
                            <ProductMedia
                                register={register}
                                images={images}
                                onImageChange={onImageChange}
                            />
                            <ProductVariation
                                attributes={attributes}
                                setAttribute={setAttribute}
                            />
                            <ProductPrice
                                attributes={attributes}
                                combines={combines}
                                setCombine={setCombine}
                                register={register}
                                errors={errors}
                                watch={watch}
                                setValue={setValue}
                                control={control}
                            />
                            <ProductDescription
                                setDescription={setDescription}
                            />
                            <ProductSpecification
                                register={register}
                                control={control}
                            />
                            <ProductMeta
                                register={register}
                                images={metaImages}
                                onImageChange={onMetaImageChange}
                                control={control}
                            />
                        </Grid>
                        <Grid item {...{ md: 3 }}>
                            <ProductStock
                                register={register}
                            />
                            <Disclaimer
                                register={register}
                            />
                            <ProductVat
                                register={register}
                                errors={errors}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ textAlign: "left" }}>
                        <ButtonBase type="submit" sx={styles.UpdateButton} disabled={loading}>
                            Submit Product
                            {loading &&
                                <CircularProgress size={16} sx={{ color: "background.default", ml: "10px", mb: "-2px" }} />
                            }
                        </ButtonBase>
                    </Box>
                </Box>
            </Box>
        </Layout>
    );
};
export default CreateProduct;

//Server side data fetching
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async (context) => {
            const auth = await store.dispatch(checkToken(context.req.cookies['secretId'] as string));
            await store.dispatch(getProfile(context.req.cookies['secretId'] as string));
            await store.dispatch(getAllCategory(context.req.cookies['secretId'] as string));
            await store.dispatch(getSubCategory(context.req.cookies['secretId'] as string));
            await store.dispatch(getBrand());
            await store.dispatch(getTags());
            await store.dispatch(getAttributes(context.req.cookies['secretId'] as string))
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