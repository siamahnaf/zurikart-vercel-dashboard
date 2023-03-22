import { useState, useEffect } from "react";
import { Box, Typography, Divider, Grid, ButtonBase, InputBase } from "@mui/material";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { UseFormRegister } from "react-hook-form";
import Image from "next/image";
import { Icon } from "@iconify/react";

//Styles
import styles from "Styles/Common/Create.styles";

//Import types
import { Inputs } from "Types/Input.types";

//Types
interface Props {
    register: UseFormRegister<Inputs>;
    images: ImageListType;
    onImageChange: (imageList: ImageListType, addUpdateIndex: number[] | undefined) => void
}

const ProductMedia = ({ register, images, onImageChange }: Props) => {
    //State
    const [maxNumber, setMaxNumber] = useState<boolean>(false);
    //Handler
    useEffect(() => {
        if (images.length > 0) {
            setMaxNumber(false)
        }
    }, [images]);
    return (
        <Box sx={styles.Container}>
            <Typography variant="h6" component="h6" sx={styles.SubTitle}>
                Product Media
            </Typography>
            <Divider />
            <Box sx={{ p: "15px 20px" }}>
                <Grid container spacing={2}>
                    <Grid item {...{ md: 2.5 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Product Gallery
                        </Typography>
                        <Typography variant="caption" component="p">
                            First image will be used as product thumbnail! (max- 5)
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9.5 }}>
                        <ImageUploading
                            value={images}
                            onChange={onImageChange}
                            maxNumber={5}
                            multiple
                            onError={(errors) => setMaxNumber(true)}
                        >
                            {({
                                imageList,
                                onImageUpload,
                                onImageRemove,
                                isDragging,
                                dragProps
                            }) => (
                                <Box>
                                    <ButtonBase
                                        onClick={onImageUpload}
                                        {...dragProps}
                                        sx={styles.FileContainer}
                                    >
                                        <Typography variant="body1" component="p" sx={styles.Browse}>
                                            Browser
                                        </Typography>
                                        {isDragging &&
                                            <Typography variant="body1" component="p" className={isDragging ? "dropping" : ""} sx={styles.DropHere}>
                                                Drop Here
                                            </Typography>
                                        }
                                        {!isDragging &&
                                            <Typography variant="body1" component="p" sx={styles.DropHere}>
                                                {imageList.length > 0 ? `${imageList.length} Files selected` : "Choose File"}
                                            </Typography>
                                        }
                                    </ButtonBase>
                                    <Grid container spacing={1}>
                                        {imageList.map((image, i) => (
                                            <Grid item {...{ md: 3 }} key={i}>
                                                <Box key={i} sx={{ ...styles.ImageContainer, width: "100%" }}>
                                                    <ButtonBase onClick={() => onImageRemove(i)} sx={styles.DeleteIcon}>
                                                        <Icon icon="clarity:window-close-line" />
                                                    </ButtonBase>
                                                    <Image src={image.dataURL as string} alt="Image" width={150} height={80} />
                                                    <Box sx={{ p: "2px 8px" }}>
                                                        <Typography variant="body1" component="p" sx={styles.ImageTitle}>
                                                            <span>
                                                                {image?.file?.name.split(".")[0]}
                                                            </span>
                                                            <span>
                                                                .{image?.file?.name.split(".")[1]}
                                                            </span>
                                                        </Typography>
                                                        <Typography variant="body2" component="p" sx={styles.FileSize}>
                                                            {(image?.file?.size as number / (1024 * 1024)).toFixed(2)}MB
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            )}
                        </ImageUploading>
                        {maxNumber &&
                            <Typography variant="body1" component="p" sx={{ color: "primary.main", mt: "15px", fontSize: "14px", fontWeight: 600 }}>
                                You can choose only 5 Images!
                            </Typography>
                        }
                    </Grid>
                    <Grid item {...{ md: 2.5 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Product Video
                        </Typography>
                        <Typography variant="caption" component="p">
                            You can give product video url (Only youtube)
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9.5 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="Product Video Url"
                                sx={styles.InputBase}
                                {...register("youtubeLink")}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default ProductMedia;