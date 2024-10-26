import { SET_DATACENTER, SET_DATACENTERS } from "./datacenterActions"

const datacenterReducer = (state, action) => {
    switch (action.type) {
        case SET_DATACENTER:
            return { ...state, selectedDatacenter: action.payload }
        case SET_DATACENTERS:
            return { ...state, datacenters: action.payload }
        default:
            return state
    }
}

export default datacenterReducer