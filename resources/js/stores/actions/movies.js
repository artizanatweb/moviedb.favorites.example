import * as actionTypes from "./actionTypes";

export const loadingMovies = (loading = false) => {
    return {
        type: actionTypes.movies.LOADING,
        loading: loading,
    }
}

export const clearMoviesQuery = () => {
    return {
        type:  actionTypes.movies.CLEAR_QUERY,
    }
};

export const changeMoviesQuery = (query = "") => {
    return {
        type:  actionTypes.movies.CHANGE_QUERY,
        query: query,
    }
};

export const setMoviesQuery = (query = "") => {
    return {
        type:  actionTypes.movies.SET_QUERY,
        query: query,
    }
};

export const allowSearchMovies = (allow = false) => {
    return {
        type: actionTypes.movies.ALLOW_SEARCH,
        allow: allow,
    }
};

export const requestSearchMovies = (page = 1) => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: actionTypes.movies.SEARCH,
            query: state.movies.query,
            page: page,
            allow: state.movies.allowSearch,
        });
    }
};

export const setMovieDbPager = (pager) => {
    return {
        type: actionTypes.movies.SET_PAGER,
        pager: pager,
    }
};
