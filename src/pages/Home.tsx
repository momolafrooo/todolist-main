import React from "react";
import { useDispatch } from "react-redux";
import Task from "../components/Task";
import { deleteTask } from "../features/taskSlice";
import { useDeleteTaskMutation, useGetAllTasksQuery } from "../services/api/tasks";


function Home() {
  const { data: tasks = [], isLoading } = useGetAllTasksQuery();
   const [deleteTask, { isLoading : isLodingDelete }] = useDeleteTaskMutation();

  const handleDeleteTask = (Task : any) => {
    deleteTask(Task);
  };
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id!}
          title={task.name}
          description={task.description}
          status={task.status}
          onDelete={() => handleDeleteTask(task.id)}
        />
      ))}
    </div>
  );
}

export default Home;
