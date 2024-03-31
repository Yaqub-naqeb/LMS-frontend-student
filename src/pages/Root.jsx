import IntialLayout from "../layout/IntialLayout";
import Navbar from "../layout/Navbar";
import AuthContextProvider from "../components/auth/context/AuthContext";
import { useLocation } from "react-router-dom";
const Root = () => {
  const location = useLocation();
  return (
    <AuthContextProvider>
      <div
        id="root-container"
        data-testid="root-container"
        className={` rt ${
          location.pathname === "/login" || location.pathname === "/signup"
            ? "userInAuth"
            : "root-container"
        }`}
      >
        <Navbar />
        <IntialLayout />
      </div>
    </AuthContextProvider>
  );
};

export default Root;
