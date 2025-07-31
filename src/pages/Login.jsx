import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { Context } from "../main";
import toast from "react-hot-toast";
import axios from "axios";



export default function Login() {
  const [email, setEmail]= useState("")
        const [password, setPassword]= useState("")
        const {isAuthenticated , setIsAuthenticated, loader, setloader} = useContext(Context);
        const [error, setError] = useState(null);


const submitHandler = async (e) => {
  e.preventDefault();
  setloader(true);
  setError(null);
  try {
    const { data } = await axios.post(
      "http://localhost:4000/users/login",
      {
     
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
      toast.error("User does not exist Try signing up in.");
    } else {
      toast.error(error?.response?.data?.message || "Login failed. Please try again.");

    }
    console.error(error); // debugging ke liye
    setIsAuthenticated(false);
  }
};
if(isAuthenticated) return <Navigate to="/" />









  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-200 relative overflow-hidden">
      
      <div className="absolute w-[700px] h-[700px] bg-blue-400 opacity-30 rounded-full blur-[200px] -top-40 -left-40 z-0" />

      <motion.div
        className="relative z-10 bg-white/30 backdrop-blur-md p-10 rounded-3xl shadow-lg w-full max-w-md border border-white/40"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome back to <span className="text-blue-600">TA</span>•DA
        </h2>

        <form className="flex flex-col gap-4 " onSubmit={submitHandler}>
          <div>
            <label htmlFor="email" className="text-gray-700 font-medium">
              Email
            </label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)}
              type="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-gray-700 font-medium">
              Password
            </label>
             <input value={password} onChange={(e)=>setPassword(e.target.value)}
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <button disabled={loader}
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center text-gray-700 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up now
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
