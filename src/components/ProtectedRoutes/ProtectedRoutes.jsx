import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, isLoggedIn, ...props }) => {
  return isLoggedIn ? <Component {...props} /> : <Navigate to="/" />;
};

export default ProtectedRoute;
