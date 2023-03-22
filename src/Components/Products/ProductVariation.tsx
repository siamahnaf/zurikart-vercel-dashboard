import { Dispatch, SetStateAction, Fragment, useMemo, useState } from "react";
import { Box, Typography, Divider, Grid } from "@mui/material";
import Select, { ActionMeta } from "react-select";

//Styles
import styles from "Styles/Common/Create.styles";
import selectStyles from "Styles/Common/Select.styles";

//Import Types
import { Values } from "Types/Input.types";

//Redux
import { useAppSelector } from "Redux/Hook";

//Types
export interface Attributes {
    name: string;
    values: readonly Values[];
    options: Values[];
}
interface Props {
    attributes: Attributes[];
    setAttribute: Dispatch<SetStateAction<Attributes[]>>
}

const ProductVariation = ({ attributes, setAttribute }: Props) => {
    //Selector
    const { attributesData } = useAppSelector(state => state.getAttributes);
    //State
    const [attributeOption, setAttributeOptions] = useState<Values[]>([]);
    //Handler
    const AttributeOnChange = (value: readonly Values[], actionMeta: ActionMeta<Values>) => {
        const attribute = value.map((item) => {
            return {
                name: item.label,
                values: [],
                options: attributesData.find((e: any) => e.id === item.value).values.map((v: any) => { return { value: v.value, label: v.value } })
            }
        })
        setAttribute(attribute)
    }
    const UpdateAttribute = (value: readonly Values[], actionMeta: ActionMeta<Values>) => {
        const list = [...attributes];
        for (let key of list) {
            if (key.name === actionMeta.name) {
                key.values = value
            }
        }
        setAttribute(list)
    }
    //Effect
    useMemo(() => {
        const attributeOptions = attributesData?.map((item: any) => {
            return {
                value: item.id,
                label: item.name
            }
        })
        setAttributeOptions(attributeOptions);
    }, [attributesData])
    return (
        <Box sx={styles.Container}>
            <Typography variant="h6" component="h6" sx={styles.SubTitle}>
                Product Variation
            </Typography>
            <Divider />
            <Box sx={{ p: "15px 20px" }}>
                <Box sx={{ mb: "15px" }}>
                    <Grid container spacing={2}>
                        <Grid item {...{ md: 2.5 }}>
                            <Typography variant="body1" component="p" sx={styles.Label}>
                                Attribute
                            </Typography>
                        </Grid>
                        <Grid item {...{ md: 9.5 }}>
                            <Select
                                options={attributeOption}
                                onChange={AttributeOnChange}
                                placeholder="Select Attribute"
                                styles={selectStyles}
                                isSearchable
                                isClearable
                                instanceId="attribute"
                                isMulti
                                closeMenuOnSelect={false}
                            />
                        </Grid>
                    </Grid>
                </Box>
                {attributes.length > 0 &&
                    <Divider sx={{ my: "20px", borderStyle: "dashed" }} />
                }
                <Grid container spacing={2}>
                    {attributes.map((item, i) => (
                        <Fragment key={i}>
                            <Grid item {...{ md: 2.5 }}>
                                <Typography variant="body1" component="p" sx={styles.Label}>
                                    {item.name}
                                </Typography>
                            </Grid>
                            <Grid item {...{ md: 9.5 }}>
                                <Select
                                    options={item.options}
                                    value={attributes[i].values}
                                    onChange={UpdateAttribute}
                                    name={item.name}
                                    placeholder={`Select ${item.name}`}
                                    styles={selectStyles}
                                    isSearchable
                                    isClearable
                                    instanceId={item.name}
                                    isMulti
                                    closeMenuOnSelect={false}
                                />
                            </Grid>
                        </Fragment>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default ProductVariation;