import React from "react";
import Task from "../components/Task";
import { useGetAllTasksQuery } from "../services/api/tasks";

function Home() {
  const { data: tasks = [], isLoading } = useGetAllTasksQuery();

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
          // onDelete={() => handleDelete(task.id)}
        />
      ))}
    </div>
  );
}

export default Home;
