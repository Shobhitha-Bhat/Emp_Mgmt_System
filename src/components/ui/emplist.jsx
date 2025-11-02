import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

function Emplist() {
  const users = useSelector((state) => state.tasks.users);
  const tasklist = useSelector((state) => state.tasks.tasklist);

  const employees = users.filter((u) => u.role === "employee");

  const [selectedEmployee, setSelectedEmployee] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Filter employees dynamically
  const filteredEmployees = employees.filter((emp) => {
    if (selectedEmployee !== "all" && emp.username !== selectedEmployee)
      return false;

    // Show employee only if they have tasks matching the selected status
    if (selectedStatus !== "all") {
      const hasMatchingTask = tasklist.some((task) =>
        task.assignments.some(
          (a) =>
            a.username === emp.username && a.status === selectedStatus
        )
      );
      return hasMatchingTask;
    }

    return true;
  });

  const clearFilters = () => {
    setSelectedEmployee("all");
    setSelectedStatus("all");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Employees with Tasks</h2>

      {/* Filter Controls */}
      Filter
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <Select onValueChange={setSelectedEmployee} value={selectedEmployee}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Employee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Employees</SelectItem>
            {employees.map((emp, i) => (
              <SelectItem key={i} value={emp.username}>
                {emp.username}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setSelectedStatus} value={selectedStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        {(selectedEmployee !== "all" || selectedStatus !== "all") && (
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        )}
      </div>

      {/* Employee Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((emp, index) => {
          // Filter tasks for this employee based on selected status
          const assignedTasks = tasklist.filter((task) =>
            task.assignments.some(
              (a) =>
                a.username === emp.username &&
                (selectedStatus === "all" || a.status === selectedStatus)
            )
          );

          return (
            <div
              key={index}
              className="p-5 border rounded-2xl bg-white shadow hover:shadow-lg transition-all"
            >
              <h3 className="text-lg font-semibold capitalize text-gray-800">
                {emp.username}
              </h3>
              <p className="text-sm text-gray-500 mb-3">{emp.email}</p>

              {assignedTasks.length > 0 ? (
                <div className="space-y-2">
                  {assignedTasks.map((task, i) => {
                    const assignment = task.assignments.find(
                      (a) => a.username === emp.username
                    );
                    return (
                      <div
                        key={i}
                        className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2"
                      >
                        <span className="text-sm font-medium text-gray-700">
                          {task.taskName}
                        </span>
                        <Badge
                          variant={
                            assignment.status === "completed"
                              ? "success"
                              : "secondary"
                          }
                        >
                          {assignment.status}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">
                  No matching tasks found.
                </p>
              )}
            </div>
          );
        })}
      </div>

      {filteredEmployees.length === 0 && (
        <p className="text-gray-500 italic text-center mt-10">
          No employees match your filters.
        </p>
      )}
    </div>
  );
}

export default Emplist;
