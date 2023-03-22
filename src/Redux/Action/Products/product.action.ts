import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import ReactS3Client from "react-aws-s3-typescript";
import { UniqId } from "Utilis/Helpers";
import { ImageListType } from "react-images-uploading";
import {
    //Create products
    CREATE_PRODUCTS_LOADING,
    CREATE_PRODUCTS_FAILED,
    CREATE_PRODUCTS_SUCCESS,
    //Get Products
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILED,
    //Delete Products
    DELETE_PRODUCTS_LOADING,
    DELETE_PRODUCTS_FAILED,
    DELETE_PRODUCTS_SUCCESS,
    //Get Single Products
    GET_SINGLE_PRODUCTS_FAILED,
    GET_SINGLE_PRODUCTS_SUCCESS,
    //Update products
    UPDATE_PRODUCTS_LOADING,
    UPDATE_PRODUCTS_FAILED,
    UPDATE_PRODUCTS_SUCCESS
} from "Redux/Constant/Products/products.constant";
import { SERVER_ERROR } from "Redux/Constant/server.constant";

//S3 Configure
const s3Config = {
    bucketName: process.env.NEXT_PUBLIC_BUCKET_NAME as string,
    dirName: "Products",
    region: process.env.NEXT_PUBLIC_REGION as string,
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ID as string
}

//Create products action and types
interface Specification {
    title: string;
    value: string;
}
interface CreateData {
    name: string;
    category: string;
    subCategory: string[];
    brand: string;
    unit: string;
    minPurchase: string;
    tags: string[];
    youtubeLink: string;
    price: number;
    quantity: number;
    discount: number | string;
    discountUnit: string;
    doorDeliveryFee: number;
    pickupFee: number;
    productUrl: string;
    specification: Specification[];
    meta: {
        title: string;
        description: string;
        image?: string;
    },
    visibility: boolean;
    disclaimer: string;
    tax: number;
    taxUnit: string;
}
interface Combines {
    variant: string;
    price: string;
    quantity: string;
    image: ImageListType;
}
interface Attributes {
    variant: string;
    price: string;
    quantity: string;
    image: string;
}
interface MoreData {
    images: ImageListType;
    description: string;
    attributes: Combines[];
    metaImages: File;
}
//--//
export const createProducts = (data: CreateData, more: MoreData) => async (dispatch: Dispatch) => {
    dispatch({ type: CREATE_PRODUCTS_LOADING })
    let productImages: { url: string }[] = [];
    if (more.images.length > 0) {
        for (let i = 0; i < more.images.length; i++) {
            const s3 = new ReactS3Client(s3Config);
            const res = await s3.uploadFile(more.images[i].file as File, UniqId());
            productImages.push({ url: res.key });
        }
    }
    if (more.metaImages) {
        const s3 = new ReactS3Client(s3Config);
        const res = await s3.uploadFile(more.metaImages, UniqId());
        data.meta.image = res.key;
    }
    const attributes: Attributes[] = [];
    for (let i = 0; i < more.attributes.length; i++) {
        let image = ""
        if (more.attributes[i].image.length > 0) {
            const s3 = new ReactS3Client(s3Config);
            const res = await s3.uploadFile(more.attributes[i].image[0]?.file as File, UniqId());
            image = res.key;
        }
        attributes.push({
            variant: more.attributes[i].variant,
            price: more.attributes[i].price,
            quantity: more.attributes[i].quantity,
            image: image
        })
    }
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation addProducts($productInput: ProductInput!) {
                addProduct(productInput: $productInput) {
                    success
                    message
                }
            }`,
        variables: {
            productInput: {
                name: data.name,
                category: data.category,
                subCategory: data.subCategory,
                brand: data.brand,
                unit: data.unit,
                minPurchase: data.minPurchase,
                tag: data.tags,
                productImages,
                youtubeLink: data.youtubeLink,
                price: Number(data.price),
                discount: Number(data.discount),
                discountUnit: data.discountUnit,
                quantity: Number(data.quantity),
                description: more.description,
                doorDeliveryFee: Number(data.doorDeliveryFee),
                pickupFee: Number(data.pickupFee),
                specification: data.specification,
                attributes,
                visibility: data.visibility,
                productUrl: data.productUrl,
                meta: data.meta,
                tax: Number(data.tax),
                taxUnit: data.taxUnit,
                disclaimer: data.disclaimer ? data.disclaimer : "The actual color of the physical product may slightly vary due to the deviation of lighting sources, photography or your device display settings. Delivery charges may vary as per the location, Product Size and Weight; we will notify before proceeding the delivery."
            }
        }
    }, {
        headers: {
            'Authorization': `Bearer ${token as string}`
        }
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: CREATE_PRODUCTS_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: CREATE_PRODUCTS_SUCCESS,
                    payload: {
                        create: res.data.data.addProduct
                    }
                })
            }
        })
        .catch(err => {
            dispatch({
                type: SERVER_ERROR,
                payload: {
                    message: "Something went wrong!"
                }
            })
        })
}

//Get products
export const getProducts = (search: string) => async (dispatch: Dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `query getProducts {
                getProducts(productPrams: { search: "${search}" }) {
                    success
                    products {
                        id
                        name
                        slug
                        category {
                            name
                        }
                        brand {
                            name
                        }
                        productImages {
                            url
                        }
                        meta {
                            image
                        }
                        price
                        quantity
                        visibility
                    }
                }
            }`
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: GET_PRODUCTS_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_PRODUCTS_SUCCESS,
                    payload: {
                        getProducts: res.data.data.getProducts
                    }
                })
            }
        })
        .catch(err => {
            dispatch({
                type: SERVER_ERROR,
                payload: {
                    message: "Something went wrong!"
                }
            })
        })
}

//Delete products action and types
interface Url {
    url: string
}
interface ImageUrl {
    productImages: Url[];
    metaImages: string;
}
export const deleteProducts = (id: string, imageUrl: ImageUrl) => async (dispatch: Dispatch) => {
    dispatch({ type: DELETE_PRODUCTS_LOADING });
    if (imageUrl.productImages?.length > 0) {
        for (let i = 0; i < imageUrl.productImages.length; i++) {
            const s3 = new ReactS3Client(s3Config);
            await s3.deleteFile(imageUrl.productImages[i].url);
        }
    }
    if (imageUrl.metaImages) {
        const s3 = new ReactS3Client(s3Config);
        await s3.deleteFile(imageUrl.metaImages);
    }
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation deleteProduct {
                deleteProduct(id: "${id}") {
                    success
                    message
                }
            }`
    }, {
        headers: {
            'Authorization': `Bearer ${token as string}`
        }
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: DELETE_PRODUCTS_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: DELETE_PRODUCTS_SUCCESS,
                    payload: {
                        delete: res.data.data.deleteProduct
                    }
                })
            }
        })
        .catch(err => {
            dispatch({
                type: SERVER_ERROR,
                payload: {
                    message: "Something went wrong!"
                }
            })
        })
}

//Get single products action and types
export const getSingleProduct = (slug: string) => async (dispatch: Dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `query getProduct {
                getProduct(slug: "${slug}") {
                  id
                  name
                  category {
                    value: id
                    label: name
                  }
                  subCategory {
                    value: id
                    label: name
                  }
                  brand {
                    value: id
                    label: name
                  }
                  unit
                  minPurchase
                  tag {
                    value: id
                    label: name
                  }
                  refundAble
                  productImages {
                    url
                  }
                  youtubeLink
                  price
                  discount
                  discountUnit
                  quantity
                  description
                  attributes {
                    variant
                    price
                    quantity
                    image
                  }
                  visibility
                  meta {
                    title
                    description
                    image
                    metaTags
                  }
                  tax
                  taxUnit
                  specification {
                    title
                    value
                  }
                  doorDeliveryFee
                  pickupFee
                  productUrl
                  disclaimer
                }
            }`
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: GET_SINGLE_PRODUCTS_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_SINGLE_PRODUCTS_SUCCESS,
                    payload: {
                        get: res.data.data.getProduct
                    }
                })
            }
        })
        .catch(err => {
            dispatch({
                type: SERVER_ERROR,
                payload: {
                    message: "Something went wrong!"
                }
            })
        })
}

//Update products action and types
interface MoreUpdateData {
    images: ImageListType;
    description: string;
    attributes: Combines[];
    updateAttributes: Attributes[];
    metaImages: File;
}
interface UpdateImageUrl {
    id: string;
    productImages: Url[];
    metaImages: string;
}
export const updateProducts = (data: CreateData, more: MoreUpdateData, imageUrl: UpdateImageUrl) => async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_PRODUCTS_LOADING })
    let productImages: { url: string }[] = [];
    if (more.images.length > 0) {
        for (let i = 0; i < more.images.length; i++) {
            const s3 = new ReactS3Client(s3Config);
            const res = await s3.uploadFile(more.images[i].file as File, UniqId());
            productImages.push({ url: res.key });
        }
        if (imageUrl?.productImages?.length > 0) {
            for (let i = 0; i < imageUrl.productImages.length; i++) {
                const s3 = new ReactS3Client(s3Config);
                await s3.deleteFile(imageUrl.productImages[i].url);
            }
        }
    }
    if (more.metaImages) {
        const s3 = new ReactS3Client(s3Config);
        const res = await s3.uploadFile(more.metaImages, UniqId());
        data.meta.image = res.key;
        if (imageUrl?.metaImages) {
            const s3 = new ReactS3Client(s3Config);
            await s3.deleteFile(imageUrl.metaImages);
        }
    }
    const attributes: Attributes[] = [];
    if (more.attributes.length > 0) {
        for (let i = 0; i < more.attributes.length; i++) {
            let image = ""
            if (more.attributes[i].image.length > 0) {
                const s3 = new ReactS3Client(s3Config);
                const res = await s3.uploadFile(more.attributes[i].image[0]?.file as File, UniqId());
                image = res.key;
            }
            attributes.push({
                variant: more.attributes[i].variant,
                price: more.attributes[i].price,
                quantity: more.attributes[i].quantity,
                image: image
            })
        }
    }
    const updateAttributes = more.updateAttributes.map((item: any) => {
        return {
            ...item,
            price: item.price?.toString(),
            quantity: item.price?.toString()
        }
    })
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation updateProduct($productUpdateInput: ProductUpdateInput!, $updateProductId: ID!) {
                updateProduct(productUpdateInput: $productUpdateInput, id: $updateProductId) {
                    success
                    message
                }
            }`,
        variables: {
            productUpdateInput: {
                name: data.name,
                category: data.category,
                subCategory: data.subCategory,
                brand: data.brand,
                unit: data.unit,
                minPurchase: data.minPurchase?.toString(),
                tag: data.tags,
                productImages: more.images.length > 0 ? productImages : imageUrl.productImages,
                youtubeLink: data.youtubeLink ? data.youtubeLink : "",
                price: Number(data.price),
                discount: Number(data.discount),
                discountUnit: data.discountUnit,
                doorDeliveryFee: Number(data.doorDeliveryFee),
                pickupFee: Number(data.pickupFee),
                specification: data.specification,
                productUrl: data.productUrl,
                quantity: Number(data.quantity),
                description: more.description,
                attributes: attributes.length > 0 ? attributes : updateAttributes,
                visibility: data.visibility,
                meta: data.meta,
                tax: Number(data.tax),
                taxUnit: data.taxUnit,
                disclaimer: data.disclaimer
            },
            updateProductId: imageUrl.id
        }
    }, {
        headers: {
            'Authorization': `Bearer ${token as string}`
        }
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: UPDATE_PRODUCTS_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: UPDATE_PRODUCTS_SUCCESS,
                    payload: {
                        update: res.data.data.updateProduct
                    }
                })
            }
        })
        .catch(err => {
            dispatch({
                type: SERVER_ERROR,
                payload: {
                    message: "Something went wrong!"
                }
            })
        })
}