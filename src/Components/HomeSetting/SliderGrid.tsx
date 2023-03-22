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
import { deleteSliders } from "Redux/Action/Home/home.action";

//Interface
interface SliderData {
    id: string;
    name: string;
    slider: string;
}

const SliderGrid = () => {
    //Selector
    const { sliderData } = useAppSelector(state => state.getSlider);
    const { message, loading, success } = useAppSelector(state => state.deleteSlider);
    //State
    const [sliders, setSliders] = useState<SliderData[]>(sliderData);
    const [open, setOpen] = useState<number | null>(null);
    const [snackbar, setSnackbar] = useState<boolean>(false);
    //Handler
    const dispatch = useAppDispatch();
    const handleClose = (id?: string, imageUrl?: string) => {
        setOpen(null)
        if (id) {
            dispatch(deleteSliders(id, imageUrl as string))
            const result = sliders.filter(item => item.id !== id)
            setSliders(result);
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
        if (sliderData.length > 0) {
            setSliders(sliderData)
        }
    }, [sliderData])
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
                {sliders && sliders.map((image, i) => (
                    <Grid item {...{ md: 4 }} key={i}>
                        <Box sx={styles.Container}>
                            <Image src={process.env.NEXT_PUBLIC_IMAGE_PATH + image.slider} alt={image.name} width={325} height={118} />
                            <ButtonBase sx={styles.DeleteButton} onClick={() => setOpen(i)}>
                                <Icon icon="fluent:delete-24-filled" />
                            </ButtonBase>
                            <Delete
                                open={open === i}
                                handleClose={handleClose}
                                id={image.id}
                                imageUrl={image.slider}
                            />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
export default SliderGrid;