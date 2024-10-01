import { Button } from '@material-tailwind/react';
import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';

function Comment({ addComment, commentText, setCommentText, allComment, fullName, setFullName }) {
  const context = useContext(myContext);
  const { mode } = context;

  return (
    <section className="py-8 lg:py-16">
      <div className="max-w-2xl mx-auto px-4">
        {/* Comment Form Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
            Leave a Comment
          </h2>
        </div>

        <form className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              onSubmit={addComment}
              style={{ background: mode === 'dark' ? '#353b48' : 'rgb(226, 232, 240)' }}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
              Full Name
            </label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              placeholder="Enter your name"
              className="w-full px-3 py-2 rounded-lg shadow-sm border border-gray-300 dark:bg-gray-700 dark:text-white focus:ring focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
              Comment
            </label>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={5}
              placeholder="Write your comment here..."
              className="w-full px-3 py-2 rounded-lg shadow-sm border border-gray-300 dark:bg-gray-700 dark:text-white focus:ring focus:border-indigo-500"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full py-3 rounded-lg"
            style={{
              backgroundColor: mode === 'dark' ? '#E2E8F0' : '#1E293B',
              color: mode === 'dark' ? '#1E293B' : '#E2E8F0',
              fontWeight: 'bold',
            }}
          >
            Post Comment
          </Button>
        </form>

        {/* Comments Display Section */}
        <div className="space-y-6">
          {Array.isArray(allComment) && allComment.length > 0 ? (
            allComment.map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
              style={{ background: mode === 'dark' ? '#353b48' : 'rgb(226, 232, 240)' }}>
                <div className="flex items-center space-x-4 mb-2">
                  {/* <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={`https://i.pravatar.cc/150?u=${index}`} // Avatar placeholder
                    alt="Avatar"
                  /> */}
                  <div>
                    <p className="font-semibold" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                      {item.fullName}
                    </p>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                </div>
                <p className="text-md" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                  {item.commentText}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Comment;
