import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainLayout from "./Layout/MainLayout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./Pages/Home/Home.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import ProjectDetails from "./Pages/Projects/ProjectDetails.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "project/:id",
        Component: ProjectDetails
      }
    ],
  },
]);

function AOSInitializer({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: false,
    });
  }, []);

  return children;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AOSInitializer>
      <RouterProvider router={router}></RouterProvider>
    </AOSInitializer>
  </StrictMode>
);
