// import React, { useContext, useEffect, useState } from 'react';
// import myContext from '../../context/data/myContext';
// import { useParams, useNavigate } from 'react-router-dom';
// import Layout from '../../components/layout/Layout';
// import axios from 'axios';

// // Utility function to strip HTML tags
// const stripHTML = (html) => {
//   const doc = new DOMParser().parseFromString(html, 'text/html');
//   return doc.body.textContent || "";
// };

// function AdminBlog() {
//   const context = useContext(myContext);
//   const { mode } = context;
//   const params = useParams();
//   const navigate = useNavigate();  // Use navigate for redirection after delete

//   // Extract postId from params
//   const { id: postId } = params;

//   // State management
//   const [getBlogs, setGetBlogs] = useState({
//     thumbnail: '',
//     title: '',
//     content: ''
//   });

//   const handleChange = (e) => {
//     setGetBlogs({
//       ...getBlogs,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Fetch blog data using useEffect
//   useEffect(() => {
//     const fetchPostData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/post/get_blog_post/${postId}`);
//         const blogData = response.data;

//         // Strip HTML tags from content and update state
//         setGetBlogs({
//           ...blogData,
//           content: stripHTML(blogData.content) // Strip HTML tags from content
//         });
//       } catch (error) {
//         console.error('Error fetching post data:', error);
//       }
//     };

//     if (postId) {
//       fetchPostData();
//     }
//   }, [postId]);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [postId]);

//   // Handle Update
//   const handleUpdate = async () => {
//     try {
//       const response = await axios.put(`http://localhost:5000/api/post/update_blog_post/${postId}`, getBlogs);
//       alert('Blog updated successfully');
//     } catch (error) {
//       console.error('Error updating post:', error);
//     }
//   };

//   // Handle Delete
//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:5000/api/post/delete_blog_post/${postId}`);
//       alert('Blog deleted successfully');
//       navigate('/admin');  // Redirect to admin page after deletion
//     } catch (error) {
//       console.error('Error deleting post:', error);
//     }
//   };

//   return (
//     <Layout>
//       <section className="rounded-lg h-full overflow-hidden max-w-4xl mx-auto px-4">
//         <div className="py-4 lg:py-8">
//           {getBlogs ? (
//             <div>
//               {/* Thumbnail - Display as image */}
//               {getBlogs.thumbnail && (
//                 <img
//                   alt="content"
//                   className="mb-3 rounded-lg h-full w-full"
//                   src={'http://localhost:5000/' + getBlogs.thumbnail}
//                 />
//               )}

//               {/* Title */}
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Title
//               </label>
//               <input
//                 type="text"
//                 name="title"
//                 value={getBlogs.title}
//                 onChange={handleChange}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 placeholder="Blog Title"
//               />

//               {/* Blog Content */}
//               <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
//                 Content
//               </label>
//               <textarea
//                 name="content"
//                 value={getBlogs.content}
//                 onChange={handleChange}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 placeholder="Blog Content"
//                 rows="10"
//               />

//               {/* Buttons */}
//               <div className="flex justify-between mt-6">
//                 <button
//                   onClick={handleUpdate}
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                   type="button"
//                 >
//                   Update
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                   type="button"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <p style={{ color: mode === 'dark' ? 'white' : 'black' }}>No post found.</p>
//           )}
//         </div>
//       </section>
//     </Layout>
//   );
// }

// export default AdminBlog;

import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/data/myContext';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import axios from 'axios';

// Utility function to strip HTML tags
const stripHTML = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

function AdminBlog() {
  const context = useContext(myContext);
  const { mode } = context;
  const params = useParams();
  const navigate = useNavigate();  // Use navigate for redirection after delete

  // Extract postId from params
  const { id: postId } = params;

  // State management
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
      const response = await axios.put(
        `https://bloggist-backend.onrender.com/api/post/update_post/${postId}`, 
        getBlogs
      );
      alert('Blog updated successfully');
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
          {getBlogs ? (
            <div>
              {/* Thumbnail - Display as image */}
              {getBlogs.thumbnail && (
                <img
                  alt="content"
                  className="mb-3 rounded-lg h-full w-full"
                  src={'https://bloggist-backend.onrender.com/' + getBlogs.thumbnail}
                />
              )}

              {/* Title */}
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={getBlogs.title}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Blog Title"
              />

              {/* Category */}
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={getBlogs.category}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Blog Category"
              />

              {/* Blog Content */}
              <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
                Content
              </label>
              <textarea
                name="content"
                value={getBlogs.content}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Blog Content"
                rows="10"
              />

              {/* Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={handleUpdate}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Delete
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

