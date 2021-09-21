import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    IconButton,
    Divider,
} from "@material-ui/core";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import * as storeActions from "./../stores/actions";
import RoundLoading from "./RoundLoading";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        textOverflow: 'ellipsis',
    },
    container: {
        maxHeight: 580,
        minHeight: 580,
    },
    th: {
        backgroundColor: theme.palette.common.white,
    },
    loading: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 50,
        paddingBottom: 50,
    }
}));

const FavoriteMoviesTable = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const favorites = useSelector( state => state.favorites );
    const application = useSelector( state => state.application );

    const handleChangePage = (event, newPage) => {
        if (favorites.loading) {
            return;
        }

        newPage += 1;
        dispatch(storeActions.changeFavoritePageNumber(newPage));
    };

    const handleChangeRowsPerPage = (event) => {
        if (favorites.loading) {
            return;
        }

        let pageRows = event.target.value;
        dispatch(storeActions.changeFavoritePageRows(pageRows));
    };

    const detailsHandler = (movieId) => {
        if (favorites.loading) {
            return;
        }

        if (application.loading) {
            return;
        }

        let detailsUrl = `/details/${movieId}`;

        dispatch(storeActions.showAppLoading());
        setTimeout(() => {
            history.push(detailsUrl);
        }, 350);
    };

    const deleteHandler = (movieId) => {
        if (favorites.loading) {
            return;
        }

        if (application.loading) {
            return;
        }

        dispatch(storeActions.requestFavoriteMovieDelete(movieId));
    };

    if (!(favorites.pager.total > 0)) {
        return null;
    }

    const getRows = () => {
        if (favorites.loading) {
            return (
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={4}>
                            <div className={classes.loading}>
                                <RoundLoading />
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            );
        }

        const rows = [];

        favorites.items.forEach((dbRow) => {
            let row = (
                <TableRow key={`fav_row_${dbRow.id}`}>
                    <TableCell>{dbRow.original_title}</TableCell>
                    <TableCell align={"center"}>{dbRow.original_language}</TableCell>
                    <TableCell align={"center"}>{dbRow.release_date}</TableCell>
                    <TableCell align={"right"}>
                        <IconButton onClick={() => { detailsHandler(dbRow.movie_id) }}>
                            <OpenInNewIcon />
                        </IconButton>
                        <IconButton onClick={() => { deleteHandler(dbRow.movie_id) }}>
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
            );

            rows.push(row);
        });

        return (
            <TableBody>
                { rows }
            </TableBody>
        );
    };

    return (
        <Paper className={classes.root} elevation={2}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.th} align={"left"}>Title</TableCell>
                            <TableCell className={classes.th} align={"center"}>Lang</TableCell>
                            <TableCell className={classes.th} align={"center"}>Release date</TableCell>
                            <TableCell className={classes.th} align={"right"}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    { getRows() }
                </Table>
            </TableContainer>
            <Divider />
            <TablePagination
                rowsPerPageOptions={[process.env.MIX_FAVORITES_DEFAULT_ROWS, 10, 30, 60, 100]}
                component="div"
                count={favorites.pager.total}
                rowsPerPage={favorites.pager.per_page}
                page={favorites.pager.page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={"Page rows"}
            />
        </Paper>
    )
}

export default FavoriteMoviesTable;
