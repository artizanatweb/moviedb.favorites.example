import { takeEvery, all, call } from "redux-saga/effects";
import * as actionTypes from "./../actions/actionTypes";
import {
    applicationReadySaga,
    getClientIdSaga,
    storeClientIdSaga,
    setApplicationDimensionsSaga,
} from "./application";
import {
    changeMoviesQuerySaga,
    searchMoviesSaga,
} from "./movies";
import {
    movieFavoriteActionSaga,
    requestPageFavoritesSaga,
    requestFavoriteObjectSaga,
    requestFavoriteRemovalSaga,
    requestFavoriteMoviesSaga,
    requestRemoveFromFavorites,
    changeFavoriteQuerySaga,
} from "./favorites";
import {
    requestMovieDetailsSaga,
} from "./movie";

export function* watchApplication() {
    yield takeEvery(actionTypes.application.READY, applicationReadySaga);
    yield takeEvery(actionTypes.application.SET_DIMENSIONS, setApplicationDimensionsSaga);
    yield takeEvery(actionTypes.application.GET_CLIENT_ID, getClientIdSaga);
    yield takeEvery(actionTypes.application.STORE_CLIENT_ID, storeClientIdSaga);
}

export function* watchMovies() {
    yield takeEvery(actionTypes.movies.CHANGE_QUERY, changeMoviesQuerySaga);
    yield takeEvery(actionTypes.movies.SEARCH, searchMoviesSaga);
}

export function* watchFavorites() {
    yield takeEvery(actionTypes.favorites.FAV_REQUEST, movieFavoriteActionSaga);
    yield takeEvery(actionTypes.favorites.REQUEST_PAGE_FAVORITES, requestPageFavoritesSaga);
    yield takeEvery(actionTypes.favorites.REQUEST_OBJECT, requestFavoriteObjectSaga);
    yield takeEvery(actionTypes.favorites.DELETE, requestFavoriteRemovalSaga);
    yield takeEvery(actionTypes.favorites.REQUEST_ITEMS, requestFavoriteMoviesSaga);
    yield takeEvery(actionTypes.favorites.REQUEST_DELETE, requestRemoveFromFavorites);
    yield takeEvery(actionTypes.favorites.CHANGE_QUERY, changeFavoriteQuerySaga);
}

export function* watchMovie() {
    yield takeEvery(actionTypes.movie.REQUEST, requestMovieDetailsSaga);
}

export function* rootSaga() {
    yield all([
        call(watchApplication),
        call(watchMovies),
        call(watchFavorites),
        call(watchMovie),
    ]);
}
