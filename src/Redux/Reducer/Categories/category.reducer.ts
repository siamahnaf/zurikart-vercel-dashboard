import { AnyAction } from "@reduxjs/toolkit";
import {
    //Create category
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_LOADING,
    CREATE_CATEGORY_FAILED,
    //Get category
    GET_CATEGORY_LIST_SUCCESS,
    GET_CATEGORY_LIST_FAILED,
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

//Create category initial state and type
interface CreateCategoryInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const createCategoryInitial: CreateCategoryInitial = {
    loading: false
}
//--//
export const createCategoryReducer = (state = createCategoryInitial, action: AnyAction) => {
    switch (action.type) {
        case CREATE_CATEGORY_LOADING:
            return {
                loading: true
            }
        case CREATE_CATEGORY_SUCCESS:
            return {
                success: action.payload.category.success,
                message: action.payload.category.message,
                loading: false
            }
        case CREATE_CATEGORY_FAILED:
            return {
                message: action.payload.message,
                loading: false,
                success: false
            }
        default:
            return state
    }
}


//Get category initial state and type
interface GetCategoryInitial {
    message?: string;
    success?: boolean | null;
    categoriesData?: [{
        id: string;
        name: string;
        slug: string;
        description: string;
        image: string;
    }]
}
//--//
const getCategoryInitial: GetCategoryInitial = {}
//--//
export const getCategoryReducer = (state = getCategoryInitial, action: AnyAction) => {
    switch (action.type) {
        case GET_CATEGORY_LIST_SUCCESS:
            return {
                success: true,
                categoriesData: action.payload.getCategory
            }
        case GET_CATEGORY_LIST_FAILED:
            return {
                message: action.payload.message,
                success: false
            }
        default:
            return state
    }
}

//Delete category initial state and types
interface DeleteCategoryInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const deleteCategoryInitial: DeleteCategoryInitial = {
    loading: false
}
//--//
export const deleteCategoryReducer = (state = deleteCategoryInitial, action: AnyAction) => {
    switch (action.type) {
        case DELETE_CATEGORY_LOADING:
            return {
                loading: true
            }
        case DELETE_CATEGORY_SUCCESS:
            return {
                success: action.payload.deleteCategory.success,
                message: action.payload.deleteCategory.message,
                loading: false
            }
        case DELETE_CATEGORY_FAILED:
            return {
                message: action.payload.message,
                success: false,
                loading: false
            }
        default:
            return state
    }
}

//Get single category initial state and types
interface GetSingleCateInitial {
    success?: boolean | null;
    messageErr?: string;
    category?: {
        id: string;
        name: string;
        image: string;
        description: string;
    }
}
//--//
const GetSingleCate: GetSingleCateInitial = {}
//--//
export const getSingleReducer = (state = GetSingleCate, action: AnyAction) => {
    switch (action.type) {
        case GET_SINGLE_CATEGORY_SUCCESS:
            return {
                success: true,
                category: action.payload.getCategory
            }
        case GET_SINGLE_CATEGORY_FAILED:
            return {
                messageErr: action.payload.message,
                success: false
            }
        default:
            return state
    }
}

//Update Category initial state and type
interface UpdateCateInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const updateCateInitial: UpdateCateInitial = {
    loading: false
}
//---//
export const updateCateReducer = (state = updateCateInitial, action: AnyAction) => {
    switch (action.type) {
        case UPDATE_CATEGORY_LOADING:
            return {
                loading: true
            }
        case UPDATE_CATEGORY_SUCCESS:
            return {
                success: action.payload.updateCategory.success,
                message: action.payload.updateCategory.message,
                loading: false
            }
        case UPDATE_CATEGORY_FAILED:
            return {
                message: action.payload.message,
                success: false,
                loading: false
            }
        default:
            return state
    }
}