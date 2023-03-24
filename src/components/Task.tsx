import React, { FC } from "react";
import { Link } from "react-router-dom";
import "../style/Task.css";

interface TaskProps {
  id: string;
  title?: string;
  description?: string;
  status?: boolean;
  onDelete?: () => void;
}

const Task: FC<TaskProps> = ({ id, title, description, status, onDelete }) => {
  return (
    <div className="task" id={id}>
      <div className="task-content">
        <h1 className="title">{title}</h1>
        <p className="description">{description}</p>
        <p className={status ? "status task-completed" : "status task-incomplete"}>
          {status ? "Completed" : "In Progress"}
        </p>
        <div className="actions">
          <button className="delete-btn" onClick={onDelete}>
            <img src="trash.svg" alt="Delete" className="delete-icon" />
          </button>
          <Link className="update-btn" to={"/update/" + id}>
            Update
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Task;
