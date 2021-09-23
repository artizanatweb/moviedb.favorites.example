import * as actionTypes from "./../actions/actionTypes";

const initialState = {
    ready: false,
    loading: true,
    clientId: 0,
    page: null,
    height: null,
    width: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.application.LOADING:
            return {
                ...state,
                loading: action.loading,
            }
        case actionTypes.application.SET_CLIENT_ID:
            return {
                ...state,
                clientId: parseInt(action.clientId),
            }
        case actionTypes.application.READY:
            return {
                ...state,
                ready: action.ready,
            }
        case actionTypes.application.SET_PAGE:
            return {
                ...state,
                page: action.page,
            }
        case actionTypes.application.HEIGHT:
            return {
                ...state,
                height: action.height,
            }
        case actionTypes.application.WIDTH:
            return {
                ...state,
                width: action.width,
            }
        default:
            return state;
    }
};

export default reducer;
