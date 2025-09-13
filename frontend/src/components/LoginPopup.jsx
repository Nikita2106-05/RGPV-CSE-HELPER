// frontend/src/components/LoginPopup.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginPopup = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState('');
  const { login, register } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      if (isRegister) {
        await register(email, password);
        setMessage('Registration successful! You are now logged in.');
      } else {
        await login(email, password);
        setMessage('Login successful!');
      }
      onClose(); // Close popup on success
      setEmail('');
      setPassword('');
    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          {isRegister ? 'Register' : 'Login'}
        </h2>
        {message && (
          <p className={`mb-4 text-center ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
          >
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>
        <div className="mt-4 text-center text-gray-600">
          {isRegister ? (
            <span>
              Already have an account?{' '}
              <button onClick={() => setIsRegister(false)} className="text-indigo-600 hover:underline">
                Login
              </button>
            </span>
          ) : (
            <span>
              Don't have an account?{' '}
              <button onClick={() => setIsRegister(true)} className="text-indigo-600 hover:underline">
                Register
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;