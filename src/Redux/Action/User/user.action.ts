import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import ReactS3Client from "react-aws-s3-typescript";
import {
    //Get user list
    GET_USER_LIST_FAILED,
    GET_USER_LIST_SUCCESS,
    //Delete user
    DELETE_USER_FAILED,
    DELETE_USER_LOADING,
    DELETE_USER_SUCCESS,
    //Change user role
    CHANGE_USER_ROLE_FAILED,
    CHANGE_USER_ROLE_LOADING,
    CHANGE_USER_ROLE_SUCCESS
} from "Redux/Constant/User/user.constant";
import { SERVER_ERROR } from "Redux/Constant/server.constant";

//S3 Configure
const s3Config = {
    bucketName: process.env.NEXT_PUBLIC_BUCKET_NAME as string,
    dirName: "Profile",
    region: process.env.NEXT_PUBLIC_REGION as string,
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ID as string
}

//Get user list action and types
export const getUsersList = (token: string, search: string) => async (dispatch: Dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `query getUsers {
                getUsers(userPrams: { search: "${search}" }) {
                  success
                  users {
                    id
                    name
                    phone
                    email
                    avatar
                    verified
                    role
                  }
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
                    type: GET_USER_LIST_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_USER_LIST_SUCCESS,
                    payload: {
                        getUsers: res.data.data.getUsers
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

//Delete user action and types
export const deleteUser = (id: string, imageUrl: string) => async (dispatch: Dispatch) => {
    dispatch({ type: DELETE_USER_LOADING });
    if (imageUrl) {
        const s3 = new ReactS3Client(s3Config);
        await s3.deleteFile(imageUrl);
    }
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation deleteUser {
                deleteUser(id: "${id}") {
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
                    type: DELETE_USER_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: DELETE_USER_SUCCESS,
                    payload: {
                        delete: res.data.data.deleteUser
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

//Change user role action
export const changeUserRole = (id: string, role: string) => async (dispatch: Dispatch) => {
    dispatch({ type: CHANGE_USER_ROLE_LOADING })
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation changeRole {
                changeRole(roleInput: {
                    id: "${id}"
                    role: "${role}"
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
                    type: CHANGE_USER_ROLE_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: CHANGE_USER_ROLE_SUCCESS,
                    payload: {
                        changeRole: res.data.data.changeRole
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