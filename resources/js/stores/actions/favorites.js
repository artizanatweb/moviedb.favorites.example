import * as actionTypes from "./actionTypes";

export const setPageFavs = (pageFavs = []) => {
    return {
        type: actionTypes.favorites.PAGE_FAVS,
        pageFavs: pageFavs,
    }
};

export const setFavRequestId = (favRequestId) => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: actionTypes.favorites.FAV_REQUEST,
            favRequestId: favRequestId,
            pageFavs: state.favorites.pageFavs,
            clientId: state.application.clientId,
            movies: state.movies.pager?.results,
        });
    }
};

export const resetFavRequest = () => {
    return {
        type: actionTypes.favorites.RESET_FAV_REQUEST,
    }
};

export const requestPageFavoriteMovies = () => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: actionTypes.favorites.REQUEST_PAGE_FAVORITES,
            movies: state.movies.pager?.results ?? [],
            clientId: state.application.clientId,
        });
    }
};

export const setDeleteFavoriteObject = (object = null) => {
    return {
        type: actionTypes.favorites.SET_DELETE_OBJECT,
        object: object,
    }
};

export const openFavoriteDeleteDialog = () => {
    return {
        type: actionTypes.favorites.DELETE_DIALOG,
        open: true,
    }
};

export const closeFavoriteDeleteDialog = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.favorites.DELETE_DIALOG,
            open: false,
        });

        dispatch(setFavoriteRemoving(false));
        dispatch(setDeleteFavoriteObject());
    }
};

export const setFavoriteRemoving = (removing = false) => {
    return {
        type: actionTypes.favorites.REMOVING,
        removing: removing,
    }
};

export const requestFavoriteRemoval = () => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: actionTypes.favorites.DELETE,
            object: state.favorites.deleteObject,
            items: state.favorites.items,
        });
    }
};

export const requestFavoriteObject = (movieId) => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: actionTypes.favorites.REQUEST_OBJECT,
            movieId: movieId,
            clientId: state.application.clientId,
        });
    }
};

export const clearPageFavorites = () => {
    return {
        type: actionTypes.favorites.CLEAR_PAGE_FAVS,
    }
};

export const requestFavoriteMovies = () => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: actionTypes.favorites.REQUEST_ITEMS,
            clientId: state.application.clientId,
            pager: state.favorites.pager,
        });
    }
};

export const setFavoritesPager = (pager) => {
    return {
        type: actionTypes.favorites.SET_PAGER,
        pager: pager,
    }
};

export const setFavoriteItems = (items = []) => {
    return {
        type: actionTypes.favorites.SET_ITEMS,
        items: items,
    }
};

export const changeFavoritePageRows = (pageRows = 5) => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: actionTypes.favorites.REQUEST_ITEMS,
            clientId: state.application.clientId,
            pager: {
                ...state.favorites.pager,
                per_page: pageRows,
                current_page: 1,
            },
        });
    }
};

export const changeFavoritePageNumber = (newPage = 1) => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: actionTypes.favorites.REQUEST_ITEMS,
            clientId: state.application.clientId,
            pager: {
                ...state.favorites.pager,
                current_page: newPage,
            },
        });
    }
};

export const setFavoritesLoading = (loading = false) => {
    return {
        type: actionTypes.favorites.LOADING,
        loading: loading,
    }
};

export const requestFavoriteMovieDelete = (movieId) => {
    return {
        type: actionTypes.favorites.REQUEST_DELETE,
        favRequestId: movieId,

    }
};
