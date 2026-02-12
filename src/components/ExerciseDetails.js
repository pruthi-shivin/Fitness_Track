import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function ExerciseDetails({ exercises, updateExercise }) {
  const { id } = useParams();
  const exercise = exercises.find(ex => ex.id == id);
  const [sets, setSets] = useState(exercise ? exercise.sets : []);
  const [numSets, setNumSets] = useState(1);
  const [reps, setReps] = useState(10);
  const [weight, setWeight] = useState(0);
  const [restTime, setRestTime] = useState(60); // in seconds

  const addSets = () => {
    const newSets = Array.from({ length: numSets }, (_, i) => ({
      id: Date.now() + i,
      reps,
      weight,
      restTime,
      completed: false
    }));
    const updatedSets = [...sets, ...newSets];
    setSets(updatedSets);
    updateExercise(id, { ...exercise, sets: updatedSets });
  };

  const toggleComplete = (setId) => {
    const updatedSets = sets.map(s => s.id === setId ? { ...s, completed: !s.completed } : s);
    setSets(updatedSets);
    updateExercise(id, { ...exercise, sets: updatedSets });
  };

  return (
    <div>
      <h2>{exercise?.name}</h2>
      <div>
        <input type="number" value={numSets} onChange={(e) => setNumSets(e.target.value)} placeholder="Sets" />
        <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} placeholder="Reps" />
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight (lbs)" />
        <input type="number" value={restTime} onChange={(e) => setRestTime(e.target.value)} placeholder="Rest (sec)" />
        <button onClick={addSets}>Add Sets</button>
      </div>
      <ul>
        {sets.map(set => (
          <li key={set.id}>
            Set: {set.reps} reps @ {set.weight} lbs, Rest: {set.restTime}s
            <button onClick={() => toggleComplete(set.id)}>
              {set.completed ? 'Completed' : 'Mark Done'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExerciseDetails;