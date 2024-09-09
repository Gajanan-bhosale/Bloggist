
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const URL = 'https://bloggist-api.vercel.app/login'

const SignIn = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value

    setUser({
      ...user,
      [name]: value,
    })
  }
  
  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log("login Form", response);

      if (response.ok) {
        alert("Login Successful")
        setUser({ email: "", password: ""});
      }else{
        alert("invalid credential")
        console.log("invalid credentials");

      }
    } catch (error) {
      console.log(error);
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
              type="password"
              value={user.password}
              onChange={handleInput}
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
