import React, { useState, useContext, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import MyContext from '../../../context/data/myContext';
import { useAuth } from '../../../../store/auth'; // import useAuth to get the user
import axios from 'axios';

function CreateBlog() {
    const { addBlog } = useContext(MyContext);
    const { user } = useAuth();
    const [blog, setBlog] = useState({
        thumbnail: "",
        title: "",
        category: "",
        content: "",   
    });

    const [thumbnailPreview, setThumbnailPreview] = useState();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('thumbnail', blog.thumbnail);
        formData.append('title', blog.title);
        formData.append('category', blog.category);
        formData.append('content', blog.content);
        formData.append('userId', user._id);

        try {
            const res = await axios.post('https://bloggist-backend.onrender.com/api/post/add_post', formData);
            console.log(res.data);

            // Call addBlog to update the context state with the new blog
            addBlog(res.data); // Assuming res.data is the new blog object

            navigate("/dashboard");
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const createMarkup = (content) => {
        return { __html: content };
    };

    return (
        <div className='container mx-auto max-w-5xl py-6'>
            <div className="p-5">
                <div className="mb-2 flex justify-between">
                    <div className="flex gap-2 items-center">
                        <Link to={'/dashboard'}>
                            <BsFillArrowLeftCircleFill size={25} />
                        </Link>
                        <Typography variant="h4">Create Blog</Typography>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        {thumbnailPreview && (
                            <img className="w-full rounded-md mb-3" src={thumbnailPreview} alt="thumbnail" />
                        )}
                        <Typography variant="small" color="blue-gray" className="mb-2 font-semibold">
                            Upload Thumbnail
                        </Typography>
                        <input
                            type="file"
                            className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setBlog({ ...blog, thumbnail: file });
                                setThumbnailPreview(URL.createObjectURL(file)); // Preview thumbnail
                            }}
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5"
                            placeholder="Enter Your Title"
                            value={blog.title}
                            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5"
                            placeholder="Enter Your Category"
                            value={blog.category}
                            onChange={(e) => setBlog({ ...blog, category: e.target.value })}
                        />
                    </div>

                    <Editor
                        apiKey='wx2tma1e1vl0jghj9qceb1knwuwg4kcjgb0lloggc856oi7t'
                        value={blog.content}
                        onEditorChange={(newValue) => {
                            setBlog({ ...blog, content: newValue });
                        }}
                        init={{
                            plugins: 'autoresize lists link image preview',
                        }}
                    />

                    <Button type="submit" className="w-full mt-5">
                        Submit
                    </Button>
                </form>

                <div className="mt-8">
                    <h1 className="text-center mb-3 text-2xl">Preview</h1>
                    <div dangerouslySetInnerHTML={createMarkup(blog.content)}></div>
                </div>
            </div>
        </div>
    );
}

export default CreateBlog;
