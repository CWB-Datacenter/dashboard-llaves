import React, { createContext, useReducer } from 'react'

// Crear el contexto para Datacenter
export const DatacenterContext = createContext()

// Estado inicial solo con selectedDatacenter
const initialState = {
    selectedDatacenter: null
}

// Reducer para manejar las acciones del contexto
const datacenterReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATACENTER':
            return { ...state, selectedDatacenter: action.payload }
        default:
            return state
    }
}

// Proveedor del contexto de Datacenter
const DatacenterProvider = ({ children }) => {
    const [state, dispatch] = useReducer(datacenterReducer, initialState)

    return (
        <DatacenterContext.Provider value={{ state, dispatch }}>
            {children}
        </DatacenterContext.Provider>
    )
}

export default DatacenterProvider
