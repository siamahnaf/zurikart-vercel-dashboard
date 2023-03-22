import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import {
    //User login success
    USER_LOGIN_LOADING,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
    //Password Reset Constant
    PASSWORD_RESET_LOADING,
    PASSWORD_RESET_FAILED,
    PASSWORD_RESET_SUCCESS,
    //New Password Constant
    NEW_PASSWORD_LOADING,
    NEW_PASSWORD_FAILED,
    NEW_PASSWORD_SUCCESS,
    //Get Profile
    GET_PROFILE_FAILED,
    GET_PROFILE_SUCCESS
} from "Redux/Constant/Authentication/auth.constant";
import { SERVER_ERROR } from "Redux/Constant/server.constant";


//Login Action and Data Types
interface LoginData {
    phoneOrEmail: string;
    password: string;
}
//---//
export const login = (data: LoginData) => async (dispatch: Dispatch) => {
    dispatch({ type: USER_LOGIN_LOADING })
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation loginAdmin {
                loginAdmin(loginInput: {
                    phoneOrEmail: "${data.phoneOrEmail}"
                    password: "${data.password}"
                }) {
                    success
                    message
                    token
                    expire
                }
            }`
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: USER_LOGIN_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: USER_LOGIN_SUCCESS,
                    payload: {
                        login: res.data.data.loginAdmin
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

//Password reset action and data
interface ResetData {
    phone: string;
}
//--//
export const resetAction = (data: ResetData) => async (dispatch: Dispatch) => {
    dispatch({ type: PASSWORD_RESET_LOADING })
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation forgetPassword{
                forgetPassword(forgetPasswordInput: {
                    phone: "88${data.phone}"
                }) {
                    success
                    message
                    phone
                }
            }`
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: PASSWORD_RESET_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: PASSWORD_RESET_SUCCESS,
                    payload: {
                        reset: res.data.data.forgetPassword
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

//New Password action and data
interface PasswordData {
    code: string;
    password: string;
    new_password: string;
}
//--//
export const passwordAction = (data: PasswordData, phone: string) => async (dispatch: Dispatch) => {
    dispatch({ type: NEW_PASSWORD_LOADING });
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation resetPassword {
                resetPassword(resetPasswordInput: {
                    phone: "${phone}"
                    code: "${data.code}"
                    password: "${data.password}"
                }) {
                    success
                    message
                }
            }`
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: NEW_PASSWORD_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: NEW_PASSWORD_SUCCESS,
                    payload: {
                        resetPassword: res.data.data.resetPassword
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

//Check Token is Valid
export const checkToken = (token: string) => async (dispatch: Dispatch) => {
    if (token) {
        const { data } = await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
            query: `
            mutation checkToken {
                checkToken {
                  success
                  message
                }
              }
            `
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (data.data?.checkToken?.success === true) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }

}

//Get Profile action
export const getProfile = (token: string) => async (dispatch: Dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `query getProfile {
                getProfile {
                    id
                    name
                    phone
                    email
                    avatar
                    role
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
                    type: GET_PROFILE_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_PROFILE_SUCCESS,
                    payload: {
                        profile: res.data.data.getProfile
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