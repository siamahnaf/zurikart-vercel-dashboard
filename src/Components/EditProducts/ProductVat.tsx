import { ChangeEvent } from "react";
import { Box, Typography, Divider, Grid, InputBase, FormControl, Select, MenuItem } from "@mui/material";
import { UseFormRegister, FieldErrors, Controller, Control } from "react-hook-form";
import { Icon } from "@iconify/react";

//Styles
import styles from "Styles/Common/Create.styles";

//Import types
import { Inputs } from "Types/Input.types";

//Types
interface Props {
    register: UseFormRegister<Inputs>;
    errors: FieldErrors<Inputs>;
    control: Control<Inputs>;
}

const ProductVat = ({ register, errors, control }: Props) => {
    return (
        <Box sx={styles.Container}>
            <Typography variant="h6" component="h6" sx={styles.SubTitle}>
                VAT & Tax
            </Typography>
            <Divider />
            <Box sx={{ p: "15px 20px" }}>
                <Grid container spacing={1}>
                    <Grid item {...{ md: 12 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Tax
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 6 }}>
                        <Box sx={{ position: "relative" }}>
                            <InputBase
                                fullWidth
                                placeholder="Tax"
                                sx={styles.InputBase}
                                onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '')
                                }}
                                {...register("tax", { required: true })}
                            />
                            {errors.tax &&
                                <Box sx={styles.Error}>
                                    <Icon icon="clarity:error-line" />
                                </Box>
                            }
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 6 }}>
                        <FormControl fullWidth size="small">
                            <Controller
                                control={control}
                                name="taxUnit"
                                defaultValue="flat"
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        value={value}
                                        onChange={(e: any) => onChange(e?.value)}
                                        sx={styles.Select}
                                    >
                                        <MenuItem value="flat">Flat</MenuItem>
                                        <MenuItem value="percent">Percent</MenuItem>
                                    </Select>
                                )}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};
export default ProductVat;