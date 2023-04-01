import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import ReactS3Client from "react-aws-s3-typescript";
import { UniqId } from "Utilis/Helpers";
import {
    //Create banners
    CREATE_BANNERS_FAILED,
    CREATE_BANNERS_LOADING,
    CREATE_BANNERS_SUCCESS,
    ADD_DYNAMIC_BANNER_SUCCESS,
    ADD_DYNAMIC_BANNER_LOADING,
    ADD_DYNAMIC_BANNER_FAILED,
    GET_DYNAMIC_BANNER_SUCCESS,
    GET_DYNAMIC_BANNER_FAILED,
    //Create sliders
    CREATE_SLIDERS_FAILED,
    CREATE_SLIDERS_LOADING,
    CREATE_SLIDERS_SUCCESS,
    CREATE_GALLERY_SUCCESS,
    CREATE_GALLERY_FAILED,
    CREATE_GALLERY_LOADING,
    //Get banners
    GET_BANNERS_FAILED,
    GET_BANNERS_SUCCESS,
    //Get Gallery
    GET_GALLERY_SUCCESS,
    GET_GALLERY_FAILED,
    //Get sliders
    GET_SLIDERS_FAILED,
    GET_SLIDERS_SUCCESS,
    //Delete banners
    DELETE_BANNERS_FAILED,
    DELETE_BANNERS_LOADING,
    DELETE_BANNERS_SUCCESS,
    DELETE_GALLERY_SUCCESS,
    DELETE_GALLERY_LOADING,
    DELETE_GALLERY_FAILED,
    //Delete sliders
    DELETE_SLIDERS_FAILED,
    DELETE_SLIDERS_LOADING,
    DELETE_SLIDERS_SUCCESS,
    SAVE_ARTICLES_SUCCESS,
    SAVE_ARTICLES_FAILED,
    SAVE_ARTICLES_LOADING,
    GET_ARTICLES_FAILED,
    GET_ARTICLES_SUCCESS,
    ADD_SECTIONS_SUCCESS,
    ADD_SECTIONS_FAILED,
    ADD_SECTIONS_LOADING,
    //Get section
    GET_ALL_SECTIONS_FAILED,
    GET_ALL_SECTIONS_SUCCESS,
    //Get single section
    GET_SINGLE_SEC_FAILED,
    GET_SINGLE_SEC_SUCCESS,
    //Update single sections
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
import { SERVER_ERROR } from "Redux/Constant/server.constant";

//S3 Configure
const s3Config = {
    bucketName: process.env.NEXT_PUBLIC_BUCKET_NAME as string,
    dirName: "Home",
    region: process.env.NEXT_PUBLIC_REGION as string,
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ID as string
}

//Create banner action and types
interface CreateData {
    name: string;
    url: string
}
//--//
export const createBanners = (data: CreateData, file: File) => async (dispatch: Dispatch) => {
    dispatch({ type: CREATE_BANNERS_LOADING })
    let image: string = "";
    if (file) {
        const s3 = new ReactS3Client(s3Config);
        const res = await s3.uploadFile(file, UniqId());
        image = res.key;
    }
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation addBanner {
                addBanner(bannerInput: {
                    name: "${data.name}"
                    url: "${data.url}"
                    banner: "${image}"
                }) {
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
                    type: CREATE_BANNERS_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: CREATE_BANNERS_SUCCESS,
                    payload: {
                        add: res.data.data.addBanner
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

//Create slider action and types
interface SliderData {
    name: string;
    url: string
}
//--//
export const createSliders = (data: SliderData, file: File) => async (dispatch: Dispatch) => {
    dispatch({ type: CREATE_SLIDERS_LOADING })
    let image: string = "";
    if (file) {
        const s3 = new ReactS3Client(s3Config);
        const res = await s3.uploadFile(file, UniqId());
        image = res.key;
    }
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation addSlider {
                addSlider(sliderInput: {
                    name: "${data.name}"
                    url: "${data.url}"
                    slider: "${image}"
                }) {
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
                    type: CREATE_SLIDERS_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: CREATE_SLIDERS_SUCCESS,
                    payload: {
                        add: res.data.data.addSlider
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

//Get banners
export const getBanners = () => async (dispatch: Dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `query getBanners {
                getBanners {
                    id
                    name
                    banner
                }
            }`
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: GET_BANNERS_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_BANNERS_SUCCESS,
                    payload: {
                        getBanners: res.data.data.getBanners
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


//Get sliders
export const getSliders = () => async (dispatch: Dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `query getSliders {
                getSliders {
                    id
                    name
                    slider
                }
            }`
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: GET_SLIDERS_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_SLIDERS_SUCCESS,
                    payload: {
                        getSliders: res.data.data.getSliders
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

//Delete banners action and types
export const deleteBanners = (id: string, imageUrl: string) => async (dispatch: Dispatch) => {
    dispatch({ type: DELETE_BANNERS_LOADING });
    if (imageUrl) {
        const s3 = new ReactS3Client(s3Config);
        await s3.deleteFile(imageUrl);
    }
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation deleteBanner {
                deleteBanner(id: "${id}") {
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
                    type: DELETE_BANNERS_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: DELETE_BANNERS_SUCCESS,
                    payload: {
                        delete: res.data.data.deleteBanner
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

//Delete sliders action and types
export const deleteSliders = (id: string, imageUrl: string) => async (dispatch: Dispatch) => {
    dispatch({ type: DELETE_SLIDERS_LOADING });
    if (imageUrl) {
        const s3 = new ReactS3Client(s3Config);
        await s3.deleteFile(imageUrl);
    }
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation deleteSlider {
                deleteSlider(id: "${id}") {
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
                    type: DELETE_SLIDERS_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: DELETE_SLIDERS_SUCCESS,
                    payload: {
                        delete: res.data.data.deleteSlider
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

//Get sections
export const getSections = () => async (dispatch: Dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `query getSection {
                getSections {
                    id
                    name
                    description
                    publish
                    category1 {
                        name
                    }
                    category2 {
                        name
                    }
                }
            }`
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: GET_ALL_SECTIONS_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_ALL_SECTIONS_SUCCESS,
                    payload: {
                        getSections: res.data.data.getSections
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

//Get single sections
export const getSingleSection = (id: string) => async (dispatch: Dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `query getSingleSection{
                getSingleSection(id: "${id}") {
                    id
                    name
                    description
                    publish
                    category1 {
                        id
                        name
                    }
                    category2 {
                        id
                        name
                    }
                    banner
                    bannerUrl
                }
            }`
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: GET_SINGLE_SEC_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_SINGLE_SEC_SUCCESS,
                    payload: {
                        getSingle: res.data.data.getSingleSection
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

//Update sections action and types
interface SectionData {
    name: string;
    description: string;
    category1: string;
    category2: string;
    bannerUrl: string;
    publish: boolean;
}
export const updateSections = (data: SectionData, imageUrl: string, file: File, id: string) => async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_SECTIONS_LOADING });
    let image: string = imageUrl;
    if (file) {
        const s3 = new ReactS3Client(s3Config);
        const res = await s3.uploadFile(file, UniqId());
        image = res.key;
    }
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation updateSection {
                updateSection(sectionInput: {
                    name: "${data.name}"
                    description: "${data.description}"
                    category1: "${data.category1}"
                    category2: "${data.category2}"
                    banner: "${image}"
                    bannerUrl: "${data.bannerUrl}"
                    publish: ${data.publish}
                }, id: "${id}") {
                    success
                    message
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
                    type: UPDATE_SECTIONS_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: UPDATE_SECTIONS_SUCCESS,
                    payload: {
                        update: res.data.data.updateSection
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

export const AddSections = (data: SectionData, file: File) => async (dispatch: Dispatch) => {
    dispatch({ type: ADD_SECTIONS_LOADING })
    let image: string = "";
    if (file) {
        const s3 = new ReactS3Client(s3Config);
        const res = await s3.uploadFile(file, UniqId());
        image = res.key;
    }
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation addSection {
                addSection(sectionInput: {
                    name: "${data.name}"
                    description: "${data.description}"
                    category1: "${data.category1}"
                    category2: "${data.category2}"
                    banner: "${image}"
                    bannerUrl: "${data.bannerUrl}"
                    publish: ${data.publish}
                }) {
                    success
                    message
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
                    type: ADD_SECTIONS_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: ADD_SECTIONS_SUCCESS,
                    payload: {
                        add: res.data.data.addSection
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



export const createGallery = (data: CreateData, file: File) => async (dispatch: Dispatch) => {
    dispatch({ type: CREATE_GALLERY_LOADING })
    let image: string = "";
    if (file) {
        const s3 = new ReactS3Client(s3Config);
        const res = await s3.uploadFile(file, UniqId());
        image = res.key;
    }
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation addGallery {
                addGallery(galleryInput: {
                    name: "${data.name}"
                    url: "${data.url}"
                    gallery: "${image}"
                }) {
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
                    type: CREATE_GALLERY_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: CREATE_GALLERY_SUCCESS,
                    payload: {
                        add: res.data.data.addGallery
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


//Get banners
export const getGallery = () => async (dispatch: Dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `query getGallery {
                getGallery {
                    id
                    name
                    gallery
                }
            }`
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: GET_GALLERY_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_GALLERY_SUCCESS,
                    payload: {
                        getGallery: res.data.data.getGallery
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

export const deleteGallery = (id: string, imageUrl: string) => async (dispatch: Dispatch) => {
    dispatch({ type: DELETE_GALLERY_LOADING });
    if (imageUrl) {
        const s3 = new ReactS3Client(s3Config);
        await s3.deleteFile(imageUrl);
    }
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation deleteGallery {
                deleteGallery(id: "${id}") {
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
                    type: DELETE_GALLERY_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: DELETE_GALLERY_SUCCESS,
                    payload: {
                        delete: res.data.data.deleteGallery
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


//Create banner action and types
interface BannerImage {
    url: string;
    text: string;
    link: string;
}
interface DynamicBanner {
    title: string;
    bannerType: string;
    totalNumber: string;
    publish: boolean;
    section: string;
    banners: BannerImage[]
}
//--//
export const createDynamicBanners = (data: DynamicBanner) => async (dispatch: Dispatch) => {
    dispatch({ type: ADD_DYNAMIC_BANNER_LOADING })
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation addDynamicBanner($dynamicBannerInput: DynamicBannerInput!) {
                addDynamicBanner(dynamicBannerInput: $dynamicBannerInput) {
                  success
                  message
                }
              }`,
        variables: {
            dynamicBannerInput: data
        }
    }, {
        headers: {
            'Authorization': `Bearer ${token as string}`
        }
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: ADD_DYNAMIC_BANNER_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: ADD_DYNAMIC_BANNER_SUCCESS,
                    payload: {
                        add: res.data.data.addDynamicBanner
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



//Get sliders
export const getDynamicBanner = () => async (dispatch: Dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `query getDynamicBanners{
                getDynamicBanners {
                  id
                  title
                  bannerType
                  publish
                  totalNumber
                  section {
                    name
                    id
                  }
                }
            }`
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: GET_DYNAMIC_BANNER_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_DYNAMIC_BANNER_SUCCESS,
                    payload: {
                        getDynamic: res.data.data.getDynamicBanners
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


export const deleteDynamic = (id: string) => async (dispatch: Dispatch) => {
    dispatch({ type: DELETE_DYNAMIC_LOADING });
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation deleteDynamic($deleteDynamicBannersId: String!) {
                deleteDynamicBanners(id: $deleteDynamicBannersId) {
                  success
                  message
                }
            }`,
        variables: { deleteDynamicBannersId: id }
    }, {
        headers: {
            'Authorization': `Bearer ${token as string}`
        }
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: DELETE_DYNAMIC_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: DELETE_DYNAMIC_SUCCESS,
                    payload: {
                        delete: res.data.data.deleteDynamicBanners
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


//Get sliders
export const getSingleDynamicBanner = (id: string) => async (dispatch: Dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `query getSingleDynamic($getSingleDynamicId: String!) {
                getSingleDynamic(id: $getSingleDynamicId) {
                  id
                  title
                  bannerType
                  publish
                  totalNumber
                  banners {
                    url
                    text
                    link
                  }
                  section {
                    name
                    id
                  }
                }
              }`,
        variables: {
            getSingleDynamicId: id
        }
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: GET_SINGLE_DYNAMIC_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_SINGLE_DYNAMIC_SUCCESS,
                    payload: {
                        getDynamic: res.data.data.getSingleDynamic
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


export const updateDynamicBanners = (data: DynamicBanner, id: string) => async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_DYNAMIC_BANNER_LOADING })
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation updateDynamicBanner($dynamicBannerInput: DynamicBannerInput!, $updateDynamicBannerId: String!) {
                updateDynamicBanner(dynamicBannerInput: $dynamicBannerInput, id: $updateDynamicBannerId) {
                  success
                  message
                }
              }`,
        variables: {
            dynamicBannerInput: data,
            updateDynamicBannerId: id
        }
    }, {
        headers: {
            'Authorization': `Bearer ${token as string}`
        }
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: UPDATE_DYNAMIC_BANNER_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: UPDATE_DYNAMIC_BANNER_SUCCESS,
                    payload: {
                        update: res.data.data.updateDynamicBanner
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

interface ArticlesData {
    description: string;
}
export const saveArticles = (data: ArticlesData) => async (dispatch: Dispatch) => {
    dispatch({ type: SAVE_ARTICLES_LOADING })
    const token = Cookies.get("secretId");
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `mutation saveArticles($articlesInput: ArticlesInput!) {
                saveArticles(articlesInput: $articlesInput) {
                  success
                  message
                }
              }`,
        variables: {
            articlesInput: data
        }
    }, {
        headers: {
            'Authorization': `Bearer ${token as string}`
        }
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: SAVE_ARTICLES_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: SAVE_ARTICLES_SUCCESS,
                    payload: {
                        save: res.data.data.saveArticles
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


//Get sliders
export const getArticles = () => async (dispatch: Dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query:
            `query getArticles {
                getArticles {
                  description
                }
            }`
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: GET_ARTICLES_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_ARTICLES_SUCCESS,
                    payload: {
                        getArticles: res.data.data.getArticles
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