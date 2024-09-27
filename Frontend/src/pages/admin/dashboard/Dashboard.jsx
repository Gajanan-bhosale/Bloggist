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
        try {z
            const response = await axios.get(`https://bloggist-api.vercel.app/api/post/get_posts/${user._id}`, {
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
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <div className="py-10">
                {/* User Profile Section */}
                <div className="flex flex-wrap justify-start items-center lg:justify-center gap-2 lg:gap-10 px-4 lg:px-0 mb-8">
                    <div className="left">
                        <img
                            className="w-40 h-40 object-cover rounded-full border-2 border-pink-600 p-1"
                            src={'https://cdn-icons-png.flaticon.com/128/3135/3135715.png'}
                            alt="profile"
                        />
                    </div>
                    <div className="right">
                        <h1 className="text-center font-bold text-2xl mb-2" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                            {user.name}
                        </h1>
                        <h2 style={{ color: mode === 'dark' ? 'white' : 'black' }} className="font-semibold">
                            Frontend Developer
                        </h2>
                        <h2 style={{ color: mode === 'dark' ? 'white' : 'black' }} className="font-semibold">
                            {user.email}
                        </h2>
                        <h2 style={{ color: mode === 'dark' ? 'white' : 'black' }} className="font-semibold">
                            <span>Total Blogs: </span> {userBlogs.length}
                        </h2>
                        <div className="flex gap-2 mt-2">
                            <Link to={'/createblog'}>
                                <Button
                                    style={{
                                        background: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
                                        color: mode === 'dark' ? 'black' : 'white'
                                    }}
                                    className="px-8 py-2"
                                >
                                    Create Blog
                                </Button>
                            </Link>
                            {/* <Button
                                onClick={logout}
                                style={{
                                    background: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
                                    color: mode === 'dark' ? 'black' : 'white'
                                }}
                                className="px-8 py-2"
                            >
                                Logout
                            </Button> */}
                        </div>
                    </div>
                </div>

                <hr className={`border-2 ${mode === 'dark' ? 'border-gray-300' : 'border-gray-400'}`} />

                <div className="container mx-auto px-4 max-w-7xl my-5">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
                        <table className="w-full border-2 border-white shadow-md text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead
                                style={{
                                    background: mode === 'dark' ? 'white' : 'rgb(30, 41, 59)'
                                }}
                                className="text-xs"
                            >
                                <tr>
                                    <th style={{ color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} className="px-6 py-3">
                                        S.No
                                    </th>
                                    <th style={{ color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} className="px-6 py-3">
                                        Thumbnail
                                    </th>
                                    <th style={{ color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} className="px-6 py-3">
                                        Title
                                    </th>
                                    <th style={{ color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} className="px-6 py-3">
                                        Category
                                    </th>
                                    <th style={{ color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} className="px-6 py-3">
                                        Date
                                    </th>
                                    <th style={{ color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {userBlogs.length > 0 ? (
                                    userBlogs.map((item, index) => {
                                        const { thumbnail, title, category, date, _id } = item; // Ensure id is part of item
                                        return (
                                            <tr key={index} className="border-b-2" style={{ background: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }}>
                                                <td style={{ color: mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4">
                                                    {index + 1}.
                                                </td>
                                                <td style={{ color: mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4">
                                                    <img className='w-16 rounded-lg' src={'https://bloggist-api.vercel.app/' + thumbnail} alt="thumbnail" />
                                                </td>
                                                <td style={{ color: mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4">
                                                    {title}
                                                </td>
                                                <td style={{ color: mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4">
                                                    {category}
                                                </td>
                                                <td style={{ color: mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4">
                                                    {date}
                                                </td>
                                                <td className="px-6 py-4 flex gap-2">
                                                    <button
                                                        className="px-4 py-1 rounded-lg text-white font-bold bg-blue-500"
                                                        onClick={() => navigate(`/adminblog/${_id}`)} // Use _id here
                                                    >
                                                        View
                                                    </button>

                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr><td colSpan="6">No blogs found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;