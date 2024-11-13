import React, { useState } from 'react';
import Input from './Input';
import { Link } from 'react-router-dom';
import Select from './Select';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';

const Signup = () => {
  const options = ["Seller", "Buyer"];
  const [error,setError] = useState("")
  const {register,handleSubmit} = useForm();
  const [role,setRole] = useState("Seller")
  const dispatch = useDispatch();

  const signup = async (data) => {
    setError("");  
    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          contact: data.contact,
          role: data.role,
          brandName: data.role === 'seller' ? data.brandName : null,  // Only pass brandName if role is seller
        }),
      });
  
      const json = await res.json();  // Parse the JSON response
  
      console.log(json.message);  // Log server message
  
      if (res.status === 201) {
        // Dispatch user login if signup is successful
        dispatch(login(json.user));
        alert("User registered successfully!");
      } else {
        // Handle server-side validation or other error messages
        alert(json.message);
      }
    } catch (error) {
      // Handle network or other errors
      setError("An error occurred during registration. Please try again.");
      console.error("Signup error:", error);
    }
  };
  
    return (
        <div className="min-h-screen flex items-center justify-center ">
          <div className="bg-gray-100 p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form onSubmit={handleSubmit(signup)} className="space-y-4">
            <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            {...register("name",{required:true})}
            />

            <Input
              label="Email"
              plaaceholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /.+@.+\..+/.test(value) ||
                    "Email address must be valid address",
                },
              })}
            />

            <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password",{required:true})}
            />

          <Input
            label="Contact"
            type="Number"

            placeholder="Enter your Contact"
            {...register("contact",{required:true})}
            />

            <Select  label="Role" 
            options = {options} 
            {...register("role",{required:true})}
            onChange={(e)=>setRole(e.target.value)}
            className="block text-sm font-medium text-gray-700 mb-1" 
            />
            
            {role === "Seller" && (
              <Input
              label="Brand Name"
              type="text"
              placeholder="Enter your brand name"
              {...register("brandName",{required:true})}
              />
            )}
              <button  className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white">
                Sign Up
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Log in
              </Link>
            </p>
          </div>
        </div>
      );

};

export default Signup;
