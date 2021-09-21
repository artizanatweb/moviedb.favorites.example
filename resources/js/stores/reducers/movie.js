import * as actionTypes from "./../actions/actionTypes";

const initialState = {
    id: 0,
    movie: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.movie.SET_ID:
            return {
                ...state,
                id: action.id,
            }
        case actionTypes.movie.CLEAR:
            return {
                ...initialState,
            }
        case actionTypes.movie.SET_MOVIE:
            return {
                ...state,
                movie: action.movie,
            }
        default:
            return state;
    }
}

export default reducer;
