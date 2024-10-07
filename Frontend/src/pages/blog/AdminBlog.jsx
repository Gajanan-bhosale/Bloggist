import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/data/myContext';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import axios from 'axios';
import { FiEdit3, FiTrash2 } from 'react-icons/fi'; // Icons
import { FaArrowLeft } from 'react-icons/fa'; // Import an arrow icon for the back button

// Utility function to strip HTML tags
const stripHTML = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

function AdminBlog() {
  const context = useContext(myContext);
  const { mode } = context;
  const params = useParams();
  const navigate = useNavigate();  

  const { id: postId } = params;

  const [getBlogs, setGetBlogs] = useState({
    thumbnail: '',
    title: '',
    content: '',
    category: ''
  });

  const handleChange = (e) => {
    setGetBlogs({
      ...getBlogs,
      [e.target.name]: e.target.value,
    });
  };

  // Fetch blog data using useEffect
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`https://bloggist-backend.onrender.com/api/post/get_blog_post/${postId}`);
        const blogData = response.data;

        // Strip HTML tags from content and update state
        setGetBlogs({
          ...blogData,
          content: stripHTML(blogData.content) // Strip HTML tags from content
        });
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    if (postId) {
      fetchPostData();
    }
  }, [postId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postId]);

  // Handle Update
  const handleUpdate = async () => {
    try {
      await axios.put(`https://bloggist-backend.onrender.com/api/post/update_post/${postId}`, getBlogs);
      alert('Blog updated successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  // Handle Delete
  const handleDelete = async () => {
    try {
      await axios.delete(`https://bloggist-backend.onrender.com/api/post/delete_post/${postId}`);
      alert('Blog deleted successfully');
      navigate('/dashboard');  // Redirect to admin page after deletion
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <Layout>
      <section className="rounded-lg h-full overflow-hidden max-w-4xl mx-auto px-4">
        <div className="py-4 lg:py-8">
          {/* Back Button */}
          <button 
            onClick={() => navigate('/dashboard')} // Navigate to the dashboard
            className="text-lg font-bold flex items-center space-x-2 mb-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300 shadow-lg"
          >
            <FaArrowLeft className="mr-2" /> {/* Back arrow icon */}
            <span>Back to Dashboard</span>
          </button>

          {getBlogs ? (
            <div className="space-y-6">
              {/* Thumbnail - Display as image */}
              {getBlogs.thumbnail && (
                <img
                  alt="content"
                  className="mb-6 rounded-lg h-full w-full shadow-md hover:shadow-lg transition-all duration-300"
                  src={'https://bloggist-backend.onrender.com/' + getBlogs.thumbnail}
                />
              )}

              {/* Title */}
              <label className="block text-gray-700 text-lg font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={getBlogs.title}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                placeholder="Blog Title"
              />

              {/* Category */}
              <label className="block text-gray-700 text-lg font-bold mb-2">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={getBlogs.category}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                placeholder="Blog Category"
              />

              {/* Blog Content */}
              <label className="block text-gray-700 text-lg font-bold mt-4 mb-2">
                Content
              </label>
              <textarea
                name="content"
                value={getBlogs.content}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                placeholder="Blog Content"
                rows="10"
              />

              {/* Buttons */}
              <div className="flex justify-between mt-6 space-x-4">
                <button
                  onClick={handleUpdate}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                >
                  <FiEdit3 className="mr-2" /> Update
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg flex items-center focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-red-400 transition-all duration-300"
                >
                  <FiTrash2 className="mr-2" /> Delete
                </button>
              </div>
            </div>
          ) : (
            <p style={{ color: mode === 'dark' ? 'white' : 'black' }}>No post found.</p>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default AdminBlog;
