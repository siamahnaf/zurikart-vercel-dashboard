import type { NextPage, GetServerSideProps } from "next";
import { Box } from "@mui/material";

//Layout
import Layout from "Layout";

//Components
import Add from "Components/Common/Add";
import Product from "Components/Products/Products";

//Redux
import { wrapper } from "Redux/Store";
import { checkToken, getProfile } from "Redux/Action/Authentication/auth.action";
import { getProducts } from "Redux/Action/Products/product.action";

const Products: NextPage = () => {
    return (
        <Layout title="Products | Changing Experience!" active="product">
            <Box sx={{ my: "10px" }}>
                <Add
                    title="Products"
                    name="Create product"
                    url="/products/create-product"
                />
                <Product />
            </Box>
        </Layout>
    );
};
export default Products;

//Server side data fetching
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async (context) => {
            const auth = await store.dispatch(checkToken(context.req.cookies['secretId'] as string));
            await store.dispatch(getProfile(context.req.cookies['secretId'] as string));
            const search = ""
            await store.dispatch(getProducts(search))
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