import { createSlice } from "@reduxjs/toolkit";
import { mockUsers } from "@/api/mockUsers";
import { mockTasks } from "@/api/mockTasks";

const storedUsers = JSON.parse(localStorage.getItem("mockUsers")) || [];
const allUsers = [...mockUsers, ...storedUsers];

const initialState = {
  users: mockUsers,
  tasklist: mockTasks,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const taskName = action.payload;
      const newTask = {
        id: state.tasklist.length + 1,
        taskName,
        assignments: [],
      };
      state.tasklist.push(newTask);
    },

     deleteTask: (state, action) => {
      const { taskName, username } = action.payload;

      const task = state.tasklist.find((t) => t.taskName === taskName);
      if (task) {
        // Remove assignment for this user
        task.assignments = task.assignments.filter(
          (a) => a.username !== username
        );

        // If no assignments left → delete the task entirely
        if (task.assignments.length === 0) {
          state.tasklist = state.tasklist.filter(
            (t) => t.taskName !== taskName
          );
        }
      }
      const user = state.users.find((u) => u.username === username);
      if (user) {
        user.taskIds = user.taskIds.filter((id) => id !== task?.id);
      }
    },

    assignTask: (state, action) => {
  const { taskName, empName } = action.payload;

  // Find or create the task
  let task = state.tasklist.find((t) => t.taskName === taskName);

  if (!task) {
    task = {
      id: state.tasklist.length + 1,
      taskName,
      assignments: [],
    };
    state.tasklist.push(task);
  }

  // Guarantee task.id exists even for old mock tasks
  if (!task.id) {
    task.id = state.tasklist.length + 1;
  }

  // Avoid duplicate assignment
  const existing = task.assignments.find((a) => a.username === empName);
  if (!existing) {
    task.assignments.push({ username: empName, status: "pending" });
  }

  // Update user's task list
  const user = state.users.find((u) => u.username === empName);
  if (user) {
    if (!user.taskIds) user.taskIds = [];
    if (!user.taskIds.includes(task.id)) {
      user.taskIds.push(task.id);
    }
  }
},



    updateTaskStatus: (state, action) => {
      const { taskName, username, status } = action.payload;
      const task = state.tasklist.find((t) => t.taskName === taskName);

      if (task) {
        const assignment = task.assignments.find(
          (a) => a.username === username
        );
        if (assignment) assignment.status = status;
      }
    },
  },
});

export const { addTask, deleteTask, assignTask, updateTaskStatus } =
  taskSlice.actions;

export default taskSlice.reducer;
