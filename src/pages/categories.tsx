import type { NextPage, GetServerSideProps } from "next";
import { Box, Typography } from "@mui/material";

//Layout
import Layout from "Layout";

//Components
import Add from "Components/Common/Add";
import Categories from "Components/Categories/Categories";
import Subcategories from "Components/Categories/Subcategories";

//Redux
import { wrapper } from "Redux/Store";
import { useAppSelector } from "Redux/Hook";
import { checkToken, getProfile } from "Redux/Action/Authentication/auth.action";
import { getAllCategory } from "Redux/Action/Categories/category.action";
import { getSubCategory } from "Redux/Action/SubCategories/sub.action";

const Category: NextPage = () => {
    const { profile } = useAppSelector(state => state.profile);
    return (
        <Layout title="Categories | Changing Experience!" active="category">
            {profile.role === "editor" ? (
                <Typography variant="body1" component="p" sx={{ mt: "10px", color: "primary.main", fontWeight: 600 }}>
                    You haven&apos;t access this page!
                </Typography>
            ) : (
                <Box sx={{ my: "10px" }}>
                    <Add
                        title="Categories"
                        name="Create Categories"
                        url="/categories/create-new-category"
                    />
                    <Categories />
                    <Add
                        title="Sub-categories"
                        name="Create Sub-categories"
                        url="/sub-categories/create-sub-category"
                    />
                    <Subcategories />
                </Box>
            )}
        </Layout>
    );
};
export default Category;

//Server side data fetching
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async (context) => {
            const auth = await store.dispatch(checkToken(context.req.cookies['secretId'] as string));
            await store.dispatch(getProfile(context.req.cookies['secretId'] as string));
            await store.dispatch(getAllCategory(context.req.cookies['secretId'] as string));
            await store.dispatch(getSubCategory(context.req.cookies['secretId'] as string));
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