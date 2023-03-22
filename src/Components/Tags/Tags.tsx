import { useState, useEffect, useMemo } from "react";
import { Box, Typography, Divider, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, ButtonBase, Snackbar, Alert } from "@mui/material";
import Link from "next/link";
import { Icon } from "@iconify/react";

//Confirmation
import Delete from "Components/Common/Delete";

//Styles
import styles from "Styles/Common/Table.styles";

//Redux
import { useAppSelector, useAppDispatch } from "Redux/Hook";
import { deleteTag } from "Redux/Action/Tags/tag.action";

//Types
interface GetTags {
    id: string;
    name: string;
    description: string;
    slug: string;
}

const Tags = () => {
    //Selector
    const { tagsData } = useAppSelector(state => state.getTags);
    const { success, message } = useAppSelector(state => state.deleteTags);
    //State
    const [tags, setTags] = useState<GetTags[]>(tagsData);
    const [direction, setDirection] = useState<string>("asc");
    const [open, setOpen] = useState<number | null>(null);
    const [snackbar, setSnackbar] = useState<boolean>(false);
    //Handler
    const dispatch = useAppDispatch();
    const handleClose = (id?: string) => {
        setOpen(null)
        if (id) {
            dispatch(deleteTag(id))
            const result = tags.filter(item => item.id !== id)
            setTags(result);
        }
    }
    const sortingHandler = () => {
        if (direction === "desc") {
            const strAscending = [...tags].sort((a, b) =>
                a.name > b.name ? 1 : -1,
            );
            setTags(strAscending)
            setDirection("asc")
        } else if (direction === "asc") {
            const strDescending = [...tags].sort((a, b) =>
                a.name > b.name ? -1 : 1,
            );
            setTags(strDescending)
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
        if (tagsData.length > 0) {
            setTags(tagsData)
        }
    }, [tagsData])
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
                All tags
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
                            <TableCell width="70%">Details</TableCell>
                            <TableCell width="12%" align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tags.length > 0 &&
                            tags.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        {i + 1 > 10 ? i + 1 : `0${i + 1}`}
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.description}</TableCell>
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
                                                <Link href={`/tags/edit-tags/${item.slug}`}>
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
                        {tags.length === 0 &&
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
export default Tags;