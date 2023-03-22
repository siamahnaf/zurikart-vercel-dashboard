import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import ReactS3Client from "react-aws-s3-typescript";
import { UniqId } from "Utilis/Helpers";
import {
    //Create sub category
    CREATE_SUB_CATEGORY_LOADING,
    CREATE_SUB_CATEGORY_SUCCESS,
    CREATE_SUB_CATEGORY_FAILED,
    //Get sub category
    GET_ALL_SUB_CATEGORY_SUCCESS,
    GET_ALL_SUB_CATEGORY_FAILED,
    //Delete sub category
    DELETE_SUB_CATEGORY_LOADING,
    DELETE_SUB_CATEGORY_SUCCESS,
    DELETE_SUB_CATEGORY_FAILED,
    //Get Single sub category
    GET_SINGLE_SUB_CATE_SUCCESS,
    GET_SINGLE_SUB_CATE_FAILED,
    UPDATE_SUB_CATEGORY_LOADING,
    UPDATE_SUB_CATEGORY_SUCCESS,
    UPDATE_SUB_CATEGORY_FAILED
} from "Redux/Constant/SubCategories/sub.constant";
import { SERVER_ERROR } from "Redux/Constant/server.constant";

//S3 Configure
const s3Config = {
    bucketName: process.env.NEXT_PUBLIC_BUCKET_NAME as string,
    dirName: "Subcategories",
    region: process.env.NEXT_PUBLIC_REGION as string,
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ID as string
}

//Create sub category action and types
interface CreateSubData {
    name: string;
    category: string;
}
//--//
export const createSubCategory = (data: CreateSubData, file: File) => async (dispatch: Dispatch) => {
    dispatch({ type: CREATE_SUB_CATEGORY_LOADING })
    let image: string = "";
    if (file) {
        const s3 = new ReactS3Client(s3Config);
        const res = await s3.uploadFile(file, UniqId());
        image = res.key;
    }
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation addSubCategory {
                addSubCategory(subCategoryInput: {
                    name: "${data.name}"
                    image: "${image}"
                    category: "${data.category}"
                }) {
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
                    type: CREATE_SUB_CATEGORY_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: CREATE_SUB_CATEGORY_SUCCESS,
                    payload: {
                        subcategory: res.data.data.addSubCategory
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


//Get sub category action and types
export const getSubCategory = (token: string) => async (dispatch: Dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `query getSubCategories {
                getSubCategories {
                  id
                  name
                  image
                  slug
                  category {
                    id
                    name
                  }
                }
            }`
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: GET_ALL_SUB_CATEGORY_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_ALL_SUB_CATEGORY_SUCCESS,
                    payload: {
                        subcategories: res.data.data.getSubCategories
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


//Delete Sub category action and types
export const deleteSubCategory = (id: string, imageUrl: string) => async (dispatch: Dispatch) => {
    dispatch({ type: DELETE_SUB_CATEGORY_LOADING })
    if (imageUrl) {
        const s3 = new ReactS3Client(s3Config);
        await s3.deleteFile(imageUrl);
    }
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation deleteSubCategory {
                deleteSubCategory(id: "${id}") {
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
                    type: DELETE_SUB_CATEGORY_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: DELETE_SUB_CATEGORY_SUCCESS,
                    payload: {
                        delete: res.data.data.deleteSubCategory
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


//Get Single sub category action
export const getSingleSubCate = (slug: string) => async (dispatch: Dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `query getSubCategory {
                getSubCategory(slug: "${slug}") {
                  id
                  name
                  image
                  category {
                    id
                    name
                  }
                }
            }`
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: GET_SINGLE_SUB_CATE_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_SINGLE_SUB_CATE_SUCCESS,
                    payload: {
                        singleSub: res.data.data.getSubCategory
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

//Update subcategory action and types
interface UpdateData {
    name: string;
    category: string;
}
interface Prams {
    id: string;
    imageUrl: string;
}
//--//
export const updateSubCategory = (data: UpdateData, file: File, prams: Prams) => async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_SUB_CATEGORY_LOADING })
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
            `mutation updateSubCategory {
                updateSubCategory(
                  updateSubInput: {
                    name: "${data.name}"
                    image: "${image}"
                    category: "${data.category}"
                  }
                  id: "${prams.id}"
                ) {
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
                    type: UPDATE_SUB_CATEGORY_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: UPDATE_SUB_CATEGORY_SUCCESS,
                    payload: {
                        updateSub: res.data.data.updateSubCategory
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