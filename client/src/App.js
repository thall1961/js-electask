import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getTasks();
  }, []);

  function getTasks() {
    fetch("/api/tasks")
      .then(result => result.json())
      .then(newTasks => {
        setTasks(newTasks);
      });
  }

  async function handleClick() {
    const data = await fetch("/api/tasks/new", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const newMessage = await data.json();
    setMessage(newMessage.message);
    getTasks();
  }

  return (
    <div className="App">
      {tasks.map(t => (
        <div
          key={t._id}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>{t.description}</span>
          <span>{t.status}</span>
          <span>{t.code}</span>
        </div>
      ))}
      <button onClick={handleClick}>Create Task</button>
      {message}
    </div>
  );
}

export default App;
