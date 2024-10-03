import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../../components/layout/Layout';
import myContext from '../../../context/data/myContext';
import { Button } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../store/auth';
import axios from 'axios';

function Dashboard() {
    const context = useContext(myContext);
    const { mode } = context;
    const [userBlogs, setUserBlogs] = useState([]);
    const navigate = useNavigate();
    const { user } = useAuth();

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`https://bloggist-backend.onrender.com/api/post/get_posts/${user._id}`, {
                params: { userId: user._id },
            });
            setUserBlogs(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const logout = () => {
        localStorage.clear();
        navigate('/');
    };

    useEffect(() => {
        if (user) {
            fetchPosts();
        }
        window.scrollTo(0, 0);
    }, [user]);

    if (!user) {
        return null;
    }

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-900 py-10">
                {/* Hero Section */}
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-bold text-white mb-2">Welcome, {user.name}</h1>
                    <p className="text-lg text-gray-200">Manage your blogs and create new content!</p>
                </div>

                {/* User Profile Section */}
                <div className="flex flex-col items-center mb-12">
                    <img
                        className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-lg mb-4"
                        src={'https://cdn-icons-png.flaticon.com/128/3135/3135715.png'}
                        alt="profile"
                    />
                    <h2 className="text-2xl font-bold text-white mb-1">{user.name}</h2>
                    <p className="text-lg text-gray-200 mb-3">Frontend Developer</p>
                    <p className="text-lg text-gray-200 mb-3">{user.email}</p>
                    <p className="text-lg text-gray-200 mb-3">Total Blogs: {userBlogs.length}</p>

                    <Link to={'/createblog'}>
                        <Button
                            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-full transition-all duration-300 shadow-lg"
                        >
                            Create Blog
                        </Button>
                    </Link>
                </div>

                {/* Blog Posts Section */}
                <div className="container mx-auto px-4 max-w-7xl">
                    <h3 className="text-3xl font-bold text-white mb-6">Your Blogs</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {userBlogs.length > 0 ? (
                            userBlogs.map((item, index) => {
                                const { thumbnail, title, category, date, _id } = item;
                                return (
                                    <div
                                        key={index}
                                        className="bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
                                    >
                                        <img
                                            className="w-full h-48 object-cover rounded-t-lg"
                                            src={'https://bloggist-backend.onrender.com/' + thumbnail}
                                            alt="thumbnail"
                                        />
                                        <div className="p-4">
                                            <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
                                            <p className="text-gray-600 mb-2">{category}</p>
                                            <p className="text-gray-500 text-sm mb-4">
                                                {new Date(date).toLocaleDateString()}
                                            </p>
                                            <button
                                                className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold w-full hover:bg-blue-600 transition-all"
                                                onClick={() => navigate(`/adminblog/${_id}`)}
                                            >
                                                View Blog
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-center text-gray-300">No blogs found.</p>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;
