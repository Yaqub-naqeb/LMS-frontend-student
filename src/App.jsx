import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routesConfig from "./routes/router";
import './i18n';
function App() {
  return <RouterProvider router={createBrowserRouter(routesConfig)} />;
}

export default App;
