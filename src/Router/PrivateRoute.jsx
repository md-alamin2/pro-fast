import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import { ClipLoader } from "react-spinners";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <ClipLoader
        color= "primary"
        loading={loading}
        // cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />;
  }
  return (
    <div>
      {user ? (
        children
      ) : (
        <Navigate state={location.pathname} to="/login"></Navigate>
      )}
    </div>
  );
};

export default PrivateRoutes;