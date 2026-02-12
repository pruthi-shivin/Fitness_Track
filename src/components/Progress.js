import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

function Progress({ exercises }) {
  const data = exercises.map(ex => ({
    name: ex.name,
    completed: ex.sets.filter(s => s.completed).length
  }));

  return (
    <div>
      <h2>Progress</h2>
      <BarChart width={300} height={200} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="completed" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default Progress;