import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  // const handleSignIn = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post('https://bloggist-api.vercel.app/login', { email, password });

  //     if (response.data.status === 'success') {
  //       navigate('/dashboard');
  //     } else if (response.data.status === 'incorrect_password') {
  //       setError('The password is incorrect.');
  //     } else if (response.data.status === 'user_not_found') {
  //       setError('User not found. Please create an account.');
  //     } else {
  //       setError('An unexpected error occurred.');
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setError('An error occurred while trying to sign in.');
  //   }
  // };

  const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

  const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "https://bloggist-api.vercel.app/login";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};
  


  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-600">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Sign In
          </button>
          <p className="text-center text-sm text-gray-600">
          If you are registered?{' '}
          <button
            onClick={() => navigate('/SignUp')}
            className="text-blue-600 hover:underline"
          >
            Sign In
          </button>
        </p>
        </form>
        {/* <p className="text-center text-sm text-gray-600">
          Not registered?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </button>
        </p> */}
      </div>
    </div>
  );
};

export default SignIn;
