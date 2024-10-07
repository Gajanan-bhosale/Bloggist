import React, { createContext, useState } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);
    const [userId, setUserId] = useState('default-user-id');

    const addBlog = (newBlog) => {
        setBlogs([...blogs, newBlog]);
    };

    return (
        <MyContext.Provider value={{ blogs, addBlog }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyContext;
