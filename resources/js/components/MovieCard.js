import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
} from "@material-ui/core";
import PropTypes from "prop-types";
import clsx from "clsx";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import LanguageIcon from '@material-ui/icons/Language';
import EventIcon from '@material-ui/icons/Event';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import * as storeActions from "./../stores/actions";
import { movieCardImageUrl } from "./../utils/utils";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 350,
        minWidth: 300,
    },
    media: {
        minHeight: 190,
        maxHeight: 220,
    },
    actionArea: {
        justifyContent: 'space-between'
    },
    grayIcon: {
        color: theme.palette.grey["500"],
    },
    blackIcon: {
        color: theme.palette.common.black,
    },
}));

const MovieCard = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const movie = props.movie;
    const favorites = useSelector( state => state.favorites );
    const application = useSelector( state => state.application );
    const history = useHistory();

    let movieId = movie?.id || 0;

    const favoriteHandler = () => {
        if (!(movieId > 0)) {
            return;
        }

        if (favorites.favRequestId > 0) {
            // another request exists
            return;
        }

        dispatch(storeActions.setFavRequestId(movieId));
    };

    const detailsHandler = () => {
        if (application.loading) {
            return;
        }

        let detailsUrl = `/details/${movieId}`;

        dispatch(storeActions.showAppLoading());
        setTimeout(() => {
            history.push(detailsUrl);
        }, 350);
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

    const getFavoriteButton = () => {
        const iconClassNameArray = ["favIcon"];
        if (favorites.favRequestId > 0) {
            iconClassNameArray.push(classes.grayIcon);
        }

        let favoriteIcon = <FavoriteBorderIcon color={"secondary"} className={clsx(iconClassNameArray)} />;

        if (favorites.pageFavs.includes(movieId)) {
            favoriteIcon = <FavoriteIcon color={"secondary"} className={clsx(iconClassNameArray)} />
        }
        if (movieId === favorites.favRequestId) {
            iconClassNameArray.push(classes.blackIcon);
            iconClassNameArray.push("spinIcon");
            favoriteIcon = <AutorenewIcon className={clsx(iconClassNameArray)} />
        }

        return (
            <Button startIcon={favoriteIcon} onClick={favoriteHandler}>favorite</Button>
        );
    }

    let cardImageUrl = movieCardImageUrl(movie?.backdrop_path);

    return (
        <Card className={clsx(classes.root, "itemCard", "elementCard")}>
            <CardMedia
                className={clsx(classes.media, "categoryImage")}
                image={cardImageUrl}
                title={movie?.original_title}
                component={"img"}
            />
            <CardContent className={clsx("itemCardContent","elementCardContent")}>
                <Typography component={"h1"}><b>{(movie?.original_title?.length > 0) ? movie.original_title : ""}</b></Typography>
                <Typography component={"p"}>{ (movie?.overview?.length > 0) ? movie.overview : "" }</Typography>
                { releaseDate() }
                { language() }
            </CardContent>
            <CardActions className={clsx(classes.actionArea,"elementCardActions")}>
                { getFavoriteButton() }
                <Button startIcon={<OpenInNewIcon />} onClick={detailsHandler}>details</Button>
            </CardActions>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.object.isRequired,
};

export default MovieCard;
