import { useState, useMemo, useEffect } from "react";
import { Box, Typography, Divider, Grid, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, InputBase, ButtonBase, InputAdornment, Snackbar, Alert } from "@mui/material";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import Cookies from "js-cookie";

//Confirmation
import Delete from "Components/Common/Delete";

//Default Image
import Avatar from "Assets/avatar.png";

//Styles
import styles from "Styles/Common/Table.styles";

//Redux
import { useAppSelector, useAppDispatch } from "Redux/Hook";
import { getUsersList, deleteUser } from "Redux/Action/User/user.action";

//Types
interface UserData {
    id: string;
    name: string;
    phone: string;
    email: string;
    avatar: string;
    verified: boolean;
    role: string;
}
interface Inputs {
    search: string;
}

const User = () => {
    //Selector
    const { usersData } = useAppSelector(state => state.getUserList);
    const { message, success } = useAppSelector(state => state.deleteUser);
    //State
    const [users, setUsers] = useState<UserData[]>(usersData);
    const [direction, setDirection] = useState<string>("asc");
    const [open, setOpen] = useState<number | null>(null);
    const [snackbar, setSnackbar] = useState<boolean>(false);
    const [current, setCurrent] = useState<string>("");
    //Handler
    const dispatch = useAppDispatch();
    const token = Cookies.get("secretId");
    const handleClose = (id?: string, imageUrl?: string) => {
        setOpen(null)
        if (id) {
            setCurrent(id);
            dispatch(deleteUser(id, imageUrl as string))
        }
    }
    const {
        register,
        handleSubmit,
        control
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data, e) => {
        if (data.search) {
            dispatch(getUsersList(token as string, data.search))
        }
    }
    const sortingHandler = () => {
        if (direction === "desc") {
            const strAscending = [...users].sort((a, b) =>
                a.name > b.name ? 1 : -1,
            );
            setUsers(strAscending)
            setDirection("asc")
        } else if (direction === "asc") {
            const strDescending = [...users].sort((a, b) =>
                a.name > b.name ? -1 : 1,
            );
            setUsers(strDescending)
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
        if (usersData.length > 0) {
            setUsers(usersData)
        } else if (searchInput) {
            setUsers([])
        }
    }, [usersData, searchInput, setUsers])
    useEffect(() => {
        if (searchInput === "") {
            dispatch(getUsersList(token as string, ""))
        }
    }, [searchInput, dispatch, token]);
    useEffect(() => {
        if (message && success !== null) {
            setSnackbar(true)
        }
        if (success) {
            const result = users.filter(item => item.id !== current)
            setUsers(result);
        }
    }, [success, message, setSnackbar]);
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
            <Box sx={{
                py: "10px",
                px: "20px"
            }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item {...{ md: 6 }}>
                        <Typography variant="h6" component="h6" sx={styles.SearchTitle}>
                            All users
                        </Typography>
                    </Grid>
                    <Grid item {...{ md: 6 }}>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                            <InputBase
                                fullWidth
                                placeholder="Search"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Icon icon="fluent:search-28-filled" />
                                    </InputAdornment>
                                }
                                sx={styles.InputBase}
                                {...register("search")}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Divider />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell width="6%">#</TableCell>
                            <TableCell width="6%">Avatar</TableCell>
                            <TableCell width="17%">
                                <TableSortLabel
                                    onClick={sortingHandler}
                                    direction={direction === "asc" ? "asc" : "desc"}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell width="17%">Phone</TableCell>
                            <TableCell width="26%">Email</TableCell>
                            <TableCell width="12%">Verified</TableCell>
                            <TableCell width="8%">Role</TableCell>
                            <TableCell width="8%" align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.length > 0 &&
                            users.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        {i + 1 > 10 ? i + 1 : `0${i + 1}`}
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ img: { borderRadius: "50%" } }}>
                                            <Image src={item?.avatar ? process.env.NEXT_PUBLIC_IMAGE_PATH + item.avatar : Avatar} alt={item.name} width={35} height={35} />
                                        </Box>
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>+{item.phone}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.verified ? "Verified" : "Unconfirmed"}</TableCell>
                                    <TableCell className={item.role.toLowerCase()} sx={styles.UserRole}>{item.role[0].toUpperCase() + item.role.substring(1)}</TableCell>
                                    <TableCell align="right">
                                        <Box sx={styles.Buttons}>
                                            <ButtonBase onClick={() => setOpen(i)}>
                                                <Icon icon="fluent:delete-24-filled" />
                                            </ButtonBase>
                                            <Delete
                                                open={open === i}
                                                handleClose={handleClose}
                                                id={item.id}
                                                imageUrl={item.avatar}
                                            />
                                            <ButtonBase>
                                                <Link href={{
                                                    pathname: `/users/change-user-role/${item.id}`,
                                                    query: {
                                                        role: item.role
                                                    }
                                                }}>
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
                        {users.length === 0 &&
                            <TableRow>
                                <TableCell align="center" colSpan={8} sx={styles.NothingCell}>
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

export default User;