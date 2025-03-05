import { useEffect, useState } from "react";
import Task from "../components/Task";
import axios from "axios";
import "../components/css/Task.css";

const Home = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [tasksData, setTasksData] = useState([]);

  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, [localStorage]);

  useEffect(() => {
    if (!token) return;

    (async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/tasks/getTasks",
          {
            headers: getAuthHeaders(),
          }
        );

        setTasksData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [token]);

  return (
    <>
      <div className="task-main">
        {tasksData?.map((item) => (
          <Task key={item._id} item={item} link="/viewTask" />
        ))}
      </div>
    </>
  );
};

export default Home;
