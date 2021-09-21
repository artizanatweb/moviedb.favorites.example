import * as actionTypes from "./actionTypes";

export const clearMovieState = () => {
    return {
        type: actionTypes.movie.CLEAR,
    }
};

export const setMovieId = (id = 0) => {
    return {
        type: actionTypes.movie.SET_ID,
        id: id,
    }
};

export const setMovieObject = (movie = null) => {
    return {
        type: actionTypes.movie.SET_MOVIE,
        movie: movie,
    }
};

export const requestMovie = () => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: actionTypes.movie.REQUEST,
            id: state.movie.id,
        });
    }
};
