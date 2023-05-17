import axios from "axios"
import config from "../config"

const fetchRooms = async (dispatch) => {
    dispatch({
        type: "LOADING",
        payload: true,
    })
    await axios.get(`${config.baseUrl}/room-controller`).then((data) => {
        dispatch({
            type: "SET_ROOMS",
            payload: data.data
        })
    })
    dispatch({
        type: "LOADING",
        payload: false,
    })
}

const addRoom = async (data, dispatch) => {
    dispatch({
        type: "LOADING",
        payload: false,
    })
    await axios.post(`${config.baseUrl}/room-controller`, data)
        .then((value) => {
            dispatch({
                type: "SET_ROOM",
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


const updateRoom = async (id, data, dispatch) => {
    dispatch({
        type: "LOADING",
        payload: false,
    })
    await axios.put(`${config.baseUrl}/room-controller/${id}`, data)
    await fetchRooms(dispatch)
        .catch(err => {
            dispatch({
                type: "ERROR",
                payload: err,
            })
        })
    dispatch({
        type: "LOADING",
        payload: true,
    })
}

const deleteRoom = async (id, dispatch) => {
    dispatch({
        type: "LOADING",
        payload: false,
    })
    await axios.delete(`${config.baseUrl}/room-controller/${id}`).then((val) => {
        dispatch({
            type: "DELETE_ROOM",
            payload: id,
        })
    })
        .catch(err => {
            dispatch({
                type: "ERROR",
                payload: err,
            })
        })
    dispatch({
        type: "LOADING",
        payload: true,
    })
}


export default { fetchRooms, updateRoom, addRoom, deleteRoom }