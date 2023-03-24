import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/taskSlice";
import { TaskApi } from "../services/api/tasks";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    [TaskApi.reducerPath]: TaskApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(TaskApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
