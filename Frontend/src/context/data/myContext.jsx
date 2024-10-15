import React, { createContext, useState } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [getAllBlog, setBlogs] = useState([]);

    const addBlog = (newBlog) => {
        setBlogs((prevBlogs) => [...prevBlogs, newBlog]); // Add the new blog
    };

    return (
        <MyContext.Provider value={{ getAllBlog, addBlog }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyContext;
