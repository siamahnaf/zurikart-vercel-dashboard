import { AnyAction } from "@reduxjs/toolkit";
import {
    //Create attribute
    CREATE_ATTRIBUTE_LOADING,
    CREATE_ATTRIBUTE_FAILED,
    CREATE_ATTRIBUTE_SUCCESS,
    //Get attributes
    GET_ATTRIBUTES_SUCCESS,
    GET_ATTRIBUTES_FAILED,
    //Delete attributes
    DELETE_ATTRIBUTES_SUCCESS,
    DELETE_ATTRIBUTES_FAILED,
    DELETE_ATTRIBUTES_LOADING,
    //Get attributes
    GET_SINGLE_ATTR_SUCCESS,
    GET_SINGLE_ATTR_FAILED,
    //Update attributes
    UPDATE_ATTRIBUTE_LOADING,
    UPDATE_ATTRIBUTE_FAILED,
    UPDATE_ATTRIBUTE_SUCCESS
} from "Redux/Constant/Attributes/attribute.constant";

//Create tag initial and types
interface CreateAttributeInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const createAttributeInitial: CreateAttributeInitial = {
    loading: false
}
//--//
export const createAttributeReducer = (state = createAttributeInitial, action: AnyAction) => {
    switch (action.type) {
        case CREATE_ATTRIBUTE_LOADING:
            return {
                loading: true
            }
        case CREATE_ATTRIBUTE_SUCCESS:
            return {
                success: action.payload.add.success,
                message: action.payload.add.message,
                loading: false
            }
        case CREATE_ATTRIBUTE_FAILED:
            return {
                message: action.payload.message,
                loading: false,
                success: false
            }
        default:
            return state
    }
}

//Get attribute initial and types
interface Values {
    value: string;
    meta: string;
}
interface Attribute {
    id: string;
    name: string;
    slug: string;
    values: Values[]
}
interface GetAttributeInitial {
    success?: boolean | null;
    message?: string;
    attributesData?: Attribute[]
}
//--//
const getAttributeInitial: GetAttributeInitial = {
    attributesData: []
}
//--//
export const getAttributeReducer = (state = getAttributeInitial, action: AnyAction) => {
    switch (action.type) {
        case GET_ATTRIBUTES_SUCCESS:
            return {
                success: true,
                attributesData: action.payload.gets
            }
        case GET_ATTRIBUTES_FAILED:
            return {
                message: action.payload.message,
                success: false
            }
        default:
            return state
    }
}

//Delete Attribute initial and types
interface DeleteAttributeInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const deleteAttributeInitial: DeleteAttributeInitial = {
    loading: false
}
//--//
export const deleteAttributeReducer = (state = deleteAttributeInitial, action: AnyAction) => {
    switch (action.type) {
        case DELETE_ATTRIBUTES_LOADING:
            return {
                loading: true
            }
        case DELETE_ATTRIBUTES_SUCCESS:
            return {
                success: action.payload.delete.success,
                message: action.payload.delete.message,
                loading: false
            }
        case DELETE_ATTRIBUTES_FAILED:
            return {
                message: action.payload.message,
                success: false,
                loading: false
            }
        default:
            return state
    }
}


//Get attribute tag initial and types
interface GetSingleInitial {
    success?: boolean | null;
    messageErr?: string;
    attributes?: {
        id?: string;
        name?: string;
        values?: Values[];
    }
}
//--//
const getSingleInitial: GetSingleInitial = { attributes: {} }
//--//
export const getSingleAttrReducer = (state = getSingleInitial, action: AnyAction) => {
    switch (action.type) {
        case GET_SINGLE_ATTR_SUCCESS:
            return {
                success: true,
                attributes: action.payload.get
            }
        case GET_SINGLE_ATTR_FAILED:
            return {
                messageErr: action.payload.message,
                success: false
            }
        default:
            return state
    }
}

//Update attribute initial and types
interface UpdateAttributeInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const updateAttributeInitial: UpdateAttributeInitial = {
    loading: false
};
//--//
export const updateAttributeReducer = (state = updateAttributeInitial, action: AnyAction) => {
    switch (action.type) {
        case UPDATE_ATTRIBUTE_LOADING:
            return {
                loading: true
            }
        case UPDATE_ATTRIBUTE_SUCCESS:
            return {
                success: action.payload.update.success,
                message: action.payload.update.message,
                loading: false
            }
        case UPDATE_ATTRIBUTE_FAILED:
            return {
                message: action.payload.message,
                success: false,
                loading: false
            }
        default:
            return state
    }
}