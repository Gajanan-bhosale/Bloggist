import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name : "",
    email: "",
    password: ""
  })

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ... user,
      [name]: value,
    })
  }

  const handleSignUp = async(e) => {
    e.preventDefault();
    
    // axios.post('https://bloggist-api.vercel.app/register', {name, email, password})
    //   .then(result => {console.log(result)
    //     navigate('/SignIn')
    //   })
    //   .catch(err=> console.log(err))
    try {
      const response = await fetch('https://bloggist-api.vercel.app/api/auth/register', {
        method: 'POST',
        headers : {
          'Content-Type' : 'application/json',
          },
          body: JSON.stringify(user),
      })

      if(response.ok) {
        setUser({ name: "", email: "", password: ""});
        navigate("/SignIn")
      }
      console.log("Registration", response);
    
    } catch (error) {
      console.log("register", error)
    }
  }
  
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-500">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Sign Up</h2>
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              id="name"
              type="text"
              name= "name"
              value={user.name}
              onChange={handleInput}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              id="email"
              type="email"
              name= "email"
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
              name= "password"
              value={user.password}
              onChange={handleInput}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            
            className="w-full px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
