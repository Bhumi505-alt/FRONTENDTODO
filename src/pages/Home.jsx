import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Context } from "../main";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

export default function Home() {
  const { isAuthenticated, loader, setloader } = useContext(Context);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchTasks = async () => {
    setloader(true);
    try {
      const { data } = await axiosInstance.get("/tasks/my", {
        withCredentials: true,
      });
      setTasks(data.tasks);
    } catch (error) {
      toast.error("Failed to load tasks.");
    }
    setloader(false);
  };

  useEffect(() => {
    if (isAuthenticated) fetchTasks();
  }, [isAuthenticated]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setloader(true);
    try {
      if (updatingId) {
        const { data } = await axiosInstance.put(
          `/tasks/${updatingId}`,
          { title, description },
          { withCredentials: true }
        );
        toast.success(data.message);
        setUpdatingId(null);
      } else {
        const { data } = await axiosInstance.post(
          "/tasks/new",
          { title, description },
          { withCredentials: true }
        );
        toast.success(data.message);
      }
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Task operation failed.");
    }
    setloader(false);
  };

  const deleteHandler = async (id) => {
    setloader(true);
    try {
      const { data } = await axiosInstance.delete(
        `/tasks/${id}`,
        { withCredentials: true }
      );
      toast.success(data.message);
      fetchTasks();
    } catch (error) {
      toast.error("Delete failed.");
    }
    setloader(false);
  };

  const editHandler = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setUpdatingId(task._id);
  };

  const toggleComplete = async (task) => {
    setloader(true);
    try {
      const { data } = await axiosInstance.put(
        `/tasks/${task._id}`,
        { completed: !task.completed },
        { withCredentials: true }
      );
      toast.success("Task updated");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to update status.");
    }
    setloader(false);
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-12 py-8 sm:py-10 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 text-gray-800">
      {/* FORM */}
      <motion.div
        className="max-w-3xl mx-auto bg-white/40 backdrop-blur-lg p-6 sm:p-8 rounded-3xl shadow-xl border border-white/30"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 text-gray-800">
          {updatingId ? "Update Task" : "Create a Task"}
        </h1>

        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="text"
            required
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
            rows={3}
          ></textarea>
          <button
            type="submit"
            disabled={loader}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            {updatingId ? "Update Task" : "Create Task"}
          </button>
        </form>
      </motion.div>

      {/* TASKS */}
      <div className="max-w-3xl mx-auto mt-8 sm:mt-10 space-y-4">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-700">No tasks found.</p>
        ) : (
          tasks.map((task) => (
            <motion.div
              key={task._id}
              className={`bg-white/70 backdrop-blur-md p-5 rounded-2xl shadow-md border border-white/20 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 ${
                task.completed ? "opacity-60" : ""
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* TEXT */}
              <div className="flex-1">
                <h3
                  className={`text-lg sm:text-xl font-semibold ${
                    task.completed ? "line-through text-gray-500" : "text-gray-800"
                  }`}
                >
                  {task.title}
                </h3>
                <p
                  className={`text-sm sm:text-base ${
                    task.completed ? "line-through text-gray-400" : "text-gray-600"
                  }`}
                >
                  {task.description}
                </p>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={() => toggleComplete(task)}
                  className={`px-4 py-1 ${
                    task.completed
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-400 hover:bg-gray-500"
                  } rounded-lg text-white font-medium text-sm sm:text-base`}
                >
                  {task.completed ? "Completed ✔" : "Mark Complete"}
                </button>
                <button
                  onClick={() => editHandler(task)}
                  className="px-4 py-1 bg-yellow-400 hover:bg-yellow-500 rounded-lg text-white font-medium text-sm sm:text-base"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteHandler(task._id)}
                  className="px-4 py-1 bg-red-500 hover:bg-red-600 rounded-lg text-white font-medium text-sm sm:text-base"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
