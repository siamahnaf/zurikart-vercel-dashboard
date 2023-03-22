import { useState, useMemo } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

//Styles
import styles from "Styles/Home/Analytics.styles";

//Types import
import { DashboardData } from "Types/Dashboard.type";

//Redux
import { useAppSelector } from "Redux/Hook";

const Analytics = () => {
    //Selector
    const { dashboardData } = useAppSelector(state => state.getDashboard);
    //State
    const [dashboard, setDashboard] = useState<DashboardData>(dashboardData);
    //Effect
    useMemo(() => {
        if (dashboardData) {
            setDashboard(dashboardData)
        }
    }, [dashboardData])
    return (
        <Box>
            <Typography variant="h6" component="h6" sx={styles.Title}>
                Dashboard
            </Typography>
            <Grid container spacing={2}>
                <Grid item {...{ md: 6 }}>
                    <Box sx={styles.CardOne}>
                        <Box sx={styles.Content}>
                            <Typography variant="h6" component="h6">
                                {dashboard?.totalProduct}
                            </Typography>
                            <Typography variant="body1" component="p">
                                products
                            </Typography>
                        </Box>
                        <Svg sx={styles.SvgVector} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" >
                            <path fill="#FFFFFF" fillOpacity="0.3" d="M0,192L26.7,192C53.3,192,107,192,160,202.7C213.3,213,267,235,320,218.7C373.3,203,427,149,480,117.3C533.3,85,587,75,640,90.7C693.3,107,747,149,800,149.3C853.3,149,907,107,960,112C1013.3,117,1067,171,1120,202.7C1173.3,235,1227,245,1280,213.3C1333.3,181,1387,107,1413,69.3L1440,32L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></path>
                        </Svg>
                    </Box>
                </Grid>
                <Grid item {...{ md: 6 }}>
                    <Box sx={styles.CardTwo}>
                        <Box sx={styles.Content}>
                            <Typography variant="h6" component="h6">
                                {dashboard?.totalUser}
                            </Typography>
                            <Typography variant="body1" component="p">
                                total maintainer
                            </Typography>
                        </Box>
                        <Svg sx={styles.SvgVector} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" >
                            <path fill="#FFFFFF" fillOpacity="0.3" d="M0,192L30,208C60,224,120,256,180,245.3C240,235,300,181,360,144C420,107,480,85,540,96C600,107,660,149,720,154.7C780,160,840,128,900,117.3C960,107,1020,117,1080,112C1140,107,1200,85,1260,74.7C1320,64,1380,64,1410,64L1440,64L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path>
                        </Svg>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};
export default Analytics;

//Custom Component
const Svg = styled("svg")``;