import React, { lazy } from "react";
// icons
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from '@material-ui/icons/Favorite';

export const Pages = {
    home: {
        name: "Home",
        url: "/",
        icon: <HomeIcon />,
        component: lazy(() => import("./../pages/HomePage")),
    },
    favorites: {
        name: "Favorites",
        url: "/favorites",
        icon: <FavoriteIcon />,
        component: lazy(() => import("./../pages/FavoritesPage")),
    }
};

export const findPageByPath = (locationPath = "/") => {
    let actualPage = null;

    for (const [key, page] of Object.entries(Pages)) {
        if (locationPath === page.url) {
            actualPage = page;
            actualPage.code = key;
        }
    }

    return actualPage;
};
