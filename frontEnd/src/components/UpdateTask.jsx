import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import "./css/updateTask.css";

const UpdateTask = () => {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/tasks/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setTask(response.data);
      })
      .catch((error) => {
        console.log("Error fetching task data:", error);
        alert("Failed to load task data.");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(
        `http://localhost:3001/api/tasks/${id}`,
        { ...task, status: task.status },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        alert(response.data.message);
        navigate("/");
      })
      .catch((error) => {
        console.log("Error updating task:", error);
        alert("Failed to update task. Please try again.");
      });
  };

  return (
    <div className="update-task-container">
      <h3>Update Task</h3>
      <form onSubmit={handleSubmit} className="updateTask-form">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={task.title || ""}
          onChange={handleChange}
          required
        />
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={task.description || ""}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default UpdateTask;
