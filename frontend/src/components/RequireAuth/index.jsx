import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.login ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    );
}