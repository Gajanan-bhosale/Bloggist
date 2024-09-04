import React, { useEffect, useState } from 'react';
import Layout from '../../../components/layout/Layout';
import { Button } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { mode, getAllBlog, deleteBlogs } = context;
    

    useEffect(() => {
        // Retrieve user data from localStorage
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
        window.scrollTo(0, 0);
    }, []);

    const logout = () => {
        localStorage.clear();
        navigate('/');
    }

    return (
        <Layout>
            <div className="py-10">
                <div className="flex flex-wrap justify-start items-center lg:justify-center gap-2 lg:gap-10 px-4 lg:px-0 mb-8">
                    <div className="left">
                        <img
                            className="w-40 h-40 object-cover rounded-full border-2 border-pink-600 p-1"
                            src={'https://cdn-icons-png.flaticon.com/128/3135/3135715.png'} alt="profile"
                        />
                    </div>
                    <div className="right">
                        {user && (
                            <>
                                <h1
                                    className='text-center font-bold text-2xl mb-2'
                                    style={{ color: mode === 'dark' ? 'white' : 'black' }}
                                >
                                    {user.name}
                                </h1>
                                <h2
                                    style={{ color: mode === 'dark' ? 'white' : 'black' }} className="font-semibold"
                                >
                                    Frontend Developer
                                </h2>
                                <h2
                                    style={{ color: mode === 'dark' ? 'white' : 'black' }} className="font-semibold"
                                >
                                    {user.email}
                                </h2>
                                <h2
                                    style={{ color: mode === 'dark' ? 'white' : 'black' }} className="font-semibold"
                                >
                                    <span>Total Blog : </span>  15
                                </h2>
                            </>
                        )}
                        <div className="flex gap-2 mt-2">
                            <Link to={'/createblog'}>
                                <div className="mb-2">
                                    <Button
                                        style={{
                                            background: mode === 'dark'
                                                ? 'rgb(226, 232, 240)'
                                                : 'rgb(30, 41, 59)',
                                            color: mode === 'dark'
                                                ? 'black'
                                                : 'white'
                                        }}
                                        className='px-8 py-2'
                                    >
                                        Create Blog
                                    </Button>
                                </div>
                            </Link>
                            <div className="mb-2">
                                <Button
                                    onClick={logout}
                                    style={{
                                        background: mode === 'dark'
                                            ? 'rgb(226, 232, 240)'
                                            : 'rgb(30, 41, 59)',
                                        color: mode === 'dark'
                                            ? 'black'
                                            : 'white'
                                    }}
                                    className='px-8 py-2'
                                >
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className={`border-2 ${mode === 'dark' ? 'border-gray-300' : 'border-gray-400'}`} />
                <div className="">
                    <div className='container mx-auto px-4 max-w-7xl my-5'>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
                            {/* Table */}
                            {/* Your table rendering code here */}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard;
