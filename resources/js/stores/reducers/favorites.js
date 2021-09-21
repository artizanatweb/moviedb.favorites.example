import * as actionTypes from "./../actions/actionTypes";

const PAGER = {
    current_page: 1,
    from: 0,
    to: 0,
    per_page: process.env.MIX_FAVORITES_DEFAULT_ROWS,
    next_page: 1,
    prev_page: 1,
    total: 0,
    page: 0,
    error: null,
}

const initialState = {
    pager: PAGER,
    items: [],
    loading: false,
    favRequestId: 0,
    pageFavs: [],
    deleteObject: null,
    deleteDialog: false,
    removing: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.favorites.FAV_REQUEST:
            return {
                ...state,
                favRequestId: action.favRequestId,
            }
        case actionTypes.favorites.RESET_FAV_REQUEST:
            return {
                ...state,
                favRequestId: 0,
            }
        case actionTypes.favorites.PAGE_FAVS:
            return {
                ...state,
                pageFavs: [
                    ...action.pageFavs
                ],
            }
        case actionTypes.favorites.REMOVING:
            return {
                ...state,
                removing: action.removing,
            }
        case actionTypes.favorites.DELETE_DIALOG:
            return {
                ...state,
                deleteDialog: action.open,
            }
        case actionTypes.favorites.SET_DELETE_OBJECT:
            return {
                ...state,
                deleteObject: action.object,
            }
        case actionTypes.favorites.CLEAR_PAGE_FAVS:
            return {
                ...state,
                pageFavs: [],
            }
        case actionTypes.favorites.SET_ITEMS:
            return {
                ...state,
                items: action.items,
            }
        case actionTypes.favorites.SET_PAGER:
            return {
                ...state,
                pager: {
                    ...state.pager,
                    ...action.pager,
                },
            }
        case actionTypes.favorites.LOADING:
            return {
                ...state,
                loading: action.loading,
            }
        default:
            return state;
    }
};

export default reducer;
