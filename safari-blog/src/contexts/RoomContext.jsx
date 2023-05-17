import React, { createContext, useState, useReducer } from 'react';

const initialState = {
    rooms: [],
    loading: false,
    error: null,
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_ROOMS':
            return { ...state, rooms: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'ERROR':
            return { ...state, error: action.payload };
        case 'UPDATE_ROOM':
            return { ...state, rooms: action.payload };
        case 'DELETE_ROOM':
            return {
                ...state, rooms: rooms.map((safari) => {
                    return safari._id !== action.payload.id;
                })
            };
        case 'ADD_ROOM':
            return { ...state, rooms: [...rooms, action.payload] };
        default:
            return state;
    }
}

export const RoomContext = createContext();

export function RoomProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <RoomContext.Provider value={[state, dispatch]}>
            {children}
        </RoomContext.Provider>
    );
}

export default RoomContext