
// import AuthContextProvider from "../components/auth/context/AuthContext";
import IntialLayout from "../layout/IntialLayout";
import Navbar from "../layout/Navbar";
import AuthContextProvider from "../components/auth/context/AuthContext";

const Root = () => {
  return (
    <AuthContextProvider>
      <div id="root-container" data-testid="root-container">
       <Navbar/>
       <IntialLayout/>
      </div>
      </AuthContextProvider>
  );
};

export default Root;
