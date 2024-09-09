import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-tailwind/react';

export default function Nav() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  return (
    <Navbar className="sticky inset-0 z-20 h-max max-w-full border-none rounded-none py-2 px-4 lg:px-8 lg:py-2">
      <div className="flex items-center justify-between text-blue-gray-900">
        {/* Other Navbar Items */}
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/dashboard">
                <Avatar
                  src={user.avatar || 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png'}
                  alt="avatar"
                  className="w-10 h-10"
                />
              </Link>
            </>
          ) : (
            <Link to="/SignIn">Login</Link>
          )}
        </div>
      </div>
    </Navbar>
  );
}
