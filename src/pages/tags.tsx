import type { NextPage, GetServerSideProps } from "next";
import { Box, Typography } from "@mui/material";

//Layout
import Layout from "Layout";

//Components
import Add from "Components/Common/Add";
import Tags from "Components/Tags/Tags";

//Redux
import { wrapper } from "Redux/Store";
import { useAppSelector } from "Redux/Hook";
import { checkToken, getProfile } from "Redux/Action/Authentication/auth.action";
import { getTags } from "Redux/Action/Tags/tag.action";

const Tag: NextPage = () => {
    const { profile } = useAppSelector(state => state.profile);
    return (
        <Layout title="Tags | Changing Experience!" active="tag">
            {profile.role === "editor" ? (
                <Typography variant="body1" component="p" sx={{ mt: "10px", color: "primary.main", fontWeight: 600 }}>
                    You haven&apos;t access this page!
                </Typography>
            ) : (
                <Box sx={{ my: "10px" }}>
                    <Add
                        title="Tags"
                        name="Create new tag"
                        url="/tags/create-new-tag"
                    />
                    <Tags />
                </Box>
            )}
        </Layout>
    );
};
export default Tag;

//Server side data fetching
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async (context) => {
            const auth = await store.dispatch(checkToken(context.req.cookies['secretId'] as string));
            await store.dispatch(getProfile(context.req.cookies['secretId'] as string));
            await store.dispatch(getTags());
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