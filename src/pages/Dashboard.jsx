
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Context } from "../main";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { isAuthenticated } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/tasks/dashboard/weekly", {
          withCredentials: true,
        });
        setSummary(response.data.summary);
      } catch (error) {
        toast.error("Failed to load dashboard data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchWeeklyData();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center h-[60vh]"
      >
        <p className="text-lg font-medium text-gray-600">
          Please login to view your dashboard.
        </p>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    className="min-h-screen px-4 md:px-12 py-10 bg-gradient-to-br from-purple-200 via-indigo-100 to-blue-200 text-gray-800"


    >
      <h1 className="text-3xl font-bold mb-10 text-center text-blue-700">
        📊 Weekly Task Summary
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(summary).map(([day, data], index) => (
          <motion.div
            key={day}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-gray-100 border border-gray-300 rounded-2xl p-6 shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-700">{day}</h2>
            <p className="text-base mb-2">
              <span className="font-medium text-gray-600">Total Tasks:</span>{" "}
              <span className="font-bold text-blue-700">{data.total}</span>
            </p>
            <p className="text-base">
              <span className="font-medium text-gray-600">Completed:</span>{" "}
              <span className="font-bold text-green-600">{data.completed}</span>
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Dashboard;
