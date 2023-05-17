import React, { createContext, useState, useReducer } from 'react';

const initialState = {
    foods: [],
    loading: false,
    error: null,
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_FOODS':
            return { ...state, foods: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'ERROR':
            return { ...state, error: action.payload };
        case 'UPDATE_FOOD':
            return { ...state, foods: action.payload };
        case 'DELETE_FOOD':
            return {
                ...state, foods: foods.map((safari) => {
                    return safari._id !== action.payload.id;
                })
            };
        case 'ADD_FOOD':
            return { ...state, foods: [...foods, action.payload] };
        default:
            return state;
    }
}

export const FoodContext = createContext();

export function  FoodProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <FoodContext.Provider value={[state, dispatch]}>
            {children}
        </FoodContext.Provider>
    );
}

export default FoodContext