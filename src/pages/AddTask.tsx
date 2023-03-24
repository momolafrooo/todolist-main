import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/taskSlice";
import { useSaveTaskMutation } from "../services/api/tasks";
import { Task } from "../services/api/tasks/type";
import { v4 as uuidv4 } from "uuid";

interface AddTaskProps {
  initialTask?: Task;
}

const AddTask: FC<AddTaskProps> = ({ initialTask = { name: "", description: "", status: false } }) => {
  const [task, setTask] = useState<Task>(initialTask);

  const [save, { isLoading }] = useSaveTaskMutation();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    save({ ...task, id: uuidv4() })
      .unwrap()
      .then(() => {})
      .catch(() => {});
    setTask({ name: "", description: "", status: false });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2 className="form-title">New Task</h2>
      <div className="form-entry">
        <label htmlFor="title" className="form-label">
          Title:
        </label>
        <input id="title" type="text" name="name" onChange={handleInputChange} className="form-input" />
      </div>

      <div className="form-entry">
        <label htmlFor="description" className="form-label">
          Description:
        </label>

        <textarea id="description" name="description" onChange={handleInputChange} className="form-description" />
      </div>

      <button type="submit" className="form-btn">
        {isLoading ? "Loading..." : "Create Task"}
      </button>
    </form>
  );
};

export default AddTask;
