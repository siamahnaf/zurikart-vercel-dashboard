import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import ReactS3Client from 'react-aws-s3-typescript';
import { UniqId } from "Utilis/Helpers";
import {
    //Update profile
    UPDATE_PROFILE_FAILED,
    UPDATE_PROFILE_LOADING,
    UPDATE_PROFILE_SUCCESS,
    //Update Password
    UPDATE_PASSWORD_LOADING,
    UPDATE_PASSWORD_FAILED,
    UPDATE_PASSWORD_SUCCESS,
    //Get Dashboard
    GET_DASHBOARD_SUCCESS,
    GET_DASHBOARD_FAILED
} from "Redux/Constant/Profile/profile.constant";
import { SERVER_ERROR } from "Redux/Constant/server.constant";

//S3 Configure
const s3Config = {
    bucketName: process.env.NEXT_PUBLIC_BUCKET_NAME as string,
    dirName: "Profile",
    region: process.env.NEXT_PUBLIC_REGION as string,
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ID as string
}


//Update profile action and types
interface UpdateData {
    name: string;
    email: string;
}
export const updateProfile = (data: UpdateData, file: File, url: string) => async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_PROFILE_LOADING })
    let image: string = url;
    if (file) {
        const s3 = new ReactS3Client(s3Config);
        const res = await s3.uploadFile(file, UniqId());
        image = res.key;
        if (url) {
            const s3 = new ReactS3Client(s3Config);
            await s3.deleteFile(url);
        }
    }
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation update {
                updateProfile(updateUserInput: {
                    name: "${data.name}"
                    avatar: "${image}"
                    email: "${data.email}"
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
                    type: UPDATE_PROFILE_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: UPDATE_PROFILE_SUCCESS,
                    payload: {
                        update: res.data.data.updateProfile
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


//Update password
interface PasswordData {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}
export const updatePassword = (data: PasswordData) => async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_PASSWORD_LOADING })
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation changePassword {
                chanegPassword(changePasswordInput: {
                    oldPassword: "${data.oldPassword}"
                    newPassword: "${data.newPassword}"
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
                    type: UPDATE_PASSWORD_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: UPDATE_PASSWORD_SUCCESS,
                    payload: {
                        update: res.data.data.chanegPassword
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

//Get dashboard
export const getDashboard = (token: string) => async (dispatch: Dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `query getDashboard {
                getDashboard{
                    totalProduct
                    totalUser
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
                    type: GET_DASHBOARD_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_DASHBOARD_SUCCESS,
                    payload: {
                        dashboard: res.data.data.getDashboard
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