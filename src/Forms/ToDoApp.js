// سيكشن البونص للمذاكرة

// الجزء دا مش انا اللي عامله كله دا بس للمذاكرة 






import React, { useState } from "react";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]); 
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (taskInput.trim() !== "") {
      setTasks([...tasks, { text: taskInput, done: false }]);
      setTaskInput(""); 
    }
  };

  const toggleDone = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>To-Do App!</h1>
      <div>
        <input
          type="text"
          placeholder="Enter new task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          style={{
            padding: "8px",
            width: "70%",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginRight: "10px",
          }}
        />
        <button
          onClick={addTask}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Add
        </button>
      </div>
      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li
              key={index}
              style={{
                textDecoration: task.done ? "line-through" : "none",
                padding: "10px",
                border: "1px solid #ddd",
                margin: "5px 0",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>{task.text}</span>
              <div>
                <button
                  onClick={() => toggleDone(index)}
                  style={{
                    marginRight: "10px",
                    padding: "5px 10px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                  }}
                >
                  {task.done ? "Undo" : "Done"}
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p style={{ color: "#888" }}>Let’s get some work done!</p>
        )}
      </ul>
    </div>
  );
};

export default TodoApp;
