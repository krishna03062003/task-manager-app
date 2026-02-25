import { useEffect, useState, useCallback } from "react";
import api from "../../api";

const TasksPage = ({ initialStatus = "" }) => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(initialStatus);

  // ✅ EDIT STATE
  const [editingTask, setEditingTask] = useState(null);

  const limit = 5;

  /* ================= FETCH ================= */
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);

      const res = await api.get(
        `/tasks?page=${page}&limit=${limit}&search=${search}&status=${status}`
      );

     const data = res.data.tasks || res.data;

// hide completed if no filter selected
setTasks(
  status === ""
    ? data.filter(t => t.status !== "completed")
    : data
);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [page, search, status]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  /* ================= TOGGLE STATUS ================= */
  const toggleStatus = async (task) => {
    await api.put(`/tasks/${task._id}`, {
      status: task.status === "pending" ? "completed" : "pending",
    });
    fetchTasks();
  };

  /* ================= DELETE ================= */
  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  /* ================= UPDATE ================= */
  const updateTask = async () => {
    await api.put(`/tasks/${editingTask._id}`, {
      title: editingTask.title,
      description: editingTask.description,
    });

    setEditingTask(null);
    fetchTasks();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">

      {/* HEADER */}
      <div className="flex flex-wrap justify-between gap-3 mb-6">

        <h2 className="text-xl font-bold">All Tasks</h2>

        <div className="flex gap-2">

          {/* SEARCH */}
          <input
            placeholder="Search tasks..."
            className="border px-3 py-2 rounded"
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />

          {/* STATUS FILTER */}
          <select
            value={status}
            className="border px-3 py-2 rounded"
            onChange={(e) => {
              setPage(1);
              setStatus(e.target.value);
            }}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-500">Loading...</p>
      )}

      {/* EMPTY */}
      {!loading && tasks.length === 0 && (
        <p className="text-center text-gray-400">No tasks found</p>
      )}

      {/* TASK LIST */}
      {tasks.map((task) => (
        <div
          key={task._id}
          className="border p-4 mb-3 rounded-lg flex justify-between"
        >
          <div>
            <h3 className="font-semibold text-lg">{task.title}</h3>
           <div className="text-gray-600 mt-1">
  {task.description?.split("\n").map((line, index) => (
    <p key={index}>
      {index + 1}. {line}
    </p>
  ))}
</div>

            <p className="text-xs text-gray-400">
              {new Date(task.createdAt).toLocaleString()}
            </p>
          </div>

         <div className="flex items-center gap-2">

  {/* STATUS */}
  <button
    onClick={() => toggleStatus(task)}
    className={`px-4 py-1 text-sm font-medium rounded-full transition
      ${
        task.status === "completed"
          ? "bg-green-100 text-green-700 hover:bg-green-200"
          : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
      }`}
  >
    {task.status}
  </button>

  {/* EDIT */}
  <button
    onClick={() => setEditingTask(task)}
    className="px-3 py-1 text-sm rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
  >
    Edit
  </button>

  {/* DELETE */}
  <button
    onClick={() => deleteTask(task._id)}
    className="px-3 py-1 text-sm rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
  >
    Delete
  </button>

</div>
        </div>
      ))}

      {/* PAGINATION */}
      {tasks.length === limit && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Prev
          </button>

          <span>Page {page}</span>

          <button
            onClick={() => setPage((p) => p + 1)}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      )}

      {/* ================= EDIT MODAL ================= */}
      {editingTask && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white p-6 rounded-xl w-96 shadow-xl">

            <h3 className="font-bold text-lg mb-4">
              Edit Task
            </h3>

            <input
              value={editingTask.title}
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  title: e.target.value,
                })
              }
              className="border p-2 w-full mb-3 rounded"
            />

            <textarea
              value={editingTask.description}
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  description: e.target.value,
                })
              }
              className="border p-2 w-full mb-4 rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingTask(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={updateTask}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Update
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;