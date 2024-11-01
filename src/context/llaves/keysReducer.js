import { actionTypes } from "./keysActions"

export const initialState = {
    keys: [],
    loading: false,
}

export const keysReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_KEYS:
            return { ...state, keys: action.payload, loading: false }
        case actionTypes.SET_LOADING:
            return { ...state, loading: action.payload }
        case actionTypes.RESET_KEYS:
            return { ...state, keys: [] }
        default:
            return state
    }
}
