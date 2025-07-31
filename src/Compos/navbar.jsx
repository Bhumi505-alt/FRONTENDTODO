import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../main";
import axios from "axios";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Profile", path: "/profile" },
   { name: "Productivity", path: "/productivity " },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, loader, setloader, setUser } =
    useContext(Context);

  const handleLogout = async () => {
    try {
      setloader(true);
      await axios.get("http://localhost:4000/users/logout", {
        withCredentials: true,
      });

      setIsAuthenticated(false);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setloader(false);
    }
  };

  return (
    <nav className="bg-white shadow-lg rounded-b-3xl px-8 py-4 w-full border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
    
        <div className="text-3xl font-bold text-gray-800 tracking-tight">
          <span className="text-blue-600">DOKU</span>•DO
        </div>

       
        <ul className="flex gap-10 text-[17px] font-medium items-center">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`relative group transition-colors duration-300 ${
                  location.pathname === item.path
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-500"
                }`}
              >
                {item.name}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-blue-500 transition-all duration-300 scale-x-0 group-hover:scale-x-100 origin-left ${
                    location.pathname === item.path ? "scale-x-100" : ""
                  } w-full`}
                />
              </Link>
            </li>
          ))}

          <li>
            {isAuthenticated ? (
              <button
                disabled={loader}
                onClick={handleLogout}
                className="ml-4 px-5 py-[6px] text-white bg-red-600 hover:bg-red-700 rounded-full transition-all duration-300 shadow-sm"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="ml-4 px-5 py-[6px] text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all duration-300 shadow-sm"
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
