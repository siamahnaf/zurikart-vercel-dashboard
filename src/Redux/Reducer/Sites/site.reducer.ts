import { AnyAction } from "@reduxjs/toolkit";
import {
    //Create site settings
    UPDATE_SITE_FAILED,
    UPDATE_SITE_LOADING,
    UPDATE_SITE_SUCCESS,
    //Get site
    GET_SITE_FAILED,
    GET_SITE_SUCCESS
} from "Redux/Constant/Sites/site.constant";

//Create flashes initial and types
interface CreateSiteInitial {
    success?: boolean | null;
    loading?: boolean;
    message?: string;
}
//--//
const createSiteInitial: CreateSiteInitial = {
    loading: false
}
//--//
export const updateSiteReducer = (state = createSiteInitial, action: AnyAction) => {
    switch (action.type) {
        case UPDATE_SITE_LOADING:
            return {
                loading: true
            }
        case UPDATE_SITE_SUCCESS:
            return {
                success: action.payload.create.success,
                message: action.payload.create.message,
                loading: false
            }
        case UPDATE_SITE_FAILED:
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
interface GetSiteInitial {
    message?: string;
    success?: boolean | null;
    sitesData?: {
        id: string;
        logo: string;
        icon: string;
        siteTitle: string;
        slogan: string;
        seo: {
            metaTitle: string;
            metaDescription: string;
            metaTag: string[];
            siteUrl: string;
            ogTitle: string;
            ogDescription: string;
            ogImage: string;
        }
        additionInfo: {
            email: string;
            phone: string;
            corporateOffice: string;
            headOffice: string;
        }
        social: {
            facebook: string;
            instagram: string;
            youtube: string;
            twitter: string;
            linkedIn: string;
        }
    }
}
//--//
const getSiteInitial: GetSiteInitial = {}
//--//
export const getSiteReducer = (state = getSiteInitial, action: AnyAction) => {
    switch (action.type) {
        case GET_SITE_SUCCESS:
            return {
                success: true,
                sitesData: action.payload.getSite
            }
        case GET_SITE_FAILED:
            return {
                message: action.payload.message,
                success: false
            }
        default:
            return state
    }
}