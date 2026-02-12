import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ExerciseList({ exercises, addExercise }) {
  const [newExercise, setNewExercise] = useState('');

  const handleAdd = () => {
    if (newExercise) {
      addExercise(newExercise);
      setNewExercise('');
    }
  };

  return (
    <div>
      <input value={newExercise} onChange={(e) => setNewExercise(e.target.value)} placeholder="Add exercise name" />
      <button onClick={handleAdd}>Add Exercise</button>
      <ul>
        {exercises.map(ex => (
          <li key={ex.id}>
            <Link to={`/exercise/${ex.id}`}>{ex.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExerciseList;