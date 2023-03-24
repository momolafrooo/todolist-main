import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Task {
  id: string;
  title: string;
  description: string;
  status: boolean;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, "id">>) => {
      const { title, description, status } = action.payload;
      const newTask: Task = {
        id: uuidv4(),
        title,
        description,
        status,
      };
      state.tasks.push(newTask);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    updateTask: (state, action: PayloadAction<Task>) => {
      const updatedTask = action.payload;
      const taskIndex = state.tasks.findIndex(
        (task) => task.id === updatedTask.id
      );
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = updatedTask;
      }
    },
  },
});

export const { addTask, deleteTask, updateTask } = taskSlice.actions;

export default taskSlice.reducer;
