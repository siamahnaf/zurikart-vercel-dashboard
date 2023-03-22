import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import ReactS3Client from 'react-aws-s3-typescript';
import { UniqId } from "Utilis/Helpers";
import {
    //Create brand
    CREATE_BRAND_LOADING,
    CREATE_BRAND_FAILED,
    CREATE_BRAND_SUCCESS,
    //Get brand
    GET_BRAND_SUCCESS,
    GET_BRAND_FAILED,
    //Delete Brand
    DELETE_BRAND_LOADING,
    DELETE_BRAND_SUCCESS,
    DELETE_BRAND_FAILED,
    //Get single brand
    GET_SINGLE_BRAND_SUCCESS,
    GET_SINGLE_BRAND_FAILED,
    //Update brand
    UPDATE_BRAND_LOADING,
    UPDATE_BRAND_SUCCESS,
    UPDATE_BRAND_FAILED
} from "Redux/Constant/Brands/brand.constant";
import { SERVER_ERROR } from "Redux/Constant/server.constant";

//S3 Configure
const s3Config = {
    bucketName: process.env.NEXT_PUBLIC_BUCKET_NAME as string,
    dirName: "Brand",
    region: process.env.NEXT_PUBLIC_REGION as string,
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ID as string
}

//Create brand action and types
interface CreateData {
    name: string;
    description: string;
}
export const createBrand = (data: CreateData, file: File) => async (dispatch: Dispatch) => {
    dispatch({ type: CREATE_BRAND_LOADING })
    let image: string = "";
    if (file) {
        const s3 = new ReactS3Client(s3Config);
        const res = await s3.uploadFile(file, UniqId());
        image = res.key;
    }
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation addBrand($brandInput: BrandInput!) {
                addBrand(brandInput: $brandInput) {
                  success
                  message
                }
            }`,
        variables: {
            brandInput: {
                name: data.name,
                image: image,
                description: data.description
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
                    type: CREATE_BRAND_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: CREATE_BRAND_SUCCESS,
                    payload: {
                        createBrand: res.data.data.addBrand
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

//Get brand action
export const getBrand = () => async (dispatch: Dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `query getBrands {
                getBrands(brandPrams: {}) {
                    success
                    brands {
                        id
                        name
                        image
                        description
                        slug
                    }
                }
            }`
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: GET_BRAND_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_BRAND_SUCCESS,
                    payload: {
                        getBrands: res.data.data.getBrands
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

//Delete brand action
export const deleteBrand = (id: string, imageUrl: string) => async (dispatch: Dispatch) => {
    dispatch({ type: DELETE_BRAND_LOADING })
    if (imageUrl) {
        const s3 = new ReactS3Client(s3Config);
        await s3.deleteFile(imageUrl);
    }
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation deleteBrand {
                deleteBrand(id: "${id}") {
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
                    type: DELETE_BRAND_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: DELETE_BRAND_SUCCESS,
                    payload: {
                        deleteBrand: res.data.data.deleteBrand
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

//Get single brand
export const getSingleBrand = (slug: string) => async (dispatch: Dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `query getBrand {
                getBrand(slug: "${slug}") {
                    id
                    name
                    image
                    description
                }
            }`
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: GET_SINGLE_BRAND_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_SINGLE_BRAND_SUCCESS,
                    payload: {
                        getBrand: res.data.data.getBrand
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

//Update brand action and types
interface UpdateData {
    name: string;
    description: string;
}
interface Prams {
    id: string;
    imageUrl: string;
}
export const updateBrand = (data: UpdateData, file: File, prams: Prams) => async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_BRAND_LOADING })
    let image: string = "";
    if (file) {
        if (prams.imageUrl) {
            const s3 = new ReactS3Client(s3Config);
            await s3.deleteFile(prams.imageUrl);
        }
        const s3 = new ReactS3Client(s3Config);
        const res = await s3.uploadFile(file, UniqId());
        image = res.key;
    }
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation updateBrand($updateBrandId: ID!, $updateBrandInput: UpdateBrandInput!) {
                updateBrand(id: $updateBrandId, updateBrandInput: $updateBrandInput) {
                  success
                  message
                }
            }`,
        variables: {
            updateBrandId: prams.id,
            updateBrandInput: {
                name: data.name,
                image: image,
                description: data.description
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
                    type: UPDATE_BRAND_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: UPDATE_BRAND_SUCCESS,
                    payload: {
                        updateBrand: res.data.data.updateBrand
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