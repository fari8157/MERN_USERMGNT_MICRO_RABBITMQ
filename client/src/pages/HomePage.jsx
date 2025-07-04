import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Welcome {user?.name || 'Guest'} 👋
      </h1>
      <p className="text-gray-700 text-lg mb-8">
        {user ? 'Explore your profile and settings.' : 'Please login or register to get started.'}
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        {!user && (
          <>
            <Link
              to="/login"
              className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Register
            </Link>
          </>
        )}

        {user && (
  <>
    {user.role === 'user' && (
      <Link
        to="/profile"
        className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to Profile
      </Link>
    )}
    {user.role === 'admin' && (
      <Link
        to="/admin/dashboard"
        className="px-5 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Admin Dashboard
      </Link>
    )}
  </>
)}

      </div>
    </div>
  );
};

export default HomePage;
