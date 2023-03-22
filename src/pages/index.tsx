import type { NextPage, GetServerSideProps } from "next";
import { Box } from "@mui/material";

//Layout
import Layout from "Layout";

//Components
import Analytics from "Components/Home/Analytics";

//Redux
import { wrapper } from "Redux/Store";
import { checkToken, getProfile } from "Redux/Action/Authentication/auth.action";
import { getDashboard } from "Redux/Action/Profile/profile.action";

const Home: NextPage = () => {
  return (
    <Layout title="Dashboard | Changing Experience!" active="dashboard">
      <Box sx={{ my: "10px" }}>
        <Analytics />
      </Box>
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
      await store.dispatch(getDashboard(context.req.cookies['secretId'] as string))
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