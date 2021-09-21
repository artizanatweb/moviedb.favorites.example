import React, { useState, useCallback, useRef, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import * as storeActions from "./../stores/actions";
import {
    Paper,
    IconButton,
    InputBase,
    Divider,
    Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import BackspaceIcon from '@material-ui/icons/Backspace';
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        textOverflow: 'ellipsis',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    blackButton: {
        color: theme.palette.common.black,
    },
    errorButton: {
        color: theme.palette.error.main,
    },
    grayButton: {
        color: theme.palette.grey["500"],
    },
    greenButton: {
        // color: theme.palette.success.dark,
        color: theme.palette.info.dark,
    },
}));

const MainSearch = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const movies = useSelector( state => state.movies );
    const inputBaseRef = useRef(null);

    useEffect(() => {
        if (!inputBaseRef) {
            return;
        }

        setTimeout(() => {
            inputBaseRef.current.focus();
        }, 1200);
    }, []);

    useEffect(() => {
        const handleReturn = (event) => {
            if (event.keyCode === 13) {
                searchHandler();
            }
        };

        window.addEventListener('keydown', handleReturn);

        return () => {
            window.removeEventListener('keydown', handleReturn);
        };
    }, []);

    const searchFieldHandler = (event) => {
        if (movies.loading) {
            return;
        }

        let fieldValue = event.target.value;
        dispatch(storeActions.changeMoviesQuery(fieldValue));
    };

    const searchHandler = () => {
        if (movies.loading) {
            return;
        }

        dispatch(storeActions.requestSearchMovies());
    };

    const clearHandler = () => {
        if (movies.loading) {
            return;
        }

        dispatch(storeActions.clearMoviesQuery());
        setTimeout(() => {
            inputBaseRef.current.focus();
        }, 500);
    };

    let clearButtonCls = classes.grayButton;
    if (movies.query?.length >= 1) {
        clearButtonCls = classes.blackButton;
    }

    let searchButtonCls = classes.grayButton;
    if (movies.allowSearch) {
        searchButtonCls = classes.greenButton;
    }

    const searchProps = {
        maxLength: 30,
        'aria-label': 'search movies',
    };

    return (
        <div className={"searchSupport"}>
            <Paper className={clsx(classes.paper, "moviesSearchArea")} elevation={3}>
                <InputBase
                    className={classes.input}
                    placeholder={"Search movie by name"}
                    inputProps={searchProps}
                    inputRef={inputBaseRef}
                    value={movies.query}
                    onChange={searchFieldHandler}
                />
                <IconButton
                    className={clsx(classes.iconButton, clearButtonCls)}
                    aria-label={"clear"}
                    onClick={clearHandler}
                    color={"default"}
                >
                    <BackspaceIcon />
                </IconButton>
                <Divider className={classes.divider} orientation={"vertical"} />
                <IconButton
                    className={clsx(classes.iconButton, searchButtonCls)}
                    aria-label={"search"}
                    onClick={searchHandler}
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
        </div>
    );
};

export default MainSearch;
