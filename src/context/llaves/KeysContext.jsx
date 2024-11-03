import { createContext, useReducer } from 'react'
import { keysReducer, initialState } from './keysReducer'
import { setKeysAction, setLoadingAction, resetKeysAction } from './keysActions'

export const KeysContext = createContext()

export const KeysProvider = ({ children }) => {
    const [state, dispatch] = useReducer(keysReducer, initialState)

    const setKeys = (keys) => {
        dispatch(setKeysAction(keys))
    }

    const setLoading = (isLoading) => {
        dispatch(setLoadingAction(isLoading))
    }

    const resetKeys = () => {
        dispatch(resetKeysAction())
    }

    const fetchKeys = async (datacenterId) => {
        setLoading(true)
        try {
            const response = await fetch(`https://cwp-vidc-scat.cwpanama.com/llaves/api/selectLlaves.php?datacenter_id=${datacenterId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            setKeys(data)
        } catch (error) {
            console.error("Error al obtener llaves:", error)
            setKeys([])
        } finally {
            setLoading(false)
        }
    }

    return (
        <KeysContext.Provider value={{ state, fetchKeys, resetKeys, setLoading }}>
            {children}
        </KeysContext.Provider>
    )
}

export default KeysProvider