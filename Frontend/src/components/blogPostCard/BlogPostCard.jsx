import { Button } from '@material-tailwind/react';
import React, { useContext, useState } from 'react';
import myContext from '../../context/data/myContext';
import { useNavigate } from 'react-router-dom';

function BlogPostCard() {
  const { mode, getAllBlog } = useContext(myContext);
  const navigate = useNavigate();
  
  // State to manage visible blogs
  const [visibleBlogs, setVisibleBlogs] = useState(10);
  
  // Function to load more blogs
  const loadMoreBlogs = () => {
    setVisibleBlogs(getAllBlog.length); // Display all blogs after clicking "See More"
  };

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto max-w-7xl">
          <div className="flex flex-wrap justify-center -m-4 mb-5">
            {getAllBlog.length > 0
              ? getAllBlog.slice(0, visibleBlogs).map((item) => {
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
                            {new Date(date).toLocaleDateString()} {/* Formatting date */}
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

          {visibleBlogs < getAllBlog.length && (
            <div className="flex justify-center my-5">
              <Button
                onClick={loadMoreBlogs} // Load more blogs when button is clicked
                className="transition duration-300 ease-in-out transform hover:scale-105"
                style={{
                  background: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
                  color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'rgb(226, 232, 240)',
                }}
              >
                See More
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default BlogPostCard;
