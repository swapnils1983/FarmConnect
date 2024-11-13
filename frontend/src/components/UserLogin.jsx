import React, { useState } from 'react';
import Input from './Input';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';

function UserLogin() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setError("");
    try {
      const res = await fetch("http://localhost:3000/api/auth/user/login", {
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
        if (isAuthenticated) {
          navigate('/');
        }
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
      <div className="absolute inset-0 flex items-center justify-center opacity-20 z-0">
        <div className="bg-green-500 rounded-full w-80 h-80 blur-3xl absolute -top-16 -left-16"></div>
        <div className="bg-yellow-400 rounded-full w-64 h-64 blur-3xl absolute top-20 right-20"></div>
      </div>

      <div className="relative bg-white p-10 rounded-xl shadow-lg w-full max-w-md z-10 border-2 border-green-600">
        <h2 className="text-2xl font-semibold mb-6 text-center text-green-800">Log In As Buyer</h2>
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
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
          <button
            type="submit"
            className="w-full px-6 py-3 rounded-lg bg-green-700 text-white font-semibold hover:bg-green-800 transition duration-200"
          >
            Log In
          </button>
        </form>
        {error && <p className="mt-4 text-center text-red-600">{error}</p>}
        <p className="mt-6 text-center text-gray-700">
          Don't have an account?{' '}
          <Link
            to="/user/register"
            className="font-semibold text-green-700 hover:text-green-600 transition duration-200"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default UserLogin;
