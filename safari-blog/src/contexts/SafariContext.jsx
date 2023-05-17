import React, { createContext, useReducer } from 'react';

const initialState = {
    safaris: [],
    loading: false,
    error: null,
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_SAFARIS':
            return { ...state, safaris: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'UPDATE_SAFARI':
            return { ...state, safaris: action.payload };
        case 'DELETE_SAFARI':
            return {
                ...state, loading: safaris.map((safari) => {
                    return safari._id !== action.payload.id;
                })
            };
        case 'ADD_SAFARI':
            return { ...state, safaris: [...safaris, action.payload] };
        default:
            return state;
    }
}

export const SafariContext = createContext();

export function SafariProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <SafariContext.Provider value={[state, dispatch]}>
            {children}
        </SafariContext.Provider>
    );
}

export default SafariContext