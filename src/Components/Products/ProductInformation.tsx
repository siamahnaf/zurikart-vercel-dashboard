import { ChangeEvent, useMemo, useState } from "react";
import { Box, Typography, Divider, InputBase, Grid } from "@mui/material";
import { UseFormRegister, FieldErrors, Control, Controller, useWatch } from "react-hook-form";
import Select from "react-select";
import { Icon } from "@iconify/react";

//Styles
import styles from "Styles/Common/Create.styles";
import selectStyles from "Styles/Common/Select.styles";

//Import Types
import { Inputs } from "Types/Input.types";

//Redux
import { useAppSelector } from "Redux/Hook";

//Import types
import { Values } from "Types/Input.types";

//Types
interface Props {
    register: UseFormRegister<Inputs>;
    control: Control<Inputs>;
    errors: FieldErrors<Inputs>;
}

const ProductInformation = ({ register, control, errors }: Props) => {
    //Selector
    const { categoriesData } = useAppSelector(state => state.getCategory);
    const { subcategoryData } = useAppSelector(state => state.getSubs);
    const { brandsData } = useAppSelector(state => state.getBrand);
    const { tagsData } = useAppSelector(state => state.getTags);
    //State
    const [categoryOption, setCategoryOption] = useState<Values[]>([]);
    const [subcategoryOption, setSubcategoryOption] = useState<Values[]>([]);
    const [brandOptions, setBrandOptions] = useState<Values[]>([]);
    const [tagOptions, setTagOptions] = useState<Values[]>([]);
    //Effect
    useMemo(() => {
        const categoryOptions = categoriesData?.map((item: any) => {
            return {
                value: item.id,
                label: item.name
            }
        })
        setCategoryOption(categoryOptions);
        const brandOptions = brandsData?.map((item: any) => {
            return {
                value: item.id,
                label: item.name
            }
        })
        setBrandOptions(brandOptions);
        const tagOptions = tagsData?.map((item: any) => {
            return {
                value: item.id,
                label: item.name
            }
        })
        setTagOptions(tagOptions);
    }, [categoriesData, brandsData, tagsData]);
    const categoryInput = useWatch<Inputs>({
        control,
        name: "category"
    })
    useMemo(() => {
        let subcategoryOptions = subcategoryData?.filter((item: any) => item.category.id === categoryInput);
        subcategoryOptions = subcategoryOptions?.map((item: any) => {
            return {
                value: item.id,
                label: item.name
            }
        })
        setSubcategoryOption(subcategoryOptions);
    }, [subcategoryData, categoryInput])
    return (
        <Box sx={styles.Container}>
            <Typography variant="h6" component="h6" sx={styles.SubTitle}>
                Product Information
            </Typography>
            <Divider />
            <Box sx={{ p: "15px 20px" }}>
                <Grid container spacing={2}>
                    <Grid item {...{ md: 2.5 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Product Name
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9.5 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="Product Name"
                                sx={styles.InputBase}
                                {...register("name", { required: true })}
                            />
                            {errors.name &&
                                <Box sx={styles.Error}>
                                    <Icon icon="clarity:error-line" />
                                </Box>
                            }
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 2.5 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Product Url
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9.5 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="Product Url"
                                sx={styles.InputBase}
                                {...register("productUrl", { required: true })}
                            />
                            {errors.productUrl &&
                                <Box sx={styles.Error}>
                                    <Icon icon="clarity:error-line" />
                                </Box>
                            }
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 2.5 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Product Badge
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9.5 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="Product Badge"
                                sx={styles.InputBase}
                                {...register("badge")}
                            />
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 2.5 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Product Notice
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9.5 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="Product Notice"
                                sx={styles.InputBase}
                                {...register("notice")}
                            />
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 2.5 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Category
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9.5 }}>
                        <Box sx={{ position: "relative" }}>
                            <Controller
                                control={control}
                                name="category"
                                defaultValue={""}
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        value={value !== "" ? categoryOption?.filter(item => item.value === value) : null}
                                        onChange={(e: any) => onChange(e?.value)}
                                        options={categoryOption}
                                        placeholder="Select category"
                                        styles={selectStyles}
                                        isSearchable
                                        isClearable
                                        instanceId="category"
                                    />
                                )}
                            />
                            {errors.category &&
                                <Box sx={styles.SelectError}>
                                    <Icon icon="clarity:error-line" />
                                </Box>
                            }
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 2.5 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Sub-category
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9.5 }}>
                        <Box sx={{ position: "relative" }}>
                            <Controller
                                control={control}
                                name="subCategory"
                                defaultValue={[]}
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        value={value?.length > 0 ? subcategoryOption?.filter(item => value.includes(item.value)) : null}
                                        onChange={(e: any) => onChange(e.map((c: any) => c.value))}
                                        options={subcategoryOption}
                                        placeholder="Select sub category"
                                        styles={selectStyles}
                                        isSearchable
                                        isClearable
                                        instanceId="tag"
                                        isMulti
                                        closeMenuOnSelect={false}
                                    />
                                )}
                            />
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 2.5 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Brand
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9.5 }}>
                        <Box sx={{ position: "relative" }}>
                            <Controller
                                control={control}
                                name="brand"
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        value={value !== "" ? brandOptions?.filter(item => item.value === value) : null}
                                        onChange={(e: any) => onChange(e?.value)}
                                        options={brandOptions}
                                        placeholder="Select brand"
                                        styles={selectStyles}
                                        isSearchable
                                        isClearable
                                        instanceId="brand"
                                    />
                                )}
                            />
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 2.5 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Unit
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9.5 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="Unit (e.g. KG, Pc, etc)"
                                sx={styles.InputBase}
                                {...register("unit")}
                            />
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 2.5 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Minimum Purchase Qty
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9.5 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="Minimum Purchase Qty"
                                sx={styles.InputBase}
                                onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '')
                                }}
                                {...register("minPurchase")}
                            />
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 2.5 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Tags
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9.5 }}>
                        <Controller
                            control={control}
                            name="tags"
                            defaultValue={[]}
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    value={value?.length > 0 ? tagOptions?.filter(item => value.includes(item.value)) : null}
                                    onChange={(e: any) => onChange(e.map((c: any) => c.value))}
                                    options={tagOptions}
                                    placeholder="Select tags"
                                    styles={selectStyles}
                                    isSearchable
                                    isClearable
                                    instanceId="tag"
                                    isMulti
                                    closeMenuOnSelect={false}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box >
    );
};
export default ProductInformation;