import { Navigate, Outlet, useLocation } from "react-router-dom";

// true if a token exists and has not expired
export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      ["token", "role", "name"].forEach((k) => localStorage.removeItem(k));
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

/*
 * <ProtectedRoute />                          -> any logged-in user
 * <ProtectedRoute roles={["staff","admin"]} /> -> only those roles
 */
export default function ProtectedRoute({ roles }) {
  const location = useLocation();

  if (!isLoggedIn()) {
    // remember where the user wanted to go, so login can send them back
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (roles && !roles.includes(localStorage.getItem("role"))) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold mb-2">Access restricted</h1>
        <p className="opacity-70">
          This page is only available to railway staff and administrators.
        </p>
      </div>
    );
  }

  return <Outlet />;
}