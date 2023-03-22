import type { NextPage, GetServerSideProps } from "next";
import { Box, Typography } from "@mui/material";

//Layout
import Layout from "Layout";

//Component
import Add from "Components/Common/Add";
import ImageGrid from "Components/HomeSetting/ImageGrid";
import SliderGrid from "Components/HomeSetting/SliderGrid";
import GalleryGrid from "Components/HomeSetting/GalleryGrid";
import HomeSection from "Components/HomeSetting/HomeSection";

//Redux
import { wrapper } from "Redux/Store";
import { useAppSelector } from "Redux/Hook";
import { checkToken, getProfile } from "Redux/Action/Authentication/auth.action";
import { getBanners, getSliders, getSections, getGallery } from "Redux/Action/Home/home.action";

const Home: NextPage = () => {
    const { profile } = useAppSelector(state => state.profile);
    return (
        <Layout title="Home | Changing Experience!" active="home">
            {profile.role === "editor" || profile.role === "moderator" ? (
                <Typography variant="body1" component="p" sx={{ mt: "10px", color: "primary.main", fontWeight: 600 }}>
                    You haven&apos;t access this page!
                </Typography>
            ) : (
                <Box sx={{ my: "10px" }}>
                    <Add
                        title="Slider Settings"
                        url="home/add-slider"
                        name="Add New Slider"
                    />
                    <SliderGrid />

                    <Box sx={{ mb: "20px" }}></Box>
                    <Add
                        title="Banner Settings"
                        url="home/add-banner"
                        name="Add New Banner"
                    />
                    <ImageGrid />

                    <Box sx={{ mb: "20px" }}></Box>
                    <Add
                        title="Gallery Settings"
                        url="home/add-gallery"
                        name="Add New Gallery"
                    />
                    <GalleryGrid />

                    <Box sx={{ mb: "20px" }}></Box>
                    <Add
                        title="Sections"
                        url="home/add-sections"
                        name="Add New Sections"
                    />
                    <HomeSection />
                </Box>
            )}
        </Layout>
    );
};
export default Home;

//Server side data fetching
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async (context) => {
            const auth = await store.dispatch(checkToken(context.req.cookies['secretId'] as string));
            await store.dispatch(getProfile(context.req.cookies['secretId'] as string));
            await store.dispatch(getBanners());
            await store.dispatch(getSliders());
            await store.dispatch(getSections());
            await store.dispatch(getGallery());
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