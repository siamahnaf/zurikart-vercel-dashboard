import { useEffect, useState, useMemo } from "react";
import { Box, Typography, ButtonBase, Grid, Divider, InputBase, Switch, Snackbar, Alert, CircularProgress } from "@mui/material";
import { useForm, SubmitHandler, Controller, useFieldArray } from "react-hook-form";
import Select from "react-select";
import Image from "next/image";
import { Icon } from "@iconify/react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { AspectRatio } from "react-aspect-ratio";
import "react-aspect-ratio/aspect-ratio.css";
import ReactS3Client from "react-aws-s3-typescript";
import { UniqId } from "Utilis/Helpers";
import { Values } from "Types/Input.types";
import { useAppSelector, useAppDispatch } from "Redux/Hook";
import { createDynamicBanners } from "Redux/Action/Home/home.action";

//S3 Configure
const s3Config = {
    bucketName: process.env.NEXT_PUBLIC_BUCKET_NAME as string,
    dirName: "Home",
    region: process.env.NEXT_PUBLIC_REGION as string,
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ID as string
}

//Styles
import styles from "Styles/Common/Create.styles";
import selectStyles from "Styles/Common/Select.styles";

const BannerTypeOptions = [
    { value: "12", label: "1 Banner" },
    { value: "6", label: "2 Banner" },
    { value: "4", label: "3 Banner" },
    { value: "3", label: "4 Banner" },
    { value: "2.4", label: "5 Banner" },
    { value: "2", label: "6 Banner" },
    { value: "1.5", label: "8 Banner" },
    { value: "1.2", label: "10 Banner" },
    { value: "1", label: "12 Banner" }
]

const TotalNumberOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
]


//Input types
interface BannerImage {
    url: string;
    text: string;
    link: string;
}
interface Inputs {
    title: string;
    bannerType: Values;
    totalNumber: Values;
    publish: boolean;
    section: Values;
    banners: BannerImage[]
}

interface Images {
    index: number;
    images: ImageListType;
}
//Types
interface SectionData {
    id: string;
    name: string;
    description: string;
    publish: boolean;
    category1: {
        name: string;
    }
    category2: {
        name: string;
    }
}

const Add = () => {
    //Selector
    const { sectionData } = useAppSelector(state => state.getSection);
    const { success, message, loading } = useAppSelector(state => state.addDynamic);
    const [sectionOptions, setSectionOptions] = useState<Values[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        watch,
        setValue
    } = useForm<Inputs>();
    const [images, setImages] = useState<Images[]>([]);
    const onChange = async (imageList: ImageListType, i: number) => {
        const existingItemIndex = images.findIndex(item => item.index === i);
        const s3 = new ReactS3Client(s3Config);
        const res = await s3.uploadFile(imageList[0].file as File, UniqId());
        setValue(`banners.${i}.url`, res.key);
        if (existingItemIndex >= 0) {
            const updatedImages = [...images];
            updatedImages[existingItemIndex] = { index: i, images: imageList };
            setImages(updatedImages);
        } else {
            setImages([...images, { index: i, images: imageList }]);
        }
    };
    const watchTotalNumber = watch().totalNumber;
    const watchBannerType = watch().bannerType;
    const { fields, append, remove } = useFieldArray({
        control,
        name: "banners"
    });
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        const BannerData = {
            title: value.title,
            bannerType: value.bannerType.value,
            totalNumber: value.totalNumber.value,
            publish: value.publish,
            section: value.section.value,
            banners: value.banners
        }
        dispatch(createDynamicBanners(BannerData))
    }

    useEffect(() => {
        if (watchTotalNumber) {
            if (fields.length < Number(watchTotalNumber.value)) {
                const actualNumber = Number(watchTotalNumber.value) - fields.length
                for (let i = 0; i < actualNumber; i++) {
                    append({ url: "", text: "", link: "" });
                }
            } else {
                const decreaseNumber = fields.length - Number(watchTotalNumber.value);
                for (let i = 0; i < decreaseNumber; i++) {
                    remove(fields.length - (i + 1));
                }
            }
        }
    }, [watchTotalNumber])
    useMemo(() => {
        const sectionsOdsptions = sectionData.map((item: SectionData) => {
            return {
                value: item.id,
                label: item.name
            }
        })
        setSectionOptions(sectionsOdsptions)
    }, [sectionData])

    //Effect
    useEffect(() => {
        if (message && success !== null) {
            setOpen(true)
        }
    }, [success, message, reset, setImages, setOpen])
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
            <Box sx={styles.Container}>
                <Typography variant="h6" component="h6" sx={styles.SubTitle}>
                    Add new banner
                </Typography>
                <Divider />
                <Box component="form" sx={{ p: "15px 20px" }} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item {...{ md: 12 }}>
                            <Typography variant="body1" component="p" sx={styles.Label}>
                                Banner Title
                            </Typography>
                            <Box sx={{ position: "relative", mt: "5px" }}>
                                <InputBase
                                    fullWidth
                                    placeholder="Banner Title"
                                    {...register("title", { required: true })}
                                    sx={styles.InputBase}
                                />
                                {errors.title &&
                                    <Box sx={styles.Error}>
                                        <Icon icon="clarity:error-line" />
                                    </Box>
                                }
                            </Box>
                        </Grid>
                        <Grid item {...{ md: 12 }}>
                            <Typography variant="body1" component="p" sx={styles.Label}>
                                Select Section
                            </Typography>
                            <Box sx={{ position: "relative", mt: "5px" }}>
                                <Controller
                                    control={control}
                                    name="section"
                                    rules={{ required: true }}
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            value={value}
                                            onChange={(e: any) => onChange(e)}
                                            options={sectionOptions}
                                            placeholder="Select Section"
                                            styles={selectStyles}
                                            isSearchable
                                            isClearable
                                            instanceId="section"
                                        />
                                    )}
                                />
                                {errors.bannerType &&
                                    <Box sx={styles.SelectError}>
                                        <Icon icon="clarity:error-line" />
                                    </Box>
                                }
                            </Box>
                        </Grid>
                        <Grid item {...{ md: 6 }}>
                            <Typography variant="body1" component="p" sx={styles.Label}>
                                Banner Type
                            </Typography>
                            <Box sx={{ position: "relative", mt: "5px" }}>
                                <Controller
                                    control={control}
                                    name="bannerType"
                                    rules={{ required: true }}
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            value={value}
                                            onChange={(e: any) => onChange(e)}
                                            options={BannerTypeOptions}
                                            placeholder="Select Banner Type"
                                            styles={selectStyles}
                                            isSearchable
                                            isClearable
                                            instanceId="bannerType"
                                        />
                                    )}
                                />
                                {errors.bannerType &&
                                    <Box sx={styles.SelectError}>
                                        <Icon icon="clarity:error-line" />
                                    </Box>
                                }
                            </Box>
                        </Grid>
                        <Grid item {...{ md: 6 }}>
                            <Typography variant="body1" component="p" sx={styles.Label}>
                                Total Number
                            </Typography>
                            <Box sx={{ position: "relative", mt: "5px" }}>
                                <Controller
                                    control={control}
                                    name="totalNumber"
                                    rules={{ required: true }}
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            value={value}
                                            onChange={(e: any) => onChange(e)}
                                            options={TotalNumberOptions}
                                            placeholder="Select Total Banner"
                                            styles={selectStyles}
                                            isSearchable
                                            isClearable
                                            instanceId="totalNumber"
                                        />
                                    )}
                                />
                                {errors.totalNumber &&
                                    <Box sx={styles.SelectError}>
                                        <Icon icon="clarity:error-line" />
                                    </Box>
                                }
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} sx={{ mt: "10px" }}>
                        {fields.map((field, i) => (
                            <Grid item {...{ md: Number(watchBannerType?.value) || 4 }} key={i}>
                                <Box>
                                    <ImageUploading
                                        value={images[i]?.images}
                                        onChange={(e) => onChange(e, i)}
                                        maxNumber={100}
                                    >
                                        {({
                                            imageList,
                                            onImageUpload,
                                        }) => (
                                            <Box onClick={onImageUpload} sx={{ cursor: "pointer" }}>
                                                <AspectRatio ratio="4/3" style={{ width: "100%" }} >
                                                    <>
                                                        {imageList.length === 0 &&
                                                            <Box sx={inlineStyles.ImageBorder}>
                                                                <Box sx={inlineStyles.Boxes}>
                                                                    <Icon icon="ic:outline-cloud-upload" />
                                                                    <Typography>Drag and drop file here or click</Typography>
                                                                </Box>
                                                                <Typography sx={inlineStyles.Title}>
                                                                    Banner {i + 1}<span>*</span>
                                                                </Typography>
                                                            </Box>
                                                        }
                                                        {imageList.length > 0 &&
                                                            imageList.map((item, i) => (
                                                                <Image src={item.dataURL as string} alt="banner" key={i} layout={'fill'} />
                                                            ))
                                                        }
                                                    </>
                                                </AspectRatio>
                                            </Box>
                                        )}
                                    </ImageUploading>
                                    <Typography variant="body1" component="p" sx={{ ...styles.Label, my: "10px", span: { color: "white" } }}>
                                        Text {i + 1}<span>*</span>
                                    </Typography>
                                    <Box sx={{ position: "relative" }}>
                                        <InputBase
                                            fullWidth
                                            placeholder="Ex: text"
                                            {...register(`banners.${i}.text`, { required: true })}
                                            sx={styles.InputBase}
                                        />
                                        {errors.banners && errors.banners[i]?.text &&
                                            <Box sx={styles.Error}>
                                                <Icon icon="clarity:error-line" />
                                            </Box>
                                        }
                                    </Box>
                                    <Typography variant="body1" component="p" sx={{ ...styles.Label, my: "10px", span: { color: "red" } }}>
                                        Link {i + 1}<span>*</span>
                                    </Typography>
                                    <Box sx={{ position: "relative" }}>
                                        <InputBase
                                            fullWidth
                                            placeholder="Exp: https://zuricart.co.ke/"
                                            {...register(`banners.${i}.link`, { required: true })}
                                            sx={styles.InputBase}
                                        />
                                        {errors.banners && errors.banners[i]?.link &&
                                            <Box sx={styles.Error}>
                                                <Icon icon="clarity:error-line" />
                                            </Box>
                                        }
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ position: "relative", mt: "5px" }}>
                        <Typography sx={{ my: "5px" }}>
                            Status
                        </Typography>
                        <Switch
                            {...register("publish")}
                            defaultChecked
                        />
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                        <ButtonBase type="submit" sx={styles.UpdateButton}>
                            Add New Banner
                            {loading &&
                                <CircularProgress size={16} sx={{ color: "background.default", ml: "10px", mb: "-2px" }} />
                            }
                        </ButtonBase>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Add;


const inlineStyles = {
    ImageBorder: {
        border: "1px solid #e5e5e5",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        cursor: "pointer"
    },
    Title: {
        position: "absolute",
        bgcolor: "white",
        top: "-12px",
        left: 0,
        span: {
            color: "red"
        }
    },
    Boxes: {
        textAlign: "center",
        svg: {
            fontSize: "45px",
            opacity: 0.3
        },
        "& p": {
            opacity: 0.5
        }
    }
}