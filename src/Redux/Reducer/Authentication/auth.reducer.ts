import { AnyAction } from "@reduxjs/toolkit";
import {
    //User login constant
    USER_LOGIN_LOADING,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
    //Password reset constant
    PASSWORD_RESET_LOADING,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAILED,
    //New password constant
    NEW_PASSWORD_LOADING,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAILED,
    //Get profile constant
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILED
} from "Redux/Constant/Authentication/auth.constant";

//Login Initial state and types
interface LoginInitialState {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
    token?: string;
    expire?: string;
}
//--//
const loginInitialState: LoginInitialState = {
    loading: false
}
//--//
export const loginReducer = (state = loginInitialState, action: AnyAction) => {
    switch (action.type) {
        case USER_LOGIN_LOADING:
            return {
                loading: true
            }
        case USER_LOGIN_SUCCESS:
            return {
                success: action.payload.login.success,
                message: action.payload.login.message,
                token: action.payload.login.token,
                expire: action.payload.login.expire,
                loading: false
            }
        case USER_LOGIN_FAILED:
            return {
                message: action.payload.message,
                loading: false,
                success: false
            }
        default:
            return state
    }
}

//Password reset initial state and types
interface ResetInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
    phone?: string;
}
//--//
const resetInitial: ResetInitial = {
    loading: false
}
//--//
export const resetReducer = (state = resetInitial, action: AnyAction) => {
    switch (action.type) {
        case PASSWORD_RESET_LOADING:
            return {
                loading: true
            }
        case PASSWORD_RESET_SUCCESS:
            return {
                success: action.payload.reset.success,
                message: action.payload.reset.message,
                phone: action.payload.reset.phone,
                loading: false
            }
        case PASSWORD_RESET_FAILED:
            return {
                message: action.payload.message,
                loading: false,
                success: false
            }
        default:
            return state
    }
}

//New password initial state and type
interface PasswordInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const passwordInitial: PasswordInitial = {
    loading: false
}
//--//
export const passwordReducer = (state = passwordInitial, action: AnyAction) => {
    switch (action.type) {
        case NEW_PASSWORD_LOADING:
            return {
                loading: true
            }
        case NEW_PASSWORD_SUCCESS:
            return {
                success: action.payload.resetPassword.success,
                message: action.payload.resetPassword.message,
                loading: false
            }
        case NEW_PASSWORD_FAILED:
            return {
                message: action.payload.message,
                loading: false,
                success: false
            }
        default:
            return state
    }
}

//Get profile initial state and types
interface ProfileInitial {
    success?: boolean | null;
    message?: string;
    profile?: {
        id: string;
        name: string;
        phone: string;
        email: string;
        avatar: string;
        role: string;
    }
}
//--//
const profileInitial: ProfileInitial = {}
//--//
export const profileReducer = (state = profileInitial, action: AnyAction) => {
    switch (action.type) {
        case GET_PROFILE_SUCCESS:
            return {
                success: true,
                profile: action.payload.profile
            }
        case GET_PROFILE_FAILED:
            return {
                message: action.payload.message,
                success: false
            }
        default:
            return state
    }
}