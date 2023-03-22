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
import { deleteGallery } from "Redux/Action/Home/home.action";

//Interface
interface GalleryData {
    id: string;
    name: string;
    gallery: string;
}

const GalleryGrid = () => {
    //Selector
    const { galleryData } = useAppSelector(state => state.getGallery);
    const { message, success } = useAppSelector(state => state.deleteGallery);
    //State
    const [gallery, setGallery] = useState<GalleryData[]>(galleryData);
    const [open, setOpen] = useState<number | null>(null);
    const [snackbar, setSnackbar] = useState<boolean>(false);
    //Handler
    const dispatch = useAppDispatch();
    const handleClose = (id?: string, imageUrl?: string) => {
        setOpen(null)
        if (id) {
            dispatch(deleteGallery(id, imageUrl as string))
            const result = gallery.filter(item => item.id !== id)
            setGallery(result);
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
        if (galleryData.length > 0) {
            setGallery(galleryData)
        }
    }, [galleryData])
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
                {gallery.map((image, i) => (
                    <Grid item {...{ md: 4 }} key={i}>
                        <Box sx={styles.Container}>
                            <Image src={process.env.NEXT_PUBLIC_IMAGE_PATH + image.gallery} alt={image.name} width={325} height={330} />
                            <ButtonBase sx={styles.DeleteButton} onClick={() => setOpen(i)}>
                                <Icon icon="fluent:delete-24-filled" />
                            </ButtonBase>
                            <Delete
                                open={open === i}
                                handleClose={handleClose}
                                id={image.id}
                                imageUrl={image.gallery}
                            />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default GalleryGrid;