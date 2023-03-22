import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
    //Create tags
    CREATE_TAG_LOADING,
    CREATE_TAG_FAILED,
    CREATE_TAG_SUCCESS,
    //Get Tags
    GET_TAGS_SUCCESS,
    GET_TAGS_FAILED,
    //Delete Tags
    DELETE_TAGS_LOADING,
    DELETE_TAGS_FAILED,
    DELETE_TAGS_SUCCESS,
    //Get tag
    GET_SINGLE_TAG_SUCCESS,
    GET_SINGLE_TAG_FAILED,
    //Update Tag
    UPDATE_TAGS_LOADING,
    UPDATE_TAGS_SUCCESS,
    UPDATE_TAGS_FAILED
} from "Redux/Constant/Tags/tag.constant";
import { SERVER_ERROR } from "Redux/Constant/server.constant";

//Create Tag action and types
interface CreateData {
    name: string;
    description: string;
}
//--//
export const createTag = (data: CreateData) => async (dispatch: Dispatch) => {
    dispatch({ type: CREATE_TAG_LOADING });
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation addTag($tagInput: TagInput!) {
                addTag(tagInput: $tagInput) {
                  success
                  message
                }
            }`,
        variables: {
            tagInput: {
                name: data.name,
                description: data.description
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
                    type: CREATE_TAG_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: CREATE_TAG_SUCCESS,
                    payload: {
                        createTag: res.data.data.addTag
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

//Get Tags action and types
export const getTags = () => async (dispatch: Dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `query getTags {
                getTags(tagPrams: {}) {
                    success
                    tags {
                        id
                        name
                        slug
                        description
                    }
                }
            }`
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: GET_TAGS_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_TAGS_SUCCESS,
                    payload: {
                        getTags: res.data.data.getTags
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

//Delete tags action
export const deleteTag = (id: string) => async (dispatch: Dispatch) => {
    dispatch({ type: DELETE_TAGS_LOADING })
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation deleteTag {
                deleteTag(id: "${id}") {
                    success
                    message
                }
            }`
    }, {
        headers: {
            'Authorization': `Bearer ${token as string}`
        }
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: DELETE_TAGS_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: DELETE_TAGS_SUCCESS,
                    payload: {
                        deleteTag: res.data.data.deleteTag
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

//Get single tag action
export const getSingleTag = (slug: string) => async (dispatch: Dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `query getTag {
                getTag(slug: "${slug}") {
                    id
                    name
                    description
                }
            }`
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: GET_SINGLE_TAG_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_SINGLE_TAG_SUCCESS,
                    payload: {
                        getTag: res.data.data.getTag
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

//Update tag action and types
interface UpdateData {
    name: string;
    description: string;
}
//--//
export const updateTag = (data: UpdateData, id: string) => async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_TAGS_LOADING });
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation updateTag($updateTagId: ID!, $updateTagInput: UpdateTagInput!) {
                updateTag(id: $updateTagId, updateTagInput: $updateTagInput) {
                  success
                  message
                }
            }`,
        variables: {
            updateTagId: id,
            updateTagInput: {
                name: data.name,
                description: data.description
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
                    type: UPDATE_TAGS_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: UPDATE_TAGS_SUCCESS,
                    payload: {
                        updateTag: res.data.data.updateTag
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