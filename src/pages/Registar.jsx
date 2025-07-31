import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios"
import toast from "react-hot-toast"
import { Context } from "../main";

export default function Register() {


  const [name, setName]= useState("")
    const [email, setEmail]= useState("")
      const [password, setPassword]= useState("")
        const {isAuthenticated , setIsAuthenticated, loader, setloader} = useContext(Context);
      


const submitHandler = async (e) => {
  e.preventDefault();
  setloader(true);
  try {
    const { data } = await axios.post(
      "http://localhost:4000/users/new",
      {
        name,
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    toast.success(data.message);
    setIsAuthenticated(true);
    setloader(false);
  } catch (error) {
    if (error.response && error.response.status === 409) {
      toast.error("User already exists! Try logging in.");
    } else {
      toast.error("Something went wrong. Please try again.");
    }
    console.error(error); // for debugging
    setIsAuthenticated(false);
  }
};


if(isAuthenticated) return <Navigate to="/" />










 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Create your account</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Join TA•DA and organize your day ✨</p>

        <form className="space-y-5" onSubmit={submitHandler}>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
            <input value={name} onChange={(e)=>setName(e.target.value)}
              type="text"
              required
              placeholder="John Doe"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)}
              type="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)}
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <button disabled={loader}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Log in now
          </Link>
        </p>
      </div>
    </div>
  );
}
