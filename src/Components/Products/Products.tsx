import { useState, useMemo, useEffect } from "react";
import { Box, Grid, Typography, Divider, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, ButtonBase, InputBase, InputAdornment, Snackbar, Alert } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { Icon } from "@iconify/react";

//Confirm
import Dialogs from "./Delete/Dialogs";

//Styles
import styles from "Styles/Common/Table.styles";

//Redux
import { useAppSelector, useAppDispatch } from "Redux/Hook";
import { getProducts, deleteProducts } from "Redux/Action/Products/product.action";

//Types
interface Url {
    url: string
}
interface Products {
    id: string;
    name: string;
    slug: string;
    category: {
        name: string;
    };
    brand: {
        name: string;
    };
    meta: {
        image: string;
    };
    productImages: Url[];
    price: number;
    quantity: number;
    visibility: boolean;
}
interface Inputs {
    search: string;
}
interface ImageUrl {
    productImages: Url[];
    metaImages: string;
}

const Products = () => {
    //Selector
    const { productsData } = useAppSelector(state => state.getProducts);
    const { message, success } = useAppSelector(state => state.deleteProducts);
    //State
    const [products, setProducts] = useState<Products[]>(productsData);
    const [direction, setDirection] = useState<string>("asc");
    const [open, setOpen] = useState<number | null>(null);
    const [snackbar, setSnackbar] = useState<boolean>(false);
    //Handler
    const {
        register,
        handleSubmit,
        control
    } = useForm<Inputs>();
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<Inputs> = (data, e) => {
        if (data.search) {
            dispatch(getProducts(data.search))
        }
    }
    const handleClose = (id?: string, imageUrl?: ImageUrl) => {
        setOpen(null)
        if (id) {
            dispatch(deleteProducts(id, imageUrl as ImageUrl))
            const result = products.filter(item => item.id !== id)
            setProducts(result);
        }
    }
    const sortingHandler = () => {
        if (direction === "desc") {
            const strAscending = [...products].sort((a, b) =>
                a.name > b.name ? 1 : -1,
            );
            setProducts(strAscending)
            setDirection("asc")
        } else if (direction === "asc") {
            const strDescending = [...products].sort((a, b) =>
                a.name > b.name ? -1 : 1,
            );
            setProducts(strDescending)
            setDirection("desc")
        }
    }
    const handleSnackClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar(false);
    };
    const searchInput = useWatch<Inputs>({
        control,
        name: "search"
    })
    //Effect
    useMemo(() => {
        if (productsData.length > 0) {
            setProducts(productsData)
        } else if (searchInput) {
            setProducts([])
        }
    }, [productsData, searchInput])
    useEffect(() => {
        if (searchInput === "") {
            dispatch(getProducts(""))
        }
    }, [searchInput, dispatch])
    useEffect(() => {
        if (message && success !== null) {
            setSnackbar(true)
        }
    }, [success, message, setSnackbar])
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
            <Grid container spacing={2} alignItems="center">
                <Grid item {...{ md: 8 }}>
                    <Typography variant="h6" component="h6" sx={styles.Title}>
                        All products
                    </Typography>
                </Grid>
                <Grid item {...{ md: 4 }}>
                    <Box sx={{ mr: 1 }} component="form" onSubmit={handleSubmit(onSubmit)}>
                        <InputBase
                            fullWidth
                            placeholder="Search Products"
                            startAdornment={<InputAdornment position="start" sx={{ fontSize: "20px" }}>
                                <Icon icon="ic:outline-search" />
                            </InputAdornment>}
                            sx={styles.InputBase}
                            {...register("search")}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Divider />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell width="5%">#</TableCell>
                            <TableCell width="22%">
                                <TableSortLabel
                                    onClick={sortingHandler}
                                    direction={direction === "asc" ? "asc" : "desc"}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell width="10%">Image</TableCell>
                            <TableCell width="12%">Category</TableCell>
                            <TableCell width="12%">Brand</TableCell>
                            <TableCell width="7%">Qty</TableCell>
                            <TableCell width="10%">Price</TableCell>
                            <TableCell width="10%">Status</TableCell>
                            <TableCell width="12%" align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.length > 0 &&
                            products.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        {i + 1 > 10 ? i + 1 : `0${i + 1}`}
                                    </TableCell>
                                    <TableCell >
                                        <Typography variant="body1" component="p" sx={styles.ProductTitle} title={item.name}>
                                            {item.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {item.productImages?.length > 0 ? (
                                            <Image src={process.env.NEXT_PUBLIC_IMAGE_PATH + item.productImages[0]?.url} alt={item.name} width={50} height={50} />
                                        ) : (
                                            <Typography variant="caption" component="p" sx={{ color: "primary.main" }}>
                                                No item
                                            </Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>{item.category.name}</TableCell>
                                    <TableCell>
                                        {item.brand ? (
                                            item.brand.name
                                        ) : (
                                            <Typography variant="caption" component="p" sx={{ color: "primary.main" }}>
                                                No item
                                            </Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: item.visibility ? "primary.success" : "primary.main" }}>
                                        {item.visibility ? "Published" : "Draft"}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box sx={styles.Buttons}>
                                            <ButtonBase onClick={() => setOpen(i)}>
                                                <Icon icon="fluent:delete-24-filled" />
                                            </ButtonBase>
                                            <Dialogs
                                                open={open === i}
                                                handleClose={handleClose}
                                                id={item.id}
                                                imageUrl={{
                                                    productImages: item.productImages,
                                                    metaImages: item.meta?.image
                                                }}
                                            />
                                            <ButtonBase>
                                                <Link href={`/products/edit-product/${item.slug}`}>
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
                        {products.length === 0 &&
                            <TableRow>
                                <TableCell align="center" colSpan={9} sx={styles.NothingCell}>
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
export default Products;