import React from "react";
import {useSelector} from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import RoundLoading from "./RoundLoading";
import MovieCard from "./MovieCard";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "50vh",
    },
}));

const MovieList = (props) => {
    const classes = useStyles();
    const movieState = useSelector( state => state.movies );
    const moviePager = movieState.pager;
    const movieItems = moviePager?.results;
    const loadingAction = movieState.loading;

    const getContent = () => {
        if (!moviePager) {
            return (
                <div className={"default"}>
                    <p>find your favorite movie</p>
                </div>
            );
        }

        if (loadingAction) {
            return (
                <div className={"loadingPageContent"}>
                    <RoundLoading />
                </div>
            );
        }

        if (!(movieItems?.length > 0)) {
            return (
                <div className={"empty"}>
                    <p>No movies were found based on your search.</p>
                </div>
            );
        }

        return (
            <div className={"responseList"}>
                {
                    movieItems.map((movie, index) => {
                        return (<MovieCard movie={movie} key={`movie_${movie.id}`} />)
                    })
                }
            </div>
        );
    };

    return (
        <div className={clsx(classes.root, "movieListSupport")}>
            { getContent() }
        </div>
    );
};

export default MovieList;
