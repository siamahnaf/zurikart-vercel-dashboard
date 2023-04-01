import type { NextPage, GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { Box, Typography, Grid, ButtonBase, Snackbar, Alert, CircularProgress } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { ImageListType } from "react-images-uploading"

//Layout
import Layout from "Layout";

//Styles
import styles from "Styles/Common/Create.styles";

//Component
import ProductInformation from "Components/EditProducts/ProductInformation";
import ProductMedia from "Components/EditProducts/ProductMedia";
import ProductPrice, { Combine } from "Components/EditProducts/ProductPrice";
import ProductDescription from "Components/EditProducts/ProductDescription";
import ProductMeta from "Components/EditProducts/ProductMeta";
import ProductStock from "Components/EditProducts/ProductStock";
import Disclaimer from "Components/EditProducts/Disclaimer";
import ProductVat from "Components/EditProducts/ProductVat";

//Redux
import { wrapper } from "Redux/Store";
import { useAppSelector, useAppDispatch } from "Redux/Hook";
import { checkToken, getProfile } from "Redux/Action/Authentication/auth.action";
import ProductVariation, { Attributes } from "Components/Products/ProductVariation";
import { getSingleProduct, updateProducts } from "Redux/Action/Products/product.action";
import { getAllCategory } from "Redux/Action/Categories/category.action";
import { getSubCategory } from "Redux/Action/SubCategories/sub.action";
import { getBrand } from "Redux/Action/Brands/brand.action";
import { getTags } from "Redux/Action/Tags/tag.action";
import { getAttributes } from "Redux/Action/Attributes/attribute.action";
import ProductSpecification from "Components/Products/ProductSpecification";

//Import Types
import { Inputs } from "Types/Input.types";

const EditProducts: NextPage = () => {
    //Selector
    const { product, messageErr } = useAppSelector(state => state.getSingleProduct);
    const { message, loading, success } = useAppSelector(state => state.updateProduct);
    //State
    const [attributes, setAttribute] = useState<Attributes[]>([]);
    const [combines, setCombine] = useState<Combine[]>([]);
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
    } = useForm<Inputs>({
        defaultValues: {
            name: product?.name,
            category: product?.category?.value,
            subCategory: product?.subCategory?.map((item: any) => item.value),
            brand: product?.brand?.value,
            unit: product?.unit,
            minPurchase: product?.minPurchase,
            tags: product?.tag?.map((item: any) => item.value),
            youtubeLink: product?.youtubeLink,
            price: product?.price,
            quantity: product?.quantity,
            discount: Number(product?.discount),
            discountUnit: product?.discountUnit,
            specification: product?.specification,
            doorDeliveryFee: product?.doorDeliveryFee,
            notice: product?.notice,
            badge: product?.badge,
            shortSummery: product?.shortSummery,
            description: product?.description,
            pickupFee: product?.pickupFee,
            meta: {
                title: product?.meta?.title,
                description: product?.meta?.description,
                metaTags: product?.meta?.metaTags,
                image: product?.meta?.image
            },
            visibility: product?.visibility,
            showStock: product?.showStock,
            productUrl: product?.productUrl,
            tax: product?.tax,
            taxUnit: product?.taxUnit,
            disclaimer: product?.disclaimer
        }
    });
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<Inputs> = (data, e) => {
        const moreData = {
            images,
            attributes: combines,
            updateAttributes: product?.attributes,
            metaImages: metaImages[0]?.file as File
        }
        const ImageUrl = {
            id: product?.id,
            productImages: product?.productImages,
            metaImages: product?.meta?.image
        }
        dispatch(updateProducts(data, moreData, ImageUrl))
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
        <Layout title="Create products | Changing Experience!" active="product">
            {messageErr ? (
                <Typography variant="body1" component="p" sx={{ textAlign: "center", mt: "10px", color: "primary.main" }}>
                    {messageErr}
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
                        Edit product
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
                                    register={register}
                                    control={control}
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
                                    control={control}
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{ textAlign: "left" }}>
                            <ButtonBase type="submit" sx={styles.UpdateButton}>
                                Submit Product
                                {loading &&
                                    <CircularProgress size={16} sx={{ color: "background.default", ml: "10px", mb: "-2px" }} />
                                }
                            </ButtonBase>
                        </Box>
                    </Box>
                </Box>
            )}
        </Layout>
    );
};
export default EditProducts;

//Server side data fetching
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async (context) => {
            const auth = await store.dispatch(checkToken(context.req.cookies['secretId'] as string));
            await store.dispatch(getProfile(context.req.cookies['secretId'] as string));
            await store.dispatch(getSingleProduct(context.query.slug as string));
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