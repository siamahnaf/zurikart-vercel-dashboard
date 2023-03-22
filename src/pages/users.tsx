import type { NextPage, GetServerSideProps } from "next";
import { Box, Typography } from "@mui/material";

//Layout
import Layout from "Layout";

//Component
import User from "Components/User/User";

//Redux
import { wrapper } from "Redux/Store";
import { useAppSelector } from "Redux/Hook";
import { checkToken, getProfile } from "Redux/Action/Authentication/auth.action";
import { getUsersList } from "Redux/Action/User/user.action";

const Users: NextPage = () => {
    const { profile } = useAppSelector(state => state.profile);
    return (
        <Layout title="Users | Changing Experience!" active="user">
            {profile.role === "editor" || profile.role === "moderator" ? (
                <Typography variant="body1" component="p" sx={{ mt: "10px", color: "primary.main", fontWeight: 600 }}>
                    You haven&apos;t access this page!
                </Typography>
            ) : (
                <Box sx={{ my: "10px" }}>
                    <Typography sx={{
                        fontSize: "1rem",
                        fontWeight: 500,
                        mb: "30px"
                    }} variant="body1" component="p">
                        Users
                    </Typography>
                    <User />
                </Box>
            )}
        </Layout>
    );
};
export default Users;

//Server side data fetching
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async (context) => {
            const auth = await store.dispatch(checkToken(context.req.cookies['secretId'] as string));
            await store.dispatch(getProfile(context.req.cookies['secretId'] as string));
            await store.dispatch(getUsersList(context.req.cookies['secretId'] as string, ""));
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