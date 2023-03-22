import { AnyAction } from "@reduxjs/toolkit";
import {
    //Create product
    CREATE_PRODUCTS_LOADING,
    CREATE_PRODUCTS_FAILED,
    CREATE_PRODUCTS_SUCCESS,
    //Get products
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILED,
    //Delete products
    DELETE_PRODUCTS_LOADING,
    DELETE_PRODUCTS_FAILED,
    DELETE_PRODUCTS_SUCCESS,
    //Get single products
    GET_SINGLE_PRODUCTS_SUCCESS,
    GET_SINGLE_PRODUCTS_FAILED,
    //Update products
    UPDATE_PRODUCTS_FAILED,
    UPDATE_PRODUCTS_LOADING,
    UPDATE_PRODUCTS_SUCCESS
} from "Redux/Constant/Products/products.constant";

//Create product initial and types
interface CreateProductInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const createProductInitial: CreateProductInitial = {
    loading: false
}
//--//
export const createProductReducer = (state = createProductInitial, action: AnyAction) => {
    switch (action.type) {
        case CREATE_PRODUCTS_LOADING:
            return {
                loading: true
            }
        case CREATE_PRODUCTS_SUCCESS:
            return {
                success: action.payload.create.success,
                message: action.payload.create.message,
                loading: false
            }
        case CREATE_PRODUCTS_FAILED:
            return {
                message: action.payload.message,
                loading: false,
                success: false
            }
        default:
            return state
    }
}

//Get products initial and types
interface Url {
    url: string
}
interface Products {
    id: string;
    name: string;
    slug: string;
    category: {
        name: string;
    };
    brand: {
        name: string;
    };
    meta: {
        image: string;
    };
    productImages: Url[];
    price: number;
    quantity: number;
    visibility: boolean;
}
interface GetProductsInitial {
    success?: boolean | null;
    message?: string;
    productsData?: Products[]
}
//--//
const getProductsInitial: GetProductsInitial = {
    productsData: []
}
//--//
export const getProductsReducer = (state = getProductsInitial, action: AnyAction) => {
    switch (action.type) {
        case GET_PRODUCTS_SUCCESS:
            return {
                success: action.payload.getProducts.success,
                productsData: action.payload.getProducts.products
            }
        case GET_PRODUCTS_FAILED:
            return {
                message: action.payload.message,
                success: false
            }
        default:
            return state
    }
}

//Delete product initial state and types
interface DeleteProductInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const deleteProductInitial: DeleteProductInitial = {
    loading: false
}
//--//
export const deleteProductReducer = (state = deleteProductInitial, action: AnyAction) => {
    switch (action.type) {
        case DELETE_PRODUCTS_LOADING:
            return {
                loading: true
            }
        case DELETE_PRODUCTS_SUCCESS:
            return {
                success: action.payload.delete.success,
                message: action.payload.delete.message,
                loading: false
            }
        case DELETE_PRODUCTS_FAILED:
            return {
                message: action.payload.message,
                success: false,
                loading: false
            }
        default:
            return state
    }
}

//Get single products initial and types
interface SubcategoryAndTags {
    value: string;
    label: string;
}
interface Attributes {
    variant: string;
    price: number;
    quantity: number;
    image: string;
}
interface Specification {
    title: string;
    value: string;
}
interface GetProductInitial {
    success?: boolean | null;
    messageErr?: string;
    product?: {
        id?: string;
        name?: string;
        category?: {
            value: string;
            label: string;
        };
        subCategory?: SubcategoryAndTags[];
        brand?: {
            value: string
            label: string;
        };
        unit?: string;
        minPurchase?: string;
        tag?: SubcategoryAndTags[];
        refundAble?: string;
        productImages?: Url[];
        youtubeLink?: string;
        price?: number;
        discount?: number;
        discountUnit?: string;
        quantity?: number;
        description?: string;
        visibility?: boolean;
        attributes?: Attributes[];
        specification?: Specification[];
        doorDeliveryFee?: number;
        pickupFee?: number;
        meta?: {
            title: string;
            description: string;
            image: string;
        }
        flash?: {
            value: string;
            label: string;
        },
        showStock?: boolean;
        tax?: number;
        taxUnit?: string;
        disclaimer?: string;
    }
}
//--//
const getProductInitial: GetProductInitial = { product: {} }
//--//
export const getSingleProductReducer = (state = getProductInitial, action: AnyAction) => {
    switch (action.type) {
        case GET_SINGLE_PRODUCTS_SUCCESS:
            return {
                success: true,
                product: action.payload.get
            }
        case GET_SINGLE_PRODUCTS_FAILED:
            return {
                messageErr: action.payload.message,
                success: false
            }
        default:
            return state
    }
}

//Update products initial state and type
interface UpdateProductInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const updateProductInitial: UpdateProductInitial = {
    loading: false
}
//---//
export const updateProductReducer = (state = updateProductInitial, action: AnyAction) => {
    switch (action.type) {
        case UPDATE_PRODUCTS_LOADING:
            return {
                loading: true
            }
        case UPDATE_PRODUCTS_SUCCESS:
            return {
                success: action.payload.update.success,
                message: action.payload.update.message,
                loading: false
            }
        case UPDATE_PRODUCTS_FAILED:
            return {
                message: action.payload.message,
                success: false,
                loading: false
            }
        default:
            return state
    }
}