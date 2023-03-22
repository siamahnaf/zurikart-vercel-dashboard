export interface Inputs {
    siteTitle: string;
    slogan: string;
    metaTitle: string;
    metaDescription: string;
    metaTags: string[];
    siteUrl: string;
    ogTitle: string;
    ogDescription: string;
    email: string;
    phone: string;
    corporateAddress: string;
    headAddress: string;
    facebookUrl: string;
    instagramUrl: string;
    youtubeUrl: string;
    twitterUrl: string;
    linkedinUrl: string;
}

export interface SitesData {
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