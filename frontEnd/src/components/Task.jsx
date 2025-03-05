import { Link, useParams } from "react-router-dom";
import "./css/Task.css";

const Task = (props) => {
  const { item, link } = props;

  const { _id, title, description, status, assignedTo, creator } = item;

  return (
    <Link to={`${link}/${_id}`} className="task-container">
      <h3>{title}</h3>
      <p>description:{description}</p>
      <p>
        status:
        <span
          className={
            status == "Pending"
              ? "red"
              : status == "in-progress"
              ? "blue"
              : "green"
          }
        >
          {status}
        </span>
      </p>
      <p>AssignTo:{assignedTo?.userName}</p>
      <p>CreateBy:{creator?.userName}</p>
    </Link>
  );
};

export default Task;
