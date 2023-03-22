import type { NextPage, GetServerSideProps } from "next";
import { Box, Typography } from "@mui/material";

//Layout
import Layout from "Layout";

//Components
import Add from "Components/Common/Add";
import Attributes from "Components/Attributes/Attributes";

//Redux
import { wrapper } from "Redux/Store";
import { useAppSelector } from "Redux/Hook";
import { checkToken, getProfile } from "Redux/Action/Authentication/auth.action";
import { getAttributes } from "Redux/Action/Attributes/attribute.action";

const Attribute: NextPage = () => {
    const { profile } = useAppSelector(state => state.profile);
    return (
        <Layout title="Attributes | Changing Experience!" active="attribute">
            {profile.role === "editor" ? (
                <Typography variant="body1" component="p" sx={{ mt: "10px", color: "primary.main", fontWeight: 600 }}>
                    You haven&apos;t access this page!
                </Typography>
            ) : (
                <Box sx={{ my: "10px" }}>
                    <Add
                        title="Attributes"
                        name="Create attributes"
                        url="/attributes/create-attributes"
                    />
                    <Attributes />
                </Box>
            )}
        </Layout>
    );
};
export default Attribute;

//Server side data fetching
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async (context) => {
            const auth = await store.dispatch(checkToken(context.req.cookies['secretId'] as string));
            await store.dispatch(getProfile(context.req.cookies['secretId'] as string));
            await store.dispatch(getAttributes(context.req.cookies['secretId'] as string))
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