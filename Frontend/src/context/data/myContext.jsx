import React, { createContext, useState } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);

    const addBlog = (newBlog) => {
        setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
    };

    return (
        <MyContext.Provider value={{ blogs, addBlog }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyContext;
