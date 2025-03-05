import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/addTask.css";

const AddTask = () => {
  const [tasks, setTasks] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3001/api/users", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTasks((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3001/api/tasks/createTask", tasks, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data) {
          alert(response.data.message);
          navigate("/");
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Error creating task:", error);
      });
  };

  return (
    <div className="add-task-container">
      <h3>Add task</h3>

      {loading ? (
        <div className="loading-message">Loading users...</div>
      ) : (
        <form onSubmit={handleSubmit} className="addTask-form">
          <label>Enter task title:</label>
          <input
            type="text"
            name="title"
            value={tasks.title || ""}
            onChange={handleChange}
            required
          />
          <label>Enter description:</label>
          <input
            type="text"
            name="description"
            value={tasks.description || ""}
            onChange={handleChange}
            required
          />
          <label>Assign to:</label>
          <select
            name="assignedTo"
            value={tasks.assignedTo || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select a user</option>
            {users?.map((user) => (
              <option key={user._id} value={user._id}>
                {user.userName}
              </option>
            ))}
          </select>
          <button type="submit">Add task</button>
        </form>
      )}
    </div>
  );
};

export default AddTask;
