import { AnyAction } from "@reduxjs/toolkit";
import {
    //Create
    CREATE_BANNERS_LOADING,
    CREATE_BANNERS_FAILED,
    CREATE_BANNERS_SUCCESS,
    //Create sliders
    CREATE_SLIDERS_LOADING,
    CREATE_SLIDERS_FAILED,
    CREATE_SLIDERS_SUCCESS,
    ADD_DYNAMIC_BANNER_SUCCESS,
    ADD_DYNAMIC_BANNER_FAILED,
    ADD_DYNAMIC_BANNER_LOADING,
    GET_DYNAMIC_BANNER_SUCCESS,
    GET_DYNAMIC_BANNER_FAILED,
    CREATE_GALLERY_SUCCESS,
    CREATE_GALLERY_LOADING,
    CREATE_GALLERY_FAILED,
    SAVE_ARTICLES_SUCCESS,
    SAVE_ARTICLES_FAILED,
    SAVE_ARTICLES_LOADING,
    GET_ARTICLES_FAILED,
    GET_ARTICLES_SUCCESS,
    //Get banners
    GET_BANNERS_FAILED,
    GET_BANNERS_SUCCESS,
    //Get sliders
    GET_SLIDERS_FAILED,
    GET_SLIDERS_SUCCESS,
    GET_GALLERY_SUCCESS,
    GET_GALLERY_FAILED,
    //Delete banners
    DELETE_BANNERS_FAILED,
    DELETE_BANNERS_LOADING,
    DELETE_BANNERS_SUCCESS,
    //Delete slider
    DELETE_SLIDERS_FAILED,
    DELETE_SLIDERS_LOADING,
    DELETE_SLIDERS_SUCCESS,
    ADD_SECTIONS_LOADING,
    ADD_SECTIONS_SUCCESS,
    ADD_SECTIONS_FAILED,
    //Get Sections
    GET_ALL_SECTIONS_FAILED,
    GET_ALL_SECTIONS_SUCCESS,
    //Get single section
    GET_SINGLE_SEC_FAILED,
    GET_SINGLE_SEC_SUCCESS,
    DELETE_GALLERY_LOADING,
    DELETE_GALLERY_SUCCESS,
    DELETE_GALLERY_FAILED,
    //Update single section
    UPDATE_SECTIONS_FAILED,
    UPDATE_SECTIONS_LOADING,
    UPDATE_SECTIONS_SUCCESS,
    DELETE_DYNAMIC_SUCCESS,
    DELETE_DYNAMIC_FAILED,
    DELETE_DYNAMIC_LOADING,
    GET_SINGLE_DYNAMIC_SUCCESS,
    GET_SINGLE_DYNAMIC_FAILED,
    UPDATE_DYNAMIC_BANNER_SUCCESS,
    UPDATE_DYNAMIC_BANNER_FAILED,
    UPDATE_DYNAMIC_BANNER_LOADING
} from "Redux/Constant/Home/home.constant";

//Create banner initial state and type
interface CreateBannerInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const createBannerInitial: CreateBannerInitial = {
    loading: false
}
//--//
export const createBannerReducer = (state = createBannerInitial, action: AnyAction) => {
    switch (action.type) {
        case CREATE_BANNERS_LOADING:
            return {
                loading: true
            }
        case CREATE_BANNERS_SUCCESS:
            return {
                success: action.payload.add.success,
                message: action.payload.add.message,
                loading: false
            }
        case CREATE_BANNERS_FAILED:
            return {
                message: action.payload.message,
                loading: false,
                success: false
            }
        default:
            return state
    }
}

//Create banner initial state and type
interface CreateGalleryInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const createGalleryInitial: CreateGalleryInitial = {
    loading: false
}
//--//
export const createGalleryReducer = (state = createGalleryInitial, action: AnyAction) => {
    switch (action.type) {
        case CREATE_GALLERY_LOADING:
            return {
                loading: true
            }
        case CREATE_GALLERY_SUCCESS:
            return {
                success: action.payload.add.success,
                message: action.payload.add.message,
                loading: false
            }
        case CREATE_GALLERY_FAILED:
            return {
                message: action.payload.message,
                loading: false,
                success: false
            }
        default:
            return state
    }
}

//Create slider initial state and type
interface CreateSliderInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const createSliderInitial: CreateSliderInitial = {
    loading: false
}
//--//
export const createSliderReducer = (state = createSliderInitial, action: AnyAction) => {
    switch (action.type) {
        case CREATE_SLIDERS_LOADING:
            return {
                loading: true
            }
        case CREATE_SLIDERS_SUCCESS:
            return {
                success: action.payload.add.success,
                message: action.payload.add.message,
                loading: false
            }
        case CREATE_SLIDERS_FAILED:
            return {
                message: action.payload.message,
                loading: false,
                success: false
            }
        default:
            return state
    }
}

//Get banner initial and types
interface Banner {
    id: string;
    name: string;
    banner: string;
}
interface GetBannerInitial {
    success?: boolean | null;
    message?: string;
    bannersData?: Banner[]
}
//--//
const getBannerInitial: GetBannerInitial = {
    bannersData: []
}
//--//
export const getBannerReducer = (state = getBannerInitial, action: AnyAction) => {
    switch (action.type) {
        case GET_BANNERS_SUCCESS:
            return {
                success: true,
                bannersData: action.payload.getBanners
            }
        case GET_BANNERS_FAILED:
            return {
                message: action.payload.message,
                success: false
            }
        default:
            return state
    }
}

interface GetGalleryInitial {
    success?: boolean | null;
    message?: string;
    galleryData?: Banner[]
}
//--//
const getGalleryInitial: GetGalleryInitial = {
    galleryData: []
}
//--//
export const getGalleryReducer = (state = getGalleryInitial, action: AnyAction) => {
    switch (action.type) {
        case GET_GALLERY_SUCCESS:
            return {
                success: true,
                galleryData: action.payload.getGallery
            }
        case GET_GALLERY_FAILED:
            return {
                message: action.payload.message,
                success: false
            }
        default:
            return state
    }
}


//Get slider initial and types
interface Slider {
    id: string;
    name: string;
    slider: string;
}
interface GetSliderInitial {
    success?: boolean | null;
    message?: string;
    sliderData?: Slider[]
}
//--//
const getSliderInitial: GetSliderInitial = {
    sliderData: []
}
//--//
export const getSliderReducer = (state = getSliderInitial, action: AnyAction) => {
    switch (action.type) {
        case GET_SLIDERS_SUCCESS:
            return {
                success: true,
                sliderData: action.payload.getSliders
            }
        case GET_SLIDERS_FAILED:
            return {
                message: action.payload.message,
                success: false
            }
        default:
            return state
    }
}

//Delete banners initial and types
interface DeleteBannerInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const deleteBanner: DeleteBannerInitial = {
    loading: false
}
//--//
export const deleteBannerReducer = (state = deleteBanner, action: AnyAction) => {
    switch (action.type) {
        case DELETE_BANNERS_LOADING:
            return {
                loading: true
            }
        case DELETE_BANNERS_SUCCESS:
            return {
                success: action.payload.delete.success,
                message: action.payload.delete.message,
                loading: false
            }
        case DELETE_BANNERS_FAILED:
            return {
                message: action.payload.message,
                success: false,
                loading: false
            }
        default:
            return state
    }
}

//Delete banners initial and types
interface DeleteGalleryInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const deleteGallery: DeleteGalleryInitial = {
    loading: false
}
//--//
export const deleteGalleryReducer = (state = deleteGallery, action: AnyAction) => {
    switch (action.type) {
        case DELETE_GALLERY_LOADING:
            return {
                loading: true
            }
        case DELETE_GALLERY_SUCCESS:
            return {
                success: action.payload.delete.success,
                message: action.payload.delete.message,
                loading: false
            }
        case DELETE_GALLERY_FAILED:
            return {
                message: action.payload.message,
                success: false,
                loading: false
            }
        default:
            return state
    }
}

//Delete sliders initial and types
interface DeleteSliderInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const deleteSlider: DeleteSliderInitial = {
    loading: false
}
//--//
export const deleteSliderReducer = (state = deleteSlider, action: AnyAction) => {
    switch (action.type) {
        case DELETE_SLIDERS_LOADING:
            return {
                loading: true
            }
        case DELETE_SLIDERS_SUCCESS:
            return {
                success: action.payload.delete.success,
                message: action.payload.delete.message,
                loading: false
            }
        case DELETE_SLIDERS_FAILED:
            return {
                message: action.payload.message,
                success: false,
                loading: false
            }
        default:
            return state
    }
}

//Get section initial and types
interface Section {
    id: string;
    name: string;
    description: string;
    publish: boolean;
    category1: {
        name: string;
    }
    category2: {
        name: string;
    }
}
interface GetSectionInitial {
    success?: boolean | null;
    message?: string;
    sectionData?: Section[]
}
//--//
const getSectionsInitial: GetSectionInitial = {
    sectionData: []
}
//--//
export const getSectionReducer = (state = getSectionsInitial, action: AnyAction) => {
    switch (action.type) {
        case GET_ALL_SECTIONS_SUCCESS:
            return {
                success: true,
                sectionData: action.payload.getSections
            }
        case GET_ALL_SECTIONS_SUCCESS:
            return {
                message: action.payload.message,
                success: false
            }
        default:
            return state
    }
}


//Get section initial and types
interface GetSingleSecInitial {
    success?: boolean | null;
    messageErr?: string;
    sections?: {
        id?: string;
        name?: string;
        description?: string;
        publish?: boolean;
        category1?: {
            id: string;
            name: string;
        }
        category2?: {
            id: string;
            name: string;
        }
        banner?: string;
        bannerUrl?: string;
    }
}
//--//
const getSingleSecInitial: GetSingleSecInitial = { sections: {} }
//--//
export const getSingleSecReducer = (state = getSingleSecInitial, action: AnyAction) => {
    switch (action.type) {
        case GET_SINGLE_SEC_SUCCESS:
            return {
                success: true,
                sections: action.payload.getSingle
            }
        case GET_SINGLE_SEC_FAILED:
            return {
                messageErr: action.payload.message,
                success: false
            }
        default:
            return state
    }
}


//Update section initial and types
interface UpdateSectionInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const updateSectionInitial: UpdateSectionInitial = {
    loading: false
};
//--//
export const updateSectionReducer = (state = updateSectionInitial, action: AnyAction) => {
    switch (action.type) {
        case UPDATE_SECTIONS_LOADING:
            return {
                loading: true
            }
        case UPDATE_SECTIONS_SUCCESS:
            return {
                success: action.payload.update.success,
                message: action.payload.update.message,
                loading: false
            }
        case UPDATE_SECTIONS_FAILED:
            return {
                message: action.payload.message,
                success: false,
                loading: false
            }
        default:
            return state
    }
}


//Update section initial and types
interface ADDSectionInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const AddSectionInitial: ADDSectionInitial = {
    loading: false
};
//--//
export const addSectionReducer = (state = AddSectionInitial, action: AnyAction) => {
    switch (action.type) {
        case ADD_SECTIONS_LOADING:
            return {
                loading: true
            }
        case ADD_SECTIONS_SUCCESS:
            return {
                success: action.payload.add.success,
                message: action.payload.add.message,
                loading: false
            }
        case ADD_SECTIONS_FAILED:
            return {
                message: action.payload.message,
                success: false,
                loading: false
            }
        default:
            return state
    }
}


//Create banner initial state and type
interface AddDynamicBannerInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const addDynamicBannerInitial: AddDynamicBannerInitial = {
    loading: false
}
//--//
export const addDynamicBannerReducer = (state = addDynamicBannerInitial, action: AnyAction) => {
    switch (action.type) {
        case ADD_DYNAMIC_BANNER_LOADING:
            return {
                loading: true
            }
        case ADD_DYNAMIC_BANNER_SUCCESS:
            return {
                success: action.payload.add.success,
                message: action.payload.add.message,
                loading: false
            }
        case ADD_DYNAMIC_BANNER_FAILED:
            return {
                message: action.payload.message,
                loading: false,
                success: false
            }
        default:
            return state
    }
}


//Get section initial and types
interface DynamicBanner {
    id: string;
    title: string;
    bannerType: string;
    publish: boolean;
    totalNumber: string;
    section: {
        name: string;
        id: string;
    }
}
interface GetDynamicBanner {
    success?: boolean | null;
    message?: string;
    dynamicData?: DynamicBanner[]
}
//--//
const getDynamicBannerInitial: GetDynamicBanner = {}
//--//
export const getDynamicBannerReducer = (state = getDynamicBannerInitial, action: AnyAction) => {
    switch (action.type) {
        case GET_DYNAMIC_BANNER_SUCCESS:
            return {
                success: true,
                dynamicData: action.payload.getDynamic
            }
        case GET_DYNAMIC_BANNER_FAILED:
            return {
                message: action.payload.message,
                success: false
            }
        default:
            return state
    }
}


//Create banner initial state and type
interface DeleteDynamicBannerInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const deleteDynamicBannerInitial: DeleteDynamicBannerInitial = {
    loading: false
}
//--//
export const deleteDynamicBannerReducer = (state = deleteDynamicBannerInitial, action: AnyAction) => {
    switch (action.type) {
        case DELETE_DYNAMIC_LOADING:
            return {
                loading: true
            }
        case DELETE_DYNAMIC_SUCCESS:
            return {
                success: action.payload.delete.success,
                message: action.payload.delete.message,
                loading: false
            }
        case DELETE_DYNAMIC_FAILED:
            return {
                message: action.payload.message,
                loading: false,
                success: false
            }
        default:
            return state
    }
}


//Create banner initial state and type
interface updateDynamicBannerInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const updateDynamicBannerInitial: updateDynamicBannerInitial = {
    loading: false
}
//--//
export const updateDynamicBannerReducer = (state = updateDynamicBannerInitial, action: AnyAction) => {
    switch (action.type) {
        case UPDATE_DYNAMIC_BANNER_LOADING:
            return {
                loading: true
            }
        case UPDATE_DYNAMIC_BANNER_SUCCESS:
            return {
                success: action.payload.update.success,
                message: action.payload.update.message,
                loading: false
            }
        case UPDATE_DYNAMIC_BANNER_FAILED:
            return {
                message: action.payload.message,
                loading: false,
                success: false
            }
        default:
            return state
    }
}

//Get section initial and types
interface BannersTypes {
    url: string;
    text: string;
    link: string;
}
interface SingleDynamicBanner {
    id: string;
    title: string;
    bannerType: string;
    publish: boolean;
    totalNumber: string;
    banners: BannersTypes
    section: {
        name: string;
        id: string;
    }
}
interface SingleDynamicBannerInitial {
    success?: boolean | null;
    message?: string;
    dynamics?: SingleDynamicBanner
}
//--//
const singleDynamicBannerInitial: SingleDynamicBannerInitial = {}
//--//
export const singleDynamicBannerReducer = (state = singleDynamicBannerInitial, action: AnyAction) => {
    switch (action.type) {
        case GET_SINGLE_DYNAMIC_SUCCESS:
            return {
                success: true,
                dynamics: action.payload.getDynamic
            }
        case GET_SINGLE_DYNAMIC_FAILED:
            return {
                message: action.payload.message,
                success: false
            }
        default:
            return state
    }
}




//Create banner initial state and type
interface SaveArticlesInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const saveArticlesInitial: SaveArticlesInitial = {
    loading: false
}
//--//
export const saveArticlesReducer = (state = saveArticlesInitial, action: AnyAction) => {
    switch (action.type) {
        case SAVE_ARTICLES_LOADING:
            return {
                loading: true
            }
        case SAVE_ARTICLES_SUCCESS:
            return {
                success: action.payload.save.success,
                message: action.payload.save.message,
                loading: false
            }
        case SAVE_ARTICLES_FAILED:
            return {
                message: action.payload.message,
                loading: false,
                success: false
            }
        default:
            return state
    }
}


interface ArticlesDesc {
    description: string;
}
interface GetArticlesInitial {
    success?: boolean | null;
    message?: string;
    articles?: ArticlesDesc
}
//--//
const getArticlesInitial: GetArticlesInitial = {}
//--//
export const getArticlesReducer = (state = getArticlesInitial, action: AnyAction) => {
    switch (action.type) {
        case GET_ARTICLES_SUCCESS:
            return {
                success: true,
                articles: action.payload.getArticles
            }
        case GET_ARTICLES_FAILED:
            return {
                message: action.payload.message,
                success: false
            }
        default:
            return state
    }
}