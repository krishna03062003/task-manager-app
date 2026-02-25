import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../../api";

const Navbar = () => {

  const [user, setUser] = useState(null);

  /* ================= FETCH USER ================= */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  return (
    <motion.div
      initial={{ y: -40 }}
      animate={{ y: 0 }}
      className="bg-white shadow px-8 py-4 flex justify-between items-center"
    >
      {/* LEFT */}
      <h1 className="font-bold text-xl text-indigo-600">
        Dashboard
      </h1>

      {/* RIGHT */}
      <p className="font-medium text-gray-600">
        Welcome, {user?.name || "Loading..."} 👋
      </p>
    </motion.div>
  );
};

export default Navbar;