import { Dispatch, SetStateAction, useEffect } from "react";
import { Box, Typography, Divider, Grid } from "@mui/material";
import { useQuill } from 'react-quilljs';
import "quill/dist/quill.snow.css";
import ReactS3Client from "react-aws-s3-typescript";
import { UniqId } from "Utilis/Helpers";

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
interface Props {
    setDescription: Dispatch<SetStateAction<string>>;
}

const ProductDescription = ({ setDescription }: Props) => {
    const modules = {
        toolbar: [
            [{ font: [] }, { 'size': [] }, { 'header': [1, 2, 3, 4, 5, 6] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'header': 1 }, { 'header': 2 }, 'blockquote', 'code-block'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            [{ 'direction': 'rtl' }, { 'align': [] }],
            ['link', 'image', 'clean'],
        ]
    }
    const { quill, quillRef } = useQuill({
        placeholder: "Start type your description...",
        modules
    });
    const insertToEditor = (url: any) => {
        if (quill) {
            const range = quill.getSelection();
            if (range) return quill.insertEmbed(range.index, 'image', url);
        }
    };

    const saveToServer = async (file: File) => {
        if (file) {
            const s3 = new ReactS3Client(s3Config);
            const res = await s3.uploadFile(file, UniqId());
            insertToEditor(res.location)
        }
    };

    const selectLocalImage = () => {
        const input = document.createElement('input')!;
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = () => {
            if (input.files) {
                const file = input.files[0];
                saveToServer(file);
            }
        };
    };

    useEffect(() => {
        if (quill) {
            // Add custom handler for Image Upload
            quill.getModule('toolbar').addHandler('image', selectLocalImage);
            quill.on('text-change', () => {
                setDescription(quill.root.innerHTML);
            });
        }
    }, [quill]);
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
                            Description
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9.5 }}>
                        <Box sx={{ height: "400px" }}>
                            <Box sx={styles.Editor}>
                                <div ref={quillRef} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default ProductDescription;