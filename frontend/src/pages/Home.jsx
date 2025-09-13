// frontend/src/pages/Home.jsx
import React, { useState } from 'react';
import SemesterSelect from '../components/SemesterSelect';
import SubjectSelect from '../components/SubjectSelect';
import NotesSection from '../components/NotesSection';
import PyqSection from '../components/PyqSection';
import { useAuth } from '../context/AuthContext';
import LoginPopup from '../components/LoginPopup';

const Home = () => {
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [materialType, setMaterialType] = useState(null); // 'notes' or 'pyq'
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { user, logout } = useAuth();

  const handleSelectSemester = (semester) => {
    setSelectedSemester(semester);
    setSelectedSubject(null); // Reset subject when semester changes
    setMaterialType(null); // Reset material type
  };

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
    setMaterialType(null); // Reset material type
  };

  const handleSelectMaterialType = (type) => {
    if (type === 'notes' && !user) {
      setShowLoginPopup(true);
      return;
    }
    setMaterialType(type);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <header className="bg-indigo-800 text-white p-6 rounded-lg shadow-lg mb-8 text-center">
        <h1 className="text-4xl font-extrabold mb-2">RGPV CSE Helper</h1>
        <p className="text-xl font-light">Notes, PYQs & Important Questions</p>
        <div className="mt-4 flex justify-center items-center space-x-4">
          {user ? (
            <>
              <span className="text-lg">Welcome, {user.email}!</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowLoginPopup(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-200"
            >
              Login / Register
            </button>
          )}
        </div>
      </header>

      <SemesterSelect
        onSelectSemester={handleSelectSemester}
        selectedSemester={selectedSemester}
      />

      {selectedSemester && (
        <SubjectSelect
          onSelectSubject={handleSelectSubject}
          selectedSubject={selectedSubject}
          selectedSemester={selectedSemester}
        />
      )}

      {selectedSubject && (
        <div className="mb-8 p-4 bg-white rounded-lg shadow-md flex justify-center space-x-4">
          <button
            onClick={() => handleSelectMaterialType('notes')}
            className={`
              flex items-center space-x-2 py-3 px-6 rounded-lg text-lg font-medium transition-all duration-200 ease-in-out
              ${materialType === 'notes'
                ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                : 'bg-gray-200 text-gray-800 hover:bg-purple-100 hover:text-purple-700'}
            `}
          >
            <span role="img" aria-label="notes">📘</span>
            <span>Notes & Important Questions</span>
          </button>
          <button
            onClick={() => setMaterialType('pyq')}
            className={`
              flex items-center space-x-2 py-3 px-6 rounded-lg text-lg font-medium transition-all duration-200 ease-in-out
              ${materialType === 'pyq'
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'bg-gray-200 text-gray-800 hover:bg-blue-100 hover:text-blue-700'}
            `}
          >
            <span role="img" aria-label="pyq">📄</span>
            <span>PYQs</span>
          </button>
        </div>
      )}

      {selectedSemester && selectedSubject && materialType === 'notes' && (
        <NotesSection
          selectedSemester={selectedSemester}
          selectedSubject={selectedSubject}
        />
      )}

      {selectedSemester && selectedSubject && materialType === 'pyq' && (
        <PyqSection
          selectedSemester={selectedSemester}
          selectedSubject={selectedSubject}
        />
      )}

      <LoginPopup isOpen={showLoginPopup} onClose={() => setShowLoginPopup(false)} />
    </div>
  );
};

export default Home;