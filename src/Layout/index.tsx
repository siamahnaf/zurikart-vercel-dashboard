import { ReactNode, FC } from "react";
import { Container, Grid } from "@mui/material";

//Navigation
import Navigation from "./Navigation";

//Seo
import Seo from "Utilis/Seo";

//Interface
interface Props {
    children: ReactNode,
    title: string;
    active?: string;
}

const Layout: FC<Props> = ({ children, title, active }) => {
    return (
        <Container maxWidth="xl" disableGutters sx={{ my: "1em" }}>
            <Seo title={title} />
            <Grid container spacing={4}>
                <Grid item {...{ md: 2.8 }}>
                    <Navigation active={active} />
                </Grid>
                <Grid item {...{ md: 9.2 }}>
                    {children}
                </Grid>
            </Grid>
        </Container>
    );
};
export default Layout;