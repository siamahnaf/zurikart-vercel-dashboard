import { AnyAction } from "@reduxjs/toolkit";
import {
    //Get profile
    UPDATE_PROFILE_FAILED,
    UPDATE_PROFILE_LOADING,
    UPDATE_PROFILE_SUCCESS,
    //Update password
    UPDATE_PASSWORD_LOADING,
    UPDATE_PASSWORD_FAILED,
    UPDATE_PASSWORD_SUCCESS,
    //Get dashboard
    GET_DASHBOARD_SUCCESS,
    GET_DASHBOARD_FAILED
} from "Redux/Constant/Profile/profile.constant";

//Update profile initial and types
interface UpdateProfileInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const updateProfileInitial: UpdateProfileInitial = {
    loading: false
}
//--//
export const updateProfileReducer = (state = updateProfileInitial, action: AnyAction) => {
    switch (action.type) {
        case UPDATE_PROFILE_LOADING:
            return {
                loading: true
            }
        case UPDATE_PROFILE_SUCCESS:
            return {
                success: action.payload.update.success,
                message: action.payload.update.message,
                loading: false
            }
        case UPDATE_PROFILE_FAILED:
            return {
                message: action.payload.message,
                loading: false,
                success: false
            }
        default:
            return state
    }
}


//Update password initial and types
interface UpdatePasswordInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const updatePasswordInitial: UpdatePasswordInitial = {
    loading: false
}
//--//
export const updatePasswordReducer = (state = updatePasswordInitial, action: AnyAction) => {
    switch (action.type) {
        case UPDATE_PASSWORD_LOADING:
            return {
                loading: true
            }
        case UPDATE_PASSWORD_SUCCESS:
            return {
                success: action.payload.update.success,
                message: action.payload.update.message,
                loading: false
            }
        case UPDATE_PASSWORD_FAILED:
            return {
                message: action.payload.message,
                loading: false,
                success: false
            }
        default:
            return state
    }
}

//Get dashboard initial and types
interface GetDashboardInitial {
    success?: boolean | null;
    messageErr?: string;
    dashboardData?: {
        totalProduct: number;
        totalUser: number;
    }
}
//--//
const GetDashboard: GetDashboardInitial = {}
//--//
export const getDashboardReducer = (state = GetDashboard, action: AnyAction) => {
    switch (action.type) {
        case GET_DASHBOARD_SUCCESS:
            return {
                success: true,
                dashboardData: action.payload.dashboard
            }
        case GET_DASHBOARD_FAILED:
            return {
                messageErr: action.payload.message,
                success: false
            }
        default:
            return state
    }
}