import React, { useEffect, useState } from 'react';
import Input from './Input';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';

function SellerLogin() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.status);

  useEffect(()=>{
    if(isAuthenticated){
      navigate('/');
    }
  },[isAuthenticated])

  const handleLogin = async (data) => {
    setError("");
    try {
      const res = await fetch("http://localhost:3000/api/auth/seller/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      const json = await res.json();
      console.log(json.message);
      if (res.status === 200) {
        dispatch(login(json.user));
      } else {
        setError(json.message);
      }
      alert(json.message);
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-200 via-yellow-100 to-green-400 p-6">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md border-2 border-green-400">
        <h2 className="text-2xl font-semibold mb-6 text-center text-green-800">Log In As Farmer</h2>
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /.+@.+\..+/.test(value) ||
                  "Email address must be valid",
              },
            })}
            className="border-2 border-green-300 focus:border-green-500"
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
            className="border-2 border-green-300 focus:border-green-500"
          />

          <button type="submit" className="w-full px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium">
            Log In
          </button>
        </form>
        {error && <p className="mt-3 text-center text-red-600 font-semibold">{error}</p>}
        <p className="mt-5 text-center text-sm text-gray-700">
          Don't have an account?{' '}
          <Link to="/seller/register" className="font-medium text-green-700 hover:text-green-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SellerLogin;






// import React, { useState } from 'react'
// import Input from './Input';
// import { Link } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
// import { login } from '../redux/authSlice';

// function SellerLogin() {
//   const { register, handleSubmit } = useForm();
//   const dispatch = useDispatch();
//   const [error, setError] = useState("");

//   const handleLogin = async (data) => {
//     setError("");
//     try {
//       const res = await fetch("http://localhost:3000/api/auth/seller/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: data.email,
//           password: data.password,
//         }),
//       });
//       const json = await res.json();
//       console.log(json.message);
//       if (res.status === 200) {
//         dispatch(login(json.user));
//       } else {
//         setError(json.message);
//       }
//       alert(json.message);
//     } catch (error) {
//       console.error("Login error:", error);
//       setError("An error occurred during login. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="bg-gray-100 p-8 rounded-lg shadow-md w-full max-w-md">
//           <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Log In As Seller</h2>
//           <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
//             <Input
//               label="Email"
//               placeholder="Enter your email"
//               type="email"
//               {...register("email", {
//                 required: true,
//                 validate: {
//                   matchPattern: (value) =>
//                     /.+@.+\..+/.test(value) ||
//                     "Email address must be valid",
//                 },
//               })}
//             />
//             <Input
//               label="Password"
//               type="password"
//               placeholder="Enter your password"
//               {...register("password", { required: true })}
//             />
            
//             <button type="submit" className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white">
//               Log In
//             </button>
//           </form>
//           {error && <p className="mt-2 text-center text-red-600">{error}</p>}
//           <p className="mt-4 text-center text-sm text-gray-600">
//             Don't have an account?{' '}
//             <Link to="/seller/register" className="font-medium text-blue-600 hover:text-blue-500">
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SellerLogin;
