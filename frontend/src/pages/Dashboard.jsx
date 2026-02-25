import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import TasksPage from "../components/dashboard/TasksPage";
import AddTask from "../components/dashboard/AddTask";
import Analytics from "../components/dashboard/Analytics";
import { motion } from "framer-motion";

const Dashboard = () => {

  // ✅ which page open
  const [tab, setTab] = useState("home");

  // ✅ analytics filter
  const [statusFilter, setStatusFilter] = useState("");

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <Sidebar setTab={setTab} />

      <div className="flex-1 flex flex-col">

        {/* NAVBAR */}
        <Navbar />

        {/* CONTENT */}
        <div className="p-8">

          {/* ================= HOME ================= */}
          {tab === "home" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-3 gap-6"
            >
              <Card
                title="Tasks"
                color="indigo"
                onClick={() => {
                  setStatusFilter("");
                  setTab("tasks");
                }}
              />

              <Card
                title="Add Task"
                color="green"
                onClick={() => setTab("add")}
              />

              <Card
                title="Progress"
                color="purple"
                onClick={() => setTab("analytics")}
              />
            </motion.div>
          )}

          {/* ================= TASKS ================= */}
          {tab === "tasks" && (
            <TasksPage initialStatus={statusFilter} />
          )}

          {/* ================= ADD ================= */}
          {tab === "add" && <AddTask />}

          {/* ================= ANALYTICS ================= */}
          {tab === "analytics" && (
            <Analytics
              setTab={setTab}
              setStatusFilter={setStatusFilter}
            />
          )}

        </div>
      </div>
    </div>
  );
};

/* ---------- CARD ---------- */

const Card = ({ title, color, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className={`cursor-pointer bg-${color}-500 text-white p-10 rounded-2xl shadow-lg text-center transition`}
  >
    <h2 className="text-2xl font-bold">{title}</h2>
  </motion.div>
);

export default Dashboard;