// frontend/src/components/NotesSection.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import LoginPopup from './LoginPopup'; // Import the LoginPopup

const NotesSection = ({ selectedSemester, selectedSubject }) => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [protectedContent, setProtectedContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    if (selectedSemester && selectedSubject) {
      fetchNotes();
      if (user) {
        fetchProtectedNotes();
      } else {
        setProtectedContent([]); // Clear protected content if logged out
      }
    } else {
      setNotes([]);
      setProtectedContent([]);
    }
  }, [selectedSemester, selectedSubject, user]); // Re-fetch when user logs in/out

  const fetchNotes = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get(`/notes/${selectedSemester}/${selectedSubject}`);
      // Filter out 'Important Questions' and 'Must-Do PYQs' as they'll be in protectedContent
      const generalNotes = response.data.filter(note =>
        note.category !== 'Important Questions' && note.category !== 'Must-Do PYQs'
      );
      setNotes(generalNotes);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch general notes.');
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchProtectedNotes = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get(`/notes/protected/${selectedSemester}/${selectedSubject}`);
      setProtectedContent(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch protected content.');
      setProtectedContent([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (fileId) => {
    try {
      // Direct download - backend handles file path
      const response = await api.get(`/notes/download/${fileId}`, {
        responseType: 'blob', // Important for downloading files
      });

      // Create a URL for the blob and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      // Get filename from response headers or default
      const contentDisposition = response.headers['content-disposition'];
      let filename = 'download.pdf';
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1];
        }
      }
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
      alert('Failed to download file.');
    }
  };

  const renderContentList = (items, title, isProtected = false) => (
    <div className="mb-6">
      <h3 className="text-xl font-bold mb-3 text-purple-700">{title}</h3>
      {items.length === 0 ? (
        <p className="text-gray-600">No {title.toLowerCase()} available.</p>
      ) : (
        <ul className="list-disc pl-5 space-y-2">
          {items.map((item) => (
            <li key={item._id} className="flex justify-between items-center text-gray-800">
              <span>{item.title} ({item.fileType.toUpperCase()})</span>
              <button
                onClick={() => handleDownload(item._id)}
                className="ml-4 bg-indigo-500 hover:bg-indigo-600 text-white py-1 px-3 rounded-md text-sm transition duration-200"
              >
                Download
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center text-indigo-700">Notes & Important Questions</h2>

      {loading && <p className="text-center text-blue-600">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {renderContentList(notes, 'General Notes')}

      {!user && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mt-6" role="alert">
          <p className="font-bold">Login Required!</p>
          <p>Login to view Important Questions and Must-Do PYQs.</p>
          <button
            onClick={() => setShowLoginPopup(true)}
            className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Login / Register
          </button>
        </div>
      )}

      {user && protectedContent.length > 0 && (
        <>
          {renderContentList(
            protectedContent.filter(item => item.category === 'Important Questions'),
            'Important Questions',
            true
          )}
          {renderContentList(
            protectedContent.filter(item => item.category === 'Must-Do PYQs'),
            'Must-Do PYQs',
            true
          )}
        </>
      )}

      <LoginPopup isOpen={showLoginPopup} onClose={() => setShowLoginPopup(false)} />
    </div>
  );
};

export default NotesSection;