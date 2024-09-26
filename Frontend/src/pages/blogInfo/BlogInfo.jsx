import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/data/myContext';
import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Comment from '../../components/comment/Comment';
import toast from 'react-hot-toast';
import axios from 'axios';

function BlogInfo() {
  const context = useContext(myContext);
  const { mode } = context;
  const { id: postId } = useParams();

  const [getBlogs, setGetBlogs] = useState(null);
  const [fullName, setFullName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [allComment, setAllComment] = useState([]);

  // Fetch specific blog post data
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`https://bloggist-api.vercel.app/api/post/get_blog_post/${postId}`);
        setGetBlogs(response.data);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    if (postId) {
      fetchPostData();
    }
  }, [postId]);

  // Comment submission
  const addComment = (e) => {
    e.preventDefault(); // Prevent default form submission
    const newComment = {
      fullName,
      commentText,
      date: new Date().toLocaleString(), // Format date as needed
    };

    // Update the state to include the new comment
    setAllComment((prevComments) => [...prevComments, newComment]);

    // Clear the input fields after submitting
    setCommentText('');
    setFullName('');
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postId]);

  return (
    <Layout>
      <section className="rounded-lg h-full overflow-hidden max-w-4xl mx-auto px-4">
        <div className="py-6 lg:py-10">
          {getBlogs ? (
            <div className="space-y-6">
              <img
                alt="content"
                className="mb-3 rounded-lg h-auto w-full object-cover shadow-md"
                src={'https://bloggist-api.vercel.app/' + getBlogs.thumbnail}
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
