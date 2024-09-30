import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../store/auth';
import { toast } from 'react-toastify';  // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css';  // Import toast styles

const SignIn = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  // Loading state
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading to true when the request starts
    setError('');  // Reset error before a new request

    try {
      const response = await fetch("https://bloggist-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const responseData = await response.json();
        storeTokenInLS(responseData.token);
        setUser({ email: "", password: "" });
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        setError('Wrong password');  // Set error state
        toast.error('Wrong password!');  // Show toast notification
      }
    } catch (error) {
      console.log(error);
      setError('Something went wrong, please try again.');
    } finally {
      setLoading(false);  
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-600">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Sign In</h2>
        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              id="email"
              type="email"
              name="email"
              value={user.email}
              onChange={handleInput}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              value={user.password}
              onChange={handleInput}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          
          {/* Button with loading state */}
          <button
            type="submit"
            className={`w-full px-4 py-2 text-white rounded-md 
              ${loading ? 'bg-gray-500' : 'bg-orange-500 hover:bg-orange-600'} 
              focus:outline-none focus:ring-2 focus:ring-orange-500`}
            disabled={loading}  // Disable button during loading
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0"></path>
                </svg>
                Processing...
              </div>
            ) : (
              'Sign In'
            )}
          </button>

          <p className="text-center text-sm text-gray-600">
            Not registered?{' '}
            <button
              onClick={() => navigate('/SignUp')}
              className="text-blue-600 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
