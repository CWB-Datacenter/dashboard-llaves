export const actionTypes = {
    SET_KEYS: 'SET_KEYS',
    SET_LOADING: 'SET_LOADING',
    RESET_KEYS: 'RESET_KEYS',
}

// Acción para establecer las llaves en el estado
export const setKeysAction = (keys) => ({
    type: actionTypes.SET_KEYS,
    payload: keys,
})

// Acción para establecer el estado de carga
export const setLoadingAction = (isLoading) => ({
    type: actionTypes.SET_LOADING,
    payload: isLoading,
})

// Acción para resetear las llaves
export const resetKeysAction = () => ({
    type: actionTypes.RESET_KEYS,
})
