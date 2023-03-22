import Theme from "Theme";
import { GroupBase, StylesConfig } from "react-select";

//Types
import { Values } from "Types/Input.types";

const colorStyles: StylesConfig<Values, true, GroupBase<Values>> = {
    option: (styles, { isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor: isSelected ? Theme.palette.primary.main : isFocused ? Theme.palette.primary.lighter : undefined,
            color: isSelected ? Theme.palette.background.default : "",
            cursor: "",
            fontSize: "14px"
        };
    },
    control: (styles, { isFocused }) => {
        return {
            ...styles,
            padding: "2.5px 0px",
            fontSize: "14px",
            border: isFocused ? `1px solid ${Theme.palette.primary.main}` : `1px solid ${Theme.palette.primary.borderColor}`,
            outline: "none",
            boxShadow: '0 !important',
            "&:hover": {
                border: isFocused ? `1px solid ${Theme.palette.primary.main}` : `1px solid ${Theme.palette.primary.borderColor}`
            }
        }
    },
    placeholder: (styles) => ({ ...styles, opacity: 0.7 }),
};

export default colorStyles;