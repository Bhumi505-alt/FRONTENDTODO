import React, { useContext } from 'react';
import { Context } from '../main';
import { motion } from 'framer-motion';

const Profile = () => {
  const { isAuthenticated, loader, user } = useContext(Context);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 relative overflow-hidden">

      
      <div className="absolute w-[700px] h-[700px] bg-pink-400 opacity-30 rounded-full blur-[200px] -top-40 -right-40 z-0" />

      <motion.div
        className="relative z-10 bg-white/30 backdrop-blur-md p-10 rounded-3xl shadow-xl w-full max-w-lg border border-white/40"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Your <span className="text-blue-600">Profile</span>
        </h2>

        {!user ? (
          <p className="text-center text-gray-600 mt-4">Loading user data...</p>
        ) : (
          <div className="flex flex-col gap-6 mt-6 text-gray-800">
            <div className="flex items-center gap-4">
              <img
                src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user.name || 'User'}`}
                alt="avatar"
                className="w-16 h-16 rounded-full border border-blue-300 shadow"
              />
              <div>
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-4">
              <p>
                <span className="font-semibold">Joined On:</span>{' '}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">User ID:</span> {user._id}
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
