import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // backend protected route check
        await api.get("/protected");
        setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div className="p-10">Checking auth...</div>;

  return isAuth ? children : <Navigate to="/" />;
};

export default ProtectedRoute;