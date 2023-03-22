import type { NextPage, GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { Box, Typography, ButtonBase, Snackbar, Alert, CircularProgress } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { ImageListType } from "react-images-uploading";

//Layout
import Layout from "Layout";

//Component
import Sites from "Components/Settings/Sites";
import SiteSeo from "Components/Settings/SiteSeo";
import AdditionalInfo from "Components/Settings/AdditionalInfo";
import Social from "Components/Settings/Social";

//Styles
import styles from "Styles/Common/Create.styles";

//Import Types
import { Inputs, SitesData } from "Types/SiteInput.types";

//Redux
import { wrapper } from "Redux/Store";
import { useAppSelector, useAppDispatch } from "Redux/Hook";
import { checkToken, getProfile } from "Redux/Action/Authentication/auth.action";
import { updateSites, getSiteSetting } from "Redux/Action/Sites/site.action";

const SiteSetting: NextPage = () => {
    //Selector
    const { profile } = useAppSelector(state => state.profile);
    const { message, loading, success } = useAppSelector(state => state.updateSite);
    const { sitesData } = useAppSelector(state => state.getSites);
    //State
    const [sites, setSites] = useState<SitesData>(sitesData);
    const [logos, setLogos] = useState<ImageListType>([]);
    const [siteIcon, setSiteIcon] = useState<ImageListType>([]);
    const [ogImage, setOgImage] = useState<ImageListType>([]);
    const [tags, setTags] = useState<string[]>(sites?.seo?.metaTag);
    const [open, setOpen] = useState<boolean>(false);
    //Handler
    const onLogoChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setLogos(imageList as never[]);
    };
    const onSiteIconChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setSiteIcon(imageList as never[]);
    };
    const onOgImageChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setOgImage(imageList as never[]);
    }
    const {
        register,
        handleSubmit,
        control
    } = useForm<Inputs>({
        defaultValues: {
            siteTitle: sites?.siteTitle,
            slogan: sites?.slogan,
            metaTitle: sites?.seo?.metaTitle,
            metaDescription: sites?.seo?.metaDescription,
            metaTags: sites?.seo?.metaTag,
            siteUrl: sites?.seo?.siteUrl,
            ogTitle: sites?.seo?.ogTitle,
            ogDescription: sites?.seo?.ogDescription,
            email: sites?.additionInfo?.email,
            phone: sites?.additionInfo?.phone,
            corporateAddress: sites?.additionInfo?.corporateOffice,
            headAddress: sites?.additionInfo?.headOffice,
            facebookUrl: sites?.social?.facebook,
            instagramUrl: sites?.social?.instagram,
            youtubeUrl: sites?.social?.youtube,
            twitterUrl: sites?.social?.twitter,
            linkedinUrl: sites?.social?.linkedIn
        }
    });
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<Inputs> = (data, e) => {
        const files = {
            logos: logos,
            siteIcon: siteIcon,
            ogImage: ogImage
        }
        const ImageUrl = {
            logo: sites?.logo as string,
            icon: sites?.icon as string,
            ogImage: sites?.seo?.ogImage as string
        }
        dispatch(updateSites(data, files, ImageUrl))
    }
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    //Effect
    useEffect(() => {
        if (message && success !== null) {
            setOpen(true)
        }
    }, [success, message, setOpen])
    return (
        <Layout title="Site settings | Changing Experience!" active="site">
            {profile.role === "editor" || profile.role === "moderator" ? (
                <Typography variant="body1" component="p" sx={{ mt: "10px", color: "primary.main", fontWeight: 600 }}>
                    You haven&apos;t access this page!
                </Typography>
            ) : (
                <Box sx={{ my: "10px" }}>
                    {message &&
                        <Snackbar
                            open={open}
                            message="Successfully added"
                            autoHideDuration={5000}
                            onClose={handleClose}
                        >
                            <Alert onClose={handleClose} severity={success === true ? "success" : "error"} sx={{ width: "100%" }} variant="filled">
                                {message}
                            </Alert>
                        </Snackbar>
                    }
                    <Typography sx={{
                        fontSize: "1rem",
                        fontWeight: 500,
                        mb: "30px"
                    }} variant="body1" component="p">
                        Settings
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        <Sites
                            register={register}
                            onLogoChange={onLogoChange}
                            onSiteIconChange={onSiteIconChange}
                            logos={logos}
                            siteIcon={siteIcon}
                        />
                        <SiteSeo
                            register={register}
                            onOgImageChange={onOgImageChange}
                            ogImage={ogImage}
                            control={control}
                        />
                        <AdditionalInfo
                            register={register}
                        />
                        <Social
                            register={register}
                        />
                        <Box sx={{ textAlign: "right" }}>
                            <ButtonBase sx={styles.UpdateButton} type="submit" disabled={loading}>
                                Update Settings
                                {loading &&
                                    <CircularProgress size={16} sx={{ color: "background.default", ml: "10px", mb: "-2px" }} />
                                }
                            </ButtonBase>
                        </Box>
                    </Box>
                </Box>
            )}

        </Layout>
    );
};
export default SiteSetting;

//Server side data fetching
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async (context) => {
            const auth = await store.dispatch(checkToken(context.req.cookies['secretId'] as string));
            await store.dispatch(getProfile(context.req.cookies['secretId'] as string));
            await store.dispatch(getSiteSetting());
            if (!auth) {
                return {
                    redirect: {
                        destination: "/login-to-dashboard",
                        permanent: false
                    }
                }
            }
            return { props: {} };
        }
)