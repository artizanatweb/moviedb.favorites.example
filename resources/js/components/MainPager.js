import React, { useEffect, useLayoutEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
    Typography,
    IconButton,
    Paper,
} from "@material-ui/core";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import clsx from "clsx";
import * as storeActions from "./../stores/actions";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        textOverflow: 'ellipsis',
    },
    blackButton: {
        color: theme.palette.common.black,
    },
    grayButton: {
        color: theme.palette.grey["500"],
    },
}));

const MainPager = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const movies = useSelector( state => state.movies );
    const pager = useSelector( state => state.movies.pager );

    const variants = {
        initial: {
            y: 100,
            opacity: 0,
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {delay: 0.5}
        }
    };

    if (!pager) {
        return <AnimatePresence />;
    }

    if (!(pager?.total_results > 0)) {
        return <AnimatePresence />;
    }

    const prevPageHandler = () => {
        if (movies.loading) {
            return;
        }

        let prevPage = pager.page - 1;
        if (1 > prevPage) {
            return;
        }

        dispatch(storeActions.requestSearchMovies(prevPage));
    };

    const nextPageHandler = () => {
        if (movies.loading) {
            return;
        }

        let nextPage = pager.page + 1;
        if (nextPage > pager.total_pages) {
            return;
        }

        dispatch(storeActions.requestSearchMovies(nextPage));
    };

    let nextClass = classes.blackButton;
    if ((pager.page + 1) > pager.total_pages) {
        nextClass = classes.grayButton;
    }

    let backClass = classes.blackButton;
    if (1 > (pager.page - 1)) {
        backClass = classes.grayButton;
    }

    return (
        <AnimatePresence>
            <motion.div
                variants={variants}
                initial={"initial"}
                animate={"animate"}
                exit={"initial"}
                className={"moviePager"}
            >
                <Paper className={clsx(classes.paper, "pagerArea")} elevation={3}>
                    <Typography component={"p"}>
                        Movies: { pager.total_results }
                    </Typography>
                    <Typography component={"p"}>
                        Page: { `${pager.page} / ${pager.total_pages}` }
                    </Typography>
                    <div className={"navIconButtons"}>
                        <IconButton className={backClass} onClick={prevPageHandler}>
                            <ArrowBackIosIcon />
                        </IconButton>
                        <IconButton className={nextClass} onClick={nextPageHandler}>
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </div>
                </Paper>
            </motion.div>
        </AnimatePresence>
    );
};

export default MainPager;
