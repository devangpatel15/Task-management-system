import { useEffect, useState } from "react";
import axios from "axios";
import Task from "./Task";
import "./css/Task.css";

const MyTask = ({ isLoggedIn }) => {
  const token = localStorage.getItem("token");

  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      axios
        .get("http://localhost:3001/api/tasks/getUserTasks", {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setTaskData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [isLoggedIn, token]);

  return (
    <div className="task-header">
      <h2>List of Your Task</h2>
      {isLoggedIn ? (
        loading ? (
          <div className="loading-message">Loading tasks...</div>
        ) : taskData.length > 0 ? (
          <div className="task-main">
            {taskData.map((item, index) => (
              <Task
                key={item._id}
                item={item}
                index={index}
                link="/getUserTasks/viewTask"
              />
            ))}
          </div>
        ) : (
          <p>No task Assigned</p>
        )
      ) : (
        <p> log in to view tasks.</p>
      )}
    </div>
  );
};

export default MyTask;
