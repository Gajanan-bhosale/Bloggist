import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';

function CreateBlog() {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        thumbnail: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to your API
            const response = await axios.post('https://bloggist-backend.onrender.com/api/post/add_post', formData);
            console.log('Blog created:', response.data);
            navigate('/dashboard'); // Navigate to the dashboard after successful submission
        } catch (error) {
            console.error('Error creating blog:', error.response?.data || error.message);
            // Optional: Handle error display to the user
        }
    };

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-center text-2xl font-bold mb-4">Create a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        name="category"
                        id="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">Thumbnail URL</label>
                    <input
                        type="text"
                        name="thumbnail"
                        id="thumbnail"
                        value={formData.thumbnail}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="flex justify-center">
                    <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        Submit Blog
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default CreateBlog;
