import { Box, Typography, Divider, Grid, CircularProgress } from "@mui/material";
import { Controller, UseFormRegister, Control } from "react-hook-form";
import ReactS3Client from "react-aws-s3-typescript";
import { UniqId } from "Utilis/Helpers";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
    loading: () => <Box>
        <CircularProgress size={22} />
    </Box>
});

//S3 Configure
const s3Config = {
    bucketName: process.env.NEXT_PUBLIC_BUCKET_NAME as string,
    dirName: "DescriptionImage",
    region: process.env.NEXT_PUBLIC_REGION as string,
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ID as string
}

//Styles
import styles from "Styles/Common/Create.styles";

//Types
import { Inputs } from "Types/Input.types";

//Types
interface Props {
    register: UseFormRegister<Inputs>;
    control: Control<Inputs>;
}

const ProductDescription = ({ register, control }: Props) => {
    const handleImageUploadBefore = (files: File[], info: object, uploadHandler: Function) => {
        if (files.length > 0) {
            const s3 = new ReactS3Client(s3Config);
            s3.uploadFile(files[0], UniqId()).then((res) => {
                uploadHandler({
                    result: [
                        {
                            url: res.location,
                            name: files[0].name,
                            size: files[0].size
                        }
                    ]
                });
            })

        }
    }
    return (
        <Box sx={styles.Container}>
            <Typography variant="h6" component="h6" sx={styles.SubTitle}>
                Product Description
            </Typography>
            <Divider />
            <Box sx={{ p: "15px 20px" }}>
                <Grid container spacing={2}>
                    <Grid item {...{ md: 2.5 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Short Summery
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9.5 }}>
                        <Controller
                            control={control}
                            name="shortSummery"
                            rules={{ maxLength: 500 }}
                            render={({ field: { onChange, value } }) => (
                                <SunEditor
                                    placeholder="Short Summery..."
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
                    </Grid>
                    <Grid item {...{ md: 2.5 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Description
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9.5 }}>
                        <Controller
                            control={control}
                            name="description"
                            render={({ field: { onChange, value } }) => (
                                <SunEditor
                                    placeholder="Please type here..."
                                    setOptions={{
                                        buttonList: [["undo", "redo"], ["font", "fontSize", "formatBlock"], ["paragraphStyle", "blockquote"], ["bold", "underline", "italic", "strike", "subscript", "superscript"], ["fontColor", "hiliteColor", "image"], ["removeFormat"], ["outdent", "indent"], ["align", "horizontalRule", "list", "lineHeight"], ["table", "link", "codeView", "showBlocks"], ["preview", "fullScreen"]]
                                    }}
                                    setDefaultStyle="font-family: Arial; font-size: 16px;"
                                    height="300px"
                                    onChange={onChange}
                                    onImageUploadBefore={handleImageUploadBefore}
                                    name="description"
                                    defaultValue={value}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default ProductDescription;