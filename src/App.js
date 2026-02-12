import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ExerciseList from './components/ExerciseList';
import ExerciseDetails from './components/ExerciseDetails';
import Progress from './components/Progress';
import './App.css'; // We'll add styles later

function App() {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const [exercises, setExercises] = useState(() => {
    const saved = localStorage.getItem('exercises');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('exercises', JSON.stringify(exercises));
  }, [exercises]);

  const addExercise = (name) => {
    setExercises([...exercises, { id: Date.now(), name, sets: [] }]);
  };

  const updateExercise = (id, updatedExercise) => {
    setExercises(exercises.map(ex => ex.id === id ? updatedExercise : ex));
  };

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark' : 'light'}`}>
        <header>
          <h1>Fitness Tracker</h1>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </header>
        <nav>
          <Link to="/">Exercises</Link>
          <Link to="/progress">Progress</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ExerciseList exercises={exercises} addExercise={addExercise} />} />
          <Route path="/exercise/:id" element={<ExerciseDetails exercises={exercises} updateExercise={updateExercise} />} />
          <Route path="/progress" element={<Progress exercises={exercises} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;