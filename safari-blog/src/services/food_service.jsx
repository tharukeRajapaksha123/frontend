import axios from "axios"
import config from "../config"

const fetchFoods = async (dispatch) => {
    dispatch({
        type: "LOADING",
        payload: true,
    })
    await axios.get(`${config.baseUrl}/food-controller`).then((data) => {
        dispatch({
            type: "SET_FOODS",
            payload: data.data
        })
    })
    dispatch({
        type: "LOADING",
        payload: false,
    })
}

const addFood = async (data, dispatch) => {
    dispatch({
        type: "LOADING",
        payload: false,
    })
    await axios.post(`${config.baseUrl}/food-controller`, data)
        .then((value) => {
            dispatch({
                type: "SET_FOOD",
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


const updateFood = async (id, data, dispatch) => {
    dispatch({
        type: "LOADING",
        payload: false,
    })
    await axios.put(`${config.baseUrl}/food-controller/${id}`, data)
    await fetchFoods(dispatch)
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

const deleteFood = async (id, dispatch) => {
    dispatch({
        type: "LOADING",
        payload: false,
    })
    await axios.delete(`${config.baseUrl}/food-controller/${id}`).then((val) => {
        dispatch({
            type: "DELETE_FOOD",
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


export default { fetchFoods, updateFood, addFood, deleteFood }