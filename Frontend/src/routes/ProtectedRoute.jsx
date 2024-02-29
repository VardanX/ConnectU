import { useSelector } from "react-redux";
import { currentToken } from "../features/auth/authSlice";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = useSelector(currentToken);
  return token ? children : <Navigate to="/signin" replace />;
}
