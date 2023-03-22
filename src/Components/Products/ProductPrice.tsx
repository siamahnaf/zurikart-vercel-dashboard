import { useEffect, Dispatch, SetStateAction, ChangeEvent, useState } from 'react';
import { Box, Typography, Divider, InputBase, Grid, ButtonBase } from "@mui/material";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue, Control, Controller, useWatch } from "react-hook-form";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Select from "react-select";

//Import types
import { Attributes } from "./ProductVariation";
import { Inputs } from "Types/Input.types";

//Styles
import styles from "Styles/Common/Create.styles";
import selectStyles from "Styles/Common/Select.styles";

//Interface
export interface Combine {
    variant: string;
    price: string;
    quantity: string;
    image: ImageListType;
}
interface Props {
    attributes: Attributes[];
    combines: Combine[];
    setCombine: Dispatch<SetStateAction<Combine[]>>;
    register: UseFormRegister<Inputs>;
    errors: FieldErrors<Inputs>;
    watch: UseFormWatch<Inputs>;
    setValue: UseFormSetValue<Inputs>;
    control: Control<Inputs>;
}

const ProductPrice = ({ attributes, combines, setCombine, register, errors, watch, setValue, control }: Props) => {
    useEffect(() => {
        const getValues = attributes.map(({ values }) =>
            values.map(({ value }) => value)
        );
        function cartesianProduct(arr: Array<string[]>) {
            return arr.reduce(function (a, b) {
                return a.map(function (x: any) {
                    return b.map(function (y: any) {
                        return x.concat([y]);
                    })
                }).reduce(function (a, b) { return a.concat(b) }, [])
            }, [[]])
        }
        if (getValues.length > 0) {
            const result = cartesianProduct(getValues);
            const buildObjects = Array.from(result, arr => ({ variant: arr.join("-"), price: "", quantity: "", image: [] }));
            setCombine(buildObjects);
        }
    }, [attributes, setCombine]);
    const handlePriceChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, i: number) => {
        const { value } = e.target;
        const list = [...combines];
        list[i].price = value
        setCombine(list);
    };
    const handleQuantityChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, i: number) => {
        const { value } = e.target;
        const list = [...combines];
        list[i].quantity = value
        setCombine(list);
    }
    const onImageChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined, i: number) => {
        const list = [...combines];
        list[i].image = imageList
        setCombine(list);
    };
    return (
        <Box sx={styles.Container}>
            <Typography variant="h6" component="h6" sx={styles.SubTitle}>
                Product price + stock
            </Typography>
            <Divider />
            <Box sx={{ p: "15px 20px" }}>
                <Grid container spacing={2}>
                    <Grid item {...{ md: 2.5 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Unit price
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9.5 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="0"
                                sx={styles.InputBase}
                                onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '')
                                }}
                                {...register("price", { required: true })}
                            />
                            {errors.price &&
                                <Box sx={styles.Error}>
                                    <Icon icon="clarity:error-line" />
                                </Box>
                            }
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 2.5 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Quantity
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9.5 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="0"
                                sx={styles.InputBase}
                                onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '')
                                }}
                                {...register("quantity", { required: true })}
                            />
                            {errors.quantity &&
                                <Box sx={styles.Error}>
                                    <Icon icon="clarity:error-line" />
                                </Box>
                            }
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 2.5 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Discount
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9.5 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="0"
                                sx={styles.InputBase}
                                onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '')
                                }}
                                {...register("discount", {
                                    required: true,
                                    validate: (value: string | number) => {
                                        if (watch("discountUnit") === "percent" && Number(value) > 100) {
                                            return false;
                                        } else {
                                            return true;
                                        }
                                    }
                                })}
                            />
                            {errors.discount &&
                                <Box sx={styles.Error}>
                                    <Icon icon="clarity:error-line" />
                                </Box>
                            }
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 2.5 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Discount Unit
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9.5 }}>
                        <Controller
                            control={control}
                            name="discountUnit"
                            defaultValue="flat"
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    value={{ value: value, label: value[0].toUpperCase() + value.substring(1) }}
                                    onChange={(e: any) => onChange(e?.value)}
                                    options={[
                                        { value: "flat", label: "Flat" },
                                        { value: "percent", label: "percent" }
                                    ]}
                                    placeholder="Select category"
                                    styles={selectStyles}
                                    instanceId="discountUnit"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item {...{ md: 2.5 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Door Step Fees
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9.5 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="0"
                                sx={styles.InputBase}
                                onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '')
                                }}
                                {...register("doorDeliveryFee", { required: true })}
                            />
                            {errors.discount &&
                                <Box sx={styles.Error}>
                                    <Icon icon="clarity:error-line" />
                                </Box>
                            }
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 2.5 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Pick Station Fees
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9.5 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="0"
                                sx={styles.InputBase}
                                onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '')
                                }}
                                {...register("pickupFee", { required: true })}
                            />
                            {errors.discount &&
                                <Box sx={styles.Error}>
                                    <Icon icon="clarity:error-line" />
                                </Box>
                            }
                        </Box>
                    </Grid>
                </Grid>
                {combines.length > 0 &&
                    <Divider sx={{ my: "20px", borderStyle: "dashed" }} />
                }
                <Box>
                    {combines.map((combine, i) => (
                        <Grid container spacing={2} key={i} sx={{ mb: i === combines.length - 1 ? "" : "20px" }}>
                            <Grid item {...{ md: 2.5 }}>
                                <Typography variant="body1" component="p" sx={{ ...styles.Label, mb: "10px" }}>
                                    Variant Name
                                </Typography>
                                <Typography variant="body1" component="p" sx={styles.VariantName}>
                                    {combine.variant}
                                </Typography>
                            </Grid>
                            <Grid item {...{ md: 3 }}>
                                <Box>
                                    <Typography variant="body1" component="p" sx={{ ...styles.Label, mb: "10px" }}>
                                        Variant Price
                                    </Typography>
                                    <InputBase
                                        fullWidth
                                        placeholder="0"
                                        sx={styles.InputBase}
                                        onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                            e.target.value = e.target.value.replace(/[^0-9]/g, '')
                                        }}
                                        onChange={(e) => handlePriceChange(e, i)}
                                    />
                                </Box>
                            </Grid>
                            <Grid item {...{ md: 3 }}>
                                <Box>
                                    <Typography variant="body1" component="p" sx={{ ...styles.Label, mb: "10px" }}>
                                        Quantity
                                    </Typography>
                                    <InputBase
                                        fullWidth
                                        placeholder="0"
                                        sx={styles.InputBase}
                                        onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                            e.target.value = e.target.value.replace(/[^0-9]/g, '')
                                        }}
                                        onChange={(e) => handleQuantityChange(e, i)}
                                    />
                                </Box>
                            </Grid>
                            <Grid item {...{ md: 3.5 }}>
                                <Box>
                                    <Typography variant="body1" component="p" sx={{ ...styles.Label, mb: "10px" }}>
                                        Image
                                    </Typography>
                                </Box>
                                <Box>
                                    <ImageUploading
                                        value={combine.image}
                                        onChange={(e, v) => onImageChange(e, v, i)}
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
                                                    <Box key={i} sx={{ ...styles.ImageContainer, width: "40%" }}>
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
                                </Box>
                            </Grid>
                        </Grid>
                    ))}
                </Box>
            </Box>
        </Box >
    );
};
export default ProductPrice;