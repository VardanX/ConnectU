import { useSelector } from "react-redux";
import { currentToken } from "../features/auth/authSlice";
import { Navigate } from "react-router-dom";

export default function Auth({ children }) {
  const token = useSelector(currentToken);
  return token ? <Navigate to="/" /> : children;
}
