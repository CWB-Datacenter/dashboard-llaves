import React, { createContext, useReducer } from 'react'
import { SET_DATACENTER } from './datacenterActions'
import datacenterReducer from './datacenterReducer'

// Crear el contexto para Datacenter
export const DatacenterContext = createContext()

// Estado inicial solo con selectedDatacenter
const initialState = {
    selectedDatacenter: null,
    datacenters: []
}

// Proveedor del contexto de Datacenter
const DatacenterProvider = ({ children }) => {
    const [state, dispatch] = useReducer(datacenterReducer, initialState)
    // Función pra establecer el datacenter seleccionado
    const setSelectedDatacenter = (datacenterId) => {
        dispatch({
            type: SET_DATACENTER, payload: datacenterId
        })
    }

    return (
        <DatacenterContext.Provider value={{ state, setSelectedDatacenter }}>
            {children}
        </DatacenterContext.Provider>
    )
}

export default DatacenterProvider
