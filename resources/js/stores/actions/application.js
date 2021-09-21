import * as actionTypes from "./actionTypes";

export const showAppLoading = () => {
    return {
        type: actionTypes.application.LOADING,
        loading: true,
    }
};

export const hideAppLoading = () => {
    return {
        type: actionTypes.application.LOADING,
        loading: false,
    }
};

export const getClientId = (locationPathname = null) => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: actionTypes.application.GET_CLIENT_ID,
            locationPathname: locationPathname,
            page: state.application.page,
        });
    }
};

export const setClientId = (id = 0) => {
    return {
        type: actionTypes.application.SET_CLIENT_ID,
        clientId: id,
    }
};

export const storeClientId = (id = 0) => {
    return {
        type: actionTypes.application.STORE_CLIENT_ID,
        clientId: id,
    }
};

export const applicationReady = (ready = false) => {
    return {
        type: actionTypes.application.READY,
        ready: ready,
    }
};

export const setApplicationPage = (page = null) => {
    return {
        type: actionTypes.application.SET_PAGE,
        page: page,
    }
};
