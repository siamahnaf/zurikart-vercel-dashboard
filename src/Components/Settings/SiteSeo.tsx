import { useState, Dispatch, SetStateAction } from "react";
import { Box, Typography, Divider, InputBase, Grid, ButtonBase } from "@mui/material";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { UseFormRegister, Controller, Control } from "react-hook-form";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

//Styles
import styles from "Styles/Common/Create.styles";

//Types import
import { Inputs, SitesData } from "Types/SiteInput.types";

//Redux
import { useAppSelector } from "Redux/Hook";

//Types
interface Props {
    register: UseFormRegister<Inputs>;
    onOgImageChange: (imageList: ImageListType, addUpdateIndex: number[] | undefined) => void;
    ogImage: ImageListType;
    control: Control<Inputs>
}

const SiteSeo = ({ register, onOgImageChange, ogImage, control }: Props) => {
    //Selector
    const { sitesData } = useAppSelector(state => state.getSites);
    //State
    const [sites, setSites] = useState<SitesData>(sitesData);
    //Handler
    const defaultPasteSplit = (data: string) => {
        return data.split(',').map(d => d.trim())
    }
    return (
        <Box sx={styles.Container}>
            <Typography variant="h6" component="h6" sx={styles.SubTitle}>
                Seo Information
            </Typography>
            <Divider />
            <Box sx={{ p: "15px 20px" }}>
                <Grid container spacing={2}>
                    <Grid item {...{ md: 3 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Meta title
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="Meta title"
                                sx={styles.InputBase}
                                {...register("metaTitle")}
                            />
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 3 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Meta description
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="Meta description"
                                multiline
                                rows={7}
                                sx={styles.InputBase}
                                {...register("metaDescription")}
                            />
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 3 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Meta tags
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9 }}>
                        <Box sx={styles.TagInput}>
                            <Controller
                                control={control}
                                name="metaTags"
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
                    <Grid item {...{ md: 3 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Site url
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="Site url"
                                sx={styles.InputBase}
                                {...register("siteUrl")}
                            />
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 3 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Og title
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="Og title"
                                sx={styles.InputBase}
                                {...register("ogTitle")}
                            />
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 3 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Og description
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="Og description"
                                sx={styles.InputBase}
                                {...register("ogDescription")}
                            />
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 3 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Og image
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9 }}>
                        <ImageUploading
                            value={ogImage}
                            onChange={onOgImageChange}
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
                                    {imageList.length === 0 && sites?.seo?.ogImage &&
                                        <Box sx={styles.PreviewImage}>
                                            <Image src={process.env.NEXT_PUBLIC_IMAGE_PATH + sites.seo.ogImage} alt="logo" width={120} height={80} />
                                        </Box>
                                    }
                                </Box>
                            )}
                        </ImageUploading>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default SiteSeo;