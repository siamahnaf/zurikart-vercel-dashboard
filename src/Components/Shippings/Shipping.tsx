import { useState, useMemo } from "react";
import { Box, Typography, Divider, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, ButtonBase } from "@mui/material";
import Link from "next/link";
import { Icon } from "@iconify/react";

//Styles
import styles from "Styles/Common/Table.styles";

//Redux
import { useAppSelector } from "Redux/Hook";

//Types
interface ShippingData {
    id: string;
    name: string;
    rateInSavar: number;
    rateInsideDhaka: number;
    rateOutsideDhaka: number;
    slug: string;
    estimateDelivery: string;
}

const Shipping = () => {
    //Selector
    const { shippingData } = useAppSelector(state => state.getShipping);
    //State
    const [shippings, setShippings] = useState<ShippingData[]>(shippingData);
    const [direction, setDirection] = useState<string>("asc");
    //Handler
    const sortingHandler = () => {
        if (direction === "desc") {
            const strAscending = [...shippings].sort((a, b) =>
                a.name > b.name ? 1 : -1,
            );
            setShippings(strAscending)
            setDirection("asc")
        } else if (direction === "asc") {
            const strDescending = [...shippings].sort((a, b) =>
                a.name > b.name ? -1 : 1,
            );
            setShippings(strDescending)
            setDirection("desc")
        }
    }
    //Effect
    useMemo(() => {
        if (shippingData.length > 0) {
            setShippings(shippingData)
        }
    }, [shippingData])
    return (
        <Box sx={{ ...styles.Container, mb: "3em" }}>
            <Typography variant="h6" component="h6" sx={styles.Title}>
                All Shipping Method
            </Typography>
            <Divider />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell width="6%">#</TableCell>
                            <TableCell width="13%">
                                <TableSortLabel
                                    onClick={sortingHandler}
                                    direction={direction === "asc" ? "asc" : "desc"}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell width="13%">Rate</TableCell>
                            <TableCell width="13%">Estimate Delivery</TableCell>
                            <TableCell width="13%" align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {shippings.length > 0 &&
                            shippings.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        {i + 1 > 10 ? i + 1 : `0${i + 1}`}
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>[{item.rateInsideDhaka}, {item.rateOutsideDhaka}, {item.rateInSavar}]</TableCell>
                                    <TableCell>{item.estimateDelivery}</TableCell>
                                    <TableCell align="right">
                                        <Box sx={styles.Buttons}>
                                            <ButtonBase>
                                                <Link href={`/shippings/edit-shipping/${item.slug}`}>
                                                    <a>
                                                        <Icon icon="akar-icons:edit" />
                                                    </a>
                                                </Link>
                                            </ButtonBase>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                        {shippings.length === 0 &&
                            <TableRow>
                                <TableCell align="center" colSpan={5} sx={styles.NothingCell}>
                                    <Icon icon="fluent:emoji-sad-16-regular" />
                                    <Typography variant="h4" component="h4">
                                        Nothing Found
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
export default Shipping;