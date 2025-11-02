import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/AppSidebar";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/userSlice";
import { User } from "lucide-react";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import { Card } from "./card";
import { Input } from "./input";
import { addTask, assignTask } from "@/redux/taskSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function Tasks() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInUser } = useSelector((state) => state.user);

  const [date, setDate] = useState(new Date());
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const tasks = useSelector((state) => state.tasks.tasklist);
  const userlist = useSelector((state) =>
    state.tasks.users.filter((u) => u.role === "employee")
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  function handleAddTask() {
    if (newTaskName.trim()) {
      dispatch(addTask(newTaskName));
      setNewTaskName("");
      setOpenAddDialog(false);
    }
  }

  function handleAssignTask() {
    if (!selectedTask || !selectedEmployee) {
      alert("Please select both a task and an employee.");
      return;
    }

    dispatch(
      assignTask({
        taskName: selectedTask,
        empName: selectedEmployee,
      })
    );

    setSelectedTask("");
    setSelectedEmployee("");
    setOpenAssignDialog(false);
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        {/* left side */}
        <AppSidebar />

        {/* main content */}
        <div className="flex flex-1 bg-gray-50">
          <section className="flex-1 p-6 overflow-y-auto">
            {/* top bar */}
            <div className="flex items-center justify-between mb-6">
              <SidebarTrigger />

              <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200">
                  <User className="text-gray-600 w-4 h-4" />
                </div>
                <span className="font-medium text-gray-700">
                  {loggedInUser?.username || "Admin"}
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

            <h2 className="text-2xl font-bold mb-4">TASKS</h2>

            <div className="bg-white rounded-2xl shadow p-4 mb-6">
              {/* Buttons */}
              <div className="flex justify-end gap-3 mb-6">
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white font-medium"
                  onClick={() => setOpenAddDialog(true)}
                >
                  Add New Task
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  onClick={() => setOpenAssignDialog(true)}
                >
                  Assign Task
                </Button>
              </div>

              {/* Add Task Dialog */}
              <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-3">
                    <Input
                      type="text"
                      placeholder="Enter task name"
                      value={newTaskName}
                      onChange={(e) => setNewTaskName(e.target.value)}
                    />
                  </div>

                  <DialogFooter className="mt-4">
                    <Button onClick={handleAddTask}>Save</Button>
                    <Button
                      variant="outline"
                      onClick={() => setOpenAddDialog(false)}
                    >
                      Cancel
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Assign Task Dialog */}
              <Dialog open={openAssignDialog} onOpenChange={setOpenAssignDialog}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Assign Task</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-3">
                    <Select
                      value={selectedTask}
                      onValueChange={(value) => setSelectedTask(value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Choose Task" />
                      </SelectTrigger>
                      <SelectContent>
                        {tasks.map((task) => (
                          <SelectItem key={task.id} value={task.taskName}>
                            {task.taskName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={selectedEmployee}
                      onValueChange={(value) => setSelectedEmployee(value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Choose Employee" />
                      </SelectTrigger>
                      <SelectContent>
                        {userlist.map((user, index) => (
                          <SelectItem key={index} value={user.username}>
                            {user.username}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <DialogFooter className="mt-4">
                    <Button onClick={handleAssignTask}>Save</Button>
                    <Button
                      variant="outline"
                      onClick={() => setOpenAssignDialog(false)}
                    >
                      Cancel
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Task Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <Card
                      key={task.id}
                      className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition-shadow flex flex-col items-center justify-center text-center font-medium text-gray-800"
                    >
                      <div>{task.taskName}</div>
                      {task.assignments.length > 0 ? (
                        <div className="mt-2 text-sm text-gray-500">
                          Assigned to:{" "}
                          {task.assignments
                            .map((a) => a.username)
                            .join(", ")}
                        </div>
                      ) : (
                        <div className="mt-2 text-sm text-gray-400 italic">
                          Not assigned yet
                        </div>
                      )}
                    </Card>
                  ))
                ) : (
                  <p className="text-center text-gray-500 col-span-full">
                    No tasks available.
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
