import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../store/auth';
import axios from 'axios';

function AllBlogs() {
  const context = useContext(myContext);
  const { mode } = context;
  const [userBlogs, setUserBlogs] = useState([]);
  const { user } = useAuth();

  const navigate = useNavigate();

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

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
    window.scrollTo(0, 0);
  }, [user]);

  return (
    <Layout>
      <section className="relative bg-gradient-to-b from-indigo-500 to-purple-500 py-12">
        <div className="relative container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Welcome {user.name}
          </h1>
          <p className="text-lg text-gray-200">
            Manage your content easily and check out your latest blog posts below.
          </p>
        </div>
      </section>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto max-w-7xl">
          <div className="flex flex-wrap justify-center -m-4">
            {userBlogs.length > 0 ? (
              userBlogs.map((item, index) => {
                const { thumbnail, date, _id, title } = item;
                return (
                  <div key={index} className="p-4 md:w-1/3 w-full">
                    <div
                      className={`h-full transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer
                      ${mode === 'dark' ? 'bg-gray-900 border-gray-700 shadow-lg' : 'bg-white border-gray-300 shadow-md'}
                      border rounded-xl overflow-hidden`}
                      onClick={() => navigate(`/adminblog/${_id}`)}
                    >
                      <img
                        className="w-full h-48 object-cover rounded-t-lg"
                        src={thumbnail ? `https://bloggist-backend.onrender.com/${thumbnail}` : 'https://via.placeholder.com/300?text=No+Image'}
                        alt="blog"
                      />
                      <div className="p-6">
                        <p className="tracking-widest text-xs font-semibold mb-2 text-gray-500"
                          style={{ color: mode === 'dark' ? '#E2E8F0' : '#1E293B' }}>
                          {new Date(date).toLocaleDateString()}
                        </p>
                        <h1 className="title-font text-lg font-bold mb-2"
                          style={{ color: mode === 'dark' ? '#E2E8F0' : '#1E293B' }}>
                          {title}
                        </h1>
                        <div className="flex items-center">
                          <button
                            className="text-sm font-semibold text-indigo-500 hover:underline"
                            onClick={() => navigate(`/adminblog/${_id}`)}>
                            Read More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1 className="text-2xl text-center font-semibold mt-10"
                style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                Create your first Blog
              </h1>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default AllBlogs;
