import React, { createContext, useState, useReducer } from 'react';

const initialState = {
    loading: false,
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        default:
            return state;
    }
}

export const LoadingContext = createContext();

export function LoadingProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <LoadingContext.Provider value={[state, dispatch]}>
            {children}
        </LoadingContext.Provider>
    );
}

export default LoadingContext