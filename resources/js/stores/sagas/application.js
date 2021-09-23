import { put, delay, call } from "redux-saga/effects";
import * as storeActions from "./../actions";

export function* applicationReadySaga(action) {
    if (!action.ready) {
        return;
    }

    yield delay(500);
    yield put(storeActions.hideAppLoading());
}

export function* getClientIdSaga(action) {
    let locationPathname = action.locationPathname;
    let page = action.page;

    let clientId = localStorage.getItem("client_id") ?? 0;

    yield put(storeActions.setClientId(clientId));

    if (!(clientId > 0)) {
        return;
    }

    if (!page) {
        return;
    }

    if ("favorites" === page.code) {
        // request favorite movies
        return yield put(storeActions.requestFavoriteMovies());
    }

    // something for details
}

export function* storeClientIdSaga(action) {
    let clientId = action.clientId;

    localStorage.setItem("client_id", clientId);

    yield put(storeActions.setClientId(clientId));
}

export function* setApplicationDimensionsSaga() {
    let width = window.innerWidth;
    let height = window.innerHeight;

    yield put(storeActions.setApplicationWidth(width));
    yield put(storeActions.setApplicationHeight(height));
}
