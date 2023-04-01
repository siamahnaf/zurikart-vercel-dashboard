import { combineReducers } from '@reduxjs/toolkit';
import {
    loginReducer,
    resetReducer,
    passwordReducer,
    profileReducer
} from "Redux/Reducer/Authentication/auth.reducer";
import {
    createCategoryReducer,
    getCategoryReducer,
    deleteCategoryReducer,
    getSingleReducer,
    updateCateReducer
} from "Redux/Reducer/Categories/category.reducer";
import {
    createSubCateReducer,
    getSubAllReducer,
    deleteSubReducer,
    getSingleSubReducer,
    updateSubReducer
} from "Redux/Reducer/SubCategories/sub.reducer";
import {
    createBrandReducer,
    getBrandReducer,
    deleteBrandReducer,
    getSingleBrandReducer,
    updateBrandReducer
} from "Redux/Reducer/Brands/brand.reducer";
import {
    createTagReducer,
    getTagsReducer,
    deleteTagsReducer,
    getSingleTagReducer,
    updateTagReducer
} from "Redux/Reducer/Tags/tag.reducer";
import {
    createAttributeReducer,
    getAttributeReducer,
    deleteAttributeReducer,
    getSingleAttrReducer,
    updateAttributeReducer
} from "Redux/Reducer/Attributes/attribute.reducer";
import {
    createProductReducer,
    getProductsReducer,
    deleteProductReducer,
    getSingleProductReducer,
    updateProductReducer
} from "Redux/Reducer/Products/product.reducer";
import {
    getUserListReducer,
    deleteUserReducer,
    changeRoleReducer
} from "Redux/Reducer/User/user.reducer";
import {
    createBannerReducer,
    createSliderReducer,
    getBannerReducer,
    getSliderReducer,
    deleteBannerReducer,
    deleteSliderReducer,
    getSectionReducer,
    getSingleSecReducer,
    updateSectionReducer,
    createGalleryReducer,
    getGalleryReducer,
    deleteGalleryReducer,
    addSectionReducer,
    addDynamicBannerReducer,
    getDynamicBannerReducer,
    deleteDynamicBannerReducer,
    updateDynamicBannerReducer,
    singleDynamicBannerReducer,
    saveArticlesReducer,
    getArticlesReducer
} from "Redux/Reducer/Home/home.reducer";
import {
    updateSiteReducer,
    getSiteReducer
} from "Redux/Reducer/Sites/site.reducer";
import {
    updateProfileReducer,
    updatePasswordReducer,
    getDashboardReducer
} from "Redux/Reducer/Profile/profile.reducer";
import {
    serverErrorReducer
} from "Redux/Reducer/server.reducer";


export const combinedReducer = combineReducers({
    login: loginReducer,
    reset: resetReducer,
    password: passwordReducer,
    profile: profileReducer,
    createCategory: createCategoryReducer,
    getCategory: getCategoryReducer,
    deleteCategory: deleteCategoryReducer,
    getSingleCate: getSingleReducer,
    updateCategory: updateCateReducer,
    createSub: createSubCateReducer,
    getSubs: getSubAllReducer,
    deleteSub: deleteSubReducer,
    getSub: getSingleSubReducer,
    updateSub: updateSubReducer,
    createBrand: createBrandReducer,
    getBrand: getBrandReducer,
    deleteBrand: deleteBrandReducer,
    getSingleBrand: getSingleBrandReducer,
    updateBrand: updateBrandReducer,
    addDynamic: addDynamicBannerReducer,
    createTag: createTagReducer,
    getTags: getTagsReducer,
    deleteTags: deleteTagsReducer,
    getSingleTags: getSingleTagReducer,
    updateTag: updateTagReducer,
    createAttribute: createAttributeReducer,
    createGallery: createGalleryReducer,
    getGallery: getGalleryReducer,
    deleteGallery: deleteGalleryReducer,
    getAttributes: getAttributeReducer,
    deleteAttribute: deleteAttributeReducer,
    getSingleAttr: getSingleAttrReducer,
    updateAttribute: updateAttributeReducer,
    createProduct: createProductReducer,
    getProducts: getProductsReducer,
    deleteProducts: deleteProductReducer,
    getSingleProduct: getSingleProductReducer,
    updateProduct: updateProductReducer,
    addSection: addSectionReducer,
    getUserList: getUserListReducer,
    deleteUser: deleteUserReducer,
    changeRole: changeRoleReducer,
    createBanner: createBannerReducer,
    createSlider: createSliderReducer,
    getBanner: getBannerReducer,
    getSlider: getSliderReducer,
    deleteBanner: deleteBannerReducer,
    deleteSlider: deleteSliderReducer,
    getSection: getSectionReducer,
    getSingleSec: getSingleSecReducer,
    updateSec: updateSectionReducer,
    updateSite: updateSiteReducer,
    getSites: getSiteReducer,
    updateProfile: updateProfileReducer,
    updatePassword: updatePasswordReducer,
    getDashboard: getDashboardReducer,
    serverError: serverErrorReducer,
    getDynamic: getDynamicBannerReducer,
    deleteDynamicBanner: deleteDynamicBannerReducer,
    updateDynamicBanner: updateDynamicBannerReducer,
    singleDynamicBanner: singleDynamicBannerReducer,
    saveArticles: saveArticlesReducer,
    getArticles: getArticlesReducer
});