import { Box, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import Link from "next/link";

//Styles
import styles from "Styles/Common/Add.styles";

//Interface
interface Props {
    title: string;
    name: string;
    url: string;
}

const Add = ({ title, name, url }: Props) => {
    return (
        <Box>
            <Typography variant="h6" component="h6" sx={styles.Title}>
                {title}
            </Typography>
            <Box sx={styles.AddSupport}>
                <Link href={url}>
                    <a>
                        <Box className="icon">
                            <Icon icon="ant-design:plus-outlined" />
                        </Box>
                        <Typography variant="h6" component="h6">
                            {name}
                        </Typography>
                    </a>
                </Link>
            </Box>
        </Box>
    );
};
export default Add;