import type { NextPage, GetServerSideProps } from "next";
import { Typography } from "@mui/material";

//Layout
import Layout from "Layout";

//Component
import Update from "Components/Banner/Update";

//Redux
import { wrapper } from "Redux/Store";
import { useAppSelector } from "Redux/Hook";
import { checkToken, getProfile } from "Redux/Action/Authentication/auth.action";
import { getSections, getSingleDynamicBanner } from "Redux/Action/Home/home.action";

const EditDynamicBanner: NextPage = () => {
    const { profile } = useAppSelector(state => state.profile);
    return (
        <Layout title="Banner | Changing Experience!" active="banner">
            {profile.role === "editor" || profile.role === "moderator" ? (
                <Typography variant="body1" component="p" sx={{ mt: "10px", color: "primary.main", fontWeight: 600 }}>
                    You haven&apos;t access this page!
                </Typography>
            ) : (
                <>
                    <Update />
                </>
            )}
        </Layout>
    );
};

export default EditDynamicBanner;



//Server side data fetching
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async (context) => {
            const auth = await store.dispatch(checkToken(context.req.cookies['secretId'] as string));
            await store.dispatch(getProfile(context.req.cookies['secretId'] as string));
            await store.dispatch(getSections());
            await store.dispatch(getSingleDynamicBanner(context.query.id as string));
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