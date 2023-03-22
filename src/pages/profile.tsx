import type { NextPage, GetServerSideProps } from "next";
import { Box, Typography } from "@mui/material";

//Layout
import Layout from "Layout";

//Component
import Manage from "Components/Profile/Manage";
import Password from "Components/Profile/Password";

//Redux
import { wrapper } from "Redux/Store";
import { checkToken, getProfile } from "Redux/Action/Authentication/auth.action";

const Profile: NextPage = () => {
    return (
        <Layout title="Site settings | Changing Experience!" active="profile">
            <Box sx={{ my: "10px" }}>
                <Typography sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    mb: "30px"
                }} variant="body1" component="p">
                    Manage Profile
                </Typography>
                <Manage />
                <Password />
            </Box>
        </Layout>
    );
};
export default Profile;

//Server side data fetching
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async (context) => {
            const auth = await store.dispatch(checkToken(context.req.cookies['secretId'] as string));
            await store.dispatch(getProfile(context.req.cookies['secretId'] as string));
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