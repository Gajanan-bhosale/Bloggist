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
            <div className="py-10">
                {/* User Profile Section */}
                <div className="flex flex-col items-center gap-4 mb-10">
                    <img
                        className="w-40 h-40 object-cover rounded-full border-4 border-blue-600 p-1"
                        src={'https://cdn-icons-png.flaticon.com/128/3135/3135715.png'}
                        alt="profile"
                    />
                    <h1 className="text-center text-4xl font-bold" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                        {user.name}
                    </h1>
                    <h2 className="text-lg font-medium" style={{ color: mode === 'dark' ? '#e2e8f0' : 'gray' }}>
                        Frontend Developer
                    </h2>
                    <h2 className="text-lg font-medium" style={{ color: mode === 'dark' ? '#e2e8f0' : 'gray' }}>
                        {user.email}
                    </h2>
                    <h2 className="text-lg font-medium" style={{ color: mode === 'dark' ? '#e2e8f0' : 'gray' }}>
                        <span>Total Blogs: </span> {userBlogs.length}
                    </h2>
                    <div className="mt-5">
                        <Link to={'/createblog'}>
                            <Button
                                style={{
                                    background: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
                                    color: mode === 'dark' ? 'black' : 'white',
                                }}
                                className="px-8 py-2 hover:bg-blue-500 transition-all duration-300 ease-in-out"
                            >
                                Create Blog
                            </Button>
                        </Link>
                    </div>
                </div>

                <hr className={`border-2 ${mode === 'dark' ? 'border-gray-300' : 'border-gray-400'} mb-8`} />

                {/* Blog Posts Section */}
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {userBlogs.length > 0 ? (
                            userBlogs.map((item, index) => {
                                const { thumbnail, title, category, date, _id } = item;
                                return (
                                    <div
                                        key={index}
                                        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 p-4"
                                    >
                                        <img
                                            className="w-full h-40 object-cover rounded-lg mb-4"
                                            src={'https://bloggist-backend.onrender.com/' + thumbnail}
                                            alt="thumbnail"
                                        />
                                        <h3
                                            className="text-xl font-bold mb-2"
                                            style={{ color: mode === 'dark' ? 'white' : 'black' }}
                                        >
                                            {title}
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-300 mb-2">
                                            {category}
                                        </p>
                                        <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">
                                            {new Date(date).toLocaleDateString()}
                                        </p>
                                        <button
                                            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all"
                                            onClick={() => navigate(`/adminblog/${_id}`)}
                                        >
                                            View Blog
                                        </button>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-center text-gray-500 dark:text-gray-400">No blogs found.</p>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;
