import React, { createContext, useReducer } from 'react';

const MyContext = createContext();

const initialState = {
    blogs: [],
};

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BLOGS':
            return { ...state, blogs: action.payload };
        case 'ADD_BLOG':
            return { ...state, blogs: [action.payload, ...state.blogs] };
        default:
            return state;
    }
};

export const MyProvider = ({ children }) => {
    const [state, dispatch] = useReducer(blogReducer, initialState);

    const addBlog = (blog) => {
        dispatch({ type: 'ADD_BLOG', payload: blog });
    };

    return (
        <MyContext.Provider value={{ ...state, addBlog }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyContext;
