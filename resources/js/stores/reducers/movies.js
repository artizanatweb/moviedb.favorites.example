import * as actionTypes from "./../actions/actionTypes";

const initialState = {
    query: "",
    pager: null,
    loading: false,
    allowSearch: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.movies.LOADING:
            return {
                ...state,
                loading: action.loading,
            }
        case actionTypes.movies.CLEAR_QUERY:
            return {
                ...state,
                query: "",
                allowSearch: false,
                pager: null,
            }
        case actionTypes.movies.SET_QUERY:
            return {
                ...state,
                query: action.query,
            }
        case actionTypes.movies.ALLOW_SEARCH:
            return {
                ...state,
                allowSearch: action.allow,
            }
        case actionTypes.movies.SET_PAGER:
            return  {
                ...state,
                pager: action.pager,
            }
        default:
            return state;
    }
};

export default reducer;
