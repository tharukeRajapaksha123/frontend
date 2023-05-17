import axios from "axios"
import config from "../config"

const fetchSafarise = async (dispatch) => {
    dispatch({
        type: "LOADING",
        payload: true,
    })
    await axios.get(`${config.baseUrl}/safari-controller`).then((data) => {
        dispatch({
            type: "SET_SAFARIS",
            payload: data.data
        })
    })
    dispatch({
        type: "LOADING",
        payload: false,
    })
}

const addSafari = async (data, dispatch) => {
    dispatch({
        type: "LOADING",
        payload: false,
    })
    await axios.post(`${config.baseUrl}/safari-controller`, data)
        .then((value) => {
            dispatch({
                type: "SET_SAFARI",
                payload: value,
            })
        })
        .catch(Error => {
            dispatch({
                type: "ERROR",
                payload: Error,
            })
        })
    dispatch({
        type: "LOADING",
        payload: true,
    })
}


const updateSafari = async (id, data, dispatch) => {
    dispatch({
        type: "LOADING",
        payload: false,
    })
    await axios.put(`${config.baseUrl}/safari-controller/${id}`, data)


        .catch(err => {

        })
    dispatch({
        type: "LOADING",
        payload: true,
    })
}

const deleteSafari = async (id, dispatch) => {
    dispatch({
        type: "LOADING",
        payload: false,
    })
    await axios.delete(`${config.baseUrl}/safari-controller/${id}`)
        .catch(err => {
            dispatch({
                type: "DELETE_SAFARI",
                payload: id,
            })
        })
    dispatch({
        type: "LOADING",
        payload: true,
    })
}


export default { fetchSafarise, updateSafari, addSafari, deleteSafari }