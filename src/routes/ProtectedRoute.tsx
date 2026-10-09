import type { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { getLoggedInUser } from "../utils/auth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({
  children,
}: ProtectedRouteProps) => {
  const user = getLoggedInUser();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;