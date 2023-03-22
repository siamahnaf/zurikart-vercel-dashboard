import { Box, Typography } from "@mui/material";
import Image from "next/image";

//Avatar
import Images from "Assets/avatar.png";

//Styles
import styles from "Styles/Navigation/Profile.styles";

//Redux
import { useAppSelector } from "Redux/Hook";

const Profile = () => {
    const { profile } = useAppSelector(state => state.profile);
    return (
        <Box sx={styles.Container}>
            <Box>
                <Box sx={styles.Image}>
                    <Image src={profile?.avatar ? process.env.NEXT_PUBLIC_IMAGE_PATH + profile.avatar : Images} alt={profile?.name} width={60} height={60} />
                </Box>
                <Typography variant="h6" component="h6" sx={styles.Title} >
                    {profile?.name}
                </Typography>
                <Typography variant="body1" component="p" sx={{ fontSize: "14px" }}>
                    +{profile?.phone}
                </Typography>
                <Typography variant="body2" component="p" sx={styles.Description}>
                    {profile?.role[0].toUpperCase() + profile?.role.substring(1)}
                </Typography>
            </Box>
        </Box >
    );
};
export default Profile;