import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import DeepPurpleColor from "@material-ui/core/colors/deepPurple";
import DeepOrangeColor from "@material-ui/core/colors/deepOrange";
import Content from "./Content";
import * as storeActions from "./../stores/actions";
import LoadingScreen from "../screens/LoadingScreen";
import MainToolbar from "./../components/MainToolbar";
import RemoveFavoriteDialog from "./../components/RemoveFavoriteDialog";

function App(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            dispatch(storeActions.getClientId(history.location.pathname));
        }, 200);
    }, []);

    useEffect(() => {
        if (!("/" === history.location.pathname)) {
            return;
        }

        dispatch(storeActions.applicationReady(true));
    });

    const theme = createTheme({
        palette: {
            type: "light",
            primary: DeepPurpleColor,
            secondary: DeepOrangeColor,
            background: {
                default: "#f5f5f5",
            }
        },
    });

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            <MainToolbar />
            <div className={"mainApplication"}>
                <Content />
            </div>
            <LoadingScreen />
            <RemoveFavoriteDialog />
        </MuiThemeProvider>
    );
}

export default App;
