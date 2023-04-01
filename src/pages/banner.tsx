import type { NextPage, GetServerSideProps } from "next";
import { Box, Typography } from "@mui/material";

//Layout
import Layout from "Layout";

//Component
import Add from "Components/Common/Add";
import Lists from "Components/Banner/Lists";
import Articles from "Components/Banner/Articles";

//Redux
import { wrapper } from "Redux/Store";
import { useAppSelector } from "Redux/Hook";
import { checkToken, getProfile } from "Redux/Action/Authentication/auth.action";
import { getSections, getDynamicBanner, getArticles } from "Redux/Action/Home/home.action";


const Banner: NextPage = () => {
    const { profile } = useAppSelector(state => state.profile);
    return (
        <Layout title="Banner | Changing Experience!" active="banner">
            {profile.role === "editor" || profile.role === "moderator" ? (
                <Typography variant="body1" component="p" sx={{ mt: "10px", color: "primary.main", fontWeight: 600 }}>
                    You haven&apos;t access this page!
                </Typography>
            ) : (
                <Box sx={{ my: "10px" }}>
                    <Add
                        title="Add Banner"
                        url="banner/add-dynamic-banner"
                        name="Add Banner"
                    />
                    <Lists />
                    <Articles />
                </Box>
            )}
        </Layout>
    );
};

export default Banner;


//Server side data fetching
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async (context) => {
            const auth = await store.dispatch(checkToken(context.req.cookies['secretId'] as string));
            await store.dispatch(getProfile(context.req.cookies['secretId'] as string));
            await store.dispatch(getSections());
            await store.dispatch(getDynamicBanner());
            await store.dispatch(getArticles());
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