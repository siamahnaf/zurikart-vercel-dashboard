import { useState, Fragment, useEffect, useMemo } from "react";
import { Box, Typography, Divider, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, ButtonBase, Snackbar, Alert } from "@mui/material";
import Link from "next/link";
import { Icon } from "@iconify/react";

//Confirmation Dialog
import Delete from "Components/Common/Delete";

//Styles
import styles from "Styles/Common/Table.styles";

//Redux
import { useAppSelector, useAppDispatch } from "Redux/Hook";
import { deleteAttribute } from "Redux/Action/Attributes/attribute.action";

//Interface
interface Values {
    value: string;
    meta: string;
}
interface AttributesData {
    id: string;
    name: string;
    slug: string;
    values: Values[]
}

const Attributes = () => {
    //Selector
    const { attributesData } = useAppSelector(state => state.getAttributes);
    const { message, success } = useAppSelector(state => state.deleteAttribute);
    //State
    const [attributes, setAttributes] = useState<AttributesData[]>(attributesData);
    const [direction, setDirection] = useState<string>("asc");
    const [open, setOpen] = useState<number | null>(null);
    const [snackbar, setSnackbar] = useState<boolean>(false);
    //Handler
    const dispatch = useAppDispatch();
    const handleClose = (id?: string) => {
        setOpen(null)
        if (id) {
            dispatch(deleteAttribute(id))
            const result = attributes.filter(item => item.id !== id)
            setAttributes(result);
        }
    }
    const sortingHandler = () => {
        if (direction === "desc") {
            const strAscending = [...attributes].sort((a, b) =>
                a.name > b.name ? 1 : -1,
            );
            setAttributes(strAscending)
            setDirection("asc")
        } else if (direction === "asc") {
            const strDescending = [...attributes].sort((a, b) =>
                a.name > b.name ? -1 : 1,
            );
            setAttributes(strDescending)
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
        if (attributesData.length > 0) {
            setAttributes(attributesData)
        }
    }, [attributesData])
    return (
        <Box sx={styles.Container}>
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
                All attributes
            </Typography>
            <Divider />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow hover={true}>
                            <TableCell width="6%">#</TableCell>
                            <TableCell width="12%">
                                <TableSortLabel
                                    onClick={sortingHandler}
                                    direction={direction === "asc" ? "asc" : "desc"}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell width="35%">Values</TableCell>
                            <TableCell width="35%">Meta</TableCell>
                            <TableCell width="12%" align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attributes.length > 0 &&
                            attributes.map((item, i) => (
                                <TableRow key={i} hover={true}>
                                    <TableCell>
                                        {i + 1 > 10 ? i + 1 : `0${i + 1}`}
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>
                                        [ {item.values.map((val, i) => (
                                            <Fragment key={i}>
                                                {val.value}
                                                {item.values.length === i + 1 ? " " : ", "}
                                            </Fragment>
                                        ))}]
                                    </TableCell>
                                    <TableCell>
                                        [ {item.values.map((val, i) => (
                                            <Fragment key={i}>
                                                {val.meta}
                                                {item.values.length === i + 1 ? " " : ", "}
                                            </Fragment>
                                        ))}]
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
                                            />
                                            <ButtonBase>
                                                <Link href={`/attributes/edit-attributes/${item.slug}`}>
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
                        {attributes.length === 0 &&
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
export default Attributes;