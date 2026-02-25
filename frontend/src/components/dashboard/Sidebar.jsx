import { motion } from "framer-motion";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ setTab }) => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      navigate("/"); // login page
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <motion.div
      initial={{ x: -80 }}
      animate={{ x: 0 }}
      className="w-64 bg-indigo-600 text-white p-6 flex flex-col justify-between"
    >
      <div>
        <h2 className="text-2xl font-bold mb-8">TaskFlow</h2>

        <div className="space-y-4">
          <p onClick={()=>setTab("home")} className="cursor-pointer">Dashboard</p>
          <p onClick={()=>setTab("tasks")} className="cursor-pointer">Tasks</p>
          <p onClick={()=>setTab("add")} className="cursor-pointer">Add Task</p>
          <p onClick={()=>setTab("analytics")} className="cursor-pointer">Progress</p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </motion.div>
  );
};

export default Sidebar;