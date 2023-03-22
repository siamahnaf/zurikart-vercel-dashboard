import { AnyAction } from "@reduxjs/toolkit";
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
    //Get single sub category
    GET_SINGLE_SUB_CATE_SUCCESS,
    GET_SINGLE_SUB_CATE_FAILED,
    UPDATE_SUB_CATEGORY_LOADING,
    UPDATE_SUB_CATEGORY_FAILED,
    UPDATE_SUB_CATEGORY_SUCCESS
} from "Redux/Constant/SubCategories/sub.constant";

//Create sub category initial and types
interface CreateSubInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const createSubInitial: CreateSubInitial = {
    loading: false
}
//--//
export const createSubCateReducer = (state = createSubInitial, action: AnyAction) => {
    switch (action.type) {
        case CREATE_SUB_CATEGORY_LOADING:
            return {
                loading: true
            }
        case CREATE_SUB_CATEGORY_SUCCESS:
            return {
                success: action.payload.subcategory.success,
                message: action.payload.subcategory.message,
                loading: false
            }
        case CREATE_SUB_CATEGORY_FAILED:
            return {
                message: action.payload.message,
                loading: false,
                success: false
            }
        default:
            return state
    }
}

//Get sub category initial state and types
interface GetSubInitial {
    success?: boolean | null;
    message?: string;
    subcategoryData?: [{
        id: string;
        name: string;
        image: string;
        slug: string;
        category: {
            name: string;
        }
    }]
}
//--//
const getSubInitial: GetSubInitial = {}
//--//
export const getSubAllReducer = (state = getSubInitial, action: AnyAction) => {
    switch (action.type) {
        case GET_ALL_SUB_CATEGORY_SUCCESS:
            return {
                success: true,
                subcategoryData: action.payload.subcategories
            }
        case GET_ALL_SUB_CATEGORY_FAILED:
            return {
                message: action.payload.message,
                success: false
            }
        default:
            return state
    }
}

//Delete sub category initial and types
interface DeleteSubInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const deleteSubInitial: DeleteSubInitial = {
    loading: false
}
//--//
export const deleteSubReducer = (state = deleteSubInitial, action: AnyAction) => {
    switch (action.type) {
        case DELETE_SUB_CATEGORY_LOADING:
            return {
                loading: true
            }
        case DELETE_SUB_CATEGORY_SUCCESS:
            return {
                success: action.payload.delete.success,
                message: action.payload.delete.message,
                loading: false
            }
        case DELETE_SUB_CATEGORY_FAILED:
            return {
                message: action.payload.message,
                success: false,
                loading: false
            }
        default:
            return state
    }
}

//Get single sub category initial and types
interface GetSingleSubInitial {
    success?: boolean | null;
    messageErr?: string;
    subcategory?: {
        id: string;
        name: string;
        image: string;
        category: {
            id: string;
            name: string;
        }
    }
}
//--//
const getSingleSubInitial: GetSingleSubInitial = {}
//--//
export const getSingleSubReducer = (state = getSingleSubInitial, action: AnyAction) => {
    switch (action.type) {
        case GET_SINGLE_SUB_CATE_SUCCESS:
            return {
                success: true,
                subcategory: action.payload.singleSub
            }
        case GET_SINGLE_SUB_CATE_FAILED:
            return {
                messageErr: action.payload.message,
                success: false
            }
        default:
            return state
    }
}

//Update sub category initial and types
interface UpdateSubInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const updateSubInitial: UpdateSubInitial = {
    loading: false
}
//---//
export const updateSubReducer = (state = updateSubInitial, action: AnyAction) => {
    switch (action.type) {
        case UPDATE_SUB_CATEGORY_LOADING:
            return {
                loading: true
            }
        case UPDATE_SUB_CATEGORY_SUCCESS:
            return {
                success: action.payload.updateSub.success,
                message: action.payload.updateSub.message,
                loading: false
            }
        case UPDATE_SUB_CATEGORY_FAILED:
            return {
                message: action.payload.message,
                success: false,
                loading: false
            }
        default:
            return state
    }
}