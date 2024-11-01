import { createContext, useReducer } from 'react'
import { keysReducer, initialState } from './keysReducer'
import { setKeys, setLoading, resetKeys } from './keysActions'

export const KeysContext = createContext()

export const KeysProvider = ({ children }) => {
    const [state, dispatch] = useReducer(keysReducer, initialState)

    const fetchKeys = async (datacenterId) => {
        dispatch(setLoading(true))
        try {
            const response = await fetch(`https://cwp-vidc-scat.cwpanama.com/llaves/api/selectLlaves.php?datacenter_id=${datacenterId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            dispatch(setKeys(data))
        } catch (error) {
            console.error("Error al obtener llaves:", error)
            dispatch(setKeys([]))
        } finally {
            dispatch(setLoading(false))
        }
    }

    return (
        <KeysContext.Provider value={{ state, fetchKeys, resetKeys: () => dispatch(resetKeys()) }}>
            {children}
        </KeysContext.Provider>
    )
}

export default KeysProvider