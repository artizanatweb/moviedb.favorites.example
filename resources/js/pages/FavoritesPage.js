import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import FavoriteMoviesTable from "../components/FavoriteMoviesTable";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));

const FavoritesPage = (props) => {
    const classes = useStyles();

    const getContent = () => {
        return (
            <div className={"topSpace"}>
                <FavoriteMoviesTable />
            </div>
        );
    };

    return (
        <div className={clsx(classes.root, "page", "favorites")}>
            <div className={"pageContent"}>
                { getContent() }
            </div>
        </div>
    );
};

export default FavoritesPage;
