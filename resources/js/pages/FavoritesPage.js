import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import * as storeActions from "./../stores/actions";
import FavoriteMoviesTable from "../components/FavoriteMoviesTable";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));

const FavoritesPage = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const favorites = useSelector( state => state.favorites );

    // useEffect(() => {
    //     dispatch(storeActions.hideAppLoading())
    // }, []);

    const getContent = () => {
        if (!(favorites.items?.length > 0)) {
            return (
                <div className={"topSpace"}>
                    <p>Favorite movie list is empty.</p>
                </div>
            );
        }

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
