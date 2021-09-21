import React, {useEffect, useState, Fragment} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useLocation, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
    Paper,
    Button,
    Typography,
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LanguageIcon from '@material-ui/icons/Language';
import EventIcon from '@material-ui/icons/Event';
import clsx from "clsx";
import * as storeActions from "./../stores/actions";
import { moviePosterImage } from "./../utils/utils";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: '15px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textOverflow: 'ellipsis',
    },
    title: {
        fontSize: 16,
        fontWeight: 600,
    },
    suppTitle: {
        display: "block",
    },
    paperTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    paperButtons: {
        padding: '5px',
    },
    overview: {
        paddingTop: 15,
    },
    poster: {
        paddingBottom: 5,
    }
}));

const DetailsPage = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const { id } = useParams();
    const movie = useSelector( state => state.movie.movie );

    useEffect(() => {
        const page = {
            name: "Movie details",
            url: location.pathname,
            code: "details"
        };

        dispatch(storeActions.setApplicationPage(page));
        // request page content
        dispatch(storeActions.setMovieId(id));
        dispatch(storeActions.requestMovie());

        return () => {
            dispatch(storeActions.clearMovieState());
        };
    }, []);

    const backHandler = (evt) => {
        history.goBack();
    };

    const language = () => {
        if (!(movie?.original_language?.length > 0)) {
            return null;
        }

        let str = movie.original_language;

        return (
            <div className={"withIcon"}>
                <LanguageIcon />
                <Typography component={"p"}>Language: { str.toUpperCase() }</Typography>
            </div>
        );
    };

    const releaseDate = () => {
        if (!(movie?.release_date?.length > 0)) {
            return null;
        }

        let str = movie.release_date;

        return (
            <div className={"withIcon"}>
                <EventIcon />
                <Typography component={"p"}>Release date: { str }</Typography>
            </div>
        );
    };

    const showContent = () => {
        if (!movie) {
            return null;
        }

        let poster = null;
        if (movie?.poster_path) {
            poster = (
                <div className={classes.poster}>
                    <img src={moviePosterImage(movie.poster_path, 'w300')} />
                </div>
            );
        }

        return (
            <Fragment>
                <Paper className={ clsx(classes.paper, classes.paperTitle, classes.paperButtons) } elevation={2}>
                    <div className={"backButtonSupport"}>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            variant={"contained"}
                            color={"primary"}
                            onClick={ backHandler }
                        >
                            Back
                        </Button>
                    </div>
                </Paper>
                <Paper className={ clsx(classes.paper, classes.paperTitle) } elevation={2}>
                    <div className={classes.suppTitle}>
                        <Typography component={"h1"} className={classes.title}>{ movie?.original_title }</Typography>
                    </div>
                </Paper>
                <Paper className={ clsx(classes.paper, "movieDetails") } elevation={2}>
                    { poster }
                    { language() }
                    { releaseDate() }
                    <div className={classes.overview}>
                        <Typography component={"p"}>{ movie?.overview }</Typography>
                    </div>
                </Paper>
            </Fragment>
        );
    };

    return (
        <div className={clsx(classes.root, "page", "details")}>
            <div className={clsx("pageContent", "topSpace")}>
                { showContent() }
            </div>
        </div>
    );
};

export default DetailsPage;
