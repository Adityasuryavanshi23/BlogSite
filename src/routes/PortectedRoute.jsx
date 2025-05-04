import { Navigate } from "react-router-dom";

export const PortectedRoute = ({ children }) => {
  const islogin = JSON.parse(localStorage.getItem("islogin")) || false;
  return islogin ? children : <Navigate to="/" />;
};
