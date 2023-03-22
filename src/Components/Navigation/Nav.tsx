import { useMemo, useState } from "react";
import { Box, ButtonBase, List, ListItem } from "@mui/material";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

//Data
import { AdminNavs, ModeratorNavs, EditorNavs } from "Data/Layout/Nav.data";

//Styles
import styles from "Styles/Navigation/Nav.styles";

//Redux
import { useAppSelector } from "Redux/Hook";

//Interface
interface Props {
    active?: string;
}
interface Navs {
    title: string;
    id: string;
    url: string;
    icon: string;
}

const Nav = ({ active }: Props) => {
    const [navs, setNavs] = useState<Navs[]>([]);
    const { profile } = useAppSelector(state => state.profile);
    const router = useRouter();
    const LogoutHandler = () => {
        router.push("/login-to-dashboard");
        Cookies.remove("secretId");
    }
    useMemo(() => {
        if (profile?.role === "admin") {
            setNavs(AdminNavs)
        } else if (profile?.role === "moderator") {
            setNavs(ModeratorNavs)
        } else if (profile?.role === "editor") {
            setNavs(EditorNavs)
        }
    }, [profile])
    return (
        <Box sx={styles.Container}>
            <List dense disablePadding sx={styles.List}>
                {navs &&
                    navs.map((nav, i) => (
                        <ListItem key={i} dense disableGutters disablePadding>
                            <Link href={nav.url}>
                                <a className={nav.id === active ? "active" : ""}>
                                    <Icon icon={nav.icon} />
                                    {nav.title}
                                </a>
                            </Link>
                        </ListItem>
                    ))}
                <ListItem dense disableGutters disablePadding sx={styles.Logout}>
                    <ButtonBase onClick={LogoutHandler}>
                        <Icon icon="ri:logout-circle-r-fill" /> Logout
                    </ButtonBase>
                </ListItem>
            </List>
        </Box>
    );
};
export default Nav;