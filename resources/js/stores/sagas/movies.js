import { put, delay, call } from "redux-saga/effects";
import axios from "../../utils/axiosMovieDB";
import * as storeActions from "./../actions";
import * as paths from "./../../utils/paths";
import MovieDbPager from "../../utils/MovieDbPager";

export function* changeMoviesQuerySaga(action) {
    let query = action.query;
    query = query.replace(/[^A-Za-z '0-9_-]/g, "").toLowerCase();

    let allowSearch = false;
    if (query.length >= 3) {
        allowSearch = true;
    }

    yield put(storeActions.allowSearchMovies(allowSearch));

    yield put(storeActions.setMoviesQuery(query));
}

export function* searchMoviesSaga(action) {
    if (!action.allow) {
        return;
    }

    let query = action.query;
    query = query.trim();
    if (!query) {
        yield put(storeActions.allowSearchMovies(false));
        return;
    }

    let page = action.page;

    yield put(storeActions.loadingMovies(true));

    const params = {
        query: query,
        page: page,
    };

    let responseObject = null;
    let isError = false;

    yield axios.get(paths.movies.search, {
        params: params
    })
        .then((response) => {
            responseObject = response.data;
        })
        .catch((error) => {
            responseObject = error.response;
            isError = true;
        });

    if (isError) {
        // display error
        console.error("[ERROR] Movies DB response: ", responseObject);
        return yield put(storeActions.loadingMovies(false));
    }

    const movieDbPage = new MovieDbPager(responseObject);
    yield put(storeActions.setMovieDbPager(movieDbPage));

    yield put(storeActions.requestPageFavoriteMovies());

    return yield put(storeActions.loadingMovies(false));
}
