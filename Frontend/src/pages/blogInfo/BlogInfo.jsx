import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/data/myContext';
import { useParams, useNavigate } from 'react-router';
import { Timestamp, addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, updateDoc, deleteDoc } from 'firebase/firestore';
import { fireDb } from '../../firebase/FirebaseConfig';
import Loader from '../../components/loader/Loader';
import Layout from '../../components/layout/Layout';
import Comment from '../../components/comment/Comment';
import toast from 'react-hot-toast';

function BlogInfo() {
  const context = useContext(myContext);
  const { mode, loading, setloading } = context;
  const params = useParams();
  const navigate = useNavigate();

  const [getBlogs, setGetBlogs] = useState();
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');
  const [fullName, setFullName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [allComment, setAllComment] = useState([]);

  const getAllBlogs = async () => {
    setloading(true);
    try {
      const productTemp = await getDoc(doc(fireDb, "blogPost", params.id));
      if (productTemp.exists()) {
        setGetBlogs(productTemp.data());
        setUpdatedTitle(productTemp.data().blogs.title);
        setUpdatedContent(productTemp.data().blogs.content);
      } else {
        console.log("Document does not exist");
      }
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  const createMarkup = (c) => {
    return { __html: c };
  };

  const addComment = async () => {
    const commentRef = collection(fireDb, "blogPost/" + `${params.id}/` + "comment");
    try {
      await addDoc(commentRef, {
        fullName,
        commentText,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
      toast.success('Comment added successfully');
      setFullName("");
      setCommentText("");
    } catch (error) {
      console.log(error);
    }
  };

  const getcomment = async () => {
    try {
      const q = query(collection(fireDb, "blogPost/" + `${params.id}/` + "comment/"), orderBy('time'));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setAllComment(productsArray);
      });
      return () => data();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
    getcomment();
    window.scrollTo(0, 0);
  }, []);

  const updateBlog = async () => {
    const blogRef = doc(fireDb, "blogPost", params.id);
    try {
      await updateDoc(blogRef, {
        title: updatedTitle,
        content: updatedContent,
      });
      toast.success('Blog updated successfully');
      setIsUpdating(false);
      getAllBlogs();
    } catch (error) {
      console.log(error);
      toast.error('Failed to update the blog');
    }
  };

  const deleteBlog = async () => {
    const blogRef = doc(fireDb, "blogPost", params.id);
    try {
      await deleteDoc(blogRef);
      toast.success('Blog deleted successfully');
      navigate('/'); // Redirect after deletion
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete the blog');
    }
  };

  return (
    <Layout>
      <section className="rounded-lg h-full overflow-hidden max-w-4xl mx-auto px-4">
        <div className="py-4 lg:py-8">
          {loading
            ? <Loader />
            : <div>
                <img alt="content" className="mb-3 rounded-lg h-full w-full" src={getBlogs?.thumbnail} />
                <div className="flex justify-between items-center mb-3">
                  <h1 style={{ color: mode === 'dark' ? 'white' : 'black' }} className='text-xl md:text-2xl lg:text-2xl font-semibold'>
                    {getBlogs?.blogs?.title}
                  </h1>
                  <p style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                    {getBlogs?.date}
                  </p>
                </div>
                <div className={`border-b mb-5 ${mode === 'dark' ? 'border-gray-600' : 'border-gray-400'}`} />
                <div className="content">
                  <div
                    className={`[&> h1]:text-[32px] [&>h1]:font-bold  [&>h1]:mb-2.5
                    ${mode === 'dark' ? '[&>h1]:text-[#ff4d4d]' : '[&>h1]:text-black'}
                    [&>h2]:text-[24px] [&>h2]:font-bold [&>h2]:mb-2.5
                    ${mode === 'dark' ? '[&>h2]:text-white' : '[&>h2]:text-black'}
                    [&>h3]:text-[18.72] [&>h3]:font-bold [&>h3]:mb-2.5
                    ${mode === 'dark' ? '[&>h3]:text-white' : '[&>h3]:text-black'}
                    [&>h4]:text-[16px] [&>h4]:font-bold [&>h4]:mb-2.5
                    ${mode === 'dark' ? '[&>h4]:text-white' : '[&>h4]:text-black'}
                    [&>h5]:text-[13.28px] [&>h5]:font-bold [&>h5]:mb-2.5
                    ${mode === 'dark' ? '[&>h5]:text-white' : '[&>h5]:text-black'}
                    [&>h6]:text-[10px] [&>h6]:font-bold [&>h6]:mb-2.5
                    ${mode === 'dark' ? '[&>h6]:text-white' : '[&>h6]:text-black'}
                    [&>p]:text-[16px] [&>p]:mb-1.5
                    ${mode === 'dark' ? '[&>p]:text-[#7efff5]' : '[&>p]:text-black'}
                    [&>ul]:list-disc [&>ul]:mb-2
                    ${mode === 'dark' ? '[&>ul]:text-white' : '[&>ul]:text-black'}
                    [&>ol]:list-decimal [&>li]:mb-10
                    ${mode === 'dark' ? '[&>ol]:text-white' : '[&>ol]:text-black'}
                    [&>li]:list-decimal [&>ol]:mb-2
                    ${mode === 'dark' ? '[&>ol]:text-white' : '[&>ol]:text-black'}
                    [&>img]:rounded-lg`}
                    dangerouslySetInnerHTML={createMarkup(getBlogs?.blogs?.content)}
                  />
                </div>
                <button
                  onClick={() => setIsUpdating(true)}
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                >
                  Update Blog
                </button>
                <button
                  onClick={deleteBlog}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete Blog
                </button>
                {isUpdating && (
                  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg">
                      <h2 className="text-xl font-semibold mb-2">Update Blog</h2>
                      <label className="block mb-2">
                        Title:
                        <input
                          type="text"
                          value={updatedTitle}
                          onChange={(e) => setUpdatedTitle(e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </label>
                      <label className="block mb-2">
                        Content:
                        <textarea
                          value={updatedContent}
                          onChange={(e) => setUpdatedContent(e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="5"
                        />
                      </label>
                      <button
                        onClick={updateBlog}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => setIsUpdating(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
          }
        </div>
        <Comment
          addComment={addComment}
          commentText={commentText}
          setcommentText={setCommentText}
          allComment={allComment}
          fullName={fullName}
          setFullName={setFullName}
        />
      </section>
    </Layout>
  );
}

export default BlogInfo;
