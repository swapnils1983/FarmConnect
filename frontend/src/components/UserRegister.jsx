import React, { useState } from 'react';
import Input from './Input';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';

function UserRegister() {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signup = async (data) => {
    setError("");
    try {
      const res = await fetch("http://localhost:3000/api/auth/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          contact: data.contact,
        }),
      });

      const json = await res.json();

      if (res.status === 201) {
        navigate("/user/login");
        alert("User registered successfully!");
      } else {
        console.log(json)
        alert(json.error);
      }
    } catch (error) {
      setError("An error occurred during registration. Please try again.");
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-200 via-yellow-100 to-green-400 p-6">
      <div className="absolute inset-0 flex items-center justify-center opacity-25">
        <div className="bg-green-400 rounded-full w-80 h-80 blur-3xl absolute -top-10 -left-10"></div>
        <div className="bg-yellow-300 rounded-full w-64 h-64 blur-3xl absolute top-20 right-10"></div>
      </div>

      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md z-10 border-2 border-green-600">
        <h2 className="text-2xl font-semibold mb-6 text-center text-green-800">Buyers's Registration</h2>
        <p className="text-sm text-gray-700 mb-6 text-center">
          Join the community to buy and sell crops directly.
        </p>
        {error && <p className="text-red-600 mt-2 text-center">{error}</p>}

        <form onSubmit={handleSubmit(signup)} className="space-y-6">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            {...register("name", { required: true })}
          />

          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /.+@.+\..+/.test(value) || "Email address must be valid",
              },
            })}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />

          <Input
            label="Contact"
            type="number"
            placeholder="Enter your contact number"
            {...register("contact", { required: true })}
          />

          <button className="w-full py-3 mt-4 bg-green-700 text-white rounded-lg shadow-md hover:bg-green-800 transition duration-300">
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/user/login" className="font-semibold text-green-700 hover:text-green-500">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default UserRegister;
