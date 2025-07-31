import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registar from "./pages/Registar";
import Navbar from "./Compos/navbar";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { Context } from "./main";
import axios from "axios";
import Productivity from "./pages/Productivity";

function App() {
  const { setUser, setIsAuthenticated } = useContext(Context);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:4000/users/me", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
      })
      .finally(() => {
        setloading(false);
      });
  }, []);

  if (loading) return <h1 className="text-center mt-10">Loading...</h1>;

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registar />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
            <Route path="/productivity" element={<Productivity />} />
        </Routes>
        <Toaster />
      </Router>
    </div>
  );
}

export default App;
