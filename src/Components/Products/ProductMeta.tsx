import { Box, Typography, Divider, InputBase, Grid, ButtonBase } from "@mui/material";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { UseFormRegister, Control, Controller } from "react-hook-form";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

//Styles
import styles from "Styles/Common/Create.styles";

//Types Import
import { Inputs } from "Types/Input.types";

//Types
interface Props {
    register: UseFormRegister<Inputs>;
    images: ImageListType;
    onImageChange: (imageList: ImageListType, addUpdateIndex: number[] | undefined) => void;
    control: Control<Inputs>;

}

const ProductMeta = ({ register, images, onImageChange, control }: Props) => {
    const defaultPasteSplit = (data: string) => {
        return data.split(',').map(d => d.trim())
    }
    return (
        <Box sx={styles.Container}>
            <Typography variant="h6" component="h6" sx={styles.SubTitle}>
                SEO Meta Tags
            </Typography>
            <Divider />
            <Box sx={{ p: "15px 20px" }}>
                <Grid container spacing={2}>
                    <Grid item {...{ md: 2.5 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Meta Title
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9.5 }}>
                        <Box>
                            <InputBase
                                fullWidth
                                placeholder="Meta title"
                                sx={styles.InputBase}
                                {...register("meta.title")}
                            />
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 2.5 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Meta Description
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9.5 }}>
                        <Box>
                            <InputBase
                                fullWidth
                                placeholder="Meta Description"
                                sx={styles.InputBase}
                                multiline
                                rows={7}
                                {...register("meta.description")}
                            />
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 2.5 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Meta Tags
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9.5 }}>
                        <Box sx={styles.TagInput}>
                            <Controller
                                control={control}
                                name="meta.metaTags"
                                defaultValue={[]}
                                render={({ field: { onChange, value } }) => (
                                    <TagsInput
                                        value={value}
                                        onChange={(e: string[]) => onChange(e)}
                                        addKeys={[9, 13, 188, 59]}
                                        addOnPaste
                                        pasteSplit={defaultPasteSplit}
                                    />
                                )}
                            />
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 2.5 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Meta Image
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9.5 }}>
                        <ImageUploading
                            value={images}
                            onChange={onImageChange}
                            maxNumber={1}
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
                                        <Typography variant="body1" component="p" sx={{ ...styles.Browse, py: "9.5px" }}>
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
                                    {imageList.map((image, i) => (
                                        <Box key={i} sx={styles.ImageContainer}>
                                            <ButtonBase onClick={() => onImageRemove(i)} sx={styles.DeleteIcon}>
                                                <Icon icon="clarity:window-close-line" />
                                            </ButtonBase>
                                            <Image src={image.dataURL as string} alt="Image" width={130} height={60} />
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
                                    ))}
                                </Box>
                            )}
                        </ImageUploading>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default ProductMeta;