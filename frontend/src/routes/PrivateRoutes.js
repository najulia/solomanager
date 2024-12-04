import { useAuth } from "../components/contexts/Auth";
import { Navigate } from "react-router";

function PrivateRoutes({ children }) {
    const { token } = useAuth();
    return token ? children : <Navigate to="/login" />
}

export default PrivateRoutes;