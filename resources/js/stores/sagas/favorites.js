import { put, delay, call } from "redux-saga/effects";
import axios from "axios";
import * as storeActions from "./../actions";
import * as paths from "./../../utils/paths";
import {requestFavoriteMovies} from "./../actions";

export function* movieFavoriteActionSaga(action) {
    let movieId = action.favRequestId;
    if (!(movieId > 0)) {
        return;
    }

    const pageFavs = action.pageFavs;
    if (pageFavs.includes(movieId)) {
        // delete -- remove from favorites
        return yield call(requestRemoveFromFavorites, action);
    }

    // post -- add to favorites
    return yield call(requestAddToFavorites, action);
}

export function* requestAddToFavorites(action) {
    // find movie
    const movie = action.movies.find(movie => action.favRequestId === movie.id);
    if (!movie) {
        yield put(storeActions.resetFavRequest());
        return;
    }

    // create a FORM object to be validated by backend
    const itemForm = new FormData();
    itemForm.append('client_id', action.clientId);
    itemForm.append('movie_id', movie.id);
    if (movie.hasOwnProperty('original_title')) {
        itemForm.append('original_title', movie.original_title);
    }
    if (movie.hasOwnProperty('overview')) {
        itemForm.append('overview', movie.overview);
    }
    if (movie.hasOwnProperty('original_language')) {
        itemForm.append('original_language', movie.original_language);
    }
    if (movie.hasOwnProperty('release_date')) {
        itemForm.append('release_date', movie.release_date);
    }

    let responseObject = null;
    let isError = false;

    yield axios.post(paths.favorites.create, itemForm)
        .then((response) => {
            responseObject = response;
        })
        .catch((error) => {
            responseObject = error.response;
            isError = true;
        });

    if (isError) {
        // display error in console
        console.error("ERROR: ", responseObject);
        yield put(storeActions.resetFavRequest());
        return;
    }

    const response = responseObject?.data;
    if (!response?.success || !response?.data) {
        console.error(response?.message);
        yield put(storeActions.resetFavRequest());
        return;
    }

    const favoriteRow = response?.data;
    if (!(favoriteRow?.client_id === action.clientId)) {
        yield put(storeActions.storeClientId(favoriteRow.client_id));
    }

    const pageFavs = [ ...action.pageFavs ];
    pageFavs.push(parseInt(favoriteRow.movie_id));
    yield put(storeActions.setPageFavs(pageFavs));

    yield put(storeActions.resetFavRequest());
}

export function* requestRemoveFromFavorites(action) {
    yield put(storeActions.resetFavRequest());
    // are you sure that you want to remove this movie from favorites?
    yield put(storeActions.openFavoriteDeleteDialog());

    yield put(storeActions.requestFavoriteObject(action.favRequestId));
}

export function* requestPageFavoritesSaga(action) {
    if (!(action.movies?.length > 0)) {
        return;
    }

    if (!(action.clientId > 0)) {
        return;
    }

    const itemsForm = new FormData();
    itemsForm.append('client_id', action.clientId);
    action.movies.forEach((movie) => {
        itemsForm.append('movies[]', parseInt(movie.id));
    });

    let responseObject = null;
    let isError = false;

    yield axios.post(paths.favorites.pageMovies, itemsForm)
        .then((response) => {
            responseObject = response;
        })
        .catch((error) => {
            responseObject = error.response;
            isError = true;
        });

    if (isError) {
        // display error in console
        console.error("ERROR: ", responseObject);
        return;
    }

    const response = responseObject?.data;
    if (!response?.success || !response?.data) {
        console.error(response?.message);
        return;
    }

    const pageFavorites = response.data;
    if (!(pageFavorites?.length > 0)) {
        return yield put(storeActions.clearPageFavorites());
    }

    yield put(storeActions.setPageFavs(pageFavorites));
}

export function* requestFavoriteObjectSaga(action) {
    let clientId = action.clientId;
    let movieId = action.movieId;

    const params = {
        client_id: clientId,
        movie_id: movieId,
    };

    let responseObject = null;
    let isError = false;

    yield axios.get(paths.favorites.find, { params: params })
        .then((response) => {
            responseObject = response;
        })
        .catch((error) => {
            responseObject = error.response;
            isError = true;
        });


    if (isError) {
        console.error("ERROR: ", responseObject);
        return yield put(storeActions.closeFavoriteDeleteDialog());
    }

    const favorite = responseObject?.data?.data;
    yield put(storeActions.setDeleteFavoriteObject(favorite));
}

export function* requestFavoriteRemovalSaga(action) {
    yield put(storeActions.setFavoriteRemoving(true));

    let responseObject = null;
    let isError = false;

    yield axios.delete(paths.favorites.delete(action.object.id))
        .then((response) => {
            responseObject = response;
        })
        .catch((error) => {
            responseObject = error.response;
            isError = true;
        });

    yield put(storeActions.requestPageFavoriteMovies());
    if (action?.items?.length) {
        yield delay(500);
        yield put(storeActions.requestFavoriteMovies());
    }

    yield delay(500);
    yield put(storeActions.closeFavoriteDeleteDialog());


}

export function* requestFavoriteMoviesSaga(action) {
    yield put(storeActions.setFavoritesLoading(true));

    let clientId = action.clientId;
    let page = action.pager.current_page;
    let per_page = action.pager.per_page;

    const params = {
        client_id: clientId,
        page: page,
        per_page: per_page,
    };

    if (action.allowSearch) {
        params.query = action.query;
    }

    let responseObject = null;
    let isError = false;

    yield axios.get(paths.favorites.list, { params: params })
        .then((response) => {
            responseObject = response;
        })
        .catch((error) => {
            responseObject = error.response;
            isError = true;
        });

    if (isError) {
        // set error
        yield put(storeActions.setFavoritesLoading(false));
    }

    const items = responseObject?.data?.data ?? [];
    yield put(storeActions.setFavoriteItems(items));

    const pager = responseObject?.data?.meta ?? null;
    if (pager) {
        pager.page = parseInt(pager.current_page) - 1;
        pager.per_page = parseInt(pager.per_page);
        yield put(storeActions.setFavoritesPager(pager));
    }

    yield put(storeActions.setFavoritesLoading(false));
    yield put(storeActions.hideAppLoading());
}

export function* changeFavoriteQuerySaga(action) {
    let query = action.query;
    query = query.replace(/[^A-Za-z '0-9_-]/g, "").toLowerCase();

    let allowSearch = false;
    if (query.length >= 3) {
        allowSearch = true;
    }

    yield put(storeActions.allowFavoriteSearch(allowSearch));

    yield put(storeActions.setFavoriteQuery(query));
}
