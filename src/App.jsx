import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routesConfig from "./routes/router";

function App() {
  return <RouterProvider router={createBrowserRouter(routesConfig)} />;
}

export default App;
