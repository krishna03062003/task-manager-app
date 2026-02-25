import { useEffect, useState } from "react";
import api from "../../api";
import { motion } from "framer-motion";

const Analytics = ({ setTab, setStatusFilter }) => {

  /* ================= STATE ================= */
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    recent: []
  });

  const [loading, setLoading] = useState(true);

  /* ================= FETCH STATS ================= */
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/tasks/stats");
        setStats(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  /* ================= PROGRESS CALC ================= */
  const percent =
    stats.total === 0
      ? 0
      : Math.round((stats.completed / stats.total) * 100);

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <h2 className="text-2xl font-bold text-gray-800">
        Progress Overview
      </h2>

      {/* ================= STAT CARDS ================= */}
      <div className="grid md:grid-cols-3 gap-6">

        <StatCard
          title="Total Tasks"
          value={stats.total}
          color="indigo"
          onClick={() => {
            setStatusFilter("");
            setTab("tasks");
          }}
        />

        <StatCard
          title="Pending"
          value={stats.pending}
          color="yellow"
          onClick={() => {
            setStatusFilter("pending");
            setTab("tasks");
          }}
        />

        <StatCard
          title="Completed"
          value={stats.completed}
          color="green"
          onClick={() => {
            setStatusFilter("completed");
            setTab("tasks");
          }}
        />

      </div>

      {/* ================= PROGRESS BAR ================= */}
      <div className="bg-white p-6 rounded-xl shadow">

        <div className="flex justify-between mb-2">
          <p className="font-semibold">Completion Progress</p>
          <span className="font-bold text-indigo-600">
            {percent}%
          </span>
        </div>

        <div className="w-full bg-gray-200 h-6 rounded-full overflow-hidden">

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 1 }}
            className="h-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          />

        </div>

        <p className="text-sm text-gray-500 mt-2">
          {stats.completed} of {stats.total} tasks completed
        </p>

      </div>

      {/* ================= RECENT TASKS ================= */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h3 className="text-lg font-semibold mb-4">
          Recent Activity
        </h3>

        {loading && (
          <p className="text-gray-400">Loading...</p>
        )}

        {!loading && stats.recent?.length === 0 && (
          <p className="text-gray-400 text-sm">
            No recent tasks yet.
          </p>
        )}

        {stats.recent?.map((task) => (
          <div
            key={task._id}
            className="border rounded-lg p-3 mb-3 flex justify-between items-center hover:shadow-sm transition"
          >
            <div>
              <p className="font-medium">
                {task.title}
              </p>

              <p className="text-xs text-gray-400">
                {new Date(task.updatedAt).toLocaleString()}
              </p>
            </div>

            <span
              className={`px-3 py-1 text-xs rounded text-white ${
                task.status === "completed"
                  ? "bg-green-500"
                  : "bg-yellow-500"
              }`}
            >
              {task.status}
            </span>
          </div>
        ))}

      </div>

    </div>
  );
};


/* ================= STAT CARD ================= */

const StatCard = ({ title, value, color, onClick }) => {

  const colors = {
    indigo: "bg-indigo-500",
    yellow: "bg-yellow-500",
    green: "bg-green-500",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`cursor-pointer text-white p-6 rounded-xl shadow-lg ${colors[color]}`}
    >
      <p className="opacity-80">{title}</p>
      <h3 className="text-3xl font-bold mt-2">
        {value}
      </h3>
    </motion.div>
  );
};

export default Analytics;