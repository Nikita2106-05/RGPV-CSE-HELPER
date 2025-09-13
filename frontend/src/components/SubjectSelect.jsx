// frontend/src/components/SubjectSelect.jsx
import React from 'react';

// Dummy subjects for demonstration. In a real app, this might come from API or a more complex config.
const dummySubjects = {
  1: ['Engineering Physics', 'Engineering Chemistry', 'Engineering Mathematics I', 'Basic Electrical Engineering'],
  2: ['Engineering Mechanics', 'Engineering Graphics', 'Engineering Mathematics II', 'Programming in C'],
  3: ['Data Structures', 'Object-Oriented Programming', 'Digital Electronics', 'Computer Organization'],
  4: ['Operating Systems', 'Design & Analysis of Algorithms', 'Database Management Systems', 'Software Engineering'],
  5: ['Computer Networks', 'Theory of Computation', 'Artificial Intelligence', 'Web Technology'],
  6: ['Compiler Design', 'Distributed Systems', 'Machine Learning', 'Cloud Computing'],
  7: ['Cyber Security', 'Big Data Analytics', 'Image Processing', 'Internet of Things'],
  8: ['Project Work', 'Elective I', 'Elective II', 'Seminar'],
};

const SubjectSelect = ({ onSelectSubject, selectedSubject, selectedSemester }) => {
  const subjects = dummySubjects[selectedSemester] || [];

  return (
    <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center text-indigo-700">
        Select Subject for Semester {selectedSemester}
      </h2>
      {subjects.length === 0 ? (
        <p className="text-center text-gray-600">No subjects available for this semester yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => onSelectSubject(sub)}
              className={`
                w-full py-3 px-4 rounded-lg text-lg font-medium transition-all duration-200 ease-in-out
                ${selectedSubject === sub
                  ? 'bg-emerald-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-200 text-gray-800 hover:bg-emerald-100 hover:text-emerald-700'}
              `}
            >
              {sub}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubjectSelect;