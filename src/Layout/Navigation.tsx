import { Box } from "@mui/material";

//Components
import Profile from "Components/Navigation/Profile";
import Nav from "Components/Navigation/Nav";

//Styles
import styles from "Styles/Navigation/Navigation.styles";

//Interface
interface Props {
    active?: string;
}

const Navigation = ({ active }: Props) => {
    return (
        <Box sx={styles.Container}>
            <Profile />
            <Nav active={active} />
        </Box>
    );
};
export default Navigation;