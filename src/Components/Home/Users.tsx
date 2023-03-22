import { useState, useMemo } from "react";
import { Box, Typography, Divider } from "@mui/material";

//Styles
import styles from "Styles/Home/User.styles";

//Types import
import { DashboardData } from "Types/Dashboard.type";

//Redux
import { useAppSelector } from "Redux/Hook";

const Users = () => {
    //Selector
    const { dashboardData } = useAppSelector(state => state.getDashboard);
    //State
    const [dashboard, setDashboard] = useState<DashboardData>(dashboardData);
    useMemo(() => {
        if (dashboardData) {
            setDashboard(dashboardData)
        }
    }, [dashboardData])
    return (
        <Box sx={styles.Container}>
            <Typography variant="h6" component="h6" sx={styles.Title}>
                Users
            </Typography>
            <Divider />
            <Box sx={{ px: "15px", py: "38px" }}>
                <Box sx={styles.Number}>
                    {dashboard?.totalUser < 10 ? `0${dashboard?.totalUser}` : dashboard?.totalUser}
                </Box>
                <Typography variant="body1" component="p" sx={styles.Subtitle}>
                    Total User
                </Typography>
            </Box>
        </Box>
    );
};
export default Users;