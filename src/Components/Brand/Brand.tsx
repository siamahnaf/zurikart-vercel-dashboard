import { useState, useEffect, useMemo } from "react";
import { Box, Typography, Divider, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, ButtonBase, Snackbar, Alert } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

//Confirm
import Delete from "Components/Common/Delete";

//Styles
import styles from "Styles/Common/Table.styles";

//Redux
import { useAppSelector, useAppDispatch } from "Redux/Hook";
import { deleteBrand } from "Redux/Action/Brands/brand.action";

//Interface
interface GetBrands {
    id: string,
    name: string;
    image: string;
    description: string;
    slug: string
}

const Brand = () => {
    //Selector
    const { brandsData } = useAppSelector(state => state.getBrand);
    const { success, message } = useAppSelector(state => state.deleteBrand);
    //State
    const [brands, setBrands] = useState<GetBrands[]>(brandsData);
    const [direction, setDirection] = useState<string>("asc");
    const [open, setOpen] = useState<number | null>(null);
    const [snackbar, setSnackbar] = useState<boolean>(false);
    //Handler
    const dispatch = useAppDispatch();
    const handleClose = (id?: string, imageUrl?: string) => {
        setOpen(null)
        if (id) {
            dispatch(deleteBrand(id, imageUrl as string))
            const result = brands.filter(item => item.id !== id)
            setBrands(result);
        }
    }
    const sortingHandler = () => {
        if (direction === "desc") {
            const strAscending = [...brands].sort((a, b) =>
                a.name > b.name ? 1 : -1,
            );
            setBrands(strAscending)
            setDirection("asc")
        } else if (direction === "asc") {
            const strDescending = [...brands].sort((a, b) =>
                a.name > b.name ? -1 : 1,
            );
            setBrands(strDescending)
            setDirection("desc")
        }
    }
    const handleSnackClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar(false);
    };
    //Effect
    useEffect(() => {
        if (message && success !== null) {
            setSnackbar(true)
        }
    }, [success, message, setSnackbar])
    useMemo(() => {
        if (brandsData) {
            setBrands(brandsData);
        }
    }, [brandsData])
    return (
        <Box sx={{ ...styles.Container, mb: "3em" }}>
            {message &&
                <Snackbar
                    open={snackbar}
                    message="Successfully added"
                    autoHideDuration={5000}
                    onClose={handleSnackClose}
                >
                    <Alert onClose={handleSnackClose} severity={success === true ? "success" : "error"} sx={{ width: "100%" }} variant="filled">
                        {message}
                    </Alert>
                </Snackbar>
            }
            <Typography variant="h6" component="h6" sx={styles.Title}>
                All brands
            </Typography>
            <Divider />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell width="6%">#</TableCell>
                            <TableCell width="12%">
                                <TableSortLabel
                                    onClick={sortingHandler}
                                    direction={direction === "asc" ? "asc" : "desc"}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell width="58%">Details</TableCell>
                            <TableCell width="12%">Image</TableCell>
                            <TableCell width="12%" align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {brands.length > 0 &&
                            brands.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        {i + 1 > 10 ? i + 1 : `0${i + 1}`}
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>
                                        {item.image &&
                                            <Image src={process.env.NEXT_PUBLIC_IMAGE_PATH + item.image} alt={item.name} width={60} height={60} />
                                        }
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box sx={styles.Buttons}>
                                            <ButtonBase onClick={() => setOpen(i)}>
                                                <Icon icon="fluent:delete-24-filled" />
                                            </ButtonBase>
                                            <Delete
                                                open={open === i}
                                                handleClose={handleClose}
                                                id={item.id}
                                                imageUrl={item.image}
                                            />
                                            <ButtonBase>
                                                <Link href={`/brand/edit-brand/${item.slug}`}>
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
                        {brands.length === 0 &&
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
export default Brand;