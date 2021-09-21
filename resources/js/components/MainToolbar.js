import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
    AppBar,
    Toolbar,
} from '@material-ui/core';
import clsx from "clsx";
import Menu from "./Menu";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
}));

const MainToolbar = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const application = useSelector(state => state.application);

    return (
        <div className={clsx(classes.root, "mainToolbar")}>
            <AppBar position={"fixed"} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <div className={"search"}>&nbsp;</div>
                    <Menu />
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default MainToolbar;
