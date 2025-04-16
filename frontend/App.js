import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get(API_URL);
    setTasks(res.data);
  };

  const addTask = async () => {
    const res = await axios.post(API_URL, { title, completed: false });
    setTasks([...tasks, res.data]);
    setTitle('');
  };

  const updateTask = async (id) => {
    const task = tasks.find(t => t._id === id);
    const res = await axios.patch(`${API_URL}/${id}`, { completed: !task.completed });
    setTasks(tasks.map(t => t._id === id ? res.data : t));
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Tasks Manager</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.title}
            </span>
            <button onClick={() => updateTask(task._id)}>Toggle</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
