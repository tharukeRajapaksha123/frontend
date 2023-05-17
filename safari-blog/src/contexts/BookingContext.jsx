import React, { createContext, useState, useReducer } from 'react';

const initialState = {
    bookings: [],
    loading: false,
    error: null,
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_BOOKINGS':
            return { ...state, bookings: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'ERROR':
            return { ...state, error: action.payload };
        case 'UPDATE_BOOKING':
            return { ...state, bookings: action.payload };
        case 'DELETE_BOOKING':
            return {
                ...state, loading: bookings.map((safari) => {
                    return safari._id !== action.payload.id;
                })
            };
        case 'ADD_BOOKING':
            return { ...state, bookings: [...bookings, action.payload] };
        default:
            return state;
    }
}

export const BookingContext = createContext();

export function BookingProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <BookingContext.Provider value={[state, dispatch]}>
            {children}
        </BookingContext.Provider>
    );
}

export default BookingContext