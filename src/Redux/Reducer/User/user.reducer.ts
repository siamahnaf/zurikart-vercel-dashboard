import { AnyAction } from "@reduxjs/toolkit";
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

//Get refund initial and types
interface User {
    id: string;
    name: string;
    phone: string;
    email: string;
    avatar: string;
    verified: boolean;
    role: string;
}
interface GetUserInitial {
    success?: boolean | null;
    message?: string;
    usersData?: User[]
}
//--//
const getUserInitial: GetUserInitial = {
    usersData: []
}
//--//
export const getUserListReducer = (state = getUserInitial, action: AnyAction) => {
    switch (action.type) {
        case GET_USER_LIST_SUCCESS:
            return {
                success: action.payload.getUsers.success,
                usersData: action.payload.getUsers.users
            }
        case GET_USER_LIST_FAILED:
            return {
                message: action.payload.message,
                success: false
            }
        default:
            return state
    }
}

//Delete user initial state and types
interface DeleteUserInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const deleteUserInitial: DeleteUserInitial = {
    loading: false
}
//--//
export const deleteUserReducer = (state = deleteUserInitial, action: AnyAction) => {
    switch (action.type) {
        case DELETE_USER_LOADING:
            return {
                loading: true
            }
        case DELETE_USER_SUCCESS:
            return {
                success: action.payload.delete.success,
                message: action.payload.delete.message,
                loading: false
            }
        case DELETE_USER_FAILED:
            return {
                message: action.payload.message,
                success: false,
                loading: false
            }
        default:
            return state
    }
}

//Change user role
interface ChangeRoleInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const changeRoleInitial: ChangeRoleInitial = {
    loading: false
}
//--//
export const changeRoleReducer = (state = changeRoleInitial, action: AnyAction) => {
    switch (action.type) {
        case CHANGE_USER_ROLE_LOADING:
            return {
                loading: true
            }
        case CHANGE_USER_ROLE_SUCCESS:
            return {
                success: action.payload.changeRole.success,
                message: action.payload.changeRole.message,
                loading: false
            }
        case CHANGE_USER_ROLE_FAILED:
            return {
                message: action.payload.message,
                success: false,
                loading: false
            }
        default:
            return state
    }
}