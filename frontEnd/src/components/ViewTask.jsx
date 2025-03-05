import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ViewTask = (props) => {
  const { userTask } = props;
  const navigate = useNavigate();
  const { id } = useParams();
  const [taskData, setTaskData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3001/api/tasks/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
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
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedStatus =
      taskData.status === "Pending" ? "in-progress" : "completed";

    axios
      .put(
        `http://localhost:3001/api/tasks/${id}`,
        { status: updatedStatus },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        alert(response.data.message);
        navigate("/getUserTasks");
      })
      .catch((error) => {
        alert("Failed to update task. Please try again.");
      });
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3001/api/tasks/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        alert(response.data.message);
        navigate("/");
      })
      .catch((error) => {
        alert("Failed to delete task. Please try again.");
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="task-main">
        <div className="task-container">
          <h3>{taskData.title}</h3>
          <p>{taskData.description}</p>
          <p>
            Status:
            <span
              className={
                taskData?.status == "Pending"
                  ? "red"
                  : taskData?.status == "in-progress"
                  ? "blue"
                  : "green"
              }
            >
              {taskData?.status}
            </span>
          </p>
          <h5>Assigned To: {taskData.assignedTo?.userName}</h5>
          <h5>Creator: {taskData.creator?.userName}</h5>
        </div>
      </div>

      {userTask ? (
        <div className="mark-in-progress-complete-btn">
          <button className="mark-in-progress-btn" onClick={handleSubmit}>
            {taskData?.status === "Pending"
              ? "Mark as In Progress"
              : "Mark as Completed"}
          </button>
        </div>
      ) : (
        <>
          <div className="update-delete-btn">
            <Link to={`/updateTask/${id}`}>
              <button className="update-btn">Update Task</button>
            </Link>
            <button onClick={handleDelete} className="delete-btn">
              Delete Task
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ViewTask;
