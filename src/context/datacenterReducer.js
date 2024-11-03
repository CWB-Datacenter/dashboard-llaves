import { SET_DATACENTER } from "./datacenterActions"

const datacenterReducer = (state, action) => {
    switch (action.type) {
        case SET_DATACENTER:
            return { ...state, selectedDatacenter: action.payload }
        default:
            return state
    }
}

export default datacenterReducer