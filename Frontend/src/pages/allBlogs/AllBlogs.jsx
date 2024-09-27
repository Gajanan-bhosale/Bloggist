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
      const response = await axios.get(`https://bloggist-api.vercel.app/api/post/get_posts/${user._id}`, {
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
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto max-w-7xl">
          <div className="mb-10">
            <h1 className="text-center text-3xl md:text-4xl font-bold"
              style={{ color: mode === 'dark' ? 'white' : 'black' }}>
              All Blogs
            </h1>
          </div>
          <div className="flex flex-wrap justify-center -m-4">
            {userBlogs.length > 0 ? (
              userBlogs.map((item, index) => {
                const { thumbnail, date, _id, title } = item;
                return (
                  <div key={index} className="p-4 md:w-1/3">
                    <div
                      className={`h-full shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer
                      ${mode === 'dark' ? 'bg-gray-800 border-gray-700 shadow-gray-900' : 'bg-white border-gray-300 shadow-xl'}
                      border rounded-lg overflow-hidden`}
                      onClick={() => navigate(`/adminblog/${_id}`)}
                    >
                      <img className="w-full h-48 object-cover" src={`https://bloggist-api.vercel.app/${thumbnail}`} alt="blog" />
                      <div className="p-6">
                        <p className="tracking-widest text-sm font-medium mb-1 text-gray-500"
                          style={{ color: mode === 'dark' ? '#E2E8F0' : '#1E293B' }}>
                          {new Date(date).toLocaleDateString()}
                        </p>
                        <h1 className="title-font text-lg font-semibold mb-2"
                          style={{ color: mode === 'dark' ? '#E2E8F0' : '#1E293B' }}>
                          {title}
                        </h1>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1 className="text-xl text-center font-semibold" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                No blogs found.
              </h1>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default AllBlogs;
