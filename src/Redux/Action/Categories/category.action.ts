import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import ReactS3Client from "react-aws-s3-typescript";
import { UniqId } from "Utilis/Helpers";
import {
    //Create category
    CREATE_CATEGORY_LOADING,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAILED,
    //Get category list
    GET_CATEGORY_LIST_FAILED,
    GET_CATEGORY_LIST_SUCCESS,
    //Delete category
    DELETE_CATEGORY_LOADING,
    DELETE_CATEGORY_FAILED,
    DELETE_CATEGORY_SUCCESS,
    //Get single category
    GET_SINGLE_CATEGORY_SUCCESS,
    GET_SINGLE_CATEGORY_FAILED,
    //Update Category
    UPDATE_CATEGORY_LOADING,
    UPDATE_CATEGORY_FAILED,
    UPDATE_CATEGORY_SUCCESS
} from "Redux/Constant/Categories/category.constant";
import { SERVER_ERROR } from "Redux/Constant/server.constant";


//S3 Configure
const s3Config = {
    bucketName: process.env.NEXT_PUBLIC_BUCKET_NAME as string,
    dirName: "Categories",
    region: process.env.NEXT_PUBLIC_REGION as string,
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ID as string
}

//Create Category action and types
interface CategoryData {
    name: string;
    description: string;
}
//--//
export const createCategory = (data: CategoryData, file: File) => async (dispatch: Dispatch) => {
    dispatch({ type: CREATE_CATEGORY_LOADING })
    let image: string = "";
    if (file) {
        const s3 = new ReactS3Client(s3Config);
        const res = await s3.uploadFile(file, UniqId());
        image = res.key;
        console.log(res);
    }
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation addCategory($categoryInput: CategoryInput!) {
                addCategory(categoryInput: $categoryInput) {
                  success
                  message
                }
            }`,
        variables: {
            categoryInput: {
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
                    type: CREATE_CATEGORY_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: CREATE_CATEGORY_SUCCESS,
                    payload: {
                        category: res.data.data.addCategory
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

//Get Category list
export const getAllCategory = (token: string) => async (dispatch: Dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `query getCategories {
                getCategories {
                    id
                    name
                    slug
                    image
                    description
                }
            }`
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: GET_CATEGORY_LIST_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_CATEGORY_LIST_SUCCESS,
                    payload: {
                        getCategory: res.data.data.getCategories
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

//Delete Category action and types
export const deleteCategory = (id: string, imageUrl: string) => async (dispatch: Dispatch) => {
    console.log(imageUrl);
    dispatch({ type: DELETE_CATEGORY_LOADING });
    if (imageUrl) {
        const s3 = new ReactS3Client(s3Config);
        await s3.deleteFile(imageUrl);
    }
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation deleteCategory {
                deleteCategory(id: "${id}") {
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
                    type: DELETE_CATEGORY_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: DELETE_CATEGORY_SUCCESS,
                    payload: {
                        deleteCategory: res.data.data.deleteCategory
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

//Get single category action
export const getSingleCategory = (slug: string, token: string) => async (dispatch: Dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `query getCategory {
                getCategory(slug: "${slug}") {
                    id
                    name
                    image
                    description
                }
            }`
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: GET_SINGLE_CATEGORY_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_SINGLE_CATEGORY_SUCCESS,
                    payload: {
                        getCategory: res.data.data.getCategory
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

//Update category action and types
interface UpdateData {
    name: string;
    description: string;
}
interface Prams {
    id: string;
    imageUrl: string;
}
//--//
export const updateCategory = (data: UpdateData, file: File, prams: Prams) => async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_CATEGORY_LOADING })
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
            `mutation updateCategory($updateCateInput: UpdateCateInput!, $updateCategoryId: ID!) {
                updateCategory(updateCateInput: $updateCateInput, id: $updateCategoryId) {
                  success
                  message
                }
            }`,
        variables: {
            updateCateInput: {
                name: data.name,
                image: image,
                description: data.description
            },
            updateCategoryId: prams.id
        }
    }, {
        headers: {
            'Authorization': `Bearer ${token as string}`
        }
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: UPDATE_CATEGORY_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: UPDATE_CATEGORY_SUCCESS,
                    payload: {
                        updateCategory: res.data.data.updateCategory
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