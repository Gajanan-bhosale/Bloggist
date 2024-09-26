import React, { useState, useEffect } from 'react';
import MyContext from './myContext';
import axios from 'axios';

function MyState(props) {
    const [mode, setMode] = useState('light');
    const [getAllBlog, setGetAllBlog] = useState([]);
    const [singlePost, setSinglePost] = useState(null);

    const toggleMode = () => {
        setMode((prevMode) => prevMode === 'light' ? 'dark' : 'light');
        document.body.style.backgroundColor = mode === 'light' ? 'rgb(17, 24, 39)' : 'white';
    };

    const getAllBlogs = async () => {
        try {
            const response = await axios.get('https://bloggist-api.vercel.app/api/post/get_all_posts');
            setGetAllBlog(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const getPostById = async (postId) => {
        try {
            const response = await axios.get(`https://bloggist-api.vercel.app/api/post/get_post/${postId}`);
            setSinglePost(response.data);
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    useEffect(() => {
        getAllBlogs();
    }, []);

    return (
        <MyContext.Provider value={{
            mode,
            toggleMode,
            getAllBlog,
            setGetAllBlog,
            singlePost,
            getPostById,
        }}>
            {props.children}
        </MyContext.Provider>
    );
}

export default MyState;
