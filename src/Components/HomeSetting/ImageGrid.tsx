import { useState, useEffect, useMemo } from "react";
import { Box, Grid, ButtonBase, Snackbar, Alert } from "@mui/material";
import Image from "next/image";
import { Icon } from "@iconify/react";

//Components
import Delete from "Components/Common/Delete";

//Styles
import styles from "Styles/HomeSetting/ImageGrid.styles";

//Redux
import { useAppSelector, useAppDispatch } from "Redux/Hook";
import { deleteBanners } from "Redux/Action/Home/home.action";

//Interface
interface BannersData {
    id: string;
    name: string;
    banner: string;
}

const ImageGrid = () => {
    //Selector
    const { bannersData } = useAppSelector(state => state.getBanner);
    const { message, success } = useAppSelector(state => state.deleteBanner);
    //State
    const [banners, setBanners] = useState<BannersData[]>(bannersData);
    const [open, setOpen] = useState<number | null>(null);
    const [snackbar, setSnackbar] = useState<boolean>(false);
    //Handler
    const dispatch = useAppDispatch();
    const handleClose = (id?: string, imageUrl?: string) => {
        setOpen(null)
        if (id) {
            dispatch(deleteBanners(id, imageUrl as string))
            const result = banners.filter(item => item.id !== id)
            setBanners(result);
        }
    }
    const handleSnackClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar(false);
    };
    //Effect
    useEffect(() => {
        if (message && success !== null) {
            setSnackbar(true)
        }
    }, [success, message, setSnackbar])
    useMemo(() => {
        if (bannersData.length > 0) {
            setBanners(bannersData)
        }
    }, [bannersData])
    return (
        <Box sx={{ mt: "30px" }}>
            {message &&
                <Snackbar
                    open={snackbar}
                    message="Successfully added"
                    autoHideDuration={5000}
                    onClose={handleSnackClose}
                >
                    <Alert onClose={handleSnackClose} severity={success === true ? "success" : "error"} sx={{ width: "100%" }} variant="filled">
                        {message}
                    </Alert>
                </Snackbar>
            }
            <Grid container spacing={1}>
                {banners.map((image, i) => (
                    <Grid item {...{ md: 4 }} key={i}>
                        <Box sx={styles.Container}>
                            <Image src={process.env.NEXT_PUBLIC_IMAGE_PATH + image.banner} alt={image.name} width={325} height={118} />
                            <ButtonBase sx={styles.DeleteButton} onClick={() => setOpen(i)}>
                                <Icon icon="fluent:delete-24-filled" />
                            </ButtonBase>
                            <Delete
                                open={open === i}
                                handleClose={handleClose}
                                id={image.id}
                                imageUrl={image.banner}
                            />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
export default ImageGrid;