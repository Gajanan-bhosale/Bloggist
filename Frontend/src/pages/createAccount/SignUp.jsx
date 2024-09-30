// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../../store/auth';


// const SignUp = () => {
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     name : "",
//     email: "",
//     password: ""
//   })

//   const {storeTokenInLS} = useAuth();


//   const handleInput = (e) => {
//     let name = e.target.name;
//     let value = e.target.value;

//     setUser({
//       ... user,
//       [name]: value,
//     })
//   }

//   const handleSignUp = async(e) => {
//     e.preventDefault();
    
//     // axios.post('https://bloggist-api.vercel.app/register', {name, email, password})
//     //   .then(result => {console.log(result)
//     //     navigate('/SignIn')
//     //   })
//     //   .catch(err=> console.log(err))
//     try {
//       const response = await fetch(`https://bloggist-backend.onrender.com/api/auth/register`, {
//         method: 'POST',
//         headers : {
//           'Content-Type' : 'application/json',
//           },
//           body: JSON.stringify(user),
//       })

//       if(response.ok) {
//         const res_data = await response.json();
//         console.log("res from server", res_data)
//         // localStorage.setItem("token", res_data.token)
//         console.log('res from server')
//         storeTokenInLS(res_data.token)
//         setUser({ name: "", email: "", password: ""});
//         navigate("/SignIn")
//       }
//       console.log("Registration", response);
    
//     } catch (error) {
//       console.log("register", error)
//     }
//   }
  
  

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-orange-500">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-center text-gray-900">Sign Up</h2>
//         <form onSubmit={handleSignUp} className="space-y-6">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
//             <input
//               id="name"
//               type="text"
//               name= "name"
//               value={user.name}
//               onChange={handleInput}
//               required
//               className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//             />
//           </div>
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
//             <input
//               id="email"
//               type="email"
//               name= "email"
//               value={user.email}
//               onChange={handleInput}
//               required
//               className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
//             <input
//               id="password"
//               type="password"
//               name= "password"
//               value={user.password}
//               onChange={handleInput}
//               required
//               className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//             />
//           </div>
          
//           {error && <p className="text-sm text-red-500">{error}</p>}
//           <button
//             type="submit"
            
//             className="w-full px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Sign Up
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../store/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://bloggist-backend.onrender.com/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const res_data = await response.json();
        console.log("res from server", res_data);
        storeTokenInLS(res_data.token);
        setUser({ name: "", email: "", password: "" });
        navigate("/SignIn");
      } else {
        const errorData = await response.json();
        if (errorData.msg === "Email already exists") {
          toast.error("Email is already in use. Please use a different email.");
        } else {
          toast.error("Registration failed. Please try again.");
        }
      }
    } catch (error) {
      console.log("register error", error);
      toast.error("An error occurred. Please try again.");
    }
    finally {
      setLoading(false);  // Set loading to false when the request finishes
    }
  };

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
              name="name"
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
              type="password"
              name="password"
              value={user.password}
              onChange={handleInput}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
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
              'Sign Up'
            )}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SignUp;

