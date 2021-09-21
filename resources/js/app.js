require('./bootstrap');

import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import "./../sass/app.scss";
import App from "./containers/App";
import applicationReducer from "./stores/reducers/application";
import moviesReducer from "./stores/reducers/movies";
import favoritesReducer from "./stores/reducers/favorites";
import movieReducer from "./stores/reducers/movie";
import { rootSaga } from "./stores/sagas";

const rootReducer = combineReducers({
    application: applicationReducer,
    movies: moviesReducer,
    favorites: favoritesReducer,
    movie: movieReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware));

sagaMiddleware.run(rootSaga);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

if (document.getElementById("testingApp")) {
    ReactDOM.render(app, document.getElementById("testingApp"));
}
