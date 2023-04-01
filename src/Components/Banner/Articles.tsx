import { useEffect, useState } from "react";
import { Typography, Box, ButtonBase, Snackbar, Alert, CircularProgress } from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
    loading: () => <Box>
        <CircularProgress size={22} />
    </Box>
});
import styles from "Styles/Common/Create.styles";

interface Inputs {
    description: string;
}

import { useAppSelector, useAppDispatch } from "Redux/Hook";
import { saveArticles } from "Redux/Action/Home/home.action";

const Articles = () => {
    const [open, setOpen] = useState<boolean>(false);
    const { articles } = useAppSelector(state => state.getArticles);
    const { message, success, loading } = useAppSelector(state => state.saveArticles);
    const dispatch = useAppDispatch();
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const {
        handleSubmit,
        formState: { errors },
        control
    } = useForm<Inputs>({ defaultValues: { description: articles?.description } });
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        dispatch(saveArticles(value));
    }
    //Effect
    useEffect(() => {
        if (message && success !== null) {
            setOpen(true)
        }
    }, [success, message])
    return (
        <Box>
            {message &&
                <Snackbar
                    open={open}
                    message="Successfully added"
                    autoHideDuration={5000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity={success === true ? "success" : "error"} sx={{ width: "100%" }} variant="filled">
                        {message}
                    </Alert>
                </Snackbar>
            }
            <Typography sx={{ my: "10px", mb: "20px" }}>
                Home Page Articles
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    name="description"
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                        <SunEditor
                            placeholder="Write your articles..."
                            setOptions={{
                                buttonList: [["undo", "redo"], ["font", "fontSize", "formatBlock"], ["paragraphStyle", "blockquote"], ["bold", "underline", "italic", "strike", "subscript", "superscript"], ["fontColor", "hiliteColor"], ["removeFormat"], ["outdent", "indent"], ["align", "horizontalRule"]]
                            }}
                            setDefaultStyle="font-family: Arial; font-size: 16px;"
                            height="200px"
                            onChange={onChange}
                            name="description"
                            defaultValue={value}
                        />
                    )}
                />
                {errors.description &&
                    <Typography sx={{ color: "red", my: "8px" }}>
                        Please add your description!
                    </Typography>
                }
                <Box sx={{ textAlign: "right" }}>
                    <ButtonBase type="submit" sx={styles.UpdateButton}>
                        Save Articles
                        {loading &&
                            <CircularProgress size={16} sx={{ color: "background.default", ml: "10px", mb: "-2px" }} />
                        }
                    </ButtonBase>
                </Box>
            </Box>
        </Box>
    );
};

export default Articles;