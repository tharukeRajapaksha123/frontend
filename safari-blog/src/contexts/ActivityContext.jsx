import React, { createContext, useState, useReducer } from 'react';

const initialState = {
    activities: [],
    loading: false,
    error: null,
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_ACTIVITYS':
            return { ...state, activities: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'ERROR':
            return { ...state, error: action.payload };
        case 'UPDATE_ACTIVITY':
            return { ...state, activities: action.payload };
        case 'DELETE_ACTIVITY':
            return {
                ...state, activities: activities.map((safari) => {
                    return safari._id !== action.payload.id;
                })
            };
        case 'ADD_ACTIVITY':
            return { ...state, activities: [...activities, action.payload] };
        default:
            return state;
    }
}

export const ActivityContext = createContext();

export function ActivityProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ActivityContext.Provider value={[state, dispatch]}>
            {children}
        </ActivityContext.Provider>
    );
}

export default ActivityContext