import { put, delay, call } from "redux-saga/effects";
import axios from "../../utils/axiosMovieDB";
import * as storeActions from "./../actions";
import * as paths from "../../utils/paths";

export function* requestMovieDetailsSaga(action) {
    let movieId = action.id;

    let responseObject = null;
    let isError = false;

    yield axios.get(paths.movies.details(movieId))
        .then((response) => {
            responseObject = response;
        })
        .catch((error) => {
            responseObject = error.response;
            isError = true;
        });

    if (isError) {
        console.error(responseObject);
        return yield put(storeActions.hideAppLoading());
    }

    const movie = responseObject?.data;
    yield put(storeActions.setMovieObject(movie));
    yield delay(300);
    return yield put(storeActions.hideAppLoading());
}
