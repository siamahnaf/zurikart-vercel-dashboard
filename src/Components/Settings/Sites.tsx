import { useState } from "react";
import { Box, Typography, Divider, InputBase, Grid, ButtonBase } from "@mui/material";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { UseFormRegister } from "react-hook-form";

//Styles
import styles from "Styles/Common/Create.styles";

//Import types
import { Inputs, SitesData } from "Types/SiteInput.types";

//Redux
import { useAppSelector } from "Redux/Hook";

//Types
interface Props {
    register: UseFormRegister<Inputs>;
    onLogoChange: (imageList: ImageListType, addUpdateIndex: number[] | undefined) => void;
    onSiteIconChange: (imageList: ImageListType, addUpdateIndex: number[] | undefined) => void;
    logos: ImageListType;
    siteIcon: ImageListType;
}

const Sites = ({ register, onLogoChange, onSiteIconChange, logos, siteIcon }: Props) => {
    //Selector
    const { sitesData } = useAppSelector(state => state.getSites);
    //State
    const [sites, setSites] = useState<SitesData>(sitesData);
    return (
        <Box sx={styles.Container}>
            <Typography variant="h6" component="h6" sx={styles.SubTitle}>
                Basic Information
            </Typography>
            <Divider />
            <Box sx={{ p: "15px 20px" }}>
                <Grid container spacing={3}>
                    <Grid item {...{ md: 3 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Logo
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9 }}>
                        <ImageUploading
                            value={logos}
                            onChange={onLogoChange}
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
                                    {imageList.length === 0 && sites?.logo &&
                                        <Box sx={styles.PreviewImage}>
                                            <Image src={process.env.NEXT_PUBLIC_IMAGE_PATH + sites.logo} alt="logo" width={120} height={80} />
                                        </Box>
                                    }
                                </Box>
                            )}
                        </ImageUploading>
                    </Grid>
                    <Grid item {...{ md: 3 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Site Icon
                        </Typography>
                        <Typography variant="caption" component="p">
                            (48×48)
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9 }}>
                        <ImageUploading
                            value={siteIcon}
                            onChange={onSiteIconChange}
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
                                    {imageList.length === 0 && sites?.icon &&
                                        <Box sx={styles.PreviewImage}>
                                            <Image src={process.env.NEXT_PUBLIC_IMAGE_PATH + sites.icon} alt="logo" width={120} height={80} />
                                        </Box>
                                    }
                                </Box>
                            )}
                        </ImageUploading>
                    </Grid>
                    <Grid item {...{ md: 3 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Site title
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="Site title"
                                sx={styles.InputBase}
                                {...register("siteTitle")}
                            />
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 3 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Site Slogan
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="Site slogan"
                                sx={styles.InputBase}
                                {...register("slogan")}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Sites;