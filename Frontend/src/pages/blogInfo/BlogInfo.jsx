import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/data/myContext';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import Layout from '../../components/layout/Layout';
import Comment from '../../components/comment/Comment';
import toast from 'react-hot-toast';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa'; // Import an arrow icon from react-icons

function BlogInfo() {
  const context = useContext(myContext);
  const { mode } = context;
  const { id: postId } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const [getBlogs, setGetBlogs] = useState(null);
  const [fullName, setFullName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [allComment, setAllComment] = useState([]);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`https://bloggist-backend.onrender.com/api/post/get_blog_post/${postId}`);
        setGetBlogs(response.data);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    if (postId) {
      fetchPostData();
    }
  }, [postId]);

  const addComment = async (e) => {
    e.preventDefault(); 

    const newComment = {
      fullName,
      commentText,
    };

    try {
      await axios.post(`https://bloggist-backend.onrender.com/api/post/add_comment/${postId}`, newComment);
      fetchComments();
      setCommentText('');
      setFullName('');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://bloggist-backend.onrender.com/api/post/get_comments/${postId}`);
      setAllComment(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  return (
    <Layout>
      <section className="rounded-lg h-full overflow-hidden max-w-4xl mx-auto px-4">
        <div className="py-6 lg:py-10">
          
          <button 
            onClick={() => navigate('/')} 
            className="text-lg font-bold flex items-center space-x-2 mb-4 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-600 transition-colors duration-300 shadow-lg"
          >
            <FaArrowLeft className="mr-2" /> 
            <span>Back to Home</span>
          </button>

          {getBlogs ? (
            <div className="space-y-6">
              <img
                alt="content"
                className="mb-3 rounded-lg h-auto w-full object-cover shadow-md"
                src={'https://bloggist-backend.onrender.com/' + getBlogs.thumbnail}
              />
              <div className="flex justify-between items-center mb-3">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold"
                  style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                  {getBlogs.title}
                </h1>
                <p className="text-sm md:text-base lg:text-lg"
                  style={{ color: mode === 'dark' ? 'gray-300' : 'gray-600' }}>
                  {new Date(getBlogs.date).toLocaleDateString()}
                </p>
              </div>
              <div className={`border-b mb-5 ${mode === 'dark' ? 'border-gray-600' : 'border-gray-400'}`} />
              <div className="prose lg:prose-lg max-w-none text-justify"
                style={{ color: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)' }}
                dangerouslySetInnerHTML={{ __html: getBlogs.content }} />
            </div>
          ) : (
            <p className="text-xl text-center" style={{ color: mode === 'dark' ? 'white' : 'black' }}>No post found.</p>
          )}

          {/* Comment Section */}
          <div className="mt-10">
            <Comment
              addComment={addComment}
              commentText={commentText}
              setCommentText={setCommentText}
              allComment={allComment}
              fullName={fullName}
              setFullName={setFullName}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default BlogInfo;
