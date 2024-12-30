import React, { useState } from 'react';
import Input from './Input';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';

function SellerRegister() {
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signup = async (data) => {
        setError("");
        try {
            const res = await fetch("http://localhost:3000/api/auth/seller/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    contact: data.contact,
                    brandName: data.brandName,
                }),
            });

            const json = await res.json();

            console.log(json.error);

            if (res.status === 201) {
                navigate("/seller/login");
                alert("User registered successfully!");
            } else {
                alert(json.error);
            }
        } catch (error) {
            setError("An error occurred during registration. Please try again.");
            console.error("Signup error:", error);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-200 via-yellow-100 to-green-400 p-6">
            <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md border-2 border-green-400">
                <h2 className="text-2xl font-semibold mb-6 text-center text-green-800">Farmer's Registration</h2>
                {error && <p className="text-red-600 mt-3 text-center">{error}</p>}

                <form onSubmit={handleSubmit(signup)} className="space-y-5">
                    <Input
                        label="Full Name"
                        type="text"
                        placeholder="Enter your full name"
                        {...register("name", { required: true })}
                        className="border-2 border-green-300 focus:border-green-500"
                    />

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

                    <Input
                        label="Contact"
                        type="number"
                        placeholder="Enter your contact"
                        {...register("contact", { required: true })}
                        className="border-2 border-green-300 focus:border-green-500"
                    />

                    <Input
                        label="Brand Name"
                        type="text"
                        placeholder="Enter your brand name"
                        {...register("brandName", { required: true })}
                        className="border-2 border-green-300 focus:border-green-500"
                    />

                    <button type="submit" className="w-full px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium">
                        Sign Up
                    </button>
                </form>
                
                <p className="mt-4 text-center text-sm text-gray-700">
                    Already have an account?{' '}
                    <Link to="/seller/login" className="font-medium text-green-700 hover:text-green-500">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default SellerRegister;





// import React, { useState } from 'react';
// import Input from './Input';
// import { Link } from 'react-router-dom';
// import Select from './Select';
// import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
// import { login } from '../redux/authSlice';

// function SellerRegister() {
//     const [error,setError] = useState("")
//     const {register,handleSubmit} = useForm();
//     const dispatch = useDispatch();
  
//     const signup = async (data) => {
//       setError("");  
//       try {
//         const res = await fetch("http://localhost:3000/api/auth/seller/register", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             name: data.name,
//             email: data.email,
//             password: data.password,
//             contact: data.contact,
//             brandName: data.brandName ,
//           }),
//         });
    
//         const json = await res.json();  
    
//         console.log(json.message); 
    
//         if (res.status === 201) {
//           dispatch(login(json.user));
//           alert("User registered successfully!");
//         } else {
//           alert(json.message);
//         }
//       } catch (error) {
//         setError("An error occurred during registration. Please try again.");
//         console.error("Signup error:", error);
//       }
//     };
    
//       return (
//           <div className="min-h-screen flex items-center justify-center ">
//             <div className="bg-gray-100 p-8 rounded-lg shadow-md w-full max-w-md">
//               <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
//               {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
  
//               <form onSubmit={handleSubmit(signup)} className="space-y-4">
//               <Input
//               label="Full Name"
//               type="text"
//               placeholder="Enter your full name"
//               {...register("name",{required:true})}
//               />
  
//               <Input
//                 label="Email"
//                 plaaceholder="Enter your email"
//                 type="email"
//                 {...register("email", {
//                   required: true,
//                   validate: {
//                     matchPattern: (value) =>
//                       /.+@.+\..+/.test(value) ||
//                       "Email address must be valid address",
//                   },
//                 })}
//               />
  
//               <Input
//               label="Password"
//               type="password"
//               placeholder="Enter your password"
//               {...register("password",{required:true})}
//               />
  
//             <Input
//               label="Contact"
//               type="Number"
  
//               placeholder="Enter your Contact"
//               {...register("contact",{required:true})}
//               />
  
//                 <Input
//                 label="Brand Name"
//                 type="text"
//                 placeholder="Enter your brand name"
//                 {...register("brandName",{required:true})}
//                 />
            
//                 <button  className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white">
//                   Sign Up
//                 </button>
//               </form>
//               <p className="mt-4 text-center text-sm text-gray-600">
//                 Already have an account?{' '}
//                 <Link href="#" className="font-medium text-blue-600 hover:text-blue-500">
//                   Log in
//                 </Link>
//               </p>
//             </div>
//           </div>
//         );
// }

// export default SellerRegister