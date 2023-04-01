import { useState, useEffect, useMemo } from "react";
import { Box, Typography, Divider, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, ButtonBase, Snackbar, Alert } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

const BannerTypeOptions = [
    { value: "12", label: "1 Banner" },
    { value: "6", label: "2 Banner" },
    { value: "4", label: "3 Banner" },
    { value: "3", label: "4 Banner" },
    { value: "2.4", label: "5 Banner" },
    { value: "2", label: "6 Banner" },
    { value: "1.5", label: "8 Banner" },
    { value: "1.2", label: "10 Banner" },
    { value: "1", label: "12 Banner" }
]

//Confirmation
import Delete from "Components/Common/Delete";

//Styles
import styles from "Styles/Common/Table.styles";

//Redux
import { useAppSelector, useAppDispatch } from "Redux/Hook";
import { deleteDynamic } from "Redux/Action/Home/home.action";

interface DynamicBanner {
    id: string;
    title: string;
    bannerType: string;
    publish: boolean;
    totalNumber: string;
    section: {
        name: string;
        id: string;
    }
}

const Lists = () => {
    //Selector
    const { dynamicData } = useAppSelector(state => state.getDynamic);
    const { message, success } = useAppSelector(state => state.deleteDynamicBanner)
    //State
    const [dynamics, setDynamics] = useState<DynamicBanner[]>(dynamicData);
    const [direction, setDirection] = useState<string>("asc");
    const [open, setOpen] = useState<number | null>(null);
    const [snackbar, setSnackbar] = useState<boolean>(false);
    //Dispatch
    const dispatch = useAppDispatch();
    const handleClose = (id?: string) => {
        setOpen(null)
        if (id) {
            const result = dynamics.filter(item => item.id !== id)
            setDynamics(result);
            dispatch(deleteDynamic(id))
        }

    }
    const sortingHandler = () => {
        if (direction === "desc") {
            const strAscending = [...dynamics].sort((a, b) =>
                a.title > b.title ? 1 : -1,
            );
            setDynamics(strAscending)
            setDirection("asc")
        } else if (direction === "asc") {
            const strDescending = [...dynamics].sort((a, b) =>
                a.title > b.title ? -1 : 1,
            );
            setDynamics(strDescending)
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
        if (dynamicData) {
            setDynamics(dynamicData)
        }
    }, [dynamicData])
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
                All Banners
            </Typography>
            <Divider />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>
                                <TableSortLabel
                                    onClick={sortingHandler}
                                    direction={direction === "asc" ? "asc" : "desc"}
                                >
                                    Title
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Banner Type</TableCell>
                            <TableCell>Total Number</TableCell>
                            <TableCell>Integrated Section</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dynamics.length > 0 &&
                            dynamics.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        {i + 1 > 10 ? i + 1 : `0${i + 1}`}
                                    </TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{BannerTypeOptions.find((b) => b.value === item.bannerType)?.label}</TableCell>
                                    <TableCell>{item.totalNumber}</TableCell>
                                    <TableCell>{item.section?.name}</TableCell>
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
                                                <Link href={`/banner/edit/${item.id}`}>
                                                    <a>
                                                        < Icon icon="akar-icons:edit" />
                                                    </a>
                                                </Link>
                                            </ButtonBase>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                        {dynamics.length === 0 &&
                            <TableRow>
                                <TableCell align="center" colSpan={6} sx={styles.NothingCell}>
                                    <Icon icon="fluent:emoji-sad-16-regular" />
                                    <Typography variant="h4" component="h4">
                                        Nothing Found
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer >
        </Box >
    );
};

export default Lists;