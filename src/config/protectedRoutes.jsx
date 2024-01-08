import { Navigate, Outlet } from "react-router-dom";

export const ProtectRoutes = () => {
  const token = localStorage.getItem("token");
  //   const { token } = useAuth();
  return token ? <Outlet /> : <Navigate to='/login' exact />;
};

export const AuthenticatedRoutes = () => {
  const token = localStorage.getItem("token");
  //   const { token } = useAuth();
  return !token ? <Outlet /> : <Navigate to='/' exact />;
};
