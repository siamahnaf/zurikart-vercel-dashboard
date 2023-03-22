import { useState, useMemo } from "react";
import { Box, Typography, Divider, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, ButtonBase } from "@mui/material";
import Link from "next/link";
import { Icon } from "@iconify/react";

//Styles
import styles from "Styles/Common/Table.styles";

//Redux
import { useAppSelector } from "Redux/Hook";

//Types
interface SectionData {
    id: string;
    name: string;
    description: string;
    publish: boolean;
    category1: {
        name: string;
    }
    category2: {
        name: string;
    }
}

const HomeSection = () => {
    //Selector
    const { sectionData } = useAppSelector(state => state.getSection);
    //State
    const [sections, setSections] = useState<SectionData[]>(sectionData);
    const [direction, setDirection] = useState<string>("asc");
    //Handler
    const sortingHandler = () => {
        if (direction === "desc") {
            const strAscending = [...sections].sort((a, b) =>
                a.name > b.name ? 1 : -1,
            );
            setSections(strAscending)
            setDirection("asc")
        } else if (direction === "asc") {
            const strDescending = [...sections].sort((a, b) =>
                a.name > b.name ? -1 : 1,
            );
            setSections(strDescending)
            setDirection("desc")
        }
    }
    //Effect
    useMemo(() => {
        if (sectionData.length > 0) {
            setSections(sectionData)
        }
    }, [sectionData])
    return (
        <Box sx={{ ...styles.Container, mb: "3em" }}>
            <Typography variant="h6" component="h6" sx={styles.Title}>
                All Sections
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
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Category 1</TableCell>
                            <TableCell>Category 2</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sections.length > 0 &&
                            sections.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        {i + 1 > 10 ? i + 1 : `0${i + 1}`}
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>{item.category1?.name}</TableCell>
                                    <TableCell>{item.category2?.name}</TableCell>
                                    <TableCell className={item.publish ? "publish" : "unpublished"} sx={styles.SectionStatus}>{item.publish ? "Publish" : "Unpublished"}</TableCell>
                                    <TableCell align="right">
                                        <Box sx={styles.Buttons}>
                                            <ButtonBase>
                                                <Link href={`/home/edit-section/${item.id}`}>
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
                        {sections.length === 0 &&
                            <TableRow>
                                <TableCell align="center" colSpan={7} sx={styles.NothingCell}>
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
export default HomeSection;