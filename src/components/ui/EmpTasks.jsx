import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { EmpAppSidebar } from "./EmpAppSidebar";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/userSlice";
import { Button } from "./button";
import { Card } from "./card";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { assignTask, updateTaskStatus, deleteTask } from "@/redux/taskSlice";

export default function EmpTasks() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInUser } = useSelector((state) => state.user);
  const tasklist = useSelector((state) => state.tasks.tasklist);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Show tasks assigned to logged-in user
  const employeeTasks = tasklist.filter((task) =>
    task.assignments.some((a) => a.username === loggedInUser?.username)
  );

  // Assign new task directly to self
  const handleAssignTask = (taskName) => {
    dispatch(assignTask({ taskName, empName: loggedInUser.username }));
  };

  // Mark task as completed
  const handleMarkComplete = (taskName) => {
    dispatch(
      updateTaskStatus({
        taskName,
        username: loggedInUser.username,
        status: "completed",
      })
    );
  };

  // Delete task from user's assignment (and cleanup if empty)
  const handleDeleteTask = (taskName) => {
    dispatch(deleteTask({ taskName, username: loggedInUser.username }));
  };

  //  For quick testing, a few mock tasks if no tasks exist
  const mockAvailableTasks = [
    "task1",
    "task2",
    "task3"
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <EmpAppSidebar />

        <div className="flex flex-1 bg-gray-50">
          <section className="flex-1 p-6 overflow-y-auto">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6">
              <SidebarTrigger />
              <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200">
                  <User className="text-gray-600 w-4 h-4" />
                </div>
                <span className="font-medium text-gray-700">
                  {loggedInUser?.username || "Employee"}
                </span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleLogout}
                  className="ml-2"
                >
                  Logout
                </Button>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">My Tasks</h2>

            {/* Assign Section */}
            <div className="bg-white p-4 rounded-2xl shadow mb-6">
              <h3 className="font-semibold mb-3">Assign Task</h3>
              <div className="flex flex-wrap gap-3">
                {mockAvailableTasks.map((taskName) => (
                  <Button
                    key={taskName}
                    onClick={() => handleAssignTask(taskName)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {taskName}
                  </Button>
                ))}
              </div>
            </div>

            {/* Task List */}
            <div className="bg-white rounded-2xl shadow p-4 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {employeeTasks.length > 0 ? (
                  employeeTasks.map((task) => {
                    const assignment = task.assignments.find(
                      (a) => a.username === loggedInUser?.username
                    );

                    return (
                      <Card
                        key={task.id}
                        className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition-all flex flex-col justify-between text-center"
                      >
                        <div>
                          <div className="font-medium text-gray-800 text-lg">
                            {task.taskName}
                          </div>
                          <Badge
                            variant={
                              assignment.status === "completed"
                                ? "success"
                                : "secondary"
                            }
                            className="mt-2 capitalize"
                          >
                            {assignment.status}
                          </Badge>
                        </div>

                        <div className="mt-4 flex flex-col gap-2">
                          {assignment.status !== "completed" && (
                            <Button
                              className="bg-green-600 hover:bg-green-700 text-white font-medium"
                              onClick={() => handleMarkComplete(task.taskName)}
                            >
                              Mark as Completed
                            </Button>
                          )}
                          <Button
                            variant="destructive"
                            onClick={() => handleDeleteTask(task.taskName)}
                          >
                            Delete Task
                          </Button>
                        </div>
                      </Card>
                    );
                  })
                ) : (
                  <p className="text-center text-gray-500 col-span-full italic">
                    No tasks assigned yet.
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </SidebarProvider>
  );
}
