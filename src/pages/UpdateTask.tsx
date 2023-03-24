import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/index";
import { updateTask } from "../features/taskSlice";
import { useLocation, useParams } from "react-router-dom";
import { useGetTaskByIdQuery, useUpdateTaskMutation } from "../services/api/tasks";
import { v4 as uuidv4 } from "uuid";
import { $CombinedState } from "redux";

interface UpdateTaskProps {}

const UpdateTask: FC<UpdateTaskProps> = () => {
  const { id: taskId = "" } = useParams();

  const { data: task, isLoading } = useGetTaskByIdQuery(taskId);
  const [update, { isLoading: isLoadingMutation }] = useUpdateTaskMutation();

  const [title, setTitle] = useState(task?.name || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.checked);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedTask = {
      id: taskId,
      name: title,
      description,
      status,
    };

    update(updatedTask)
      .unwrap()
      .then(() => {})
      .catch(() => {});
  };

  useEffect(() => {
    if (task) {
      setTitle(task?.name);
      setDescription(task?.description);
      setStatus(task?.status);
    }
  }, [task]);

  if (isLoading) return <div>Loading</div>;

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2 className="form-title">New Task</h2>
      <div className="form-entry">
        <label htmlFor="title" className="form-label">
          Title:
        </label>
        <input id="title" type="text" value={title} onChange={handleTitleChange} className="form-input" />
      </div>

      <div className="form-entry">
        <label htmlFor="description" className="form-label">
          Description:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          className="form-description"
        />
        <label htmlFor="Completed" className="form-label">
          Completed?
        </label>
        <input
          id="completed"
          type="checkbox"
          checked={status}
          onChange={handleStatusChange}
          className="form-checkbox"
        />
      </div>

      <br />
      <button type="submit" className="form-btn">
        {isLoadingMutation ? "Loading..." : "Update Task"}
      </button>
    </form>
  );
};

export default UpdateTask;
