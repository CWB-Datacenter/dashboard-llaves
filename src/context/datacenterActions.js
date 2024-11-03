export const SET_DATACENTER = 'SET_DATACENTER';

//Acción para establecer el datacenter seleccionado
export const setDatacenterAction = (datacenterId) => ({
    type: SET_DATACENTER,
    payload: datacenterId
})