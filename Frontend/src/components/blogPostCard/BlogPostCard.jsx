
import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/data/myContext';
import { useNavigate } from 'react-router-dom';

function BlogPostCard() {
  const { mode, getAllBlog } = useContext(myContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (getAllBlog.length > 0) {
      setLoading(false); 
    }
  }, [getAllBlog]);

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto max-w-7xl">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="loader">Loading...</div> 
            </div>
          ) : (
            <>
              <div className="flex flex-wrap justify-center -m-4 mb-5">
                {getAllBlog.length > 0
                  ? getAllBlog.map((item) => {
                      const { thumbnail, date, _id, title } = item;
                      return (
                        <div className="p-4 md:w-1/3" key={_id}>
                          <div
                            style={{
                              background: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white',
                              borderBottom: mode === 'dark' ? '4px solid rgb(226, 232, 240)' : '4px solid rgb(30, 41, 59)',
                            }}
                            className={`h-full shadow-lg transition-transform transform hover:-translate-y-1 cursor-pointer hover:shadow-2xl rounded-xl overflow-hidden duration-300`}
                            onClick={() => navigate(`/bloginfo/${_id}`)}
                          >
                            <img
                              className="w-full h-48 object-cover"
                              src={`https://bloggist-backend.onrender.com/${thumbnail}`}
                              alt="blog"
                            />
                            <div className="p-6">
                              <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                                style={{ color: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)' }}>
                                {new Date(date).toLocaleDateString()}
                              </h2>
                              <h1 className="title-font text-lg font-bold text-gray-900 mb-3"
                                style={{ color: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)' }}>
                                {title}
                              </h1>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : <h1 className="text-xl text-center text-gray-500">No Blogs Found</h1>
                }
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default BlogPostCard;
