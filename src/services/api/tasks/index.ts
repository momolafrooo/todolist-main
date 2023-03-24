import { rootApi } from "../";
import { Task } from "./type";

export const TaskApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTasks: builder.query<Task[], void>({
      query: () => `/tasks`,
      providesTags: [{ type: "TASKS", id: "LIST" }],
    }),

    getTaskById: builder.query<Task, string>({
      query: (id: string) => `/tasks/${id}`,
      providesTags: (result, error, id) => [{ type: "TASKS", id }],
    }),

    saveTask: builder.mutation<Task, Task>({
      query: (body: Task) => ({
        url: `/tasks`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "TASKS", id: "LIST" }],
    }),

    updateTask: builder.mutation<Task, Task>({
      query: (body: Task) => ({
        url: `/tasks/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "TASKS", id }],
    }),

    deleteTask: builder.mutation<void, number>({
      query: (id: number) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "TASKS", id }],
    }),
  }),
  overrideExisting: false,
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllTasksQuery,
  useGetTaskByIdQuery,
  useSaveTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = TaskApi;
