import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
    //Create attribute
    CREATE_ATTRIBUTE_LOADING,
    CREATE_ATTRIBUTE_SUCCESS,
    CREATE_ATTRIBUTE_FAILED,
    //Get attributes
    GET_ATTRIBUTES_SUCCESS,
    GET_ATTRIBUTES_FAILED,
    //Delete attributes
    DELETE_ATTRIBUTES_LOADING,
    DELETE_ATTRIBUTES_SUCCESS,
    DELETE_ATTRIBUTES_FAILED,
    //Get single attributes
    GET_SINGLE_ATTR_SUCCESS,
    GET_SINGLE_ATTR_FAILED,
    //Update
    UPDATE_ATTRIBUTE_SUCCESS,
    UPDATE_ATTRIBUTE_FAILED,
    UPDATE_ATTRIBUTE_LOADING
} from "Redux/Constant/Attributes/attribute.constant";
import { SERVER_ERROR } from "Redux/Constant/server.constant";

//Create attribute action and types
interface Values {
    value: string;
    meta: string;
}
interface CreateData {
    name: string;
    values: Values[]
}
//--//
export const createAttribute = (data: CreateData) => async (dispatch: Dispatch) => {
    dispatch({ type: CREATE_ATTRIBUTE_LOADING })
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation addAttribute($attributeInput: AttributeInput!) {
                addAttribute(attributeInput: $attributeInput) {
                    success
                    message
                }
            }`,
        variables: {
            attributeInput: {
                name: data.name,
                values: data.values
            }
        }
    }, {
        headers: {
            'Authorization': `Bearer ${token as string}`
        }
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: CREATE_ATTRIBUTE_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: CREATE_ATTRIBUTE_SUCCESS,
                    payload: {
                        add: res.data.data.addAttribute
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

//Get attributes action and types
export const getAttributes = (token: string) => async (dispatch: Dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `query getAttributes {
                getAttributes {
                    id
                    name
                    slug
                    values {
                        value
                        meta
                    }
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
                    type: GET_ATTRIBUTES_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_ATTRIBUTES_SUCCESS,
                    payload: {
                        gets: res.data.data.getAttributes
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

//Delete attributes action and types
export const deleteAttribute = (id: string) => async (dispatch: Dispatch) => {
    dispatch({ type: DELETE_ATTRIBUTES_LOADING })
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation deleteAttribute {
                deleteAttribute(id: "${id}") {
                    success
                    message
    }
            }`
    }, {
        headers: {
            'Authorization': `Bearer ${token as string} `
        }
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: DELETE_ATTRIBUTES_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: DELETE_ATTRIBUTES_SUCCESS,
                    payload: {
                        delete: res.data.data.deleteAttribute
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

//Get single attribute and types
export const getSingleAttribute = (token: string, slug: string) => async (dispatch: Dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `query getAttribute {
                getAttribute(slug: "${slug}") {
                  id
                  name
                  values {
                    value
                    meta
                  }
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
                    type: GET_SINGLE_ATTR_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_SINGLE_ATTR_SUCCESS,
                    payload: {
                        get: res.data.data.getAttribute
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

//Update attribute action and types
interface UpdateData {
    name: string;
    values: Values[]
}
//--//
export const updateAttribute = (data: UpdateData, id: string) => async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_ATTRIBUTE_LOADING })
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation updateAttribute($updateAttributeInput: UpdateAttributeInput!, $updateAttributeId: ID!) {
                updateAttribute(updateAttributeInput: $updateAttributeInput, id: $updateAttributeId) {
                    success
                    message
                }
            }`,
        variables: {
            updateAttributeInput: {
                name: data.name,
                values: data.values
            },
            updateAttributeId: id
        }
    }, {
        headers: {
            'Authorization': `Bearer ${token as string}`
        }
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: UPDATE_ATTRIBUTE_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: UPDATE_ATTRIBUTE_SUCCESS,
                    payload: {
                        update: res.data.data.updateAttribute
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