import { useEffect, useState } from "react";
import api from "../../api";

const TasksWidget = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const fetchTasks = async () => {
    const res = await api.get(
      `/tasks?page=${page}&limit=5&search=${search}&status=${status}`
    );
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, [page, search, status]);

  const addTask = async () => {
    if (!title) return;
    await api.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const toggleStatus = async (task) => {
    await api.put(`/tasks/${task._id}`, {
      status:
        task.status === "pending"
          ? "completed"
          : "pending",
    });
    fetchTasks();
  };

  return (
    <div>
      {/* ADD TASK */}
      <div className="flex gap-2 mb-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task"
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={addTask}
          className="bg-indigo-500 text-white px-3 rounded"
        >
          Add
        </button>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex gap-2 mb-3">
        <input
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 flex-1 rounded"
        />

        <select
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* TASK LIST */}
      {tasks.map((task) => (
        <div
          key={task._id}
          className="border rounded p-3 mb-2 flex justify-between"
        >
          <div>
            <p className="font-semibold">{task.title}</p>
            <p className="text-xs text-gray-500">
              {new Date(task.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => toggleStatus(task)}
              className="bg-green-500 text-white px-2 rounded"
            >
              {task.status}
            </button>

            <button
              onClick={() => deleteTask(task._id)}
              className="bg-red-500 text-white px-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* PAGINATION */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="bg-gray-200 px-3 rounded"
        >
          Prev
        </button>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="bg-gray-200 px-3 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TasksWidget;