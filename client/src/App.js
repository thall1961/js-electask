import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/api/tasks')
      .then(result => result.json())
      .then(newTasks => setTasks(newTasks));
  }, []);

  return (
    <div className="App">
      {tasks.map(t => (
        <div
          key={t.id}
          style={{display: 'flex', justifyContent: 'space-between'}}
        >
          <span>{t.description}</span>
          <span>{t.status}</span>
          <span>{t.code}</span>
        </div>
      ))}
    </div>
  );
}

export default App;
