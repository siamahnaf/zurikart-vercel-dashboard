import { AnyAction } from "@reduxjs/toolkit";
import {
    //Create brand
    CREATE_BRAND_LOADING,
    CREATE_BRAND_FAILED,
    CREATE_BRAND_SUCCESS,
    //Get brand
    GET_BRAND_SUCCESS,
    GET_BRAND_FAILED,
    //Delete brand
    DELETE_BRAND_LOADING,
    DELETE_BRAND_FAILED,
    DELETE_BRAND_SUCCESS,
    //Get brand
    GET_SINGLE_BRAND_SUCCESS,
    GET_SINGLE_BRAND_FAILED,
    //Update Brand
    UPDATE_BRAND_LOADING,
    UPDATE_BRAND_FAILED,
    UPDATE_BRAND_SUCCESS
} from "Redux/Constant/Brands/brand.constant";

//Create brand initial and types
interface CreateBrandInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const createBrandInitial: CreateBrandInitial = {
    loading: false
}
//--//
export const createBrandReducer = (state = createBrandInitial, action: AnyAction) => {
    switch (action.type) {
        case CREATE_BRAND_LOADING:
            return {
                loading: true
            }
        case CREATE_BRAND_SUCCESS:
            return {
                success: action.payload.createBrand.success,
                message: action.payload.createBrand.message,
                loading: false
            }
        case CREATE_BRAND_FAILED:
            return {
                message: action.payload.message,
                loading: false,
                success: false
            }
        default:
            return state
    }
}

//Get brand initial and types
interface GetBrandInitial {
    success?: boolean | null;
    message?: string;
    brandsData?: [{
        id: string;
        name: string;
        image: string;
        description: string;
        slug: string;
    }]
}
//--//
const getBrandInitial: GetBrandInitial = {};
//--//
export const getBrandReducer = (state = getBrandInitial, action: AnyAction) => {
    switch (action.type) {
        case GET_BRAND_SUCCESS:
            return {
                success: action.payload.getBrands.success,
                brandsData: action.payload.getBrands.brands
            }
        case GET_BRAND_FAILED:
            return {
                message: action.payload.message,
                success: false
            }
        default:
            return state
    }
}

//Delete brand initial and types
interface DeleteBrandInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const deleteBrand: DeleteBrandInitial = {
    loading: false
}
//--//
export const deleteBrandReducer = (state = deleteBrand, action: AnyAction) => {
    switch (action.type) {
        case DELETE_BRAND_LOADING:
            return {
                loading: true
            }
        case DELETE_BRAND_SUCCESS:
            return {
                success: action.payload.deleteBrand.success,
                message: action.payload.deleteBrand.message,
                loading: false
            }
        case DELETE_BRAND_FAILED:
            return {
                message: action.payload.message,
                success: false,
                loading: false
            }
        default:
            return state
    }
}

//Get single brand initial and types
interface Brand {

}
interface GetSingleBrandInitial {
    success?: boolean | null;
    messageErr?: string;
    brand?: {
        id?: string;
        name?: string;
        image?: string;
        description?: string;
    }
}
//--//
const getSingleBrandInitial: GetSingleBrandInitial = { brand: {} };
//--//
export const getSingleBrandReducer = (state = getSingleBrandInitial, action: AnyAction) => {
    switch (action.type) {
        case GET_SINGLE_BRAND_SUCCESS:
            return {
                success: true,
                brand: action.payload.getBrand
            }
        case GET_SINGLE_BRAND_FAILED:
            return {
                messageErr: action.payload.message,
                success: false
            }
        default:
            return state
    }
}

//Update Brand initial state and type
interface UpdateBrandInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const updateBrandInitial: UpdateBrandInitial = {
    loading: false
}
//---//
export const updateBrandReducer = (state = updateBrandInitial, action: AnyAction) => {
    switch (action.type) {
        case UPDATE_BRAND_LOADING:
            return {
                loading: true
            }
        case UPDATE_BRAND_SUCCESS:
            return {
                success: action.payload.updateBrand.success,
                message: action.payload.updateBrand.message,
                loading: false
            }
        case UPDATE_BRAND_FAILED:
            return {
                message: action.payload.message,
                success: false,
                loading: false
            }
        default:
            return state
    }
}