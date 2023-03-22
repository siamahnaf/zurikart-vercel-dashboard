import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { ImageListType } from "react-images-uploading";
import ReactS3Client from 'react-aws-s3-typescript';
import { UniqId } from "Utilis/Helpers";
import {
    //Update or create site settings
    UPDATE_SITE_FAILED,
    UPDATE_SITE_LOADING,
    UPDATE_SITE_SUCCESS,
    //Get settings
    GET_SITE_FAILED,
    GET_SITE_SUCCESS
} from "Redux/Constant/Sites/site.constant";
import { SERVER_ERROR } from "Redux/Constant/server.constant";

//Types import
import { Inputs } from "Types/SiteInput.types";

//S3 Configure
const s3Config = {
    bucketName: process.env.NEXT_PUBLIC_BUCKET_NAME as string,
    dirName: "Site-settings",
    region: process.env.NEXT_PUBLIC_REGION as string,
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ID as string
}

//--//
interface ImageFile {
    logos: ImageListType;
    siteIcon: ImageListType;
    ogImage: ImageListType;
}
interface ImageUrl {
    logo: string;
    icon: string;
    ogImage: string;
}
//--//
export const updateSites = (data: Inputs, imageFiles: ImageFile, url: ImageUrl) => async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_SITE_LOADING })
    let logo: string = url.logo;
    if (imageFiles.logos.length > 0) {
        const s3 = new ReactS3Client(s3Config);
        const res = await s3.uploadFile(imageFiles.logos[0].file as File, UniqId());
        logo = res.key;
        if (url.logo) {
            const s3 = new ReactS3Client(s3Config);
            await s3.deleteFile(url.logo);
        }
    }
    let siteIcon: string = url.icon;
    if (imageFiles.siteIcon.length > 0) {
        const s3 = new ReactS3Client(s3Config);
        const res = await s3.uploadFile(imageFiles.siteIcon[0].file as File, UniqId());
        siteIcon = res.key;
        if (url.icon) {
            const s3 = new ReactS3Client(s3Config);
            await s3.deleteFile(url.icon);
        }
    }
    let ogImage: string = url.ogImage;
    if (imageFiles.ogImage.length > 0) {
        const s3 = new ReactS3Client(s3Config);
        const res = await s3.uploadFile(imageFiles.ogImage[0].file as File, UniqId());
        ogImage = res.key;
        if (url.ogImage) {
            const s3 = new ReactS3Client(s3Config);
            await s3.deleteFile(url.ogImage);
        }
    }
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation siteSetting($siteInput: SiteInput!) {
                siteSettings(siteInput: $siteInput) {
                  success
                  message
                }
            }`,
        variables: {
            siteInput: {
                logo: logo,
                icon: siteIcon,
                siteTitle: data.siteTitle,
                slogan: data.slogan,
                seo: {
                    metaTitle: data.metaTitle,
                    metaDescription: data.metaDescription,
                    metaTag: data.metaTags,
                    siteUrl: data.siteUrl,
                    ogTitle: data.ogTitle,
                    ogDescription: data.ogDescription,
                    ogImage: ogImage
                },
                additionInfo: {
                    email: data.email,
                    phone: data.phone,
                    corporateOffice: data.corporateAddress,
                    headOffice: data.headAddress
                },
                social: {
                    facebook: data.facebookUrl,
                    instagram: data.instagramUrl,
                    youtube: data.youtubeUrl,
                    twitter: data.twitterUrl,
                    linkedIn: data.linkedinUrl
                }
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
                    type: UPDATE_SITE_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: UPDATE_SITE_SUCCESS,
                    payload: {
                        create: res.data.data.siteSettings
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

//Get site settings
export const getSiteSetting = () => async (dispatch: Dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `query getSiteSettings {
                getSiteSettings {
                    id
                    logo
                    icon
                    siteTitle
                    slogan
                    seo {
                        metaTitle
                        metaDescription
                        metaTag
                        siteUrl
                        ogTitle
                        ogDescription
                        ogImage
                    }
                    additionInfo {
                        email
                        phone
                        corporateOffice
                        headOffice
                    }
                    social {
                        facebook
                        instagram
                        youtube
                        twitter
                        linkedIn
                    }
                }
            }`
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: GET_SITE_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_SITE_SUCCESS,
                    payload: {
                        getSite: res.data.data.getSiteSettings
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