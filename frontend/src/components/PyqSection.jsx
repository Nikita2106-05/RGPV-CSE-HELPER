// frontend/src/components/PyqSection.jsx
import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const PyqSection = ({ selectedSemester, selectedSubject }) => {
  const [pyqs, setPyqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedSemester && selectedSubject) {
      fetchPyqs();
    } else {
      setPyqs([]);
    }
  }, [selectedSemester, selectedSubject]);

  const fetchPyqs = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get(`/pyq/${selectedSemester}/${selectedSubject}`);
      setPyqs(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch PYQs.');
      setPyqs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (fileId) => {
    try {
      const response = await api.get(`/pyq/download/${fileId}`, {
        responseType: 'blob', // Important for downloading files
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
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

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center text-indigo-700">Previous Year Questions (PYQs)</h2>

      {loading && <p className="text-center text-blue-600">Loading PYQs...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {pyqs.length === 0 && !loading && !error ? (
        <p className="text-center text-gray-600">No PYQs available for this selection.</p>
      ) : (
        <ul className="list-disc pl-5 space-y-2">
          {pyqs.map((pyq) => (
            <li key={pyq._id} className="flex justify-between items-center text-gray-800">
              <span>{pyq.title} ({pyq.year}) ({pyq.fileType.toUpperCase()})</span>
              <button
                onClick={() => handleDownload(pyq._id)}
                className="ml-4 bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md text-sm transition duration-200"
              >
                Download
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PyqSection;