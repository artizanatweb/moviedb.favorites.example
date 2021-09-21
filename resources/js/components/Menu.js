import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Button } from "@material-ui/core";
import * as storeActions from "./../stores/actions";
import clsx from "clsx";
import { Pages } from "./../utils/Pages";

const useStyles = makeStyles((theme) => ({
    root: {
        marginRight: 0,
    },
    menuButton: {
        marginLeft: theme.spacing(1),
        color: theme.palette.common.white,
        fontWeight: "700",
    },
    activeButton: {
        color: theme.palette.secondary["400"],
    }
}));

const Menu = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const application = useSelector( state => state.application );

    const buttonHandler = (page) => {
        if (application.loading) {
            return;
        }

        if (history.location.pathname === page.url) {
            return;
        }

        dispatch(storeActions.showAppLoading());
        setTimeout(() => {
            history.push(page.url);
        }, 350);
    };

    const buttons = [];
    for (const [key, page] of Object.entries(Pages)) {
        let active = (history.location.pathname === page.url) ? classes.activeButton : "inactive";

        let button = (
            <Button
                className={clsx(classes.menuButton, active)}
                key={`menu_item_${key}`}
                onClick={() => { buttonHandler(page) }}
                startIcon={ page.icon }
            >
                { page.name }
            </Button>
        );

        buttons.push(button);
    }

    return (
        <div className={clsx(classes.root,"topMenu")}>
            { buttons }
        </div>
    );
};

export default Menu;
