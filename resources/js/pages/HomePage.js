import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import MainSearch from "./../components/MainSearch";
import MovieList from "./../components/MovieList";
import MainPager from "./../components/MainPager";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));

const HomePage = (props) => {
    const classes = useStyles();

    return (
        <div className={clsx(classes.root, "page", "home")}>
            <div className={"pageContent"}>
                <MainSearch />
                <div className={"searchResultsSupport"}>
                    <MovieList />
                </div>
                <MainPager />
            </div>
        </div>
    );
};

export default HomePage;
