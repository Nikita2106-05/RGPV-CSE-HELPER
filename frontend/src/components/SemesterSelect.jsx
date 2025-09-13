// frontend/src/components/SemesterSelect.jsx
import React from 'react';

const SemesterSelect = ({ onSelectSemester, selectedSemester }) => {
  const semesters = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center text-indigo-700">Select Semester</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {semesters.map((sem) => (
          <button
            key={sem}
            onClick={() => onSelectSemester(sem)}
            className={`
              w-full py-3 px-4 rounded-lg text-lg font-medium transition-all duration-200 ease-in-out
              ${selectedSemester === sem
                ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                : 'bg-gray-200 text-gray-800 hover:bg-indigo-100 hover:text-indigo-700'}
            `}
          >
            Semester {sem}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SemesterSelect;