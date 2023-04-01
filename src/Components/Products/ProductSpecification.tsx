import { Box, Typography, Divider, Grid, InputBase, ButtonBase } from "@mui/material";
import { UseFormRegister, Control, useFieldArray } from "react-hook-form";

//Styles
import styles from "Styles/Common/Create.styles";

//Import Types
import { Inputs } from "Types/Input.types";

//Types
interface Props {
    register: UseFormRegister<Inputs>;
    control: Control<Inputs>;
}

const ProductSpecification = ({ register, control }: Props) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "specification"
    });
    return (
        <Box sx={styles.Container}>
            <Typography variant="h6" component="h6" sx={styles.SubTitle}>
                Product Specification
            </Typography>
            <Divider />
            <Box sx={{ p: "15px 20px" }}>
                <Grid container spacing={2}>
                    <Grid item {...{ md: 2.5 }}>
                        <Typography variant="body1" component="p" sx={styles.Label}>
                            Specification
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 9.5 }}>
                        <Box>
                            {fields.map((field, i) => (
                                <Grid container spacing={1} alignItems="center" key={i}>
                                    <Grid item {...{ md: 5.5 }}>
                                        <Typography variant="body1" component="p" sx={{ ...styles.Label, mb: "10px" }}>
                                            Title
                                        </Typography>
                                        <InputBase
                                            fullWidth
                                            placeholder="Title"
                                            sx={styles.InputBase}
                                            {...register(`specification.${i}.title`)}
                                        />
                                    </Grid>
                                    <Grid item {...{ md: 5.5 }}>
                                        <Typography variant="body1" component="p" sx={{ ...styles.Label, mb: "10px" }}>
                                            Value
                                        </Typography>
                                        <InputBase
                                            fullWidth
                                            placeholder="Value"
                                            sx={styles.InputBase}
                                            {...register(`specification.${i}.value`)}
                                        />
                                    </Grid>
                                    <Grid item {...{ md: 1 }}>
                                        <ButtonBase onClick={() => remove(i)} sx={{ mt: "30px", color: "primary.main" }} disabled={fields.length === 1}>
                                            Remove
                                        </ButtonBase>
                                    </Grid>
                                </Grid>
                            ))}
                            <ButtonBase onClick={() => append({ title: "", value: "" })} sx={styles.BankUpdateButton}>
                                Add More
                            </ButtonBase>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};
export default ProductSpecification;