import { AnyAction } from "@reduxjs/toolkit";
import {
    //Create tag
    CREATE_TAG_LOADING,
    CREATE_TAG_FAILED,
    CREATE_TAG_SUCCESS,
    //Get tags
    GET_TAGS_SUCCESS,
    GET_TAGS_FAILED,
    //Delete tags
    DELETE_TAGS_LOADING,
    DELETE_TAGS_FAILED,
    DELETE_TAGS_SUCCESS,
    //Get single tags
    GET_SINGLE_TAG_SUCCESS,
    GET_SINGLE_TAG_FAILED,
    //Update tags
    UPDATE_TAGS_LOADING,
    UPDATE_TAGS_SUCCESS,
    UPDATE_TAGS_FAILED
} from "Redux/Constant/Tags/tag.constant";


//Create tag initial and types
interface CreateTagInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const createTagInitial: CreateTagInitial = {
    loading: false
}
//--//
export const createTagReducer = (state = createTagInitial, action: AnyAction) => {
    switch (action.type) {
        case CREATE_TAG_LOADING:
            return {
                loading: true
            }
        case CREATE_TAG_SUCCESS:
            return {
                success: action.payload.createTag.success,
                message: action.payload.createTag.message,
                loading: false
            }
        case CREATE_TAG_FAILED:
            return {
                message: action.payload.message,
                loading: false,
                success: false
            }
        default:
            return state
    }
}

//Get tags initial and types
interface Tags {
    id: string;
    name: string;
    slug: string;
    description: string;
}
interface GetTagsInitial {
    success?: boolean | null;
    message?: string;
    tagsData?: Tags[]
}
//--//
const getTagsInitial: GetTagsInitial = {
    tagsData: []
}
//--//
export const getTagsReducer = (state = getTagsInitial, action: AnyAction) => {
    switch (action.type) {
        case GET_TAGS_SUCCESS:
            return {
                success: action.payload.getTags.success,
                tagsData: action.payload.getTags.tags
            }
        case GET_TAGS_FAILED:
            return {
                message: action.payload.message,
                success: false
            }
        default:
            return state
    }
}

//Delete tag initial and types
interface DeleteTagInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const deleteTagInitial: DeleteTagInitial = {
    loading: false
}
//--//
export const deleteTagsReducer = (state = deleteTagInitial, action: AnyAction) => {
    switch (action.type) {
        case DELETE_TAGS_LOADING:
            return {
                loading: true
            }
        case DELETE_TAGS_SUCCESS:
            return {
                success: action.payload.deleteTag.success,
                message: action.payload.deleteTag.message,
                loading: false
            }
        case DELETE_TAGS_FAILED:
            return {
                message: action.payload.message,
                success: false,
                loading: false
            }
        default:
            return state
    }
}

//Get single tag initial and types
interface GetSingleInitial {
    success?: boolean | null;
    messageErr?: string;
    tags?: {
        id?: string;
        name?: string;
        description?: string;
    }
}
//--//
const getSingleInitial: GetSingleInitial = { tags: {} }
//--//
export const getSingleTagReducer = (state = getSingleInitial, action: AnyAction) => {
    switch (action.type) {
        case GET_SINGLE_TAG_SUCCESS:
            return {
                success: true,
                tags: action.payload.getTag
            }
        case GET_SINGLE_TAG_FAILED:
            return {
                messageErr: action.payload.message,
                success: false
            }
        default:
            return state
    }
}

//Update tag initial and types
interface UpdateTagInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const updateTagInitial: UpdateTagInitial = {
    loading: false
};
//--//
export const updateTagReducer = (state = updateTagInitial, action: AnyAction) => {
    switch (action.type) {
        case UPDATE_TAGS_LOADING:
            return {
                loading: true
            }
        case UPDATE_TAGS_SUCCESS:
            return {
                success: action.payload.updateTag.success,
                message: action.payload.updateTag.message,
                loading: false
            }
        case UPDATE_TAGS_FAILED:
            return {
                message: action.payload.message,
                success: false,
                loading: false
            }
        default:
            return state
    }
}